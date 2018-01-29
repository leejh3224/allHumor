import React, { Component } from 'react'

// copyed from
// http://blog.sodhanalibrary.com/2016/08/detect-when-user-scrolls-to-bottom-of.html#.Wm73pFPFI3g
const ScrollToBottomDetectorHoc = WrappedComponent =>
  class ScrollToBottomDetector extends Component {
    state = {
      isAtTheBottom: false,
    }
    componentWillMount() {
      window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll)
    }
    handleScroll = () => {
      const {
        body,
        documentElement: { offsetHeight, clientHeight, scrollHeight },
      } = document
      const windowHeight =
        'innerHeight' in window ? window.innerHeight : offsetHeight
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
          isAtTheBottom: true,
        })
      }
      return this.setState({
        isAtTheBottom: false,
      })
    }
    render() {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }

export default ScrollToBottomDetectorHoc
