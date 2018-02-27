import { Component } from 'react'
import { func } from 'prop-types'

// copyed from
// http://blog.sodhanalibrary.com/2016/08/detect-when-user-scrolls-to-bottom-of.html#.Wm73pFPFI3g
class ScrollDetector extends Component {
  static propTypes = {
    children: func.isRequired,
  }
  state = {
    scrolledToBottom: false,
  }
  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleScroll = () => {
    const { body, documentElement: { offsetHeight, clientHeight, scrollHeight } } = document
    const windowHeight = 'innerHeight' in window ? window.innerHeight : offsetHeight
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      clientHeight,
      scrollHeight,
      offsetHeight,
    )
    const windowBottom = windowHeight + window.pageYOffset
    if (windowBottom >= docHeight) {
      return this.setState({
        scrolledToBottom: true,
      })
    }
    return this.setState({
      scrolledToBottom: false,
    })
  }
  render() {
    return this.props.children({ ...this.state })
  }
}

export default ScrollDetector
