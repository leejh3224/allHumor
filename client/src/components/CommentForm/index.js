import React from 'react'
import { func, string } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'

import WithForm from './WithForm'

const baseButtonStyle = {
  ...fonts.small,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.7,
  },
}

const CommentForm = ({
  onCancel, from, to, ...props
}) => (
  <WithForm
    {...props}
    render={({
 content, handleInputChange, handleSubmit, submitButtonText,
}) => (
  <div
    css={{
          marginBottom: spacing.medium,
          width: '100%',
        }}
  >
    <form onSubmit={e => handleSubmit(e, from, to)}>
      <textarea
        type="text"
        placeholder="댓글"
        css={{
              width: '100%',
              height: 80,
              ...fonts.small,
              padding: spacing.small,
            }}
        onChange={handleInputChange}
        value={content}
      />
      <div
        css={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
      >
        <button
          css={{
                padding: spacing.small,
                marginRight: spacing.small,
                ...baseButtonStyle,
              }}
          onClick={onCancel}
        >
              취소
        </button>
        <button
          type="submit"
          css={{
                backgroundColor: colors.primary,
                color: colors.white,
                borderRadius: 3,
                padding: `${spacing.small}px ${spacing.medium}px`,
                ...baseButtonStyle,
              }}
        >
          {submitButtonText}
        </button>
      </div>
    </form>
  </div>
    )}
  />
)

CommentForm.defaultProps = {
  onCancel: () => {},
  from: null,
  to: null,
}

CommentForm.propTypes = {
  onCancel: func,
  from: string,
  to: string,
}

export default CommentForm
