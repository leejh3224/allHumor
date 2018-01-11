import React, { Component } from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'
import { ArticleContent } from 'components'
import isEmpty from 'lodash/isEmpty'
import * as entityDucks from 'store/modules/entity'
import * as paginationDucks from 'store/modules/pagination'

class ArticleContentContainer extends Component {
  static propTypes = {
    loadArticle: func.isRequired,
    id: string.isRequired,
    article: string.isRequired,
  }
  componentWillMount() {
    const { id, loadArticle } = this.props

    loadArticle(id)
  }
  render() {
    const { article, id } = this.props
    if (!isEmpty(article)) {
      return <ArticleContent article={article[id]} />
    }
    return 'loading...'
  }
}

/* eslint-disable */
export default connect(
  state => ({
    article: entityDucks.selectors.getArticles(state),
  }),
  {
    loadArticle: paginationDucks.actions.loadArticle,
  },
)(ArticleContentContainer)
