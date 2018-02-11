import React, { Component } from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'

import * as uiDucks from 'store/modules/ui'
import Button from './button'

class AddReplyButton extends Component {
  static propTypes = {
    showAddComment: func.isRequired,
    commentId: string.isRequired,
  }
  onClick = () => {
    this.props.showAddComment(this.props.commentId)
  }
  render() {
    return <Button onClick={this.onClick} />
  }
}

export default connect(null, uiDucks)(AddReplyButton)
