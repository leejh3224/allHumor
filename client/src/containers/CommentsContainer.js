import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { Comments } from 'components'
import * as commentDucks from 'store/modules/comment'
import * as fetchingDucks from 'store/modules/fetching'
import * as uiDucks from 'store/modules/ui'

class CommentsContainer extends Component {
  static propTypes = {
    getRepliesOfCommentThunk: func.isRequired,
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
  }),
  { ...commentDucks, ...uiDucks },
)(CommentsContainer)
