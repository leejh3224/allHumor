import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import article from './article'
import fetching from './fetching'
import error from './error'
import pagination from './pagination'
import voting from './voting'
import comment from './comment'
import user from './user'
import ui from './ui'
import search from './search'

const rootReducer = combineReducers({
  router: routerReducer,
  article,
  fetching,
  error,
  pagination,
  voting,
  comment,
  user,
  ui,
  search,
})

export default rootReducer
