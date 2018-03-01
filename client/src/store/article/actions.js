import types from 'store/actionTypes'
import { createFetchThunk } from 'store/utils'
import { getUserId } from 'store/user/reducer'
import { getMyVote, getId } from './reducer'
import { VOTE_LIMIT_PER_ARTICLE } from './constants'

export const fetchArticle = id => (dispatch, getState) =>
  createFetchThunk(dispatch, getState)({
    entity: 'article',
    requestTypes: [types.article.REQUEST, types.article.SUCCESS, types.article.ERROR],
    url: `/articles/${id}`,
    method: 'get',
  })

export const voteArticle = () => async (dispatch, getState) => {
  const userId = getUserId(getState())
  const myvote = getMyVote(getState(), userId)
  const articleId = getId(getState())

  const cannotVoteMore = myvote && myvote.get('counts') === VOTE_LIMIT_PER_ARTICLE
  if (cannotVoteMore) {
    return null
  }

  return createFetchThunk(dispatch, getState)({
    requestTypes: [types.voting.REQUEST, null, types.voting.ERROR],
    requestPayload: userId,
    url: `/articles/${articleId}/votes`,
    method: myvote ? 'put' : 'post',
    body: { userId },
  })
}
