import { Component } from 'react'
import { number, func, bool, shape } from 'prop-types'
import throttle from 'lodash/throttle'
import { connect } from 'react-redux'

import * as paginationReducer from 'store/pagination/reducer'
import * as fetchingReducer from 'store/fetching/reducer'
import sleep from 'utils/sleep'

class InfiniteScroll extends Component {
  static defaultProps = {
    params: undefined,
  }
  static propTypes = {
    currentPage: number.isRequired,
    params: shape(),
    fetching: bool.isRequired,
    fetchAction: func.isRequired,
    lastPage: number.isRequired,
  }
  componentWillMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 100))
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', throttle(this.handleScroll, 100))
  }
  async queryItems() {
    const {
      currentPage, fetchAction, fetching, lastPage, params,
    } = this.props

    const initialLoadNotEnded = fetching && !currentPage
    if (initialLoadNotEnded) {
      return
    }

    await sleep(200)

    if (currentPage <= lastPage - 1) {
      if (params.category) {
        fetchAction(params.category, currentPage + 1)
      } else {
        fetchAction(currentPage + 1)
      }
    }
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
      // to prevent endless fetching, scroll to top a bit and wait
      window.scrollTo(0, docHeight - 300)

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
