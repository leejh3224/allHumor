import React from 'react'
import { element, func, node } from 'prop-types'

const CommentTemplate = ({
  thumbnail,
  body,
  renderForm,
  loadingAddReply,
  renderRepliesList,
  renderEllipsisButton,
}) => (
  <div>
    <div
      css={{
        display: 'flex',
        position: 'relative',
      }}
    >
      {thumbnail}
      {body}
      {renderEllipsisButton}
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

CommentTemplate.defaultProps = {
  renderForm: null,
  loadingAddReply: null,
}

CommentTemplate.propTypes = {
  thumbnail: element.isRequired,
  body: element.isRequired,
  renderForm: element,
  loadingAddReply: node,
  renderRepliesList: func.isRequired,
  renderEllipsisButton: func.isRequired,
}

export default CommentTemplate
