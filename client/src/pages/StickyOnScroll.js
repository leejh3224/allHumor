import { Component } from 'react'
import { func, number } from 'prop-types'

class StickyOnScroll extends Component {
  static propTypes = {
    children: func.isRequired,
    threshold: number.isRequired,
  }
  state = {
    isSticky: false,
  }
  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = () => {
    if (window.scrollY >= this.props.threshold) {
      this.setState({ isSticky: true })
    } else {
      this.setState({ isSticky: false })
    }
  }
  render() {
    return this.props.children({ ...this.state })
  }
}

export default StickyOnScroll
