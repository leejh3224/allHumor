import React, { Component } from 'react'
import { func, string, number } from 'prop-types'
import { connect } from 'react-redux'
import * as paginationDucks from 'store/modules/pagination'
import { Header } from 'layout'

class HeaderContainer extends Component {
  static propTypes = {
    category: string.isRequired,
    currentPage: number.isRequired,
    loadArticles: func.isRequired,
  }
  loadNewest = () => {
    const { category, currentPage, loadArticles } = this.props

    if (category !== 'all' && currentPage !== 1) {
      loadArticles('all', 1)
    }
  }
  render() {
    return <Header loadNewest={this.loadNewest} {...this.props} />
  }
}

export default connect(
  state => ({
    category: paginationDucks.getCategory(state),
    currentPage: paginationDucks.getCurrentPage(state),
  }),
  paginationDucks,
)(HeaderContainer)
