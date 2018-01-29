import React, { Component } from 'react'
import { func } from 'prop-types'

const WithStateHoc = WrappedComponent =>
  class WithState extends Component {
    static propTypes = {
      startEditComment: func.isRequired,
    }
    state = {
      isMenuVisible: false,
    }
    handleOpenMenu = () => {
      this.setState({ isMenuVisible: true })
    }
    handleCloseMenu = () => {
      this.setState({ isMenuVisible: false })
    }
    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          handleOpenMenu={this.handleOpenMenu}
          handleCloseMenu={this.handleCloseMenu}
        />
      )
    }
  }

export default WithStateHoc
