import { combineReducers } from 'redux-immutable'

import createFetchingReducer from './createFetchingReducer'

const previewList = createFetchingReducer('previewList')
const article = createFetchingReducer('article')

export default combineReducers({
  previewList,
  article,
})

export const getFetching = ({ fetching }, key) => fetching.get(key)
