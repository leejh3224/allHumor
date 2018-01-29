import React, { Component } from 'react'
import { func, bool, number, shape } from 'prop-types'
import { connect } from 'react-redux'
import { Comments } from 'components'
import * as commentDucks from 'store/modules/comment'
import * as fetchingDucks from 'store/modules/fetching'
import * as uiDucks from 'store/modules/ui'
import * as userDucks from 'store/modules/user'
import * as paginationDucks from 'store/modules/pagination'
import throttle from 'lodash/throttle'

class CommentsContainer extends Component {
  static propTypes = {
    getRepliesOfCommentThunk: func.isRequired,
    isAtTheBottom: bool.isRequired,
    currentPage: number.isRequired,
    lastPage: number.isRequired,
    comments: shape({}).isRequired,
  }
  shouldComponentUpdate(nextProps) {
    const {
      comments, currentPage, lastPage, isAtTheBottom,
    } = this.props
    const haveMoreToLoad = comments.length >= 20
    const reachedLastPage = currentPage !== lastPage
    const touchingBottom =
      nextProps.isAtTheBottom !== isAtTheBottom && !isAtTheBottom

    if (haveMoreToLoad && reachedLastPage && touchingBottom) {
      const throttled = throttle(nextProps.loadComments, 500)
      throttled()
    }
    return true
  }
  render() {
    const { getRepliesOfCommentThunk } = this.props

    return (
      <Comments
        {...this.props}
        getRepliesOfComment={getRepliesOfCommentThunk}
      />
    )
  }
}

export default connect(
  state => ({
    comments: commentDucks.getOrderedComments(state),
    getRepliesOfCommentThunk: commentId =>
      commentDucks.getOrderedReplies(state, commentId),
    fetchingAddComment: fetchingDucks.getFetchingAddComment(state),
    fetchingComment: fetchingDucks.getFetchingComment(state),
    myUserId: userDucks.getUserId(state),
    currentPage: paginationDucks.getCommentsCurrentPage(state),
    lastPage: paginationDucks.getCommentsLastPage(state),
  }),
  { ...commentDucks, ...uiDucks, ...paginationDucks },
)(CommentsContainer)
