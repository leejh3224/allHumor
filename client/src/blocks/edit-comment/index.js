import React, { Component } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'

import { TextField } from 'components'
import * as commentDucks from 'store/modules/comment'
import * as uiDucks from 'store/modules/ui'
import { isAuthenticated } from 'utils/auth'
import history from 'utils/history'
import formStyle from './form-style'
import ButtonGroup from './button-group'

class EditComment extends Component {
  static propTypes = {
    oldText: string.isRequired,
    editComment: func.isRequired,
    finishEditComment: func.isRequired,
    commentId: string.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      text: props.oldText,
    }
  }

  handleInputChange = e => {
    const { value } = e.target
    this.setState(prev => ({ ...prev, text: value }))
  }

  handleSubmit = e => {
    const newText = this.state.text
    const { editComment, commentId } = this.props

    e.preventDefault()

    const textIsEmpty = !newText.trim().length

    if (textIsEmpty) {
      return
    }

    editComment(commentId, newText)
    this.reset()
  }

  reset = () => {
    this.setState({ text: '' })
  }

  handleOnInputStart = e => {
    if (!isAuthenticated()) {
      return history.replace('/login')
    }
    return this.handleInputChange(e)
  }

  handleCancel = () => {
    const { commentId, finishEditComment } = this.props

    finishEditComment(commentId)
  }

  render() {
    return (
      <form css={formStyle} onSubmit={this.handleSubmit}>
        <TextField
          tagName="textarea"
          onKeyPress={this.handleOnInputStart}
          onChange={this.handleInputChange}
          value={this.state.text}
        />
        <ButtonGroup onCancel={this.handleCancel} />
      </form>
    )
  }
}

export default connect(null, { ...commentDucks, ...uiDucks })(EditComment)
