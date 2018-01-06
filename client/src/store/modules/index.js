import { combineReducers } from 'redux'
import entity from './entity'
import fetching from './fetching'
import error from './error'
import pagination from './pagination'

const rootReducer = combineReducers({
  entity,
  fetching,
  error,
  pagination,
})

export default rootReducer
