import types from 'store/actionTypes'
import { createFetchThunk } from 'store/utils'
import { getCurrent } from 'store/pagination/reducer'

export const fetchPreviews = category => (dispatch, getState) => {
  console.log(`action: ${category}`)
  const nextPage = getCurrent(getState(), 'previewList') + 1
  return createFetchThunk(dispatch, getState)({
    entity: 'preview',
    fetchingKey: 'previewList',
    requestTypes: [types.previewList.REQUEST, types.previewList.SUCCESS, types.previewList.ERROR],
    url: `/api/v1.0/articles/${category}/${nextPage}`,
    method: 'get',
  })
}
