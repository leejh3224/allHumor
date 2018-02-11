import React from 'react'
import { string, bool } from 'prop-types'

import { colors, fonts, spacing } from 'styles/theme'
import formatDate from 'utils/formatDate'
import { ClockIcon } from 'components/icons'

const Timestamp = ({ date, textOnly }) => (
  <div
    css={{
      display: 'flex',
      alignItems: 'center',
    }}
  >
    {!textOnly && <ClockIcon cssProps={{ marginRight: spacing.xsmall }} />}
    <span
      css={{
        ...fonts.small,
        color: colors.grey,
        marginTop: 2,
        fontWeight: 100,
      }}
    >
      {formatDate(date)}
    </span>
  </div>
)

Timestamp.propTypes = {
  date: string.isRequired,
  textOnly: bool.isRequired,
}

export default Timestamp
