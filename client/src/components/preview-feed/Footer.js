import React from 'react'
import { number, element } from 'prop-types'

import { colors, spacing, fonts } from 'styles/theme'
import { CommentIcon, ThumbsupIcon } from 'components/icons'

const Footer = ({ timestamp, voteCount, commentCount }) => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    {timestamp}
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          color: colors.grey,
          ...fonts.small,
          marginRight: spacing.small,
        }}
      >
        <CommentIcon cssProps={{ marginRight: spacing.xsmall }} />
        {commentCount}
      </div>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          color: colors.grey,
          ...fonts.small,
        }}
      >
        <ThumbsupIcon cssProps={{ marginRight: spacing.xsmall }} />
        {voteCount}
      </div>
    </div>
  </div>
)

Footer.propTypes = {
  timestamp: element.isRequired,
  commentCount: number.isRequired,
  voteCount: number.isRequired,
}

export default Footer
