import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import article from './article'
import voting from './voting'
import comment from './comment'
import user from './user'
import ui from './ui'
import search from './search'
import addReply from './addReply'

import fetching from '../fetching/reducer'
import errorMessage from '../errorMessage/reducer'
import previewList from '../previewList/reducer'
import pagination from '../pagination/reducer'
import article from '../article/reducer'

const rootReducer = combineReducers({
  router: routerReducer,
  article,
  fetching,
  pagination,
  voting,
  comment,
  user,
  ui,
  search,
  addReply,
  previewList,
  errorMessage,
})

export default rootReducer
