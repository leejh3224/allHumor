import React from 'react'
import { element } from 'prop-types'
import { spacing, fonts } from 'styles/theme'

const Body = ({
  header, content, addReplyButton, showReplyButton,
}) => (
  <div
    css={{
      flex: 1,
      marginBottom: spacing.small,
    }}
  >
    {header}
    <div
      css={{
        ...fonts.body,
        marginTop: spacing.xsmall,
        marginBottom: spacing.small,
      }}
    >
      {content}
    </div>
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: spacing.small,
      }}
    >
      {addReplyButton}
    </div>
    {showReplyButton}
  </div>
)

Body.defaultProps = {
  showReplyButton: null,
}

Body.propTypes = {
  header: element.isRequired,
  content: element.isRequired,
  addReplyButton: element.isRequired,
  showReplyButton: element,
}

export default Body
