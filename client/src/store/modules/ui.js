import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'
import { normalize, schema } from 'normalizr'

const commentSchema = new schema.Entity('comments', {}, { idAttribute: '_id' })
const commentListSchema = [commentSchema]

const initialState = fromJS({
  loginView: 'login',
  comments: {},
  replies: {},
})

export const getLoginView = ({ ui }) => ui.get('loginView')

export const showAddComment = id => (dispatch) => {
  dispatch({ type: types.ui.SHOW_ADD_COMMENT, payload: id })
}
export const hideAddComment = id => (dispatch) => {
  dispatch({ type: types.ui.HIDE_ADD_COMMENT, payload: id })
}
export const toggleReplies = id => (dispatch) => {
  dispatch({ type: types.ui.TOGGLE_REPLIES, payload: id })
}
export const toggleExpandComment = id => (dispatch) => {
  dispatch({ type: types.ui.TOGGLE_EXPAND_COMMENT, payload: id })
}
export const switchLoginView = () => (dispatch) => {
  dispatch({ type: types.ui.SWITCH_LOGIN_VIEW })
}

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload: { entities, result } }) => {
      if (result.length === 1) {
        const articleId = result[0]
        const { comments } = entities.articles[articleId]
        const normalized = normalize(comments, commentListSchema)
        const uiStates = fromJS(normalized.entities.comments || {}).map(comment =>
          fromJS({
            isTruncated: comment.get('content').length >= 400,
            isEditing: false,
            isAddingReply: false,
            isShowingReply: false,
            isFetchingReply: false,
            isFetchingAddReply: false,
          }))

        return state.set('comments', uiStates)
      }
      return state
    },
    [types.comment.ADD_SUCCESS]: (state, { payload: { entities } }) =>
      state.set(
        'comments',
        state.get('comments').merge(fromJS(entities.comments)),
      ),
    [types.ui.SHOW_ADD_COMMENT]: (state, { payload }) => {
      const isCommentType = state.getIn(['comments', payload])
      return state.setIn(
        [isCommentType ? 'comments' : 'replies', payload, 'isAddingReply'],
        true,
      )
    },
    [types.ui.HIDE_ADD_COMMENT]: (state, { payload }) => {
      const isCommentType = state.getIn(['comments', payload])
      return state.setIn(
        [isCommentType ? 'comments' : 'replies', payload, 'isAddingReply'],
        false,
      )
    },
    [types.ui.TOGGLE_REPLIES]: (state, { payload }) => {
      const prevState = state.getIn(['comments', payload, 'isShowingReply'])
      return state.setIn(['comments', payload, 'isShowingReply'], !prevState)
    },
    [types.ui.TOGGLE_EXPAND_COMMENT]: (state, { payload }) => {
      const isCommentType = state.getIn(['comments', payload])
      const prevState = state.getIn([
        isCommentType ? 'comments' : 'replies',
        payload,
        'isTruncated',
      ])
      return state.setIn(
        [isCommentType ? 'comments' : 'replies', payload, 'isTruncated'],
        !prevState,
      )
    },
    [types.reply.REQUEST]: (state, { payload }) =>
      state.setIn(['comments', payload, 'isFetchingReply'], true),
    [types.reply.SUCCESS]: (state, { payload: { id, data: { entities } } }) => {
      const uiStates = fromJS(entities.replies).map(reply =>
        fromJS({
          isTruncated: reply.get('content').length >= 400,
          isEditing: false,
          isAddingReply: false,
          isFetchingAddReply: false,
        }))

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
  },
  initialState,
)
