import React, { Component } from 'react'
import { number, func, arrayOf, string } from 'prop-types'
import { connect } from 'react-redux'
import { Pagination } from 'components'
import * as paginationDucks from 'store/modules/pagination'

class PaginationContainer extends Component {
  static propTypes = {
    currentPage: number.isRequired,
    lastPage: number.isRequired,
    rangeMinMax: arrayOf(number).isRequired,
    loadArticles: func.isRequired,
    category: string.isRequired,
    buttonsPerPage: number.isRequired,
    minPage: number.isRequired,
    maxPage: number.isRequired,
  }
  loadFirstPage = () => {
    const { category, currentPage, loadArticles } = this.props

    if (currentPage !== 1) {
      loadArticles(category, 1)
    }
  }
  loadLastPage = () => {
    const {
      currentPage, category, lastPage, loadArticles,
    } = this.props

    if (currentPage !== lastPage) {
      loadArticles(category, lastPage)
    }
  }
  loadNextPage = () => {
    const {
      loadArticles, category, maxPage, lastPage,
    } = this.props

    if (maxPage === lastPage) {
      return this.loadLastPage()
    }
    return loadArticles(category, maxPage + 1)
  }
  loadPrevPage = () => {
    const {
      loadArticles,
      category,
      buttonsPerPage,
      minPage,
      currentPage,
    } = this.props

    if (currentPage === 1) {
      return this.loadFirstPage()
    }

    if (currentPage <= buttonsPerPage) {
      return loadArticles(category, 1)
    }
    return loadArticles(category, minPage - 1)
  }
  render() {
    const {
      buttonsPerPage,
      category,
      minPage,
      maxPage,
      currentPage,
      lastPage,
      rangeMinMax,
      loadArticles,
    } = this.props
    return (
      <Pagination
        buttonsPerPage={buttonsPerPage}
        category={category}
        maxPage={maxPage}
        minPage={minPage}
        currentPage={currentPage}
        lastPage={lastPage}
        rangeMinMax={rangeMinMax}
        loadArticles={loadArticles}
        loadFirstPage={this.loadFirstPage}
        loadLastPage={this.loadLastPage}
        loadNextPage={this.loadNextPage}
        loadPrevPage={this.loadPrevPage}
      />
    )
  }
}

export default connect(
  state => ({
    category: paginationDucks.getCategory(state),
    buttonsPerPage: paginationDucks.getButtonsPerPage(state),
    minPage: paginationDucks.getMinPage(state),
    maxPage: paginationDucks.getMaxPage(state),
    currentPage: paginationDucks.getCurrentPage(state),
    lastPage: paginationDucks.getLastPage(state),
    rangeMinMax: paginationDucks.getRangeMinMax(state),
  }),
  paginationDucks,
)(PaginationContainer)
