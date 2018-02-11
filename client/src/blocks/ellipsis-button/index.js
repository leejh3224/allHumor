import React, { Component } from 'react'
import { string, arrayOf, shape } from 'prop-types'

import Base from './base'

class EllipsisButton extends Component {
  static propTypes = {
    iconColor: string.isRequired,
    actions: arrayOf(shape()).isRequired,
  }
  state = {
    isVisible: false,
  }
  onClickButton = () => {
    if (this.state.isVisible) {
      return this.handleClose()
    }
    return this.handleOpen()
  }
  handleOpen = () => {
    this.setState({ isVisible: true })
  }
  handleClose = () => {
    this.setState({ isVisible: false })
  }
  actions = this.props.actions.map(action => ({
    name: action.name,
    onClick: () => {
      action.onClick()
      this.handleClose()
    },
  }))
  render() {
    return (
      <Base
        {...this.state}
        iconColor={this.props.iconColor}
        actions={this.actions}
        handleOpen={this.handleOpen}
        handleClose={this.handleClose}
        onClickButton={this.onClickButton}
      />
    )
  }
}

export default EllipsisButton
