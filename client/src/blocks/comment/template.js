import React from 'react'
import { element, func, node } from 'prop-types'

const CommentTemplate = ({
  thumbnail,
  body,
  form,
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
      {renderEllipsisButton && renderEllipsisButton()}
    </div>
    <div
      css={{
        marginLeft: 70,
      }}
    >
      {form}
      {loadingAddReply}
      {renderRepliesList && renderRepliesList()}
    </div>
  </div>
)

CommentTemplate.defaultProps = {
  form: null,
  loadingAddReply: null,
}

CommentTemplate.propTypes = {
  thumbnail: element.isRequired,
  body: element.isRequired,
  form: element,
  loadingAddReply: node,
  renderRepliesList: func.isRequired,
  renderEllipsisButton: func.isRequired,
}

export default CommentTemplate
