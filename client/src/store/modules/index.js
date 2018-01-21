import { combineReducers } from 'redux'
import entity from './entity'
import fetching from './fetching'
import error from './error'
import pagination from './pagination'
import login from './login'
import voting from './voting'

const rootReducer = combineReducers({
  entity,
  fetching,
  error,
  pagination,
  login,
  voting,
})

export default rootReducer
