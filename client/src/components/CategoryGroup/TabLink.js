import React from 'react'
import { node, bool, number, string, func } from 'prop-types'
import { Link } from 'react-router-dom'
import { colors, spacing, fonts } from 'styles/theme'
import { css } from 'emotion'

const activeStyle = {
  opacity: 1,
}

const TabLink = ({
  children, active, flex, to, onClick,
}) => (
  <Link
    to={to}
    onClick={onClick}
    css={{
      textDecoration: 'none',
      textAlign: 'center',
      padding: spacing.small,
      flex,
    }}
  >
    <span
      css={css(
        {
          ...fonts.small,
          color: colors.white,
          opacity: 0.7,
          ':hover': activeStyle,
        },
        active && activeStyle,
      )}
    >
      {children}
    </span>
  </Link>
)

TabLink.propTypes = {
  active: bool.isRequired,
  children: node.isRequired,
  flex: number.isRequired,
  to: string.isRequired,
  onClick: func.isRequired,
}

export default TabLink
