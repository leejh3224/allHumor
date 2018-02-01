import React from 'react'
import { string, number, func, bool } from 'prop-types'
import { fonts } from 'styles/theme'

const Content = ({
  content,
  marginBottom,
  moreButtonText,
  onClickShowMoreButton,
  isLongContent,
}) => (
  <div>
    <p
      css={{
        marginBottom,
      }}
    >
      {content}
    </p>
    {isLongContent && (
      <button
        css={{
          display: 'block',
          ...fonts.xsmall,
          fontWeight: 500,
          cursor: 'pointer',
        }}
        onClick={onClickShowMoreButton}
      >
        {moreButtonText}
      </button>
    )}
  </div>
)

Content.propTypes = {
  content: string.isRequired,
  marginBottom: number.isRequired,
  moreButtonText: string.isRequired,
  onClickShowMoreButton: func.isRequired,
  isLongContent: bool.isRequired,
}

export default Content
