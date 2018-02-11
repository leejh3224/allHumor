import React from 'react'
import { number, string } from 'prop-types'

import { colors, spacing, fonts } from 'styles/theme'
import { Timestamp } from 'components'
import { CommentIcon, ThumbsupIcon } from 'components/icons'

const Footer = ({ date, voteCount, commentCount }) => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <Timestamp date={date} />
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
  date: string.isRequired,
  commentCount: number.isRequired,
  voteCount: number.isRequired,
}

export default Footer
