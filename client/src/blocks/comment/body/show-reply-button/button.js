import React from 'react'
import { bool, func, number } from 'prop-types'
import { spacing, fonts } from 'styles/theme'

const Button = ({ onClick, replyCount, isShowingReply }) => (
  <span
    css={{
      ...fonts.xsmall,
      cursor: 'pointer',
      fontWeight: 500,
      marginBottom: spacing.small,
    }}
    onClick={onClick}
    onKeyPress={() => {}}
    aria-label="open"
    role="button"
    tabIndex="0"
  >
    {isShowingReply ? '답글 숨기기' : `답글 ${replyCount > 1 ? `${replyCount}개` : ''} 보기`}
    <i
      css={{
        marginLeft: spacing.small,
      }}
      className={`ion-chevron-${isShowingReply ? 'up' : 'down'}`}
    />
  </span>
)

Button.propTypes = {
  isShowingReply: bool.isRequired,
  onClick: func.isRequired,
  replyCount: number.isRequired,
}

export default Button
