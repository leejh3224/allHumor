import React from 'react'
import { func } from 'prop-types'
import { Link } from 'react-router-dom'

import { colors, fonts } from 'styles/theme'

const baseLinkStyle = {
  color: colors.white,
  textDecoration: 'none',
  ...fonts.header,
}

const Logo = ({ onClick }) => (
  <Link
    to="/"
    onClick={onClick}
    css={{
        fontStyle: 'italic',
        ...baseLinkStyle,
      }}
  >
      ALL유머
  </Link>
)

Logo.propTypes = {
  onClick: func.isRequired,
}

export default Logo
