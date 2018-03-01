import React from 'react'
import { arrayOf, shape, func, bool } from 'prop-types'

import { Comment } from 'blocks'
import { RocketIcon } from 'components/icons'
import { fonts, colors, spacing } from 'styles/theme'
import wrapperStyle from './wrapperStyle'
import Header from './header'

const Base = ({
  comments,
  addComment,
  fetchingAddComment,
  fetchingComment,
  isLoggedIn,
  ...props
}) => (
  <div>
    <Header commentCount={comments.length} />
    {comments.length ? (
      <ul css={wrapperStyle}>
        {fetchingAddComment && '로딩 중입니다 ...'}
        {comments.map(comment => <Comment {...props} key={comment._id} comment={comment} />)}
      </ul>
    ) : (
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
    )}
    {comments.length && fetchingComment ? '불러오는 중입니다 ...' : null}
  </div>
)

Base.propTypes = {
  comments: arrayOf(shape({})).isRequired,
  addComment: func.isRequired,
  fetchingAddComment: bool.isRequired,
  fetchingComment: bool.isRequired,
  isLoggedIn: bool.isRequired,
}

export default Base
