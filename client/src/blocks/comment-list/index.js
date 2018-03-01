import React, { Component } from 'react'
import { arrayOf, shape, func } from 'prop-types'
import { connect } from 'react-redux'

import * as actions from 'store/comment/actions'
import * as commentReducer from 'store/comment/reducer'
import * as userReducer from 'store/user/reducer'
import { InfiniteScroll } from 'components'
import Base from './base'

class CommentList extends Component {
  static propTypes = {
    comments: arrayOf(shape({})).isRequired,
    fetchComments: func.isRequired,
  }
  render() {
    const { fetchComments } = this.props
    return (
      <div>
        <Base {...this.props} />
        <InfiniteScroll prefix="commentList" fetchAction={fetchComments} />
      </div>
    )
  }
}

export default connect(
  state => ({
    comments: commentReducer.getComments(state),
    myUserId: userReducer.getUserId(state),
  }),
  actions,
)(CommentList)
