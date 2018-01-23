import React from 'react'
import { number, func, string } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'

const Voting = ({
  counts, userId, votingMouseDown, votingMouseUp,
}) => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.medium,
      ...fonts.large,
      fontWeight: 400,
    }}
  >
    <button
      onMouseDown={() => votingMouseDown(userId)}
      onMouseUp={votingMouseUp}
    >
      <i
        className="ion-thumbsup"
        css={{
          ...fonts.xlarge,
          cursor: 'pointer',
          marginRight: spacing.small,
          ':hover': {
            color: colors.primary,
          },
        }}
      />
    </button>
    {counts}
  </div>
)

Voting.propTypes = {
  counts: number.isRequired,
  votingMouseDown: func.isRequired,
  votingMouseUp: func.isRequired,
  userId: string.isRequired,
}

export default Voting
