import React, { Component } from 'react'
import { number, func, arrayOf, string } from 'prop-types'
import { connect } from 'react-redux'
import { Pagination } from 'components'
import * as paginationDucks from 'store/modules/pagination'

const {
  getCurrentPage,
  getLastPage,
  getRangeMinMax,
  getCategory,
  getMinPage,
  getMaxPage,
} = paginationDucks.selectors

class PaginationContainer extends Component {
  static propTypes = {
    currentPage: number.isRequired,
    loadPage: func.isRequired,
    lastPage: number.isRequired,
    rangeMinMax: arrayOf(number).isRequired,
    loadNextPage: func.isRequired,
    loadPrevPage: func.isRequired,
    category: string.isRequired,
    nextPage: number.isRequired,
    prevPage: number.isRequired,
  }
  render() {
    const {
      currentPage,
      loadPage,
      lastPage,
      rangeMinMax,
      loadNextPage,
      loadPrevPage,
      category,
      nextPage,
      prevPage,
    } = this.props
    return (
      <Pagination
        currentPage={currentPage}
        loadPage={loadPage}
        lastPage={lastPage}
        rangeMinMax={rangeMinMax}
        loadNextPage={loadNextPage}
        loadPrevPage={loadPrevPage}
        category={category}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    )
  }
}

export default connect(
  state => ({
    currentPage: getCurrentPage(state),
    lastPage: getLastPage(state),
    rangeMinMax: getRangeMinMax(state),
    category: getCategory(state),
    nextPage: getMaxPage(state) + 1,
    prevPage: getMinPage(state) - 1,
  }),
  {
    loadPage: paginationDucks.actions.loadPage,
    loadNextPage: paginationDucks.actions.loadNextPage,
    loadPrevPage: paginationDucks.actions.loadPrevPage,
  },
)(PaginationContainer)
