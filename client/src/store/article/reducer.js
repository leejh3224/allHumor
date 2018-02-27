import { Map } from 'immutable'
import { createSelector } from 'reselect'

import types from 'store/actionTypes'
import { createReducer } from 'store/utils'

export default createReducer(
  {
    [types.article.SUCCESS](state, { payload }) {
      return Map(payload.entities.article)
    },
  },
  Map(),
)

export const getArticle = ({ article }) => Object.values(article.toJS())[0]
export const getCategory = createSelector(getArticle, article => (article ? article.category : ''))
