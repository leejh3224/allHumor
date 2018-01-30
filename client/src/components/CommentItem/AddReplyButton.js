import React from 'react'
import { func, string } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'

const AddReplyButton = ({ id, showAddComment }) => (
  <button
    css={{
      ...fonts.xsmall,
      cursor: 'pointer',
      color: colors.grey,
      padding: `0 ${spacing.xsmall}px`,
    }}
    onClick={() => showAddComment(id)}
  >
    답글
  </button>
)

AddReplyButton.propTypes = {
  id: string.isRequired,
  showAddComment: func.isRequired,
}

export default AddReplyButton
