import { Component } from 'react'
import { number, string, bool } from 'prop-types'
import throttle from 'lodash/throttle'
import { connect } from 'react-redux'

import * as paginationDucks from 'store/modules/pagination'

class InfiniteScroll extends Component {
  static propTypes = {
    currentPage: number.isRequired,
    lastPage: number.isRequired,
    category: string.isRequired,
    isAtTheBottom: bool.isRequired,
    haveMoreToLoad: bool.isRequired,
  }
  shouldComponentUpdate(nextProps) {
    const {
      haveMoreToLoad, currentPage, lastPage, isAtTheBottom, category,
    } = this.props
    const reachedLastPage = currentPage !== lastPage
    const touchingBottom = nextProps.isAtTheBottom !== isAtTheBottom && !isAtTheBottom

    if (haveMoreToLoad && reachedLastPage && touchingBottom) {
      const throttled = throttle(nextProps.loadArticles, 500)
      throttled(category, currentPage + 1)
    }
    return true
  }
  render() {
    return null
  }
}

export default connect(
  state => ({
    category: paginationDucks.getArticlesCategory(state),
    currentPage: paginationDucks.getArticlesCurrentPage(state),
    lastPage: paginationDucks.getArticlesLastPage(state),
  }),
  paginationDucks,
)(InfiniteScroll)
