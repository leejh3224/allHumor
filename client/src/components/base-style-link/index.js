import React from 'react'
import { shape, oneOfType, string, element } from 'prop-types'
import { Link } from 'react-router-dom'

import { colors, fonts } from 'styles/theme'

const baseLinkStyle = {
  color: colors.white,
  textDecoration: 'none',
  ...fonts.header,
}

const BaseStyleLink = ({ cssProps, children, ...props }) => (
  <Link css={{ ...baseLinkStyle, ...cssProps }} {...props}>
    {children}
  </Link>
)

BaseStyleLink.defaultProps = {
  children: undefined,
  cssProps: undefined,
}

BaseStyleLink.propTypes = {
  cssProps: shape(),
  children: oneOfType([string, element]),
}

export default BaseStyleLink
