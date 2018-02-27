import { combineReducers } from 'redux-immutable'

import createPaginationReducer from './createPaginationReducer'

const previewList = createPaginationReducer('previewList')
const commentList = createPaginationReducer('commentList')

export default combineReducers({
  previewList,
  commentList,
})

export const getPageCount = ({ pagination }, prefix) => pagination.getIn([prefix, 'pageCount'])
export const getCurrent = ({ pagination }, prefix) => pagination.getIn([prefix, 'current'])
