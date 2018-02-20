import React, { Component } from 'react'
import { func, shape, string, arrayOf } from 'prop-types'

import { colors } from 'styles/theme'
import { EllipsisButton } from 'blocks'
import CommentTemplate from './template'
import Thumbnail from './thumbnail'
import Body from './body'

class Comment extends Component {
  static propTypes = {
    comment: shape().isRequired,
    repliesList: arrayOf(shape()).isRequired,
    myUserId: string.isRequired,
    startEditComment: func.isRequired,
    removeComment: func.isRequired,
  }
  render() {
    const {
      comment, repliesList, myUserId, startEditComment, removeComment,
    } = this.props
    const {
      _id,
      avatar,
      userId,
      isFetchingAddReply,
      isEditing,
      isFetchingRemovingComment,
      isShowingReply,
      isFetchingReply,
    } = this.props.comment

    const renderRepliesList = () => {
      if (isShowingReply) {
        return isFetchingReply ? (
          <p>불러오는 중 ...</p>
        ) : (
          repliesList && (
            <ul>
              {repliesList.map(reply => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  myUserId={myUserId}
                  startEditComment={startEditComment}
                  removeComment={removeComment}
                />
              ))}
            </ul>
          )
        )
      }
      return null
    }

    const renderEllipsisButton = () => {
      const isAuthor = userId === myUserId
      const inAction = isEditing || isFetchingRemovingComment
      return isAuthor && !inAction ? (
        <EllipsisButton
          iconColor={colors.black}
          actions={[
            {
              name: '수정',
              onClick: () => {
                startEditComment(_id)
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
        body={<Body comment={comment} repliesList={repliesList} />}
        loadingAddReply={isFetchingAddReply && <p>불러오는 중 ...</p>}
        renderRepliesList={renderRepliesList}
        renderEllipsisButton={renderEllipsisButton}
      />
    )
  }
}

export default Comment
