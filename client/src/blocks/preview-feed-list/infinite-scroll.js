import { Component } from 'react'
import { number, bool } from 'prop-types'
import throttle from 'lodash/throttle'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'

import * as actions from 'store/modules/previewList/actions'
import * as paginationDucks from 'store/modules/pagination'

class InfiniteScroll extends Component {
  static propTypes = {
    currentPage: number.isRequired,
    lastPage: number.isRequired,
    isAtTheBottom: bool.isRequired,
    haveMoreToLoad: bool.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  }
  shouldComponentUpdate(nextProps) {
    const {
      haveMoreToLoad, currentPage, lastPage, isAtTheBottom,
    } = this.props
    const { category } = this.props.match.params
    const reachedLastPage = currentPage !== lastPage
    const touchingBottom = nextProps.isAtTheBottom !== isAtTheBottom && !isAtTheBottom

    if (haveMoreToLoad && reachedLastPage && touchingBottom) {
      const throttled = throttle(nextProps.fetchPreviews, 500)
      throttled(category, currentPage + 1)
    }
    return true
  }
  render() {
    return null
  }
}

export default withRouter(
  connect(
    state => ({
      currentPage: paginationDucks.getArticlesCurrentPage(state),
      lastPage: paginationDucks.getArticlesLastPage(state),
    }),
    actions,
  )(InfiniteScroll),
)
