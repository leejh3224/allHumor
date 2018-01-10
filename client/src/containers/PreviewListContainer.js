import React, { Component } from 'react'
import { func, bool, objectOf, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { PreviewList } from 'components'
import * as entityDucks from 'store/modules/entity'
import * as fetchingDucks from 'store/modules/fetching'
import * as paginationDucks from 'store/modules/pagination'
import orderBy from 'lodash/orderBy'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

const { getArticles } = entityDucks.selectors
const { getFetchingArticle } = fetchingDucks.selectors

class PreviewListContainer extends Component {
  static propTypes = {
    loadArticles: func.isRequired,
    fetching: bool.isRequired,
    articles: objectOf(object).isRequired,
    match: shape({ params: { page: string.isRequired }.isRequired }.isRequired).isRequired,
  }
  componentWillMount() {
    const { loadArticles, match: { params } } = this.props
    const category = params[0] || 'all'
    const page = this.props.match.params.page || 1

    loadArticles(category, parseInt(page, 10))
  }
  componentWillReceiveProps(nextProps) {
    const { loadArticles, match: { params } } = nextProps
    const oldCategory = this.props.match.params[0] || 'all'
    const newCategory = params[0] || 'all'
    const oldPage = this.props.match.params.page || 1
    const nextPage = params.page || 1
    const changingCategory = newCategory !== oldCategory
    const changingPage = !changingCategory && oldPage !== nextPage

    if (changingCategory || changingPage) {
      loadArticles(newCategory, parseInt(nextPage, 10))
    }
  }
  render() {
    const { fetching, articles } = this.props

    const sorted = orderBy(articles, 'uploadDate', 'desc')

    if (fetching) {
      return <p>loading ...</p>
    }
    return <PreviewList articles={Object.values(sorted)} />
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
)(PreviewListContainer)
