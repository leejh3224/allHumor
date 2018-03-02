import { Component } from 'react'
import { number, func, bool } from 'prop-types'
import throttle from 'lodash/throttle'
import { connect } from 'react-redux'

import * as paginationReducer from 'store/pagination/reducer'
import * as fetchingReducer from 'store/fetching/reducer'

class InfiniteScroll extends Component {
  static propTypes = {
    currentPage: number.isRequired,
    fetching: bool.isRequired,
    loadMore: func.isRequired,
    lastPage: number.isRequired,
  }
  componentWillMount() {
    window.addEventListener(
      'scroll',
      throttle(this.handleScroll, 250, { trailing: true, leading: true }),
    )
  }
  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      throttle(this.handleScroll, 250, { trailing: true, leading: true }),
    )
  }
  queryItems() {
    const {
      currentPage, loadMore, fetching, lastPage,
    } = this.props

    if (!fetching && currentPage < lastPage) {
      loadMore()
    }
  }
  handleScroll = () => {
    const { body, documentElement: { offsetHeight, clientHeight, scrollHeight } } = document
    const windowHeight = 'innerHeight' in window ? window.innerHeight : offsetHeight
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      clientHeight,
      scrollHeight,
      offsetHeight,
    )
    const windowBottom = windowHeight + window.pageYOffset

    if (windowBottom >= docHeight) {
      this.queryItems()
    }
  }
  render() {
    return null
  }
}

export default connect(
  (state, { prefix }) => ({
    currentPage: paginationReducer.getCurrent(state, prefix),
    lastPage: paginationReducer.getPageCount(state, prefix),
    fetching: fetchingReducer.getFetching(state, prefix),
  }),
  null,
)(InfiniteScroll)
