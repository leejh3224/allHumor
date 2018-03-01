import React from 'react'
import { string } from 'prop-types'

import { spacing } from 'styles/theme'

const RecipientTag = ({ recipient }) => (
  <span css={{ marginTop: spacing.xsmall, marginRight: spacing.small }}>
    {recipient && `@${recipient}`}
  </span>
)

RecipientTag.propTypes = {
  recipient: string.isRequired,
}

export default RecipientTag
