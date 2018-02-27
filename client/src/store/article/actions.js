import types from 'store/actionTypes'
import { createFetchThunk } from 'store/utils'

export const fetchArticle = id => createFetchThunk({
  entity: 'article',
  fetchingKey: 'article',
  requestTypes: [types.article.REQUEST, types.article.SUCCESS, types.article.ERROR],
  url: `/articles/${id}`,
  method: 'get',
})
