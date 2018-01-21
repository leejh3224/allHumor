import { fromJS, Map } from 'immutable'
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
      dispatch({ type: types.voting.REQUEST })

      try {
        const { data: { votes } } = await api.post(
          `/articles/${articleId}/votes`,
          {
            userId,
          },
        )

        if (votes) {
          dispatch({
            type: types.voting.SUCCESS,
            payload: {
              votes: normalize(votes, voteListSchema),
              userId,
            },
          })
        }
      } catch (error) {
        console.log(error)
        dispatch({ type: types.voting.ERROR, payload: error })
      }
    } else {
      if (myvote.get('counts') === limit) {
        return
      }

      dispatch({ type: types.voting.REQUEST })

      try {
        const { data: { votes } } = await api.put(
          `/articles/${articleId}/votes`,
          {
            userId,
          },
        )

        if (votes) {
          dispatch({
            type: types.voting.SUCCESS,
            payload: {
              votes: normalize(votes, voteListSchema),
              userId,
            },
          })
        }
      } catch (error) {
        console.log(error)
        dispatch({ type: types.voting.ERROR, payload: error })
      }
    }
  },
}

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload: { entities, result } }) => {
      if (result.length === 1) {
        const { votes } = entities.articles[result[0]]

        return state
          .set('articleId', result[0])
          .merge(normalize(votes, voteListSchema))
      } // 디테일 페이지일 경우 1개의 article만 가져오므로(get canonical state)

      return state
    },
    [types.voting.SUCCESS]: (state, { payload: { votes, userId } }) => {
      const targetPath = ['entities', 'votes', userId]
      const updatedValue = votes.entities.votes[userId]

      return state.updateIn(targetPath, () => Map(updatedValue)) // for immutability
    },
  },
  initialState,
)
