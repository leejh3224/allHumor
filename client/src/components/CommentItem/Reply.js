import React from 'react'
import { shape, func, string } from 'prop-types'
import { spacing } from 'styles/theme'
import { CommentForm } from 'components'

import CommentItemTemplate from './template'
import Thumbnail from './Thumbnail'
import Body from './Body'
import Header from './Header'
import Content from './Content'
import AddReplyButton from './AddReplyButton'
import ActionButton from './ActionButton'
import WithMenuState from './WithMenuState'

const Reply = ({
  reply,
  toggleExpandComment,
  hideAddComment,
  addComment,
  addReply,
  showAddComment,
  myUserId,
  parentId,
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
    isFetchingRemovingComment,
  } = reply

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
      return <p>수정 중입니다 ...</p>
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
      />
    )
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
      thumbnail={<Thumbnail avatar={avatar} small />}
      renderBody={renderBody()}
      renderForm={
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
      renderActionButton={renderActionButton()}
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
  startEditComment: func.isRequired,
  finishEditComment: func.isRequired,
  editComment: func.isRequired,
  removeComment: func.isRequired,
}

export default Reply
