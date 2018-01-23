import React, { Component } from 'react'
import { shape, func } from 'prop-types'

const WithStateHoc = WrappedComponent =>
  class WithState extends Component {
    static propTypes = {
      comment: shape({}).isRequired,
      loadReplies: func.isRequired,
    }
    state = {
      showingReplies: false,
      addingReplies: false,
    }
    showReplies = () => {
      /* eslint-disable no-underscore-dangle */
      const { comment, loadReplies } = this.props
      this.setState(prev => ({ ...prev, showingReplies: !prev.showingReplies }))
      loadReplies(comment._id)
    }
    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          showReplies={this.showReplies}
        />
      )
    }
  }

export default WithStateHoc
