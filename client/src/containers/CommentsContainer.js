import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Comments } from 'components'

class CommentsContainer extends Component {
  static propTypes = {}
  render() {
    return <Comments />
  }
}

export default connect(null, null)(CommentsContainer)
