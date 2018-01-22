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
  getCurrentMinPage,
  getCurrentMaxPage,
} = paginationDucks.selectors

class PaginationContainer extends Component {
  static propTypes = {
    currentPage: number.isRequired,
    lastPage: number.isRequired,
    rangeMinMax: arrayOf(number).isRequired,
    loadArticles: func.isRequired,
    category: string.isRequired,
    nextPage: number.isRequired,
    prevPage: number.isRequired,
  }
  loadNextPage = () => {
    const {
      loadArticles, category, nextPage, lastPage,
    } = this.props

    if (nextPage < lastPage + 1) {
      loadArticles(category, nextPage)
    }
  }
  loadPrevPage = () => {
    const {
      loadArticles, category, prevPage, currentPage,
    } = this.props

    if (prevPage > 0) {
      loadArticles(category, prevPage)
    }

    // 첫 다섯 페이지
    if (prevPage === 0 && currentPage !== 1) {
      loadArticles(category, prevPage + 1)
    }
  }
  render() {
    const {
      category,
      nextPage,
      prevPage,
      currentPage,
      lastPage,
      rangeMinMax,
      loadArticles,
    } = this.props
    const { loadPrevPage, loadNextPage } = this
    return (
      <Pagination
        category={category}
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage}
        lastPage={lastPage}
        rangeMinMax={rangeMinMax}
        // functions
        loadArticles={loadArticles}
        loadNextPage={loadNextPage}
        loadPrevPage={loadPrevPage}
      />
    )
  }
}

export default connect(
  state => ({
    category: getCategory(state),
    nextPage: getCurrentMaxPage(state) + 1,
    prevPage: getCurrentMinPage(state) - 1,
    currentPage: getCurrentPage(state),
    lastPage: getLastPage(state),
    rangeMinMax: getRangeMinMax(state),
  }),
  {
    loadArticles: paginationDucks.actions.loadArticles,
  },
)(PaginationContainer)
