import { fromJS } from 'immutable'
import { createSelector } from 'reselect'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'
import api from 'api'
import { voteListSchema } from 'store/schema'
import { normalize } from 'normalizr'

const limit = 25

const initialState = fromJS({
  articleId: 0,
  entities: {
    votes: {},
  },
})

const getVotes = ({ voting }) => voting.getIn(['entities', 'votes'])
const getMyVote = ({ voting }, userId) =>
  voting.getIn(['entities', 'votes', userId])
const getArticleId = ({ voting }) => voting.get('articleId')
export const getVoteCount = createSelector(
  getVotes,
  votes =>
    (!votes ? 0 : votes.reduce((acc, vote) => acc + vote.get('counts'), 0)),
)

export const voteArticle = () => async (dispatch, getState) => {
  const userId = getState().user.get('userId')
  const myvote = getMyVote(getState(), userId)
  const articleId = getArticleId(getState())

  if (!myvote) {
    dispatch({ type: types.voting.REQUEST, payload: { userId } })

    try {
      await api.post(`/articles/${articleId}/votes`, {
        userId,
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: types.voting.ERROR, payload: { error } })
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
      dispatch({ type: types.voting.ERROR, payload: { error } })
    }
  }
}

export default handleActions(
  {
    [types.article.SUCCESS]: (
      state,
      { payload: { data: { entities, result } } },
    ) => {
      if (result.length === 1) {
        const { votes } = entities.articles[result[0]]

        return state
          .set('articleId', result[0])
          .merge(normalize(votes, voteListSchema))
      }

      return state
    },
    [types.voting.REQUEST]: (state, { payload: { userId } }) => {
      const targetPath = ['entities', 'votes', userId, 'counts']
      const previousCount = state.getIn(targetPath) || 0

      return state.setIn(targetPath, previousCount + 1)
    },
  },
  initialState,
)
