import React from 'react'
import { string } from 'prop-types'

import { spacing } from 'styles/theme'

const RecipientTag = ({ recipient }) => (
  <span css={{ marginTop: spacing.xsmall, marginRight: spacing.small }}>
    {recipient && `@${recipient}`}
  </span>
)

RecipientTag.defaultProps = {
  recipient: undefined,
}

RecipientTag.propTypes = {
  recipient: string,
}

export default RecipientTag
