import React, { Component } from 'react'
import { string, bool, func, arrayOf, shape } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as paginationDucks from 'store/modules/pagination'
import { CategoryGroup } from 'components'

class CategoryGroupContainer extends Component {
  static propTypes = {
    category: string.isRequired,
    isSticky: bool.isRequired,
    loadArticles: func.isRequired,
    categories: arrayOf(shape()).isRequired,
  }
  loadNewCategory = newCategory => {
    const { category, loadArticles } = this.props
    console.log(category, newCategory)
    if (category !== newCategory) {
      loadArticles(newCategory, 1)
    }
  }
  render() {
    const { category, isSticky, categories } = this.props
    const { loadNewCategory } = this
    const activeCategory = category
    return (
      <CategoryGroup
        isSticky={isSticky}
        activeCategory={activeCategory}
        loadNewCategory={loadNewCategory}
        categories={categories}
      />
    )
  }
}

export default compose(
  withRouter,
  connect(
    state => ({
      category: paginationDucks.getCategory(state),
    }),
    {
      loadArticles: paginationDucks.loadArticles,
    },
  ),
)(CategoryGroupContainer)
