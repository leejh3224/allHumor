import { OrderedMap } from 'immutable'

import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

const fetching = createReducer(
  {
    [types.comment.EDIT_REQUEST](state, { payload: id }) {
      return state.setIn([id, 'edit'], true)
    },
    [types.comment.EDIT_SUCCESS](state, { meta: { id } }) {
      return state.setIn([id, 'edit'], false)
    },
    [types.comment.EDIT_ERROR](state, { meta: { id } }) {
      return state.setIn([id, 'edit'], false)
    },
    [types.comment.REMOVE_REQUEST](state, { payload: id }) {
      return state.setIn([id, 'remove'], true)
    },
    [types.comment.REMOVE_ERROR](state, { meta: { id } }) {
      return state.setIn([id, 'remove'], false)
    },
    [types.comment.REMOVE_SUCCESS](state, { payload: id }) {
      return state.has(id) ? state.set(id, undefined) : state
    },
    [types.comment.ADD_REPLY_REQUEST](state, { payload: id }) {
      return state.setIn([id, 'addReply'], true)
    },
    [types.comment.ADD_REPLY_SUCCESS](state, { meta: { id } }) {
      return state.setIn([id, 'addReply'], false)
    },
    [types.comment.ADD_REPLY_ERROR](state, { meta: { id } }) {
      return state.setIn([id, 'addReply'], false)
    },
    [types.comment.REPLY_REQUEST](state, { payload: id }) {
      return state.setIn([id, 'reply'], true)
    },
    [types.comment.REPLY_SUCCESS](state, { meta: { id } }) {
      return state.setIn([id, 'reply'], false)
    },
    [types.comment.REPLY_ERROR](state, { meta: { id } }) {
      return state.setIn([id, 'reply'], false)
    },
  },
  OrderedMap(),
)

export default fetching
