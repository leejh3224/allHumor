import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import * as paginationDucks from 'store/modules/pagination'
import { Header } from 'layout'

class HeaderContainer extends Component {
  static propTypes = {
    loadArticles: func.isRequired,
  }
  render() {
    const { loadArticles } = this.props
    return <Header loadArticles={loadArticles} {...this.props} />
  }
}

export default connect(null, {
  loadArticles: paginationDucks.actions.loadArticles,
})(HeaderContainer)
