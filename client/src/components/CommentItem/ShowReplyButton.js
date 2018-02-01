import React from 'react'
import { bool, func, number } from 'prop-types'
import { spacing, fonts } from 'styles/theme'

const ShowReplyButton = ({ onClickShowReply, replyCount, isShowingReply }) => (
  <span
    css={{
      ...fonts.xsmall,
      cursor: 'pointer',
      fontWeight: 500,
      marginBottom: spacing.small,
    }}
    onClick={onClickShowReply}
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

ShowReplyButton.propTypes = {
  isShowingReply: bool.isRequired,
  onClickShowReply: func.isRequired,
  replyCount: number.isRequired,
}

export default ShowReplyButton
