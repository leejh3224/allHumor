import React, { Component } from 'react'
import { shape, func, bool } from 'prop-types'
import { connect } from 'react-redux'
import { Comments } from 'components'
import * as commentDucks from 'store/modules/comment'
import * as fetchingDucks from 'store/modules/fetching'

class CommentsContainer extends Component {
  static propTypes = {
    comments: shape({}).isRequired,
    loadReplies: func.isRequired,
    getRepliesOfComment: func.isRequired,
    fetchingReplies: bool.isRequired,
  }
  render() {
    const {
      comments,
      loadReplies,
      getRepliesOfComment,
      fetchingReplies,
    } = this.props
    return (
      <Comments
        comments={Object.values(comments)}
        loadReplies={loadReplies}
        getRepliesOfComment={getRepliesOfComment}
        fetchingReplies={fetchingReplies}
      />
    )
  }
}

export default connect(
  state => ({
    comments: commentDucks.selectors.getComments(state),
    getRepliesOfComment: commentId =>
      commentDucks.selectors.getRepliesOfComment(state, commentId),
    fetchingReplies: fetchingDucks.selectors.getFetchingReply(state),
  }),
  {
    loadReplies: commentDucks.actions.loadReplies,
  },
)(CommentsContainer)
