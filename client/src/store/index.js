import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import history from 'utils/history'
import rootReducer from './rootReducer'

const router = routerMiddleware(history)
const middlewares = [thunk, router]

const configureStore = () =>
  createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)))

export default configureStore
