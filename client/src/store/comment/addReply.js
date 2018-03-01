import { Map } from 'immutable'

import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

const addReply = createReducer(
  {
    [types.comment.START_ADD_REPLY](state, { payload, meta: { parent } }) {
      const newState = {
        recipient: payload,
        parent,
      }
      return state.merge(Map(newState))
    },
    [types.comment.FINISH_ADD_REPLY](state) {
      return state.clear()
    },
    [types.comment.ADD_REPLY_SUCCESS](state) {
      return state.clear()
    },
    [types.comment.ADD_REPLY_ERROR](state) {
      return state.clear()
    },
  },
  Map(),
)

export default addReply
