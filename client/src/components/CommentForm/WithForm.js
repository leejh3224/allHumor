import { Component } from 'react'
import { func, bool, string } from 'prop-types'

class WithForm extends Component {
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
    render: func.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      content: props.isEditing ? props.oldContent : '',
    }
  }
  handleInputChange = e => {
    const { value } = e.target
    this.setState(prev => ({ ...prev, content: value }))
  }
  handleSubmit = (e, from, to) => {
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

    if (from && to) {
      addReply(content, from, to)
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
    return this.props.render({
      ...this.state,
      ...this.props,
      handleInputChange: this.handleInputChange,
      handleSubmit: this.handleSubmit,
      submitButtonText: this.props.isEditing ? '저장' : '댓글',
    })
  }
}

export default WithForm
