import { OrderedMap } from 'immutable'

import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

const editing = createReducer(
  {
    [types.comment.START_EDIT](state, { payload: id }) {
      return state.setIn([id, 'isEditing'], true)
    },
    [types.comment.FINISH_EDIT](state, { payload: id }) {
      return state.setIn([id, 'isEditing'], false)
    },
    [types.comment.EDIT_SUCCESS](state, { meta: { id } }) {
      return state.setIn([id, 'isEditing'], false)
    },
    [types.comment.REMOVE_SUCCESS](state, { payload: id }) {
      return state.set(id, undefined)
    },
  },
  OrderedMap(),
)

export default editing
