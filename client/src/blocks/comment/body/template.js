import React from 'react'
import { element } from 'prop-types'
import { spacing, fonts } from 'styles/theme'

const BodyTemplate = ({
  header, addReplyButton, showReplyButton, text,
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
      {text}
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

BodyTemplate.defaultProps = {
  showReplyButton: null,
}

BodyTemplate.propTypes = {
  header: element.isRequired,
  text: element.isRequired,
  addReplyButton: element.isRequired,
  showReplyButton: element,
}

export default BodyTemplate
