import { combineReducers } from 'redux-immutable'

import createFetchingReducer from './createFetchingReducer'

const previewList = createFetchingReducer('previewList')
const article = createFetchingReducer('article')
const comment = createFetchingReducer('comment')

export default combineReducers({
  previewList,
  article,
  comment,
})

export const getFetching = (state, key) => state.getIn(['fetching', key])
