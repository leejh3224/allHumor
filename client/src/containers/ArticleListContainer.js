import React, { Component } from 'react'
import { func, bool, objectOf, object, array, shape } from 'prop-types'
import { connect } from 'react-redux'
import { ArticleList } from 'components'
import * as entityDucks from 'store/modules/entity'
import * as fetchingDucks from 'store/modules/fetching'
import * as paginationDucks from 'store/modules/pagination'
import orderBy from 'lodash/orderBy'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

const { getArticles } = entityDucks.selectors
const { getFetchingArticle } = fetchingDucks.selectors

class ArticleListContainer extends Component {
  static propTypes = {
    loadArticles: func.isRequired,
    fetching: bool.isRequired,
    articles: objectOf(object).isRequired,
    match: shape({ params: array }.isRequired).isRequired,
  }
  componentWillMount() {
    const { loadArticles, match: { params } } = this.props
    const category = params[0] || 'all'

    loadArticles(category)
  }
  componentWillReceiveProps(nextProps) {
    const { loadArticles, match: { params } } = nextProps
    const oldCategory = this.props.match.params[0]
    const newCategory = params[0]

    if (newCategory !== oldCategory) {
      loadArticles(params[0])
    }
  }
  render() {
    const { fetching, articles } = this.props

    const sorted = orderBy(articles, 'uploadDate', 'desc')

    if (fetching) {
      return <p>loading ...</p>
    }
    return <ArticleList articles={Object.values(sorted)} />
  }
}

/* eslint-disable max-len */
export default compose(
  withRouter,
  connect(
    state => ({
      articles: getArticles(state),
      fetching: getFetchingArticle(state),
    }),
    {
      loadArticles: paginationDucks.actions.loadArticles,
    },
  ),
)(ArticleListContainer)
