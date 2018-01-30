import React from 'react'
import { string } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'
import formatDate from 'utils/formatDate'

const Header = ({ author, createdAt }) => (
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
)

Header.propTypes = {
  author: string.isRequired,
  createdAt: string.isRequired,
}

export default Header
