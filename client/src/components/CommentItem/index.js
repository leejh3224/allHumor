import React from 'react'
import { func, shape, string, arrayOf } from 'prop-types'
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
import WithMenuState from './WithMenuState'

const CommentItem = ({
  comment,
  repliesList,
  toggleReplies,
  showAddComment,
  hideAddComment,
  addComment,
  addReply,
  toggleExpandComment,
  loadReplies,
  myUserId,
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
    userId,
    replies,
    isAddingReply,
    isFetchingAddReply,
    isTruncated,
  } = comment
  const { isEditing, isFetchingEditingComment, isFetchingRemovingComment } = comment
  const { isShowingReply, isFetchingReply } = comment

  const renderBody = () => {
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
      return <p>수정하는 중입니다 ...</p>
    }

    if (isFetchingRemovingComment) {
      return <p>삭제하는 중입니다 ...</p>
    }

    return (
      <Body
        header={<Header author={author} createdAt={createdAt} />}
        content={
          <Content
            content={isTruncated ? content.slice(0, 399) : content}
            moreButtonText={isTruncated ? '접기' : '펼치기'}
            onClickShowMoreButton={() => toggleExpandComment(_id)}
            marginBottom={isTruncated ? 0 : spacing.xsmall}
            isLongContent={content.length >= 400}
          />
        }
        addReplyButton={<AddReplyButton showAddComment={() => showAddComment(_id)} />}
        showReplyButton={
          replies &&
          replies.length > 0 && (
            <ShowReplyButton
              isShowingReply={isShowingReply}
              onClickShowReply={() => {
                if (!isShowingReply) {
                  loadReplies(_id)
                }
                return toggleReplies(_id)
              }}
              // repliesList는 loadReply 함수 호출 후 숫자가 제대로 표시됨
              // 그러므로 처음에는 replies.length를 보여줌
              replyCount={repliesList.length || replies.length}
            />
          )
        }
      />
    )
  }

  const renderRepliesList = () => {
    if (isShowingReply) {
      return isFetchingReply ? (
        <p>불러오는 중 ...</p>
      ) : (
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
    return null
  }

  const renderActionButton = () => {
    const isAuthor = userId === myUserId
    const inAction = isEditing || isFetchingRemovingComment

    if (isAuthor && !inAction) {
      return (
        <WithMenuState>
          {({ isMenuVisible, handleOpenMenu, handleCloseMenu }) => (
            <ActionButton
              isMenuVisible={isMenuVisible}
              onClickActionButton={isMenuVisible ? handleCloseMenu : handleOpenMenu}
              actions={[
                {
                  name: '수정',
                  onClick: () => {
                    startEditComment(_id)
                    handleCloseMenu()
                  },
                },
                {
                  name: '삭제',
                  onClick: () => {
                    removeComment(_id)
                    handleCloseMenu()
                  },
                },
              ]}
            />
          )}
        </WithMenuState>
      )
    }
    return null
  }

  return (
    <CommentItemTemplate
      thumbnail={<Thumbnail avatar={avatar} />}
      renderBody={renderBody()}
      renderForm={
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
      renderRepliesList={renderRepliesList()}
      renderActionButton={renderActionButton()}
    />
  )
}

CommentItem.propTypes = {
  comment: shape().isRequired,
  repliesList: arrayOf(shape()).isRequired,
  toggleReplies: func.isRequired,
  showAddComment: func.isRequired,
  hideAddComment: func.isRequired,
  addComment: func.isRequired,
  addReply: func.isRequired,
  toggleExpandComment: func.isRequired,
  loadReplies: func.isRequired,
  myUserId: string.isRequired,
  startEditComment: func.isRequired,
  finishEditComment: func.isRequired,
  editComment: func.isRequired,
  removeComment: func.isRequired,
}

export default CommentItem
