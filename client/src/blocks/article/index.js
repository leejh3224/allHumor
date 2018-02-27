import React, { Component } from 'react'
import { func, bool, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'
import isEmpty from 'lodash/isEmpty'

import * as fetchingReducer from 'store/fetching/reducer'
import * as errorMessageReducer from 'store/errorMessage/reducer'
import * as articleReducer from 'store/article/reducer'
import * as actions from 'store/article/actions'
import Base from './base'

class Article extends Component {
  static defaultProps = {
    errorMessage: null,
  }
  static propTypes = {
    article: shape().isRequired,
    fetching: bool.isRequired,
    fetchArticle: func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    errorMessage: string,
  }
  componentDidMount() {
    const { location: { pathname }, fetchArticle } = this.props
    const id = pathname.replace(/\//, '')
    fetchArticle(id)
  }
  render() {
    const { fetching, article, errorMessage } = this.props

    if (fetching && isEmpty(article)) {
      return 'loading ...'
    }

    if (errorMessage && isEmpty(article)) {
      return errorMessage
    }

    return !isEmpty(article) && <Base article={article} />
  }
}

export default withRouter(
  connect(
    state => ({
      article: articleReducer.getArticle(state),
      fetching: fetchingReducer.getFetching(state, 'article'),
      errorMessage: errorMessageReducer.getErrorMessage(state),
    }),
    actions,
  )(Article),
)
