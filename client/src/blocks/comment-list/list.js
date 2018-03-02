import React from 'react'
import { arrayOf, shape, string } from 'prop-types'

import { Comment } from 'blocks'
import wrapperStyle from './wrapperStyle'

const List = ({ comments, myUserId }) => (
  <ul css={wrapperStyle}>
    {comments.map(comment => <Comment key={comment._id} comment={comment} myUserId={myUserId} />)}
  </ul>
)

List.propTypes = {
  comments: arrayOf(shape({})).isRequired,
  myUserId: string.isRequired,
}

export default List
