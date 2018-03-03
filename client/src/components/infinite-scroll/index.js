import { Component } from 'react'
import { number, func, bool } from 'prop-types'
import throttle from 'lodash/throttle'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'

import * as paginationReducer from 'store/pagination/reducer'
import * as fetchingReducer from 'store/fetching/reducer'

class InfiniteScroll extends Component {
  static propTypes = {
    currentPage: number.isRequired,
    fetching: bool.isRequired,
    loadMore: func.isRequired,
    lastPage: number.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
  }
  componentWillMount() {
    window.addEventListener(
      'scroll',
      throttle(this.handleScroll, 50, { trailing: true, leading: true }),
    )
  }
  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      throttle(this.handleScroll, 50, { trailing: true, leading: true }),
    )
  }
  queryItems() {
    const {
      currentPage,
      loadMore,
      fetching,
      lastPage,
      history: { location: { pathname } },
    } = this.props

    if (fetching) {
      return
    }

    const category = pathname === '/' ? 'humor' : pathname.replace(/\//, '')
    if (!fetching && currentPage < lastPage) {
      loadMore(category)
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

export default withRouter(
  connect(
    (state, { prefix }) => ({
      currentPage: paginationReducer.getCurrent(state, prefix),
      lastPage: paginationReducer.getPageCount(state, prefix),
      fetching: fetchingReducer.getFetching(state, prefix),
    }),
    null,
  )(InfiniteScroll),
)
