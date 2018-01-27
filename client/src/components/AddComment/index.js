import React from 'react'
import { func, string } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'
import WithState from './WithState'

const baseButtonStyle = {
  ...fonts.small,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.7,
  },
}

const AddComment = ({
  content,
  onCancel,
  handleInputChange,
  handleSubmit,
  parentId,
}) => (
  <div
    css={{
      marginBottom: spacing.medium,
    }}
  >
    <form onSubmit={e => handleSubmit(e, parentId)}>
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
          css={{
            backgroundColor: colors.primary,
            color: colors.white,
            borderRadius: 3,
            padding: `${spacing.small}px ${spacing.medium}px`,
            ...baseButtonStyle,
          }}
        >
          댓글
        </button>
      </div>
    </form>
  </div>
)

AddComment.defaultProps = {
  parentId: '',
  onCancel: () => {},
}

AddComment.propTypes = {
  content: string.isRequired,
  onCancel: func,
  handleInputChange: func.isRequired,
  handleSubmit: func.isRequired,
  parentId: string,
}

export default WithState(AddComment)
