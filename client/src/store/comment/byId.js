import { OrderedMap, fromJS } from 'immutable'
import { normalize } from 'normalizr'

import { createReducer } from 'store/utils'
import types from 'store/actionTypes'
import { commentListSchema } from 'store/schema'

const byId = createReducer(
  {
    [types.article.SUCCESS](state, { payload }) {
      const { comments } = Object.values(payload.entities.article)[0]
      return state.merge(fromJS(normalize(comments, commentListSchema).entities.comments))
    },
    [types.comment.SUCCESS](state, { payload }) {
      return state.merge(fromJS(payload.entities.comments))
    },
    [types.comment.ADD_SUCCESS](state, { payload }) {
      return state.merge(fromJS(payload.entities.comments))
    },
    [types.comment.EDIT_SUCCESS](state, { payload }) {
      const { comments } = payload.entities
      return state.merge(fromJS(comments))
    },
    [types.comment.REMOVE_SUCCESS](state, { payload: id }) {
      return state.has(id) ? state.set(id, undefined) : state
    },
  },
  OrderedMap(),
)

export default byId
