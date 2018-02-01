import React from 'react'
import { number } from 'prop-types'
import { colors, spacing, media, fonts } from 'styles/theme'

const ListDecoration = ({ rank }) => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      marginRight: spacing.small,
      ...fonts.header,
    }}
  >
    <span
      css={{
        color: colors.white,
        backgroundColor: colors.primary,
        padding: spacing.small,

        [media.greaterThan('small')]: {
          padding: spacing.medium,
        },
      }}
    >
      {rank}
    </span>
  </div>
)

ListDecoration.propTypes = {
  rank: number.isRequired,
}

export default ListDecoration
