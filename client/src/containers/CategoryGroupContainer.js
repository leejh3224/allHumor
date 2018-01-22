import React, { Component } from 'react'
import { string, bool, func } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import * as paginationDucks from 'store/modules/pagination'
import { CategoryGroup } from 'components'

const { getCategory } = paginationDucks.selectors

class CategoryGroupContainer extends Component {
  static propTypes = {
    category: string.isRequired,
    isSticky: bool.isRequired,
    loadArticles: func.isRequired,
  }
  loadNewCategory = (newCategory) => {
    const { category, loadArticles } = this.props
    if (category !== newCategory) {
      loadArticles(newCategory, 1)
    }
  }
  render() {
    const { category, isSticky } = this.props
    const { loadNewCategory } = this
    const activeCategory = category
    return (
      <CategoryGroup
        isSticky={isSticky}
        activeCategory={activeCategory}
        loadNewCategory={loadNewCategory}
      />
    )
  }
}

export default compose(
  withRouter,
  connect(
    state => ({
      category: getCategory(state),
    }),
    {
      loadArticles: paginationDucks.actions.loadArticles,
    },
  ),
)(CategoryGroupContainer)
