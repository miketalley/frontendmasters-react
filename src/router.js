import app from 'ampersand-app'
import Router from 'ampersand-router'
import React from 'react'
import qs from 'qs'
import xhr from 'xhr'
import Me from './models/me'
import PublicPage from './pages/public'
import ReposPage from './pages/repos'
import Layout from './layout'

export default Router.extend({
  renderPage (page, opts = {layout: true}) {
    if (opts.layout){
      page = (
        <Layout>
          {page}
        </Layout>
      )
    }

    React.render(page, document.body)
  },
  routes: {
    '': 'public',
    'repos': 'repos',
    'login': 'login',
    'logout': 'logout',
    'auth/callback?:query': 'authCallback'
  },
  public () {
    this.renderPage(<PublicPage />) //, {layout: false})
  },
  repos () {
    this.renderPage(<ReposPage />)
  },
  login () {
    window.location = "https://github.com/login/oauth/authorize?" + qs.stringify({
      client_id: "dea7dde865f6b546ab2a",
      // TODO: Think about this!
      redirect_uri: window.location.origin + '/auth/callback',
      scope: 'user, repo'
    });
  },
  authCallback (query) {
    query = qs.parse(query)
    console.log('Query: ', query)

    xhr({
      url: "https://localhosttestauth.herokuapp.com/authenticate/" + query.code,
      json: true
    }, (err, req, body) => {
      console.log('Body: ', body)
      app.me.token = body.token
      this.redirectTo('/repos')
      // This is the long hand version of the above code
      // this.history.navigate('/repos', {replace: true})
    })
  },
  logout () {
    window.localStorage.clear()
    window.location = '/'
  }
})