import { Component } from 'react'
import { bool, number } from 'prop-types'
import { connect } from 'react-redux'
import throttle from 'lodash/throttle'

// import * as actions from 'store/pagination/actions'

class InfiniteScroll extends Component {
  static propTypes = {
    isAtTheBottom: bool.isRequired,
    currentPage: number.isRequired,
    lastPage: number.isRequired,
    haveMoreToLoad: bool.isRequired,
  }
  shouldComponentUpdate(nextProps) {
    const {
      haveMoreToLoad, currentPage, lastPage, isAtTheBottom,
    } = this.props
    const reachedLastPage = currentPage !== lastPage
    const touchingBottom = nextProps.isAtTheBottom !== isAtTheBottom && !isAtTheBottom

    if (haveMoreToLoad && reachedLastPage && touchingBottom) {
      const throttled = throttle(nextProps.loadComments, 500)
      throttled()
    }
    return true
  }
  render() {
    return null
  }
}

export default connect(
  () => ({
    // currentPage: actions.getCommentsCurrentPage(state),
    // lastPage: actions.getCommentsLastPage(state),
  }),
  null,
)(InfiniteScroll)
