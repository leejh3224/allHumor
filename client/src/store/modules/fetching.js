import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'

const initialState = fromJS({
  article: false,
  reply: false,
})

export const selectors = {
  getFetchingArticle: ({ fetching }) => fetching.get('article'),
  getFetchingReply: ({ fetching }) => fetching.get('reply'),
}

export default handleActions(
  {
    [types.article.REQUEST]: state => state.setIn(['article'], true),
    [types.article.SUCCESS]: state => state.setIn(['article'], false),
    [types.article.ERROR]: state => state.setIn(['article'], false),
    [types.reply.REQUEST]: state => state.setIn(['reply'], true),
    [types.reply.SUCCESS]: state => state.setIn(['reply'], false),
    [types.reply.ERROR]: state => state.setIn(['reply'], false),
  },
  initialState,
)
