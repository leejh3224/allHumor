import React from 'react'
import { arrayOf, shape, bool, string } from 'prop-types'

import { Comment } from 'blocks'
import wrapperStyle from './wrapperStyle'
import NoCommentYet from './no-comment-yet'

const List = ({ comments, fetchingComment, myUserId }) => (
  <div>
    {comments.length ? (
      <ul css={wrapperStyle}>
        {comments.map(comment => (
          <Comment key={comment._id} comment={comment} myUserId={myUserId} />
        ))}
      </ul>
    ) : (
      <NoCommentYet />
    )}
    {comments.length && fetchingComment ? '불러오는 중입니다 ...' : null}
  </div>
)

List.propTypes = {
  comments: arrayOf(shape({})).isRequired,
  fetchingComment: bool.isRequired,
  myUserId: string.isRequired,
}

export default List
