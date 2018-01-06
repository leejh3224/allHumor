import React, { Component } from 'react'
import { number, func } from 'prop-types'
import { connect } from 'react-redux'
import { Pagination } from 'components'
import * as paginationDucks from 'store/modules/pagination'

const {
  getCurrentPage, getMinPage, getMaxPage, getLastPage,
} = paginationDucks.selectors

class PaginationContainer extends Component {
  static propTypes = {
    currentPage: number.isRequired,
    loadPage: func.isRequired,
    minPage: number.isRequired,
    maxPage: number.isRequired,
    lastPage: number.isRequired,
    loadNextMinPage: func.isRequired,
    loadPrevMinPage: func.isRequired,
  }
  render() {
    const {
      currentPage,
      loadPage,
      minPage,
      maxPage,
      lastPage,
      loadNextMinPage,
      loadPrevMinPage,
    } = this.props
    return (
      <Pagination
        currentPage={currentPage}
        loadPage={loadPage}
        minPage={minPage}
        maxPage={maxPage}
        lastPage={lastPage}
        loadNextMinPage={loadNextMinPage}
        loadPrevMinPage={loadPrevMinPage}
      />
    )
  }
}

export default connect(
  state => ({
    currentPage: getCurrentPage(state),
    minPage: getMinPage(state),
    maxPage: getMaxPage(state),
    lastPage: getLastPage(state),
  }),
  {
    loadPage: paginationDucks.actions.loadPage,
    loadNextMinPage: paginationDucks.actions.loadNextMinPage,
    loadPrevMinPage: paginationDucks.actions.loadPrevMinPage,
  },
)(PaginationContainer)
