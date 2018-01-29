import React, { Component } from 'react'
import { func, bool, string } from 'prop-types'

const WithStateHoc = WrappedComponent =>
  class WithState extends Component {
    static defaultProps = {
      addComment: () => {},
      addReply: () => {},
      editComment: () => {},
      isEditing: false,
      oldContent: '',
    }
    static propTypes = {
      addComment: func,
      addReply: func,
      editComment: func,
      isEditing: bool,
      oldContent: string,
    }
    constructor(props) {
      super(props)
      this.state = {
        content: props.isEditing ? props.oldContent : '',
      }
    }
    handleInputChange = (e) => {
      const { value } = e.target
      this.setState(prev => ({ ...prev, content: value }))
    }
    handleSubmit = (e, parentId, from) => {
      const { content } = this.state
      const {
        addReply, addComment, editComment, isEditing,
      } = this.props

      e.preventDefault()
      if (!content.trim().length) {
        return
      }

      if (isEditing) {
        editComment(from, content)
        this.reset()
        return
      }

      if (parentId.length) {
        addReply(content, parentId, from)
        this.reset()
        return
      }
      addComment(content)
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
