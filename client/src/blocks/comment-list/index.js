import React, { Component } from 'react'
import { arrayOf, shape, func, bool, string } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as fetchingReducer from 'store/fetching/reducer'
import * as actions from 'store/comment/actions'
import * as commentReducer from 'store/comment/reducer'
import * as userReducer from 'store/user/reducer'
import { InfiniteScroll } from 'components'
import Header from './header'
import List from './list'

class CommentList extends Component {
  static propTypes = {
    comments: arrayOf(shape({})).isRequired,
    fetchComments: func.isRequired,
    fetchingAddComment: bool.isRequired,
    myUserId: string.isRequired,
    fetchingComment: bool.isRequired,
  }
  componentDidMount() {
    this.props.fetchComments()
  }
  render() {
    const {
      fetchComments, fetchingAddComment, comments, myUserId, fetchingComment,
    } = this.props
    return (
      <div>
        <Header commentCount={comments.length} />
        {fetchingAddComment && '로딩 중입니다 ...'}
        <List comments={comments} fetchingComment={fetchingComment} myUserId={myUserId} />
        <InfiniteScroll prefix="comment" fetchAction={fetchComments} />
      </div>
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
    }),
    actions,
  )(CommentList),
)
