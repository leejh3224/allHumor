import types from 'store/actionTypes'
import { createFetchThunk } from 'store/utils'
import { getCurrent, getPageCount } from 'store/pagination/reducer'

export const fetchPreviews = category => (dispatch, getState) => {
  const lastPage = getPageCount(getState(), 'previewList')
  const nextPage = getCurrent(getState(), 'previewList') + 1

  if (nextPage > 1 && nextPage - 1 === lastPage) {
    return null
  }

  return createFetchThunk(dispatch, getState)({
    entity: 'preview',
    fetchingKey: 'previewList',
    requestTypes: [types.previewList.REQUEST, types.previewList.SUCCESS, types.previewList.ERROR],
    url: `/api/v1.0/articles/${category}/${nextPage}`,
    method: 'get',
  })
}
