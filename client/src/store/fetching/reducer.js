import { combineReducers } from 'redux-immutable'

import createFetchingReducer from './createFetchingReducer'

const previewList = createFetchingReducer('previewList')
const article = createFetchingReducer('article')
const comment = createFetchingReducer('comment')
const addComment = createFetchingReducer('comment', 'add')
const search = createFetchingReducer('search')

export default combineReducers({
  previewList,
  article,
  comment,
  addComment,
  search,
})

export const getFetching = (state, key) => state.getIn(['fetching', key])
