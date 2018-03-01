import { Map, fromJS } from 'immutable'
import { createSelector } from 'reselect'
import { normalize } from 'normalizr'

import types from 'store/actionTypes'
import { createReducer } from 'store/utils'
import { voteListSchema } from 'store/schema'
import { VOTE_LIMIT_PER_ARTICLE } from './constants'

export default createReducer(
  {
    [types.article.SUCCESS](state, { payload }) {
      const { article } = payload.entities
      const id = Object.keys(article)[0]

      const { entities: { votes = {} } } = normalize(article[id].votes, voteListSchema)
      return fromJS({ ...article[id], votes })
    },
    [types.voting.REQUEST](state, { payload: userId }) {
      const previousCount = state.getIn(['votes', userId, 'counts']) || 0

      if (previousCount < VOTE_LIMIT_PER_ARTICLE) {
        return state.setIn(['votes', userId], Map({ counts: previousCount + 1 }))
      }
      return state
    },
  },
  Map(),
)

export const getArticle = state => state.get('article').toJS()
export const getCategory = createSelector(getArticle, article => (article ? article.category : ''))
export const getId = createSelector(getArticle, article => (article ? article._id : ''))

const getVotes = state => Object.values(state.getIn(['article', 'votes']).toJS())
export const getMyVote = (state, userId) => state.getIn(['article', 'votes', userId])
export const getVoteCount = createSelector(getVotes, votesArray =>
  votesArray.reduce((acc, vote) => acc + vote.counts, 0),
)
