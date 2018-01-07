import createXhrProxy from 'react-cosmos-xhr-proxy'
import createReduxProxy from 'react-cosmos-redux-proxy'
import store from 'store'
import createRouterProxy from 'react-cosmos-router-proxy'

const reduxProxy = createReduxProxy({
  createStore: () => store,
})

export default [createXhrProxy(), reduxProxy, createRouterProxy()]
