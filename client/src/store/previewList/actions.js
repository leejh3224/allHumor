import types from 'store/actionTypes'
import { createFetchThunk } from 'store/utils'

export const fetchPreviews = (category, page) => (dispatch, getState) =>
  createFetchThunk(dispatch, getState)({
    entity: 'preview',
    fetchingKey: 'previewList',
    requestTypes: [types.previewList.REQUEST, types.previewList.SUCCESS, types.previewList.ERROR],
    url: `/articles/${category}/${page}`,
    method: 'get',
  })
