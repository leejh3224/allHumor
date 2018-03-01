import { combineReducers } from 'redux-immutable'

import createPaginationReducer from './createPaginationReducer'

const previewList = createPaginationReducer('previewList')
const commentList = createPaginationReducer('commentList')

export default combineReducers({
  previewList,
  commentList,
})

export const getPageCount = (state, prefix) => state.getIn(['pagination', prefix, 'pageCount'])
export const getCurrent = (state, prefix) => state.getIn(['pagination', prefix, 'current'])
