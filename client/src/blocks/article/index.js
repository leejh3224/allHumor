import React, { Component } from 'react'
import { func, bool, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ReactRouterPropTypes from 'react-router-prop-types'
import isEmpty from 'lodash/isEmpty'

import * as fetchingReducer from 'store/fetching/reducer'
import * as errorMessageReducer from 'store/errorMessage/reducer'
import * as articleReducer from 'store/article/reducer'
import * as articleActions from 'store/article/actions'
import { NoResult } from 'components'
import { Loading } from 'components/loading'
import { RefreshIcon } from 'components/icons'
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
    const {
      fetchArticle, fetching, article, errorMessage, location: { pathname },
    } = this.props
    const id = pathname.replace(/\//, '')

    if (fetching && isEmpty(article)) {
      return <Loading />
    }

    if (errorMessage && isEmpty(article)) {
      return (
        <NoResult
          heading="일시적인 에러 발생!"
          subheading="아래 버튼을 눌러 다시 시도하세요."
          onClick={() => fetchArticle(id)}
          buttonContent={<RefreshIcon />}
        />
      )
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
    articleActions,
  )(Article),
)
