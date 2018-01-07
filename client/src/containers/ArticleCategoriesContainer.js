import React, { Component } from 'react'
import { shape, array, func } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as paginationDucks from 'store/modules/pagination'
import { ArticleCategories } from 'components'

class ArticleCategoriesContainer extends Component {
  static propTypes = {
    setCategory: func.isRequired,
    match: shape({ params: array }.isRequired).isRequired,
  }
  componentWillReceiveProps(nextProps) {
    const { setCategory, match: { params } } = nextProps
    const oldCategory = this.props.match.params[0]
    const newCategory = params[0]

    if (newCategory !== oldCategory) {
      setCategory(newCategory)
    }
  }
  render() {
    return <ArticleCategories />
  }
}

export default compose(
  withRouter,
  connect(null, { setCategory: paginationDucks.actions.setCategory }),
)(ArticleCategoriesContainer)
