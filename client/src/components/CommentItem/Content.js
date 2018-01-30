import React from 'react'
import { string, bool, func } from 'prop-types'
import { spacing, fonts } from 'styles/theme'

const Content = ({
  id, content, isTruncated, toggleExpandComment,
}) => (
  <div>
    <p
      css={{
        marginBottom: isTruncated ? 0 : spacing.xsmall,
      }}
    >
      {isTruncated ? content.slice(0, 399) : content}
    </p>
    {content.length >= 400 && (
      <button
        css={{
          display: 'block',
          ...fonts.xsmall,
          fontWeight: 500,
          cursor: 'pointer',
        }}
        onClick={() => toggleExpandComment(id)}
      >
        {isTruncated ? '접기' : '펼치기'}
      </button>
    )}
  </div>
)

Content.propTypes = {
  id: string.isRequired,
  content: string.isRequired,
  isTruncated: bool.isRequired,
  toggleExpandComment: func.isRequired,
}

export default Content
