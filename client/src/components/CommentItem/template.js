import React from 'react'
import { element, func, node } from 'prop-types'

const CommentItemTemplate = ({
  thumbnail,
  renderBody,
  renderForm,
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
      {renderForm}
      {loadingAddReply}
      {renderRepliesList}
    </div>
  </div>
)

CommentItemTemplate.defaultProps = {
  loadingAddReply: null,
}

CommentItemTemplate.propTypes = {
  thumbnail: element.isRequired,
  renderBody: func.isRequired,
  renderForm: element.isRequired,
  loadingAddReply: node,
  renderRepliesList: func.isRequired,
  renderActionButton: func.isRequired,
}

export default CommentItemTemplate
