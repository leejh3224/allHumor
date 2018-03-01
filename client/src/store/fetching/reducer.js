import { combineReducers } from 'redux-immutable'

import createFetchingReducer from './createFetchingReducer'

const previewList = createFetchingReducer('previewList')
const article = createFetchingReducer('article')
const comment = createFetchingReducer('comment')
const addComment = createFetchingReducer('comment', 'add')

export default combineReducers({
  previewList,
  article,
  comment,
  addComment,
})

export const getFetching = (state, key) => state.getIn(['fetching', key])
