import React, { Component } from 'react'
import { string, bool, func } from 'prop-types'
import { connect } from 'react-redux'

import * as uiDucks from 'store/modules/ui'
import * as commentDucks from 'store/modules/comment'
import Button from './button'

class ShowReplyButton extends Component {
  static propTypes = {
    commentId: string.isRequired,
    isShowingReply: bool.isRequired,
    loadReplies: func.isRequired,
    toggleReplies: func.isRequired,
  }
  onClick = () => {
    const {
      isShowingReply, loadReplies, toggleReplies, commentId,
    } = this.props

    if (!isShowingReply) {
      loadReplies(commentId)
    }
    return toggleReplies(commentId)
  }
  render() {
    return <Button {...this.props} onClick={this.onClick} />
  }
}

export default connect(null, { ...uiDucks, ...commentDucks })(ShowReplyButton)
