import React, { Component } from 'react'
import { bool, arrayOf, shape } from 'prop-types'
import { connect } from 'react-redux'
import * as articleDucks from 'store/modules/article'
import * as fetchingDucks from 'store/modules/fetching'

import { PreviewFeed } from 'components'
import { QueryArticles } from 'components/data'

class PreviewFeedList extends Component {
  static propTypes = {
    articles: arrayOf(shape()).isRequired,
    fetching: bool.isRequired,
  }
  render() {
    const { articles, fetching } = this.props
    return (
      <div>
        <QueryArticles />
        {fetching ? (
          <p>loading ...</p>
        ) : (
          <ul>{articles.map(article => <PreviewFeed key={article._id} article={article} />)}</ul>
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    articles: articleDucks.getArticles(state),
    fetching: fetchingDucks.getFetchingArticle(state),
  }),
  null,
)(PreviewFeedList)
