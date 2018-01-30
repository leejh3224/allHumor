import React from 'react'
import { func, bool, shape, string } from 'prop-types'
import { spacing } from 'styles/theme'
import { CommentForm } from 'components'

import CommentItemTemplate from './template'
import Thumbnail from './Thumbnail'
import Body from './Body'
import Header from './Header'
import Content from './Content'
import AddReplyButton from './AddReplyButton'
import ShowReplyButton from './ShowReplyButton'
import Reply from './Reply'
import ActionButton from './ActionButton'
import WithState from './WithState'

const CommentItem = ({
  comment,
  getRepliesOfComment,
  toggleReplies,
  showAddComment,
  hideAddComment,
  addComment,
  addReply,
  toggleExpandComment,
  loadReplies,
  myUserId,
  isMenuVisible,
  handleOpenMenu,
  handleCloseMenu,
  startEditComment,
  finishEditComment,
  editComment,
  removeComment,
}) => {
  const {
    _id,
    author,
    avatar,
    content,
    createdAt,
    replies,
    userId,
    isAddingReply,
    isEditing,
    isFetchingReply,
    isFetchingAddReply,
    isFetchingEditingComment,
    isTruncated,
    isShowingReply,
  } = comment
  const repliesList = Object.values(getRepliesOfComment(_id))
  return (
    <CommentItemTemplate
      thumbnail={<Thumbnail avatar={avatar} />}
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
            showReplyButton={
              replies &&
              replies.length > 0 && (
                <ShowReplyButton
                  id={_id}
                  isShowingReply={isShowingReply}
                  loadReplies={loadReplies}
                  toggleReplies={toggleReplies}
                  replyCount={replies.length}
                />
              )
            }
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
            to={_id}
          />
        )
      }
      loadingAddReply={isFetchingAddReply && <p>불러오는 중 ...</p>}
      renderRepliesList={
        isFetchingReply
          ? isShowingReply && <p>불러오는 중...</p>
          : isShowingReply && (
          <ul>
            {repliesList.map(reply => (
              <li
                key={reply._id + 1}
                css={{
                      paddingTop: spacing.small,
                      paddingBottom: spacing.small,
                    }}
              >
                <Reply
                  key={reply._id}
                  reply={reply}
                  toggleExpandComment={toggleExpandComment}
                  hideAddComment={hideAddComment}
                  addComment={addComment}
                  addReply={addReply}
                  showAddComment={showAddComment}
                  myUserId={myUserId}
                  startEditComment={startEditComment}
                  finishEditComment={finishEditComment}
                  editComment={editComment}
                  removeComment={removeComment}
                  parentId={_id}
                />
              </li>
                ))}
          </ul>
            )
      }
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

CommentItem.propTypes = {
  comment: shape().isRequired,
  getRepliesOfComment: func.isRequired,
  toggleReplies: func.isRequired,
  showAddComment: func.isRequired,
  hideAddComment: func.isRequired,
  addComment: func.isRequired,
  addReply: func.isRequired,
  toggleExpandComment: func.isRequired,
  loadReplies: func.isRequired,
  myUserId: string.isRequired,
  isMenuVisible: bool.isRequired,
  handleOpenMenu: func.isRequired,
  handleCloseMenu: func.isRequired,
  startEditComment: func.isRequired,
  finishEditComment: func.isRequired,
  editComment: func.isRequired,
  removeComment: func.isRequired,
}

export default WithState(CommentItem)
