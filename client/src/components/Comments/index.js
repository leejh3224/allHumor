import React from 'react'
import { arrayOf, shape, func, bool } from 'prop-types'
import { spacing, media, fonts } from 'styles/theme'
import { CommentForm, CommentItem } from 'components'

const Comments = ({
  comments,
  addComment,
  fetchingAddComment,
  fetchingComment,
  getRepliesOfCommentById,
  ...props
}) => (
  <section
    css={{
      padding: spacing.medium,

      [media.greaterThan('medium')]: {
        maxWidth: 800,
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    }}
  >
    <p
      css={{
        paddingBottom: spacing.small,
        ...fonts.small,
      }}
    >
      댓글 {comments.length}개
    </p>
    <CommentForm addComment={addComment} />
    <ul>
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
            <CommentItem
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
  </section>
)

Comments.propTypes = {
  comments: arrayOf(shape({})).isRequired,
  addComment: func.isRequired,
  fetchingAddComment: bool.isRequired,
  fetchingComment: bool.isRequired,
  getRepliesOfCommentById: func.isRequired,
}

export default Comments
