import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import api from 'api'
import { normalize, schema } from 'normalizr'
import types from 'store/actionTypes'

const initialState = fromJS({
  pages: {
    all: 1,
    dogdrip: 1,
  },
  where: 'dogdrip',
})

// thunks
export const actions = {
  loadArticles: where => async (dispatch, getState) => {
    const { entity } = getState()
    const page = entity.getIn(['pages', where])

    dispatch({ type: types.article.REQUEST })
    try {
      /* eslint-disable */
      const { data: { articles } } = await api.get(`/articles/${where}/${page}`)
      const articleSchema = new schema.Entity('articles', {}, { idAttribute: '_id' })
      const articleListSchema = [articleSchema]

      if (articles) {
        dispatch({
          type: types.article.SUCCESS,
          payload: normalize(articles, articleListSchema),
          meta: { page, where },
        })
      }
    } catch (err) {
      console.log(err)
      dispatch({ type: types.article.ERROR, payload: err })
    }
  },
}

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { meta }) => {
      return state.setIn(['pages', meta.where], meta.page)
    },
  },
  initialState,
)
