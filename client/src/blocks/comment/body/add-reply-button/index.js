import React, { Component } from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'

import * as addReplyDucks from 'store/modules/addReply'
import Button from './button'

class AddReplyButton extends Component {
  static propTypes = {
    startAddReply: func.isRequired,
    commentId: string.isRequired,
  }
  onClick = () => {
    const { startAddReply, commentId } = this.props
    startAddReply(commentId)
  }
  render() {
    return <Button onClick={this.onClick} />
  }
}

export default connect(null, addReplyDucks)(AddReplyButton)
