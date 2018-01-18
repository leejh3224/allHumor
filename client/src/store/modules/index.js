import { combineReducers } from 'redux'
import entity from './entity'
import fetching from './fetching'
import error from './error'
import pagination from './pagination'
import login from './login'

const rootReducer = combineReducers({
  entity,
  fetching,
  error,
  pagination,
  login,
})

export default rootReducer
