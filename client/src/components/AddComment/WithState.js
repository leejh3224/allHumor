import React, { Component } from 'react'
import { func } from 'prop-types'

const WithStateHoc = WrappedComponent =>
  class WithState extends Component {
    static defaultProps = {
      addReply: () => {},
    }
    static propTypes = {
      addComment: func.isRequired,
      addReply: func,
    }
    state = {
      content: '',
    }
    handleInputChange = (e) => {
      const { value } = e.target
      this.setState(prev => ({ ...prev, content: value }))
    }
    handleSubmit = (e, parentId) => {
      e.preventDefault()
      if (!this.state.content.trim().length) {
        return
      }

      if (parentId.length) {
        this.props.addReply(this.state.content, parentId)
        this.reset()
        return
      }
      this.props.addComment(this.state.content)
      this.reset()
    }
    reset = () => {
      this.setState({ content: '' })
    }
    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }

export default WithStateHoc
