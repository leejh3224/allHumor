import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'
import { commentListSchema } from 'store/schema'
import { normalize } from 'normalizr'

const initialState = fromJS({
  loginView: 'login',
  comments: {},
  replies: {},
})

export const getLoginView = ({ ui }) => ui.get('loginView')

export const showAddComment = id => (dispatch) => {
  dispatch({ type: types.ui.SHOW_ADD_COMMENT, payload: { id } })
}
export const hideAddComment = id => (dispatch) => {
  dispatch({ type: types.ui.HIDE_ADD_COMMENT, payload: { id } })
}
export const toggleReplies = id => (dispatch) => {
  dispatch({ type: types.ui.TOGGLE_REPLIES, payload: { id } })
}
export const toggleExpandComment = id => (dispatch) => {
  dispatch({ type: types.ui.TOGGLE_EXPAND_COMMENT, payload: { id } })
}
export const switchLoginView = () => (dispatch) => {
  dispatch({ type: types.ui.SWITCH_LOGIN_VIEW })
}

const commentInitialState = {
  isEditing: false,
  isRemoving: false,
  isAddingReply: false,
  isShowingReply: false,
  isFetchingReply: false,
  isFetchingAddReply: false,
}
const replyInitialState = {
  isEditing: false,
  isRemoving: false,
  isAddingReply: false,
  isFetchingAddReply: false,
}

export default handleActions(
  {
    [types.article.SUCCESS]: (
      state,
      { payload: { data: { entities, result } } },
    ) => {
      if (result.length === 1) {
        const articleId = result[0]
        const { comments } = entities.articles[articleId]
        const normalized = normalize(comments, commentListSchema)
        const uiStates = fromJS(normalized.entities.comments || {}).map(comment =>
          fromJS(Object.assign({}, commentInitialState, {
            isTruncated: comment.get('content').length >= 400,
          })))

        return state.set('comments', uiStates)
      }
      return state
    },
    [types.comment.SUCCESS]: (state, { payload: { data: { entities } } }) => {
      const uiStates = fromJS(entities.comments || {}).map(comment =>
        fromJS(Object.assign({}, commentInitialState, {
          isTruncated: comment.get('content').length >= 400,
        })))
      return state.set('comments', state.get('comments').merge(uiStates))
    },
    [types.comment.ADD_SUCCESS]: (
      state,
      { payload: { data: { entities } } },
    ) => {
      const uiStates = fromJS(entities.comments || {}).map(comment =>
        fromJS(Object.assign({}, commentInitialState, {
          isTruncated: comment.get('content').length >= 400,
        })))
      return state.set('comments', state.get('comments').merge(uiStates))
    },
    [types.ui.SHOW_ADD_COMMENT]: (state, { payload: { id } }) => {
      const isCommentType = state.get('comments').has(id)
      return state.setIn(
        [isCommentType ? 'comments' : 'replies', id, 'isAddingReply'],
        true,
      )
    },
    [types.ui.HIDE_ADD_COMMENT]: (state, { payload: { id } }) => {
      const isCommentType = state.get('comments').has(id)
      return state.setIn(
        [isCommentType ? 'comments' : 'replies', id, 'isAddingReply'],
        false,
      )
    },
    [types.ui.TOGGLE_REPLIES]: (state, { payload: { id } }) => {
      const prevState = state.getIn(['comments', id, 'isShowingReply'])
      return state.setIn(['comments', id, 'isShowingReply'], !prevState)
    },
    [types.ui.TOGGLE_EXPAND_COMMENT]: (state, { payload: { id } }) => {
      const isCommentType = state.get('comments').has(id)
      const prevState = state.getIn([
        isCommentType ? 'comments' : 'replies',
        id,
        'isTruncated',
      ])
      return state.setIn(
        [isCommentType ? 'comments' : 'replies', id, 'isTruncated'],
        !prevState,
      )
    },
    [types.reply.REQUEST]: (state, { payload: { id } }) =>
      state.setIn(['comments', id, 'isFetchingReply'], true),
    [types.reply.SUCCESS]: (state, { payload: { id, data: { entities } } }) => {
      const uiStates = fromJS(entities.replies).map(reply =>
        fromJS(Object.assign({}, replyInitialState, {
          isTruncated: reply.get('content').length >= 400,
        })))
      return state
        .setIn(['comments', id, 'isFetchingReply'], false)
        .set('replies', state.get('replies').merge(uiStates))
    },
    [types.reply.ERROR]: (state, { payload: { id } }) =>
      state.setIn(['comments', id, 'isFetchingReply'], false),
    [types.ui.SWITCH_LOGIN_VIEW]: (state) => {
      const prevView = state.get('loginView')
      if (prevView === 'login') {
        return state.set('loginView', 'register')
      }
      return state.set('loginView', 'login')
    },
    [types.reply.ADD_REQUEST]: (state, { payload: { id } }) => {
      const isCommentType = state.get('comments').has(id)
      return state
        .setIn(
          [isCommentType ? 'comments' : 'replies', id, 'isFetchingAddReply'],
          true,
        )
        .setIn(
          [isCommentType ? 'comments' : 'replies', id, 'isAddingReply'],
          false,
        )
    },
    [types.reply.ADD_SUCCESS]: (state, { payload: { id, data } }) => {
      const isCommentType = state.get('comments').has(id)
      const uiStates = fromJS(data.entities.replies).map(reply =>
        fromJS(Object.assign({}, replyInitialState, {
          isTruncated: reply.get('content').length >= 400,
        })))
      return state
        .set('replies', state.get('replies').merge(uiStates))
        .setIn(
          [isCommentType ? 'comments' : 'replies', id, 'isFetchingAddReply'],
          false,
        )
    },
    [types.reply.ADD_ERROR]: (state, { payload: { id } }) => {
      const isCommentType = state.get('comments').has(id)
      return state.setIn(
        [isCommentType ? 'comments' : 'replies', id, 'isFetchingAddReply'],
        false,
      )
    },
  },
  initialState,
)
