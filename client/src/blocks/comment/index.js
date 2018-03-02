import React, { Component } from 'react'
import { func, shape, string, arrayOf, bool } from 'prop-types'
import { connect } from 'react-redux'

import * as commentReducer from 'store/comment/reducer'
import * as actions from 'store/comment/actions'
import { colors } from 'styles/theme'
import { EllipsisButton } from 'blocks'
import { SimpleLoading } from 'components/loading'
import CommentTemplate from './template'
import Thumbnail from './thumbnail'
import Body from './body'

class Comment extends Component {
  static propTypes = {
    comment: shape().isRequired,
    myUserId: string.isRequired,
    removeComment: func.isRequired,
    startEdit: func.isRequired,
    isEditing: bool.isRequired,
    fetchingRemove: bool.isRequired,
    isExpanded: bool.isRequired,
    fetchingReply: bool.isRequired,
    fetchingAddReply: bool.isRequired,
    replies: arrayOf(shape()).isRequired,
  }
  render() {
    const {
      comment,
      myUserId,
      startEdit,
      removeComment,
      isEditing,
      fetchingRemove,
      isExpanded,
      fetchingReply,
      fetchingAddReply,
      replies,
    } = this.props

    const { _id, avatar, userId } = this.props.comment

    const renderRepliesList = () => {
      if (isExpanded) {
        return fetchingReply ? (
          <SimpleLoading />
        ) : (
          <ul>
            {replies.map(reply => (
              <Comment
                key={reply._id}
                comment={reply}
                myUserId={myUserId}
                startEdit={startEdit}
                removeComment={removeComment}
              />
            ))}
          </ul>
        )
      }
      return null
    }

    const renderEllipsisButton = () => {
      const isAuthor = userId === myUserId
      const inAction = isEditing || fetchingRemove
      return isAuthor && !inAction ? (
        <EllipsisButton
          iconColor={colors.black}
          actions={[
            {
              name: '수정',
              onClick: () => {
                startEdit(_id)
              },
            },
            {
              name: '삭제',
              onClick: () => {
                removeComment(_id)
              },
            },
          ]}
        />
      ) : null
    }

    return (
      <CommentTemplate
        thumbnail={<Thumbnail avatar={avatar} />}
        body={<Body comment={comment} fetchingRemove={fetchingRemove} replies={replies} />}
        loadingAddReply={fetchingAddReply && <SimpleLoading />}
        renderRepliesList={renderRepliesList}
        renderEllipsisButton={renderEllipsisButton}
      />
    )
  }
}

export default connect(
  (state, { comment: { _id } }) => ({
    isEditing: commentReducer.getIsEditing(state, _id),
    fetchingRemove: commentReducer.getFetchingRemove(state, _id),
    isExpanded: commentReducer.getIsExpanded(state, _id),
    fetchingReply: commentReducer.getFetchingReply(state, _id),
    fetchingAddReply: commentReducer.getFetchingAddReply(state, _id),
    replies: commentReducer.getReplies(state, _id),
  }),
  actions,
)(Comment)
