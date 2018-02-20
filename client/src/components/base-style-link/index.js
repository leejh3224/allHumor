import React from 'react'
import { shape } from 'prop-types'
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

BaseStyleLink.propTypes = {
  cssProps: shape().isRequired,
  children: shape().isRequired,
}

export default BaseStyleLink
