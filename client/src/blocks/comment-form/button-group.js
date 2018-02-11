import React from 'react'
import { func, string } from 'prop-types'

import { fonts, spacing, colors } from 'styles/theme'

const baseButtonStyle = {
  ...fonts.small,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.7,
  },
}

const ButtonGroup = ({ onCancel, submitButtonText }) => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'flex-end',
    }}
  >
    <button
      css={{
        padding: spacing.small,
        marginRight: spacing.small,
        ...baseButtonStyle,
      }}
      onClick={onCancel}
    >
      취소
    </button>
    <button
      type="submit"
      css={{
        backgroundColor: colors.primary,
        color: colors.white,
        borderRadius: 3,
        padding: `${spacing.small}px ${spacing.medium}px`,
        ...baseButtonStyle,
      }}
    >
      {submitButtonText}
    </button>
  </div>
)

ButtonGroup.propTypes = {
  onCancel: func.isRequired,
  submitButtonText: string.isRequired,
}

export default ButtonGroup
