import { Component } from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'

import * as articleDucks from 'store/modules/article'

class QueryArticle extends Component {
  static propTypes = {
    loadArticle: func.isRequired,
    articleId: string.isRequired,
  }
  componentDidMount() {
    const { loadArticle, articleId } = this.props
    loadArticle(articleId)
  }
  render() {
    return null
  }
}

export default connect(null, articleDucks)(QueryArticle)
