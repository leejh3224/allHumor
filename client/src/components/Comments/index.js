import React from 'react'
import { arrayOf, shape, func, bool } from 'prop-types'
import { spacing, media } from 'styles/theme'
import { AddComment, CommentItem } from 'components'

const Comments = ({
  comments,
  loadReplies,
  getRepliesOfComment,
  fetchingReplies,
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
    <AddComment commentCounts={comments.length} />
    <ul>
      {comments.map(comment => (
        <li
          /* eslint-disable no-underscore-dangle */
          key={comment._id}
          css={{
            paddingTop: spacing.small,
            paddingBottom: spacing.small,
          }}
        >
          <CommentItem
            comment={comment}
            loadReplies={loadReplies}
            getRepliesOfComment={getRepliesOfComment}
            fetchingReplies={fetchingReplies}
          />
        </li>
      ))}
    </ul>
  </section>
)

Comments.propTypes = {
  comments: arrayOf(shape({})).isRequired,
  loadReplies: func.isRequired,
  getRepliesOfComment: func.isRequired,
  fetchingReplies: bool.isRequired,
}

export default Comments
