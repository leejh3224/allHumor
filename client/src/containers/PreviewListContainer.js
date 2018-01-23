import React, { Component } from 'react'
import { func, bool, objectOf, object, number, string } from 'prop-types'
import { connect } from 'react-redux'
import * as articleDucks from 'store/modules/article'
import * as fetchingDucks from 'store/modules/fetching'
import * as paginationDucks from 'store/modules/pagination'
import orderBy from 'lodash/orderBy'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { PreviewItem } from 'components'

const { getCategory, getCurrentPage } = paginationDucks.selectors
const { getArticles } = articleDucks.selectors
const { getFetchingArticle } = fetchingDucks.selectors

class PreviewListContainer extends Component {
  static propTypes = {
    loadArticles: func.isRequired,
    fetching: bool.isRequired,
    articles: objectOf(object).isRequired,
    category: string.isRequired,
    currentPage: number.isRequired,
  }
  componentDidMount() {
    const { loadArticles, category, currentPage } = this.props

    loadArticles(category, currentPage)
  }
  render() {
    const { fetching, articles } = this.props

    const sorted = orderBy(articles, 'uploadDate', 'desc')

    if (fetching) {
      return <p>loading ...</p>
    }
    /* eslint-disable no-underscore-dangle */
    return (
      <ul>
        {sorted.length
          ? sorted.map(article => (
            <PreviewItem key={article._id} article={article} />
            ))
          : '네트워크 연결이 불안정합니다.'}
      </ul>
    )
  }
}

export default compose(
  withRouter,
  connect(
    state => ({
      articles: getArticles(state),
      fetching: getFetchingArticle(state),
      category: getCategory(state),
      currentPage: getCurrentPage(state),
    }),
    {
      loadArticles: paginationDucks.actions.loadArticles,
    },
  ),
)(PreviewListContainer)
