import React from 'react'
import { node, bool } from 'prop-types'
import { Link } from 'react-router-dom'
import { colors, spacing, fonts } from 'styles/theme'
import { css } from 'emotion'

const activeStyle = {
  borderBottom: `5px solid ${colors.lightGrey}`,
  opacity: 1,
}

const HeaderLink = ({ children, active, ...props }) => (
  <Link
    {...props}
    css={css(
      {
        ...fonts.header,
        borderBottom: `5px solid ${colors.primary}`,
        color: colors.white,
        opacity: 0.7,
        textDecoration: 'none',
        textAlign: 'center',
        padding: spacing.medium,
        width: '33%',
        maxWidth: 250,
        ':hover': activeStyle,
      },
      active && activeStyle,
    )}
  >
    {children}
  </Link>
)

HeaderLink.propTypes = {
  active: bool.isRequired,
  children: node.isRequired,
}

export default HeaderLink
