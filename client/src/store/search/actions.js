import types from 'store/actionTypes'
import { createFetchThunk } from 'store/utils'

export const search = keyword => (dispatch, getState) =>
  createFetchThunk(dispatch, getState)({
    entity: 'preview',
    fetchingKey: 'previewList',
    requestTypes: [types.search.REQUEST, types.search.SUCCESS, types.search.ERROR],
    url: `/articles/all?keyword=${keyword}`,
    method: 'get',
  })
