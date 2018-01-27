import React from 'react'
import { shape, func } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'
import formatDate from 'utils/formatDate'
import { AddComment } from 'components'
import Reply from './Reply'

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
}) => {
  const {
    _id,
    avatar,
    author,
    content,
    replies = [],
    createdAt,
    isAddingReply,
    isShowingReply,
    isTruncated,
    isFetchingReply,
  } = comment
  const repliesList = Object.values(getRepliesOfComment(_id))
  return (
    <div
      css={{
        display: 'flex',
      }}
    >
      <figure
        css={{
          width: 50,
          height: 50,
          marginRight: spacing.medium,
        }}
      >
        <img
          css={{
            width: 50,
            height: '100%',
            borderRadius: '100%',
          }}
          src={avatar}
          alt="아바타"
        />
      </figure>
      <div
        css={{
          flex: 1,
        }}
      >
        <p
          css={{
            ...fonts.xsmall,
            fontWeight: 700,
          }}
        >
          {author}
          <span
            css={{
              marginLeft: spacing.small,
              color: colors.grey,
              fontWeight: 400,
            }}
          >
            {formatDate(createdAt)}
          </span>
        </p>
        <div
          css={{
            ...fonts.body,
            marginTop: spacing.xsmall,
            marginBottom: spacing.small,
          }}
        >
          {isTruncated ? (
            <div>
              <p>{content.slice(0, 399)}</p>
              <button
                css={{ ...fonts.xsmall, fontWeight: 500, cursor: 'pointer' }}
                onClick={() => toggleExpandComment(_id)}
              >
                펼치기
              </button>
            </div>
          ) : (
            <div>
              <p css={{ marginBottom: spacing.xsmall }}>{content}</p>
              {content.length >= 400 && (
                <button
                  css={{
                    display: 'block',
                    ...fonts.xsmall,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleExpandComment(_id)}
                >
                  접기
                </button>
              )}
            </div>
          )}
        </div>
        {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: spacing.small,
          }}
        >
          <button
            css={{
              ...fonts.xsmall,
              cursor: 'pointer',
              color: colors.grey,
              padding: `0 ${spacing.xsmall}px`,
            }}
            onClick={() => showAddComment(_id)}
          >
            답글
          </button>
        </div>
        {replies.length ? (
          <p
            css={{
              ...fonts.xsmall,
              cursor: 'pointer',
              fontWeight: 500,
              marginBottom: spacing.small,
            }}
            onClick={() => {
              if (!isShowingReply) {
                loadReplies(_id)
              }
              toggleReplies(_id)
            }}
          >
            {isShowingReply
              ? '답글 숨기기'
              : `답글 ${replies.length > 1 ? `${replies.length}개` : ''} 보기`}
            <i
              css={{
                marginLeft: spacing.small,
              }}
              className={`ion-chevron-${isShowingReply ? 'up' : 'down'}`}
            />
          </p>
        ) : null}
        {isAddingReply && (
          <AddComment
            addComment={addComment}
            onCancel={() => hideAddComment(_id)}
            parentId={_id}
            addReply={addReply}
          />
        )}
        {isFetchingReply
          ? isShowingReply && '불러오는 중...'
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
                  parentId={_id}
                  showAddComment={showAddComment}
                />
              </li>
                ))}
          </ul>
            )}
      </div>
    </div>
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
}

export default CommentItem
