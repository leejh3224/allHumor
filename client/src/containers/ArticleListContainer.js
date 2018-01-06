import React, { Component } from 'react'
import { func, bool, objectOf, object } from 'prop-types'
import { connect } from 'react-redux'
import { ArticleList } from 'components'
import { actions, selectors } from 'store/modules/article'
import orderBy from 'lodash/orderBy'

const { getArticles, getFetching } = selectors

class ArticleListContainer extends Component {
  static propTypes = {
    loadArticles: func.isRequired,
    fetching: bool.isRequired,
    articles: objectOf(object).isRequired,
  }
  componentWillMount() {
    this.props.loadArticles()
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
export default connect(
  state => ({
    articles: getArticles(state),
    fetching: getFetching(state),
  }),
  actions,
)(ArticleListContainer)
