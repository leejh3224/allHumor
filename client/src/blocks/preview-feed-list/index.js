import React, { Component } from 'react'
import { bool, arrayOf, shape, string, func } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'

import * as fetchingReducer from 'store/fetching/reducer'
import * as previewListReducer from 'store/previewList/reducer'
import * as actions from 'store/previewList/actions'
import * as errorMessageReducer from 'store/errorMessage/reducer'
import { PreviewFeed, InfiniteScroll, Loading } from 'components'
import NoResult from './no-result'

class PreviewFeedList extends Component {
  static defaultProps = {
    errorMessage: null,
  }
  static propTypes = {
    previewList: arrayOf(shape()).isRequired,
    errorMessage: string,
    fetching: bool.isRequired,
    fetchPreviews: func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  }
  componentDidMount() {
    const { fetchPreviews, location: { pathname } } = this.props
    const category = pathname === '/' ? 'humor' : pathname.replace(/\//, '')
    fetchPreviews(category, 1)
  }
  componentWillReceiveProps(p) {
    console.log(this.props.location.pathname, p.location.pathname)
  }
  render() {
    const {
      previewList,
      fetching,
      errorMessage,
      fetchPreviews,
      location: { pathname },
    } = this.props
    const category = pathname === '/' ? 'humor' : pathname.replace(/\//, '')

    if (fetching && !previewList.length) {
      return <Loading />
    }

    if (errorMessage && !previewList.length) {
      return <p>{errorMessage}</p>
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
            <NoResult />
          )}
        </ul>
        <InfiniteScroll prefix="previewList" fetchAction={fetchPreviews} params={{ category }} />
        <div>{fetching && <p>loading ...</p>}</div>
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
