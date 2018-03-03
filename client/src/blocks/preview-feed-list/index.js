import React, { Component } from 'react'
import { bool, arrayOf, shape, string, func } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'

import * as fetchingReducer from 'store/fetching/reducer'
import * as previewListReducer from 'store/previewList/reducer'
import * as actions from 'store/previewList/actions'
import * as errorMessageReducer from 'store/errorMessage/reducer'
import { PreviewFeed, InfiniteScroll, NoResult } from 'components'
import { Loading } from 'components/loading'
import { RefreshIcon } from 'components/icons'

class PreviewFeedList extends Component {
  static defaultProps = {
    errorMessage: null,
  }
  static propTypes = {
    previewList: arrayOf(shape()).isRequired,
    errorMessage: string,
    fetching: bool.isRequired,
    fetchPreviews: func.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  }
  componentDidMount() {
    const { fetchPreviews, history: { location: { pathname } } } = this.props
    const category = pathname === '/' ? 'humor' : pathname.replace(/\//, '')
    fetchPreviews(category)
  }
  render() {
    const {
      previewList,
      fetching,
      errorMessage,
      fetchPreviews,
      history: { location: { pathname } },
    } = this.props
    const category = pathname === '/' ? 'humor' : pathname.replace(/\//, '')

    if (fetching && !previewList.length) {
      return <Loading />
    }

    if (errorMessage && !previewList.length) {
      return (
        <NoResult
          heading="일시적인 에러 발생!"
          subheading="아래 버튼을 눌러 다시 시도하세요."
          onClick={() => fetchPreviews(category)}
          buttonContent={<RefreshIcon />}
        />
      )
    }

    return (
      <div>
        <ul
          css={{
            minHeight: '90vh',
          }}
        >
          {previewList.length ? (
            previewList.map(preview => <PreviewFeed key={preview._id} preview={preview} />)
          ) : (
            <NoResult
              heading="일시적인 에러 발생!"
              subheading="아래 버튼을 눌러 다시 시도하세요."
              onClick={() => fetchPreviews(category)}
              buttonContent={<RefreshIcon />}
            />
          )}
        </ul>
        {previewList.length > 0 && <InfiniteScroll prefix="previewList" loadMore={fetchPreviews} />}
        {fetching && <Loading wrapped={false} />}
      </div>
    )
  }
}

export default withRouter(
  connect(
    (state, { location: { pathname } }) => ({
      fetching: fetchingReducer.getFetching(state, 'previewList'),
      previewList: previewListReducer.getPreviewList(
        state,
        pathname === '/' ? 'humor' : pathname.replace(/\//, ''),
      ),
      errorMessage: errorMessageReducer.getErrorMessage(state),
    }),
    actions,
  )(PreviewFeedList),
)
