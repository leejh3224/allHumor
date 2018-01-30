import React from 'react'
import { number } from 'prop-types'
import { colors, spacing, fonts } from 'styles/theme'

const Footer = ({ voteCount, commentCount }) => (
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

Footer.propTypes = {
  commentCount: number.isRequired,
  voteCount: number.isRequired,
}

export default Footer
