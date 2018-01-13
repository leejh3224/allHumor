import React from 'react'
import { node, bool } from 'prop-types'
import { Link } from 'react-router-dom'
import { colors, spacing, fonts } from 'styles/theme'
import { css } from 'emotion'

const activeStyle = {
  opacity: 1,
}

const TabLink = ({ children, active, ...props }) => (
  <Link
    {...props}
    css={css(
      {
        ...fonts.header,
        color: colors.white,
        opacity: 0.7,
        textDecoration: 'none',
        textAlign: 'center',
        padding: spacing.small,
        minWidth: 90,
        ':hover': activeStyle,
      },
      active && activeStyle,
    )}
  >
    {children}
  </Link>
)

TabLink.propTypes = {
  active: bool.isRequired,
  children: node.isRequired,
}

export default TabLink
