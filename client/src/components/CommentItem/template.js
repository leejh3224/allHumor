import React from 'react'
import { element, func, node } from 'prop-types'

const CommentItemTemplate = ({
  thumbnail,
  renderBody,
  form,
  loadingAddReply,
  renderRepliesList,
  renderActionButton,
}) => (
  <div>
    <div
      css={{
        display: 'flex',
        position: 'relative',
      }}
    >
      {thumbnail}
      {renderBody}
      {renderActionButton}
    </div>
    <div
      css={{
        marginLeft: 70,
      }}
    >
      {form}
      {loadingAddReply}
      {renderRepliesList}
    </div>
  </div>
)

CommentItemTemplate.defaultProps = {
  form: null,
  loadingAddReply: null,
}

CommentItemTemplate.propTypes = {
  thumbnail: element.isRequired,
  renderBody: func.isRequired,
  form: element,
  loadingAddReply: node,
  renderRepliesList: func.isRequired,
  renderActionButton: func.isRequired,
}

export default CommentItemTemplate
