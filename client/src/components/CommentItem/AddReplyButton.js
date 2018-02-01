import React from 'react'
import { func } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'

const AddReplyButton = ({ showAddComment }) => (
  <button
    css={{
      ...fonts.xsmall,
      cursor: 'pointer',
      color: colors.grey,
      padding: `0 ${spacing.xsmall}px`,
    }}
    onClick={showAddComment}
  >
    답글
  </button>
)

AddReplyButton.propTypes = {
  showAddComment: func.isRequired,
}

export default AddReplyButton
