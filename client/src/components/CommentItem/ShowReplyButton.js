import React from 'react'
import { string, bool, func, number } from 'prop-types'
import { spacing, fonts } from 'styles/theme'

const ShowReplyButton = ({
  id, isShowingReply, loadReplies, toggleReplies, replyCount,
}) => (
  <span
    css={{
      ...fonts.xsmall,
      cursor: 'pointer',
      fontWeight: 500,
      marginBottom: spacing.small,
    }}
    onClick={() => {
      if (!isShowingReply) {
        loadReplies(id)
      }
      toggleReplies(id)
    }}
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
  id: string.isRequired,
  isShowingReply: bool.isRequired,
  loadReplies: func.isRequired,
  toggleReplies: func.isRequired,
  replyCount: number.isRequired,
}

export default ShowReplyButton
