import React, { Component } from 'react'
import { func, bool, arrayOf, shape } from 'prop-types'
import { connect } from 'react-redux'

import * as commentDucks from 'store/modules/comment'
import * as fetchingDucks from 'store/modules/fetching'
import * as uiDucks from 'store/modules/ui'
import * as userDucks from 'store/modules/user'
import Base from './base'
import InfiniteScroll from './infinite-scroll'

class CommentList extends Component {
  static propTypes = {
    getRepliesOfCommentThunk: func.isRequired,
    isAtTheBottom: bool.isRequired,
    comments: arrayOf(shape({})).isRequired,
  }
  render() {
    const { getRepliesOfCommentThunk, isAtTheBottom } = this.props

    return (
      <div>
        <Base {...this.props} getRepliesOfCommentById={getRepliesOfCommentThunk} />
        <InfiniteScroll
          isAtTheBottom={isAtTheBottom}
          haveMoreToLoad={this.props.comments.length >= 20}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    comments: commentDucks.getOrderedComments(state),
    getRepliesOfCommentThunk: commentId => commentDucks.getOrderedReplies(state, commentId),
    fetchingAddComment: fetchingDucks.getFetchingAddComment(state),
    fetchingComment: fetchingDucks.getFetchingComment(state),
    myUserId: userDucks.getUserId(state),
  }),
  { ...commentDucks, ...uiDucks },
)(CommentList)
