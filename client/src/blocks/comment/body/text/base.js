import React from 'react'
import { string, func, bool } from 'prop-types'

import { fonts, spacing } from 'styles/theme'

const Base = ({ content, onClickShowMore, isTruncated }) => (
  <div>
    <p
      css={{
        marginBottom: isTruncated ? 0 : spacing.xsmall,
      }}
    >
      {isTruncated ? content.slice(0, 399) : content}
    </p>
    {content.length >= 300 && (
      <button
        css={{
          display: 'block',
          ...fonts.xsmall,
          fontWeight: 500,
          cursor: 'pointer',
        }}
        onClick={onClickShowMore}
      >
        {isTruncated ? '접기' : '펼치기'}
      </button>
    )}
  </div>
)

Base.propTypes = {
  content: string.isRequired,
  onClickShowMore: func.isRequired,
  isTruncated: bool.isRequired,
}

export default Base
