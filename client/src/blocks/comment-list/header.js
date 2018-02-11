import React from 'react'
import { number } from 'prop-types'

import { CommentIcon } from 'components/icons'
import { colors, spacing, fonts } from 'styles/theme'
import wrapperStyle from './wrapperStyle'

const Header = ({ commentCount }) => (
  <div
    css={{
      display: 'flex',
      alignItems: 'center',
      ...wrapperStyle,
      backgroundColor: colors.skyblue, // override default white background
    }}
  >
    <CommentIcon color={colors.font} cssProps={{ marginRight: spacing.small }} />
    <p
      css={{
        ...fonts.header,
      }}
    >
      댓글 ({commentCount})
    </p>
  </div>
)

Header.propTypes = {
  commentCount: number.isRequired,
}

export default Header
