import React from 'react'
import { func, string } from 'prop-types'

import { fonts } from 'styles/theme'
import { BaseStyleLink } from 'components'

const Logo = ({ to, onClick, text }) => (
  <BaseStyleLink
    to={to}
    onClick={onClick}
    cssProps={{
      fontFamily: 'Helvetica',
      ...fonts.large,
    }}
  >
    {text}
  </BaseStyleLink>
)

Logo.defaultProps = {
  text: undefined,
}

Logo.propTypes = {
  to: string.isRequired,
  onClick: func.isRequired,
  text: string,
}

export default Logo
