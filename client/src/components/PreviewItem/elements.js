import React from 'react'
import { string } from 'prop-types'
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
    css={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: spacing.small,
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

export const Footer = () => (
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
      12
    </div>
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        color: colors.grey,
        ...fonts.small,
      }}
    >
      <i
        className="ion-heart"
        css={{
          color: colors.grey,
          marginRight: spacing.xsmall,
          ...fonts.icon,
        }}
      />
      12
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

export default Thumbnail
