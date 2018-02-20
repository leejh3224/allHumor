import React, { Component } from 'react'
import { bool, arrayOf, shape } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as articleDucks from 'store/modules/article'
import * as fetchingDucks from 'store/modules/fetching'
import { PreviewFeed } from 'components'
import { QueryArticles } from 'components/data'
import InfiniteScroll from './infinite-scroll'

class PreviewFeedList extends Component {
  static propTypes = {
    articles: arrayOf(shape()).isRequired,
    fetching: bool.isRequired,
    isAtTheBottom: bool.isRequired,
  }
  render() {
    const { articles, fetching, isAtTheBottom } = this.props
    return (
      <div>
        <QueryArticles />
        {articles.length ? (
          <ul>{articles.map(article => <PreviewFeed key={article._id} article={article} />)}</ul>
        ) : null}
        {fetching && <p>loading ...</p>}
        <InfiniteScroll isAtTheBottom={isAtTheBottom} haveMoreToLoad={articles.length >= 10} />
      </div>
    )
  }
}

export default withRouter(
  connect(
    state => ({
      articles: articleDucks.getArticlesByCategory(state),
      fetching: fetchingDucks.getFetchingArticle(state),
    }),
    null,
  )(PreviewFeedList),
)
