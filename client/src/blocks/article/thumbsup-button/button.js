import React from 'react'
import { number, func } from 'prop-types'

import { colors, spacing } from 'styles/theme'
import { primary } from 'styles/buttonStyle'
import { ThumbsupIcon } from 'components/icons'

const Button = ({
  counts, handleVoting, votingMouseDown, votingMouseUp,
}) => (
  <button
    onClick={handleVoting}
    onMouseDown={votingMouseDown}
    onMouseUp={votingMouseUp}
    css={primary}
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
