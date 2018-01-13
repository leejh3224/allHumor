import React, { Component } from 'react'

const StickyOnScrollHoc = WrappedComponent =>
  class StickyOnScroll extends Component {
    state = {
      isSticky: false,
    }
    componentWillMount() {
      window.addEventListener('scroll', this.handleScroll)
    }
    componentWillUnmount() {
      window.removeEventListener('scroll')
    }
    handleScroll = () => {
      if (window.scrollY >= 70) {
        this.setState({ isSticky: true })
      } else {
        this.setState({ isSticky: false })
      }
    }
    render() {
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }

export default StickyOnScrollHoc
