import { combineReducers } from 'redux-immutable'

import createPaginationReducer from './createPaginationReducer'

const previewList = createPaginationReducer('previewList')
const comment = createPaginationReducer('comment')

export default combineReducers({
  previewList,
  comment,
})

export const getPageCount = (state, prefix) => state.getIn(['pagination', prefix, 'pageCount'])
export const getCurrent = (state, prefix) => state.getIn(['pagination', prefix, 'current'])
