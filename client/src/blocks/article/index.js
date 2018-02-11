import React, { Component } from 'react'
import { shape, string, bool } from 'prop-types'
import { connect } from 'react-redux'

import { QueryArticle } from 'components/data'
import * as articleDucks from 'store/modules/article'
import * as fetchingDucks from 'store/modules/fetching'
import Base from './base'

class Article extends Component {
  static propTypes = {
    articleId: string.isRequired,
    articles: shape().isRequired,
    fetching: bool.isRequired,
  }
  render() {
    const { articleId, fetching, articles } = this.props
    const [article] = articles.filter(a => a._id === articleId)

    return (
      <div>
        <QueryArticle articleId={articleId} />
        {fetching ? '불러오는 중 ...' : article && <Base article={article} />}
      </div>
    )
  }
}

export default connect(
  state => ({
    articles: articleDucks.getArticles(state),
    fetching: fetchingDucks.getFetchingArticle(state),
  }),
  articleDucks,
)(Article)
