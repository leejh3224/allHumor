import React, { Component } from 'react'
import { arrayOf, shape, func, bool, string } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as errorMessageReducer from 'store/errorMessage/reducer'
import * as fetchingReducer from 'store/fetching/reducer'
import * as actions from 'store/comment/actions'
import * as commentReducer from 'store/comment/reducer'
import * as userReducer from 'store/user/reducer'
import { InfiniteScroll } from 'components'
import { Loading } from 'components/loading'
import Header from './header'
import List from './list'
import NoCommentYet from './no-comment-yet'

class CommentList extends Component {
  static defaultProps = {
    errorMessage: null,
  }
  static propTypes = {
    comments: arrayOf(shape({})).isRequired,
    fetchComments: func.isRequired,
    fetchingAddComment: bool.isRequired,
    myUserId: string.isRequired,
    fetchingComment: bool.isRequired,
    errorMessage: string,
    fetchingArticle: bool.isRequired,
  }
  render() {
    const {
      fetchComments,
      fetchingAddComment,
      comments,
      myUserId,
      fetchingComment,
      errorMessage,
      fetchingArticle,
    } = this.props

    if (fetchingComment && !comments.length) {
      return <Loading wrapped={false} />
    }

    if (errorMessage && !comments.length) {
      return null
    }

    return (
      !fetchingArticle && (
        <div>
          <Header commentCount={comments.length} />
          {!!comments.length && <List comments={comments} myUserId={myUserId} />}
          {(!fetchingComment || !fetchingAddComment) && !comments.length && <NoCommentYet />}
          {(fetchingAddComment || fetchingComment) && <Loading wrapped={false} />}
          {!!comments.length && <InfiniteScroll prefix="comment" loadMore={fetchComments} />}
        </div>
      )
    )
  }
}

export default withRouter(
  connect(
    (state, { location: { pathname } }) => ({
      comments: commentReducer.getComments(state, pathname.replace(/\//, '')),
      myUserId: userReducer.getUserId(state),
      fetchingAddComment: fetchingReducer.getFetching(state, 'addComment'),
      fetchingComment: fetchingReducer.getFetching(state, 'comment'),
      fetchingArticle: fetchingReducer.getFetching(state, 'article'),
      errorMessage: errorMessageReducer.getErrorMessage(state),
    }),
    actions,
  )(CommentList),
)
