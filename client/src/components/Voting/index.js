import React from 'react'
// import PropTypes from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'

const Voting = () => (
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
    122
  </div>
)

Voting.propTypes = {}

export default Voting
