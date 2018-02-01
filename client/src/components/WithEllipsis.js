import { Component } from 'react'
import { func, arrayOf, shape } from 'prop-types'
import shave from 'shave'
import throttle from 'lodash/throttle'

class WithEllipsis extends Component {
  static propTypes = {
    children: func.isRequired,
    config: arrayOf(shape()).isRequired,
  }
  componentDidMount() {
    this.truncate()
    window.addEventListener('resize', throttle(this.truncate, 500))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', throttle(this.truncate, 500))
  }
  truncate = () => {
    this.props.config.forEach(obj => {
      shave(`.${obj.className}`, obj.maxHeight)
    })
  }
  render() {
    return this.props.children()
  }
}

export default WithEllipsis
