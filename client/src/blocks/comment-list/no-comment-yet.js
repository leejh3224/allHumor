import React from 'react'

import { fonts, colors, spacing } from 'styles/theme'
import { RocketIcon } from 'components/icons'
import wrapperStyle from './wrapperStyle'

const NoCommentYet = () => (
  <div
    css={{
      ...wrapperStyle,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <RocketIcon cssProps={{ marginTop: spacing.large }} />
    <h1
      css={{
        ...fonts.header,
        color: colors.grey,
      }}
    >
      아직 댓글이 없습니다.
    </h1>
    <h1
      css={{
        ...fonts.header,
        color: colors.grey,
        marginBottom: spacing.large,
      }}
    >
      첫 댓글을 달아주세요!
    </h1>
  </div>
)

NoCommentYet.propTypes = {}

export default NoCommentYet
