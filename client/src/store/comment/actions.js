import types from 'store/actionTypes'
import { createFetchThunk } from 'store/utils'
import { getId } from 'store/article/reducer'
import { getProfile } from 'store/user/reducer'
import { getParent } from 'store/comment/reducer'
import { getCurrent } from 'store/pagination/reducer'

export const fetchComments = () => (dispatch, getState) => {
  const articleId = getId(getState())
  const nextPage = getCurrent(getState(), 'comment') + 1

  return createFetchThunk(dispatch, getState)({
    entity: 'comment',
    requestTypes: [types.comment.REQUEST, types.comment.SUCCESS, types.comment.ERROR],
    url: `/comments/${articleId}/page/${nextPage}`,
    method: 'get',
  })
}

export const addComment = content => (dispatch, getState) => {
  const articleId = getId(getState())
  const { userId, avatar, displayName } = getProfile(getState())

  return createFetchThunk(dispatch, getState)({
    entity: 'comment',
    requestTypes: [types.comment.ADD_REQUEST, types.comment.ADD_SUCCESS, types.comment.ERROR],
    url: '/comments',
    method: 'post',
    body: {
      articleId,
      userId,
      avatar,
      author: displayName,
      content,
    },
  })
}

export const startEdit = id => ({
  type: types.comment.START_EDIT,
  payload: id,
})

export const finishEdit = id => ({
  type: types.comment.FINISH_EDIT,
  payload: id,
})

export const toggleExpandText = id => ({
  type: types.comment.TOGGLE_EXPAND_TEXT,
  payload: id,
})

export const editComment = (id, content) => (dispatch, getState) =>
  createFetchThunk(dispatch, getState)({
    entity: 'comment',
    requestTypes: [
      types.comment.EDIT_REQUEST,
      types.comment.EDIT_SUCCESS,
      types.comment.EDIT_ERROR,
    ],
    requestPayload: id,
    url: `/comments/${id}`,
    method: 'put',
    body: { content },
  })

export const removeComment = id => (dispatch, getState) =>
  createFetchThunk(dispatch, getState)({
    requestTypes: [
      types.comment.REMOVE_REQUEST,
      types.comment.REMOVE_SUCCESS,
      types.comment.REMOVE_ERROR,
    ],
    requestPayload: id,
    url: `/comments/${id}`,
    method: 'delete',
  })

export const startAddReply = (recipient, parent) => ({
  type: types.comment.START_ADD_REPLY,
  payload: recipient,
  meta: {
    parent,
  },
})

export const finishAddReply = id => ({
  type: types.comment.FINISH_ADD_REPLY,
  payload: id,
})

export const addReply = content => (dispatch, getState) => {
  const { userId, avatar, displayName } = getProfile(getState())
  const parent = getParent(getState())

  return createFetchThunk(dispatch, getState)({
    entity: 'comment',
    requestTypes: [
      types.comment.ADD_REPLY_REQUEST,
      types.comment.ADD_REPLY_SUCCESS,
      types.comment.ADD_REPLY_ERROR,
    ],
    requestPayload: parent,
    url: `/comments/${parent}/replies`,
    method: 'post',
    body: {
      userId,
      avatar,
      author: displayName,
      content,
    },
  })
}

export const toggleExpandReply = id => ({
  type: types.comment.TOGGLE_EXPAND_REPLY,
  payload: id,
})

export const fetchReplies = id => (dispatch, getState) =>
  createFetchThunk(dispatch, getState)({
    entity: 'comment',
    requestTypes: [
      types.comment.REPLY_REQUEST,
      types.comment.REPLY_SUCCESS,
      types.comment.REPLY_ERROR,
    ],
    requestPayload: id,
    url: `/comments/${id}/replies`,
    method: 'get',
  })
