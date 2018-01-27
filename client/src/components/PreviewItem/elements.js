import React from 'react'
import { string, number } from 'prop-types'
import { colors, spacing, media, fonts } from 'styles/theme'

export const Thumbnail = ({ url }) => (
  <figure>
    <img
      css={{
        width: 120,
        height: 150,
        marginRight: spacing.medium,

        [media.greaterThan('small')]: {
          width: 180,
          height: 220,
        },
      }}
      src={url}
      alt="썸네일"
    />
  </figure>
)

export const Header = ({ title, author, date }) => [
  <div
    key="previewItemTitle"
    css={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: spacing.xsmall,
    }}
  >
    <h1
      css={{
        display: 'inline-block',
        marginTop: 3,
        ...fonts.header,
      }}
    >
      {title}
    </h1>
  </div>,
  <div
    key="previewItemAuthorAndDate"
    css={{
      display: 'flex',
      justifyContent: 'space-between',
      flex: 1,
      ...fonts.small,
    }}
  >
    {author}
    <span>{date}</span>
  </div>,
]

export const Footer = ({ voteCount, commentCount }) => (
  <div
    css={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        color: colors.grey,
        ...fonts.small,
        lineHeight: 1.35,
        marginRight: spacing.medium,
      }}
    >
      <i
        className="ion-chatbubble"
        css={{
          color: colors.grey,
          marginRight: spacing.xsmall,
          ...fonts.icon,
        }}
      />
      {commentCount}
    </div>
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        color: colors.grey,
        lineHeight: 1.35,
        ...fonts.small,
      }}
    >
      <i
        className="ion-thumbsup"
        css={{
          color: colors.grey,
          marginRight: spacing.xsmall,
          ...fonts.icon,
        }}
      />
      {voteCount}
    </div>
  </div>
)

Thumbnail.propTypes = {
  url: string.isRequired,
}

Header.propTypes = {
  title: string.isRequired,
  author: string.isRequired,
  date: string.isRequired,
}

Footer.propTypes = {
  commentCount: number.isRequired,
  voteCount: number.isRequired,
}

export default Thumbnail
