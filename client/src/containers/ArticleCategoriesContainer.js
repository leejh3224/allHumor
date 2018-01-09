import React, { Component } from 'react'
import { shape, array, func, string } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as paginationDucks from 'store/modules/pagination'
import { ArticleCategories } from 'components'

const { getCategory } = paginationDucks.selectors

class ArticleCategoriesContainer extends Component {
  static propTypes = {
    setCategory: func.isRequired,
    match: shape({ params: array }.isRequired).isRequired,
    category: string.isRequired,
  }
  componentWillMount() {
    const { setCategory, match: { params } } = this.props
    const category = params[0] || 'all'

    setCategory(category)
  }
  componentWillReceiveProps(nextProps) {
    const { setCategory, match: { params } } = nextProps
    const oldCategory = this.props.match.params[0] || 'all'
    const newCategory = params[0] || 'all'

    console.log(oldCategory, newCategory)
    if (newCategory !== oldCategory) {
      setCategory(newCategory)
    }
  }
  render() {
    const { category, match: { params } } = this.props
    const selected = params[0] || category
    return <ArticleCategories selected={selected} />
  }
}

export default compose(
  withRouter,
  connect(state => ({ category: getCategory(state) }), {
    setCategory: paginationDucks.actions.setCategory,
  }),
)(ArticleCategoriesContainer)
