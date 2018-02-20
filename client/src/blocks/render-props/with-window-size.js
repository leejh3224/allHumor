import { Component } from 'react'
import { func } from 'prop-types'
import throttle from 'lodash/throttle'

class WithWindowSize extends Component {
  static propTypes = {
    children: func.isRequired,
  }
  state = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  componentWillMount() {
    window.addEventListener('resize', throttle(this.calculateWindowSize, 500))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', throttle(this.calculateWindowSize, 500))
  }
  calculateWindowSize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  render() {
    return this.props.children({ ...this.state })
  }
}

export default WithWindowSize
