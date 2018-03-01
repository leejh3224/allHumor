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
  OrderedMap(),
)

export default combineReducers({
  byId,
})

export const getPreviewList = (state, category) =>
  Object.values(
    state
      .getIn(['previewList', 'byId'])
      .filter(item => item.get('category') === category)
      .toJS(),
  )
