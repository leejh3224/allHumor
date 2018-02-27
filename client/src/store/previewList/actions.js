import types from 'store/actionTypes'
import { createFetchThunk } from 'store/utils'

export const fetchPreviews = (category, page) =>
  createFetchThunk({
    entity: 'preview',
    fetchingKey: 'previewList',
    requestTypes: [types.previewList.REQUEST, types.previewList.SUCCESS, types.previewList.ERROR],
    url: `/articles/${category}/${page}`,
    method: 'get',
  })
