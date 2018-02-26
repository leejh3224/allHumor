import types from 'store/actionTypes'

export const fetchPreviews = (category, page) => ({
  type: types.app.API_REQUEST,
  meta: {
    entity: 'article',
    url: `/articles/${category}/${page}`,
    method: 'get',
    onSuccess: types.previewList.SUCCESS,
  },
})
