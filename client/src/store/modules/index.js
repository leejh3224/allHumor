import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import article from './article'
import fetching from './fetching'
import error from './error'
import pagination from './pagination'
import login from './login'
import voting from './voting'
import comment from './comment'

const rootReducer = combineReducers({
  router: routerReducer,
  article,
  fetching,
  error,
  pagination,
  login,
  voting,
  comment,
})

export default rootReducer
