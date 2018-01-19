import React from 'react'
// import PropTypes from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'

const baseButtonStyle = {
  ...fonts.small,
  cursor: 'pointer',
  ':hover': {
    opacity: 0.7,
  },
}

const AddComment = () => (
  <div
    css={{
      marginBottom: spacing.large,
    }}
  >
    <p
      css={{
        paddingBottom: spacing.small,
        ...fonts.small,
      }}
    >
      댓글 12개
    </p>
    <form>
      <textarea
        type="text"
        placeholder="댓글"
        css={{
          width: '100%',
          height: 100,
          ...fonts.small,
          padding: spacing.small,
        }}
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

AddComment.propTypes = {}

export default AddComment
