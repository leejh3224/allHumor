import React from 'react'
import { func } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'

const Button = ({ onClick }) => (
  <button
    css={{
      ...fonts.xsmall,
      cursor: 'pointer',
      color: colors.grey,
      padding: `0 ${spacing.xsmall}px`,
    }}
    onClick={onClick}
  >
    답글
  </button>
)

Button.propTypes = {
  onClick: func.isRequired,
}

export default Button
