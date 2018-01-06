import React, { Component } from 'react'
import { number, func, arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import { Pagination } from 'components'
import * as paginationDucks from 'store/modules/pagination'

const { getCurrentPage, getLastPage, getRangeMinMax } = paginationDucks.selectors

class PaginationContainer extends Component {
  static propTypes = {
    currentPage: number.isRequired,
    loadPage: func.isRequired,
    lastPage: number.isRequired,
    rangeMinMax: arrayOf(number).isRequired,
    loadNextMinPage: func.isRequired,
    loadPrevMinPage: func.isRequired,
  }
  render() {
    const {
      currentPage,
      loadPage,
      lastPage,
      rangeMinMax,
      loadNextMinPage,
      loadPrevMinPage,
    } = this.props
    return (
      <Pagination
        currentPage={currentPage}
        loadPage={loadPage}
        lastPage={lastPage}
        rangeMinMax={rangeMinMax}
        loadNextMinPage={loadNextMinPage}
        loadPrevMinPage={loadPrevMinPage}
      />
    )
  }
}

export default connect(
  state => ({
    currentPage: getCurrentPage(state),
    lastPage: getLastPage(state),
    rangeMinMax: getRangeMinMax(state),
  }),
  {
    loadPage: paginationDucks.actions.loadPage,
    loadNextMinPage: paginationDucks.actions.loadNextMinPage,
    loadPrevMinPage: paginationDucks.actions.loadPrevMinPage,
  },
)(PaginationContainer)
