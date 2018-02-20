import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { createSelector } from 'reselect'

import types from 'store/actionTypes'

const initialState = fromJS({
  commentId: null,
})

const getComments = ({ comment }) => {
  const comments = comment.getIn(['entities', 'comments']).toJS()
  const replies = comment.getIn(['entities', 'replies']).toJS()
  return { ...comments, ...replies }
}
export const getCommentId = ({ addReply }) => addReply.get('commentId')

const findCommentsById = createSelector(getComments, getCommentId, (comments, commentId) =>
  Object.values(comments).filter(comment => comment && comment._id === commentId),
)

export const getParentId = createSelector(
  findCommentsById,
  comments => comments.map(comment => comment.parent || comment._id)[0],
)
export const getRecipientName = createSelector(
  findCommentsById,
  comments => comments.map(comment => comment.author)[0],
)

export const startAddReply = commentId => dispatch => {
  dispatch({ type: types.addReply.START_ADD_REPLY, payload: { commentId } })
}
export const finishAddReply = () => dispatch => {
  dispatch({ type: types.addReply.FINISH_ADD_REPLY })
}

export default handleActions(
  {
    [types.addReply.START_ADD_REPLY]: (state, { payload: { commentId } }) =>
      state.set('commentId', commentId),
    [types.addReply.FINISH_ADD_REPLY]: state => state.set('commentId', null),
    [types.reply.ADD_SUCCESS]: state => state.set('commentId', null),
    [types.reply.ADD_ERROR]: state => state.set('commentId', null),
  },
  initialState,
)
