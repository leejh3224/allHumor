import React from 'react'
import { number, func } from 'prop-types'

import { fonts, colors, spacing } from 'styles/theme'
import { ThumbsupIcon } from 'components/icons'

const Button = ({
  counts, handleVoting, votingMouseDown, votingMouseUp,
}) => (
  <button
    onClick={handleVoting}
    onMouseDown={votingMouseDown}
    onMouseUp={votingMouseUp}
    css={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      backgroundColor: colors.primary,
      ...fonts.header,
      fontWeight: 400,
      color: colors.white,
      cursor: 'pointer',
      boxShadow: `0 2px 6px ${colors.grey}`,
      padding: `${spacing.small}px ${spacing.large}px`,
      outline: 0,

      ':active': {
        transform: 'scale(0.95)',
      },
    }}
  >
    <ThumbsupIcon color={colors.white} cssProps={{ marginRight: spacing.small }} />
    {counts}
  </button>
)

Button.propTypes = {
  counts: number.isRequired,
  handleVoting: func.isRequired,
  votingMouseDown: func.isRequired,
  votingMouseUp: func.isRequired,
}

export default Button
