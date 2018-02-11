import React from 'react'
import { arrayOf, shape, func, bool } from 'prop-types'

import { spacing } from 'styles/theme'
import { Comment } from 'blocks'
import wrapperStyle from './wrapperStyle'
import Header from './header'

const Base = ({
  comments,
  addComment,
  fetchingAddComment,
  fetchingComment,
  getRepliesOfCommentById,
  isLoggedIn,
  ...props
}) => (
  <div>
    <Header commentCount={comments.length} />
    <ul css={wrapperStyle}>
      {fetchingAddComment && '로딩 중입니다 ...'}
      {comments.map(comment => {
        const repliesList = Object.values(getRepliesOfCommentById(comment._id))
        return (
          <li
            key={comment._id}
            css={{
              paddingTop: spacing.small,
              paddingBottom: spacing.small,
            }}
          >
            <Comment
              {...props}
              key={comment._id}
              comment={comment}
              addComment={addComment}
              repliesList={repliesList}
            />
          </li>
        )
      })}
    </ul>
    {comments.length && fetchingComment ? '불러오는 중입니다 ...' : null}
  </div>
)

Base.propTypes = {
  comments: arrayOf(shape({})).isRequired,
  addComment: func.isRequired,
  fetchingAddComment: bool.isRequired,
  fetchingComment: bool.isRequired,
  getRepliesOfCommentById: func.isRequired,
  isLoggedIn: bool.isRequired,
}

export default Base
