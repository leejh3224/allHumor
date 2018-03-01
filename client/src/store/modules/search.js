import { fromJS, Map } from 'immutable'
import { createReducer } from 'store/utils'
import types from 'store/actionTypes'
// import api from 'api'
// import { normalize } from 'normalizr'
// import { articleListSchema } from 'store/schema'

const initialState = fromJS({
  keyword: '',
  result: {
    entities: {
      articles: {},
    },
  },
  isSubmitted: false,
})

export const getKeyword = ({ search }) => search.get('keyword')
export const getResult = ({ search }) =>
  (search.getIn(['result', 'entities', 'articles']) || Map()).toJS()
export const getIsSubmitted = ({ search }) => search.get('isSubmitted')

export const handleInputChange = e => dispatch => {
  dispatch({ type: types.search.CHANGE_INPUT, payload: { keyword: e.target.value } })
}

// export const handleSubmit = e => async (dispatch, getState) => {
//   const keyword = getKeyword(getState())
//   e.preventDefault()

//   dispatch({ type: types.search.REQUEST })

//   try {
//     const { data: { articles } } = await api.get(`/articles/all/1${`?keyword=${keyword}`}`)

//     if (articles) {
//       dispatch({
//         type: types.search.SUCCESS,
//         payload: {
//           data: normalize(articles, articleListSchema),
//         },
//       })
//     }
//   } catch (error) {
//     console.log(error)
//     dispatch({ type: types.search.ERROR, payload: { error } })
//   }
// }

export default createReducer(
  {
    [types.search.CHANGE_INPUT]: (state, { payload: { keyword } }) => state.set('keyword', keyword),
    [types.search.REQUEST]: state => state.set('isSubmitted', true),
    [types.search.SUCCESS]: (state, { payload: { data } }) => state.set('result', fromJS(data)),
  },
  initialState,
)
