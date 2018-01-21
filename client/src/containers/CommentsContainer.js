import React, { Component } from 'react'
import { shape } from 'prop-types'
import { connect } from 'react-redux'
import { Comments } from 'components'
import * as commentDucks from 'store/modules/comment'

class CommentsContainer extends Component {
  static propTypes = {
    comments: shape({}).isRequired,
  }
  render() {
    const { comments } = this.props
    return <Comments comments={Object.values(comments)} />
  }
}

export default connect(
  state => ({
    comments: commentDucks.selectors.getComments(state),
  }),
  null,
)(CommentsContainer)
