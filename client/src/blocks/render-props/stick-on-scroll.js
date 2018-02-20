import { Component } from 'react'
import { func, number } from 'prop-types'

class StickyOnScroll extends Component {
  static propTypes = {
    children: func.isRequired,
    headerHeight: number.isRequired,
  }
  state = {
    isSticky: false,
  }
  componentWillMount() {
    window.addEventListener('scroll', this.checkScrollY)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScrollY)
  }
  checkScrollY = () => {
    if (window.scrollY >= this.props.headerHeight) {
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
