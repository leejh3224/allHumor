import React from 'react'
import { shape, func, bool } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'
import formatDate from 'utils/formatDate'
import Reply from './Reply'
import WithState from './WithState'

const CommentItem = ({
  comment,
  getRepliesOfComment,
  showReplies,
  showingReplies,
  fetchingReplies,
}) => {
  const {
    _id, avatar, author, content, replies = [], createdAt,
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
      <div>
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
        <p
          css={{
            ...fonts.body,
            marginTop: spacing.xsmall,
            marginBottom: spacing.xsmall,
          }}
        >
          {content}
        </p>
        {/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: spacing.medium,
          }}
        >
          <button
            css={{
              ...fonts.xsmall,
              cursor: 'pointer',
              color: colors.grey,
              marginRight: spacing.small,
            }}
          >
            답글 달기
          </button>
          {replies.length ? (
            <p
              css={{
                ...fonts.xsmall,
                fontWeight: 700,
                cursor: 'pointer',
              }}
              onClick={showReplies}
            >
              {showingReplies
                ? '답글 숨기기'
                : `답글 ${
                    replies.length > 1 ? `${replies.length}개` : ''
                  } 보기`}
              <i
                css={{
                  marginLeft: spacing.xsmall,
                }}
                className={`ion-chevron-${showingReplies ? 'up' : 'down'}`}
              />
            </p>
          ) : null}
        </div>
        {fetchingReplies ? (
          '불러오는 중...'
        ) : (
          <ul>
            {repliesList.map(reply => (
              <li>
                <Reply reply={reply} />
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
  showReplies: func.isRequired,
  showingReplies: bool.isRequired,
  fetchingReplies: bool.isRequired,
}

export default WithState(CommentItem)
