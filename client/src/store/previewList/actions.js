import types from 'store/actionTypes'
import { createFetchThunk } from 'store/utils'
import { getCurrent } from 'store/pagination/reducer'

export const fetchPreviews = category => (dispatch, getState) => {
  const nextPage = getCurrent(getState(), 'previewList') + 1
  return createFetchThunk(dispatch, getState)({
    entity: 'preview',
    fetchingKey: 'previewList',
    requestTypes: [types.previewList.REQUEST, types.previewList.SUCCESS, types.previewList.ERROR],
    url: `/articles/${category}/${nextPage}`,
    method: 'get',
  })
}
