import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'

import fetching from './fetching/reducer'
import errorMessage from './errorMessage/reducer'
import previewList from './previewList/reducer'
import pagination from './pagination/reducer'
import article from './article/reducer'
import user from './user/reducer'
import comment from './comment/reducer'
import ui from './ui/reducer'
import search from './search/reducer'

export default combineReducers({
  router: routerReducer,
  article,
  fetching,
  pagination,
  comment,
  user,
  ui,
  previewList,
  errorMessage,
  search,
})
