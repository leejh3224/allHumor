import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import article from './article'
import error from './error'
import pagination from './pagination'
import voting from './voting'
import comment from './comment'
import user from './user'
import ui from './ui'
import search from './search'
import nextArticle from './nextArticle'
import addReply from './addReply'

import fetching from './fetching'
import errorMessage from './errorMessage'
import previewList from './previewList'

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
  nextArticle,
  addReply,
  previewList,
  errorMessage,
})

export default rootReducer
