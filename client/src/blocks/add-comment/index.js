import React, { Component } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'

import { TextField } from 'components'
import * as actions from 'store/comment/actions'
import * as commentReducer from 'store/comment/reducer'
import { isAuthenticated } from 'utils/auth'
import history from 'utils/history'
import { spacing, colors } from 'styles/theme'
import SendMessageButton from './send-message-button'
import RecipientTag from './recipient-tag'

class AddComment extends Component {
  static defaultProps = {
    recipient: undefined,
  }
  static propTypes = {
    addReply: func.isRequired,
    addComment: func.isRequired,
    recipient: string,
    finishAddReply: func.isRequired,
  }
  state = {
    text: '',
  }

  handleInputChange = e => {
    const { value } = e.target
    this.setState(prev => ({ ...prev, text: value }))
  }

  handleOnInputStart = e => {
    if (!isAuthenticated()) {
      return history.replace('/login')
    }

    const isRemoving = e.keyCode === 8 || e.which === 8
    const { recipient, finishAddReply } = this.props
    if (this.state.text === '' && recipient && isRemoving) {
      return finishAddReply()
    }
    return this.handleInputChange(e)
  }

  handleSubmit = e => {
    const { text } = this.state
    const { addReply, addComment, recipient } = this.props

    e.preventDefault()

    const textIsEmpty = !text.trim().length

    if (textIsEmpty) {
      return
    }

    if (recipient) {
      addReply(text)
      this.reset()
      return
    }

    addComment(text)
    this.reset()

    window.scrollTo(0, document.body.scrollHeight)
  }

  reset = () => {
    this.setState({ text: '' })
  }

  render() {
    return (
      <form
        css={{
          position: 'fixed',
          bottom: 0,
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
          boxShadow: `0 -2px 5px ${colors.lightGrey}`,
          padding: spacing.small,
          backgroundColor: colors.white,
          height: this.props.recipient ? 100 : 50,
          transition: 'height 0.3s ease-in',
        }}
        onSubmit={this.handleSubmit}
      >
        <RecipientTag recipient={this.props.recipient} />
        <TextField
          onKeyDown={this.handleOnInputStart}
          onChange={this.handleInputChange}
          value={this.state.text}
        />
        <SendMessageButton readyToSend={this.state.text.length > 0} />
      </form>
    )
  }
}

export default connect(
  state => ({
    recipient: commentReducer.getRecipient(state),
  }),
  actions,
)(AddComment)
