import Model from 'ampersand-model'

export default Model.extend({
  props: {
    id: 'number',
    login: 'string',
    avatar_url: 'string'
  },
  session {
    token: 'string'
  }
});