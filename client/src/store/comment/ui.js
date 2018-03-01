import { OrderedMap } from 'immutable'

import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

const ui = createReducer(
  {
    [types.comment.TOGGLE_EXPAND_TEXT](state, { payload: id }) {
      const previousState = state.getIn([id, 'isTruncated'])
      return state.setIn([id, 'isTruncated'], !previousState)
    },
    [types.comment.REMOVE_SUCCESS](state, { payload: id }) {
      return state.set(id, undefined)
    },
    [types.comment.TOGGLE_EXPAND_REPLY](state, { payload: id }) {
      const previousState = state.getIn([id, 'isExpanded'])
      return state.setIn([id, 'isExpanded'], !previousState)
    },
    [types.comment.ADD_REPLY_SUCCESS](state, { meta: { id } }) {
      const previousState = state.getIn([id, 'isExpanded'])
      return state.setIn([id, 'isExpanded'], !previousState)
    },
  },
  OrderedMap(),
)

export default ui
