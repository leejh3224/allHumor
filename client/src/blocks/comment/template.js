import React from 'react'
import { element, func, node } from 'prop-types'

const CommentTemplate = ({
  thumbnail,
  body,
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
      {loadingAddReply}
      {renderRepliesList && renderRepliesList()}
    </div>
  </div>
)

CommentTemplate.defaultProps = {
  loadingAddReply: null,
}

CommentTemplate.propTypes = {
  thumbnail: element.isRequired,
  body: element.isRequired,
  loadingAddReply: node,
  renderRepliesList: func.isRequired,
  renderEllipsisButton: func.isRequired,
}

export default CommentTemplate
