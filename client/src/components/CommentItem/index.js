import React from 'react'
import { shape } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'

const CommentItem = ({ comment }) => {
  const {
    avatar, author, content, replies,
  } = comment
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
            2시간 전
          </span>
        </p>
        <p
          css={{
            ...fonts.body,
            marginTop: spacing.xsmall,
            marginBottom: spacing.small,
          }}
        >
          {content}
        </p>
        {replies.length ? (
          <p
            css={{
              ...fonts.xsmall,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            답글 보기{' '}
            <i
              css={{
                marginLeft: spacing.small,
              }}
              className="ion-chevron-down"
            />
          </p>
        ) : null}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  comment: shape().isRequired,
}

export default CommentItem
