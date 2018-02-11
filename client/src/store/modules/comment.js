import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'
import { commentListSchema, replyListSchema } from 'store/schema'
import { normalize } from 'normalizr'
import { createSelector } from 'reselect'
import api from 'api'
import orderBy from 'lodash/orderBy'

const initialState = fromJS({
  articleId: 0,
  entities: {
    comments: {},
    replies: {},
  },
})

const getArticleId = ({ comment }) => comment.get('articleId')

export const addComment = content => async (dispatch, getState) => {
  const state = getState()
  const articleId = getArticleId(state)
  const userId = state.user.get('userId')
  const avatar = state.user.get('avatar')
  const author = state.user.get('displayName')

  dispatch({ type: types.comment.ADD_REQUEST })

  try {
    const { data: { comments } } = await api.post('/comments', {
      articleId,
      userId,
      avatar,
      author,
      content,
    })

    if (comments) {
      dispatch({
        type: types.comment.ADD_SUCCESS,
        payload: {
          data: normalize(comments, commentListSchema),
        },
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.comment.ADD_ERROR, payload: { error } })
  }
}

export const addReply = (content, from, parent) => async (dispatch, getState) => {
  const state = getState()
  const userId = state.user.get('userId')
  const avatar = state.user.get('avatar')
  const author = state.user.get('displayName')

  dispatch({ type: types.reply.ADD_REQUEST, payload: { id: from } })

  try {
    const { data: { replies } } = await api.post(`/comments/${parent}/replies`, {
      userId,
      avatar,
      author,
      content,
    })

    if (replies) {
      dispatch({
        type: types.reply.ADD_SUCCESS,
        payload: {
          id: from,
          data: normalize(replies, replyListSchema),
        },
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.reply.ADD_ERROR, payload: { id: from, error } })
  }
}

export const loadReplies = commentId => async dispatch => {
  dispatch({ type: types.reply.REQUEST, payload: { id: commentId } })

  try {
    const { data: { replies } } = await api.get(`/comments/${commentId}/replies`)

    if (replies) {
      dispatch({
        type: types.reply.SUCCESS,
        payload: {
          id: commentId,
          data: normalize(replies, replyListSchema),
        },
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.reply.ERROR, payload: { id: commentId, error } })
  }
}

export const editComment = (commentId, content) => async dispatch => {
  dispatch({ type: types.comment.EDIT_REQUEST, payload: { id: commentId } })

  try {
    const { data: { comments } } = await api.put(`/comments/${commentId}`, {
      content,
    })

    if (comments) {
      dispatch({
        type: types.comment.EDIT_SUCCESS,
        payload: {
          id: commentId,
          data: normalize(comments, commentListSchema),
        },
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.comment.EDIT_ERROR, payload: { error } })
  }
}

export const removeComment = commentId => async dispatch => {
  dispatch({ type: types.comment.REMOVE_REQUEST, payload: { id: commentId } })

  try {
    const { data: { success } } = await api.delete(`/comments/${commentId}`)

    if (success) {
      dispatch({
        type: types.comment.REMOVE_SUCCESS,
        payload: { id: commentId },
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.comment.REMOVE_ERROR, payload: { error } })
  }
}

export const getRepliesOfComment = ({ comment, ui }, commentId) =>
  comment
    .getIn(['entities', 'replies'])
    .filter(reply => reply)
    .filter(reply => reply.get('parent') === commentId)
    .map(reply => reply.merge(ui.getIn(['replies', reply.get('_id')])))
    .toJS()

export const getOrderedReplies = createSelector(getRepliesOfComment, replies =>
  orderBy(Object.values(replies), ['createdAt'], ['desc']),
)

export const getComments = ({ comment, ui }) =>
  comment
    .getIn(['entities', 'comments'])
    .filter(c => c)
    .map(c => c.merge(ui.getIn(['comments', c.get('_id')])))
    .toJS()

export const getOrderedComments = createSelector(getComments, comments =>
  orderBy(Object.values(comments), ['createdAt'], ['desc']),
)

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload: { data: { entities, result } } }) => {
      if (result.length === 1) {
        const articleId = result[0]
        const { comments } = entities.articles[articleId]
        const normalized = normalize(comments, commentListSchema)

        return state
          .set('articleId', articleId)
          .setIn(['entities', 'comments'], fromJS(normalized.entities.comments) || Map())
      }
      return state
    },
    [types.comment.SUCCESS]: (state, { payload: { data } }) =>
      state.mergeDeepWith((prev, next, key) => {
        if (key === 'replies') {
          return prev
        }
        return next
      }, fromJS(data)),
    [types.comment.ADD_SUCCESS]: (state, { payload: { data } }) =>
      state.mergeDeepWith((prev, next, key) => {
        if (key === 'replies') {
          return prev
        }
        return next
      }, fromJS(data)),
    [types.comment.EDIT_SUCCESS]: (
      state,
      { payload: { id, data: { entities: { comments } } } },
    ) => {
      const isCommentType = state.getIn(['entities', 'comments']).has(id)
      return state.setIn(
        ['entities', isCommentType ? 'comments' : 'replies', id],
        fromJS(comments[id]),
      )
    },
    [types.comment.REMOVE_SUCCESS]: (state, { payload: { id } }) => {
      const isCommentType = state.getIn(['entities', 'comments']).has(id)
      return state.setIn(['entities', isCommentType ? 'comments' : 'replies', id], undefined)
    },
    [types.reply.SUCCESS]: (state, { payload }) => state.mergeDeep(payload.data),
    [types.reply.ADD_SUCCESS]: (state, { payload: { id, data } }) => {
      const isCommentType = state.getIn(['entities', 'comments']).has(id)
      const replyId = Object.values(data.entities.replies)[0]._id
      return state
        .mergeDeepWith((prev, next, key) => {
          if (key === 'comments') {
            return prev
          }
          return next
        }, fromJS(data))
        .updateIn(
          ['entities', 'comments', id, 'replies'],
          replies => (isCommentType ? replies.push(replyId) : replies),
        )
    },
  },
  initialState,
)
