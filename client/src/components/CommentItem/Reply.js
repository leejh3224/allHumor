import React from 'react'
import { shape } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'
import formatDate from 'utils/formatDate'

const Reply = ({ reply }) => {
  const {
    avatar, author, createdAt, content,
  } = reply
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
        <button
          css={{
            ...fonts.xsmall,
            cursor: 'pointer',
            color: colors.grey,
          }}
        >
          답글 달기
        </button>
      </div>
    </div>
  )
}

Reply.propTypes = {
  reply: shape({}).isRequired,
}

export default Reply
