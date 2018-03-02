import { OrderedMap } from 'immutable'
import { combineReducers } from 'redux-immutable'

import { createReducer } from 'store/utils'
import types from 'store/actionTypes'
import byId from './byId'
import editing from './editing'
import fetching from './fetching'
import addReply from './addReply'
import ui from './ui'

const repliesById = createReducer(
  {
    [types.comment.REPLY_SUCCESS](state, { payload }) {
      return state.merge(payload.entities.comments)
    },
    [types.comment.REMOVE_SUCCESS](state, { payload: id }) {
      return state.set(id, undefined)
    },
    [types.comment.ADD_REPLY_SUCCESS](state, { payload }) {
      return state.merge(payload.entities.comments)
    },
  },
  OrderedMap(),
)

export default combineReducers({
  byId,
  editing,
  ui,
  fetching,
  addReply,
  repliesById,
})

export const getComments = (state, articleId) =>
  Object.values(
    state
      .getIn(['comment', 'byId'])
      .filter(comment => comment && comment.get('articleId') === articleId)
      .toJS(),
  )
export const getIsEditing = (state, id) => state.getIn(['comment', 'editing', id, 'isEditing'])
export const getIsTruncated = (state, id) => state.getIn(['comment', 'ui', id, 'isTruncated'])
export const getIsExpanded = (state, id) => state.getIn(['comment', 'ui', id, 'isExpanded'])
export const getFetchingEdit = (state, id) => state.getIn(['comment', 'fetching', id, 'edit'])
export const getFetchingRemove = (state, id) => state.getIn(['comment', 'fetching', id, 'remove'])
export const getFetchingReply = (state, id) => state.getIn(['comment', 'fetching', id, 'reply'])
export const getFetchingAddReply = (state, id) =>
  state.getIn(['comment', 'fetching', id, 'addReply'])
export const getRecipient = state => state.getIn(['comment', 'addReply', 'recipient'])
export const getParent = state => state.getIn(['comment', 'addReply', 'parent'])
export const getReplies = (state, id) =>
  Object.values(
    state
      .getIn(['comment', 'repliesById'])
      .filter(reply => reply && reply.get('parent') === id)
      .toJS(),
  )
