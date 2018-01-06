import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './modules'

const isDev = process.env.NODE_ENV === 'development'
const middlewares = [thunk]

if (isDev) {
  middlewares.push(logger)
}

/* eslint-disable no-underscore-dangle, max-len */
export default createStore(
  rootReducer,
  compose(
    applyMiddleware(...middlewares),
    isDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
)
