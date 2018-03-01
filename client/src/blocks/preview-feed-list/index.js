import React, { Component } from 'react'
import { bool, arrayOf, shape, string, func } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'

import * as fetchingReducer from 'store/fetching/reducer'
import * as previewListReducer from 'store/previewList/reducer'
import * as actions from 'store/previewList/actions'
import * as errorMessageReducer from 'store/errorMessage/reducer'
import { PreviewFeed, InfiniteScroll } from 'components'

class PreviewFeedList extends Component {
  static defaultProps = {
    errorMessage: null,
  }
  static propTypes = {
    previewList: arrayOf(shape()).isRequired,
    errorMessage: string,
    fetching: bool.isRequired,
    fetchPreviews: func.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  }
  componentDidMount() {
    const { fetchPreviews, match: { params } } = this.props
    fetchPreviews(params.category, 1)
  }
  render() {
    const {
      previewList, fetching, errorMessage, fetchPreviews, match: { params },
    } = this.props

    if (fetching && !previewList.length) {
      return <p>loading ...</p>
    }

    if (errorMessage && !previewList.length) {
      return <p>{errorMessage}</p>
    }

    return (
      <div>
        <ul>
          {previewList.length
            ? previewList.map(preview => <PreviewFeed key={preview._id} preview={preview} />)
            : '해당 카테고리에 게시물이 없습니다.'}
        </ul>
        <InfiniteScroll prefix="previewList" fetchAction={fetchPreviews} params={params} />
        <div>{fetching && <p>loading ...</p>}</div>
      </div>
    )
  }
}

export default withRouter(
  connect(
    (state, { match: { params } }) => ({
      fetching: fetchingReducer.getFetching(state, 'previewList'),
      previewList: previewListReducer.getPreviewList(state, params.category),
      errorMessage: errorMessageReducer.getErrorMessage(state),
    }),
    actions,
  )(PreviewFeedList),
)
