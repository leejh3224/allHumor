import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import history from 'utils/history'
import { routerMiddleware } from 'react-router-redux'
import rootReducer from './rootReducer'

const isDev = process.env.NODE_ENV === 'development'
const router = routerMiddleware(history)
const middlewares = [thunk, router]

/* eslint-disable no-underscore-dangle, max-len */
const configureStore = () =>
  createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      isDev && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  )

export default configureStore
