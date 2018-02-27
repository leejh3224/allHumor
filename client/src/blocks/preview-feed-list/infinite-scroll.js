import { Component } from 'react'
import { number, func, bool } from 'prop-types'
import throttle from 'lodash/throttle'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'

import * as actions from 'store/previewList/actions'
import * as paginationReducer from 'store/pagination/reducer'

class InfiniteScroll extends Component {
  static propTypes = {
    currentPage: number.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
    fetching: bool.isRequired,
    fetchPreviews: func.isRequired,
    lastPage: number.isRequired,
  }
  componentWillMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 100))
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleScroll, 100))
  }
  queryItems() {
    const {
      currentPage, fetchPreviews, fetching, lastPage,
    } = this.props
    const { category } = this.props.match.params

    if (fetching || currentPage === lastPage) {
      return
    }

    fetchPreviews(category, currentPage + 1)
  }
  handleScroll = async () => {
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
    state => ({
      currentPage: paginationReducer.getCurrent(state, 'previewList'),
      lastPage: paginationReducer.getPageCount(state, 'previewList'),
    }),
    actions,
  )(InfiniteScroll),
)
