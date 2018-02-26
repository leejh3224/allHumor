import React, { Component } from 'react'
import { bool, arrayOf, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as fetchingDucks from 'store/modules/fetching'
import * as previewListDucks from 'store/modules/previewList'
import * as errorMessageDucks from 'store/modules/errorMessage'
import { PreviewFeed } from 'components'
import { QueryPreviews } from 'components/data'
import InfiniteScroll from './infinite-scroll'

class PreviewFeedList extends Component {
  static defaultProps = {
    errorMessage: null,
  }
  static propTypes = {
    previewList: arrayOf(shape()).isRequired,
    errorMessage: string,
    fetching: bool.isRequired,
    isAtTheBottom: bool.isRequired,
  }
  render() {
    const {
      previewList, fetching, errorMessage, isAtTheBottom,
    } = this.props

    if (fetching && !previewList.length) {
      return <p>loading ...</p>
    }

    if (errorMessage && !previewList.length) {
      return <p>{errorMessage}</p>
    }

    return (
      <div>
        {!previewList.length && <QueryPreviews />}
        <ul>{previewList.map(preview => <PreviewFeed key={preview._id} preview={preview} />)}</ul>
        {fetching && <p>loading ...</p>}
        <InfiniteScroll isAtTheBottom={isAtTheBottom} haveMoreToLoad={previewList.length >= 10} />
      </div>
    )
  }
}

export default withRouter(
  connect(
    (state, { match: { params } }) => ({
      fetching: fetchingDucks.getFetching(state, 'previewList'),
      previewList: previewListDucks.getPreviewList(state, params.category),
      errorMessage: errorMessageDucks.getErrorMessage(state),
    }),
    null,
  )(PreviewFeedList),
)
