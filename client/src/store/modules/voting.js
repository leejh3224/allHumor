import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'
import api from 'api'
import { normalize, schema } from 'normalizr'

const limit = 25
const voteSchema = new schema.Entity(
  'votes',
  {},
  { idAttribute: 'userId' }, // 한 게시물 내에서는 유저의 표가 unique하므로
)
const voteListSchema = [voteSchema]

const initialState = fromJS({
  articleId: 0,
  entities: {
    votes: {},
  },
})

export const selectors = {
  getUserVotes: ({ voting }, userId) =>
    voting.getIn(['entities', 'votes', userId]),
  getArticleId: ({ voting }) => voting.get('articleId'),
  getVoteCounts: ({ voting }) => {
    const votes = voting.getIn(['entities', 'votes'])

    if (!votes) {
      return 0
    }
    return votes.reduce((acc, vote) => acc + vote.get('counts'), 0)
  },
}

export const actions = {
  voteArticle: userId => async (dispatch, getState) => {
    const myvote = selectors.getUserVotes(getState(), userId)
    const articleId = selectors.getArticleId(getState())

    if (!myvote) {
      dispatch({ type: types.voting.REQUEST, payload: { userId } })

      try {
        await api.post(`/articles/${articleId}/votes`, {
          userId,
        })
      } catch (error) {
        console.log(error)
        dispatch({ type: types.voting.ERROR, payload: error })
      }
    } else {
      if (myvote.get('counts') === limit) {
        return
      }

      dispatch({ type: types.voting.REQUEST, payload: { userId } })

      try {
        await api.put(`/articles/${articleId}/votes`, {
          userId,
        })
      } catch (error) {
        console.log(error)
        dispatch({ type: types.voting.ERROR, payload: error })
      }
    }
  },
}

// 어차피 canonical state로 업데이트 하는 건
// 새로고침 했을 때, 즉 article.success 액션이 dispatch 됐을 때 뿐
// 그러므로 request가 dispatch 되자마자 vote를 업데이트 하는 게 맞음.
export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload: { entities, result } }) => {
      if (result.length === 1) {
        const { votes } = entities.articles[result[0]]

        return state
          .update('articleId', () => result[0])
          .merge(normalize(votes, voteListSchema))
      }

      return state
    },
    [types.voting.REQUEST]: (state, { payload: { userId } }) => {
      const targetPath = ['entities', 'votes', userId, 'counts']
      const previousCount = state.getIn(targetPath) || 0

      return state.updateIn(targetPath, () => previousCount + 1)
    },
  },
  initialState,
)
