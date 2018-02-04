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

class PreviewListContainer extends Component {
  static defaultProps = {
    theme: '',
  }
  static propTypes = {
    loadArticles: func.isRequired,
    fetching: bool.isRequired,
    articles: objectOf(object).isRequired,
    category: string.isRequired,
    currentPage: number.isRequired,
    theme: string,
  }
  componentDidMount() {
    const { loadArticles, category, currentPage } = this.props

    loadArticles(category, currentPage)
  }
  render() {
    const { fetching, articles, theme } = this.props

    const sorted = orderBy(articles, theme === 'popularity' ? 'voteCount' : 'uploadDate', 'desc')

    if (fetching) {
      return <p>loading ...</p>
    }

    return (
      <ul>
        {sorted.length
          ? sorted.map((article, index) => (
            <PreviewItem key={article._id} article={article} listStyle={theme} rank={index + 1} />
            ))
          : '아이템이 존재하지 않습니다.'}
      </ul>
    )
  }
}

export default compose(
  withRouter,
  connect(
    state => ({
      articles: articleDucks.getArticles(state),
      fetching: fetchingDucks.getFetchingArticle(state),
      category: paginationDucks.getCategory(state),
      currentPage: paginationDucks.getCurrentPage(state),
    }),
    paginationDucks,
  ),
)(PreviewListContainer)
