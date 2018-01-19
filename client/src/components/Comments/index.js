import React from 'react'
// import PropTypes from 'prop-types'
import { spacing, media } from 'styles/theme'
import { AddComment, CommentItem } from 'components'

const Comments = () => (
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
    <AddComment />
    <ul>
      <li
        css={{
          paddingTop: spacing.small,
          paddingBottom: spacing.small,
        }}
      >
        <CommentItem />
      </li>
      <li
        css={{
          paddingTop: spacing.small,
          paddingBottom: spacing.small,
        }}
      >
        <CommentItem />
      </li>
    </ul>
  </section>
)

Comments.propTypes = {}

export default Comments
