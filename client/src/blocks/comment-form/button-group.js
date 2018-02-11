import React from 'react'
import { func } from 'prop-types'

import { fonts, spacing, colors } from 'styles/theme'

const baseButtonStyle = {
  ...fonts.small,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.7,
  },
}

const ButtonGroup = ({ onCancel }) => (
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
        borderRadius: 6,
        padding: `${spacing.small}px ${spacing.large}px`,
        boxShadow: `0 2px 6px ${colors.grey}`,
        ...baseButtonStyle,
      }}
    >
      저장
    </button>
  </div>
)

ButtonGroup.propTypes = {
  onCancel: func.isRequired,
}

export default ButtonGroup
