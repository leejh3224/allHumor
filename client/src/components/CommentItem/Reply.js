import React from 'react'
import { shape, func, string, bool } from 'prop-types'
import { CommentForm } from 'components'

import CommentItemTemplate from './template'
import Thumbnail from './Thumbnail'
import Body from './Body'
import Header from './Header'
import Content from './Content'
import AddReplyButton from './AddReplyButton'
import ActionButton from './ActionButton'
import WithState from './WithState'

const Reply = ({
  reply,
  toggleExpandComment,
  hideAddComment,
  addComment,
  addReply,
  showAddComment,
  myUserId,
  parentId,
  isMenuVisible,
  handleOpenMenu,
  handleCloseMenu,
  editComment,
  startEditComment,
  finishEditComment,
  removeComment,
}) => {
  const {
    _id,
    userId,
    avatar,
    author,
    createdAt,
    content,
    isTruncated,
    isAddingReply,
    isEditing,
    isFetchingEditingComment,
    isFetchingAddReply,
  } = reply
  return (
    <CommentItemTemplate
      thumbnail={<Thumbnail avatar={avatar} small />}
      renderBody={(() => {
        if (isEditing) {
          return (
            <CommentForm
              isEditing={isEditing}
              oldContent={content}
              editComment={editComment}
              from={_id}
              onCancel={() => finishEditComment(_id)}
            />
          )
        }

        if (isFetchingEditingComment) {
          return <p>수정 중입니다 ...</p>
        }

        return (
          <Body
            header={<Header author={author} createdAt={createdAt} />}
            content={
              <Content
                id={_id}
                content={content}
                isTruncated={isTruncated}
                toggleExpandComment={toggleExpandComment}
              />
            }
            addReplyButton={<AddReplyButton id={_id} showAddComment={showAddComment} />}
          />
        )
      })()}
      form={
        isAddingReply && (
          <CommentForm
            addComment={addComment}
            addReply={addReply}
            onCancel={() => hideAddComment(_id)}
            from={_id}
            to={parentId}
          />
        )
      }
      loadingAddReply={isFetchingAddReply && <p>불러오는 중 ...</p>}
      renderActionButton={(() => {
        if (userId === myUserId) {
          return (
            !isEditing && (
              <ActionButton
                id={_id}
                handleOpenMenu={handleOpenMenu}
                handleCloseMenu={handleCloseMenu}
                isMenuVisible={isMenuVisible}
                startEditComment={startEditComment}
                removeComment={removeComment}
              />
            )
          )
        }
        return null
      })()}
    />
  )
}

Reply.propTypes = {
  reply: shape({}).isRequired,
  toggleExpandComment: func.isRequired,
  hideAddComment: func.isRequired,
  addComment: func.isRequired,
  addReply: func.isRequired,
  showAddComment: func.isRequired,
  myUserId: string.isRequired,
  parentId: string.isRequired,
  isMenuVisible: bool.isRequired,
  handleOpenMenu: func.isRequired,
  handleCloseMenu: func.isRequired,
  startEditComment: func.isRequired,
  finishEditComment: func.isRequired,
  editComment: func.isRequired,
  removeComment: func.isRequired,
}

export default WithState(Reply)
