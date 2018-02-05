import { Component } from 'react'
import { func } from 'prop-types'

class WithMenuState extends Component {
  static propTypes = {
    children: func.isRequired,
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
    return this.props.children({
      ...this.state,
      handleOpenMenu: this.handleOpenMenu,
      handleCloseMenu: this.handleCloseMenu,
    })
  }
}

export default WithMenuState
