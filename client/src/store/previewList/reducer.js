import { OrderedMap } from 'immutable'
import { combineReducers } from 'redux-immutable'

import types from 'store/actionTypes'
import { createReducer } from 'store/utils'

const byId = createReducer(
  {
    [types.previewList.SUCCESS](state, { payload }) {
      return state.merge(payload.entities.previews)
    },
  },
  OrderedMap(), // preserve order
)

export default combineReducers({
  byId,
})

export const getPreviewList = ({ previewList }, category) =>
  Object.values(
    previewList
      .get('byId')
      .filter(item => item.get('category') === category)
      .toJS(),
  )
