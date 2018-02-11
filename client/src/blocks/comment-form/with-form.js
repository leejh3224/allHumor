import { Component } from 'react'
import { func, bool, string } from 'prop-types'
import { connect } from 'react-redux'

// import history from 'utils/history'
import * as uiDucks from 'store/modules/ui'
import * as commentDucks from 'store/modules/comment'

class WithForm extends Component {
  static defaultProps = {
    addComment: () => {},
    addReply: () => {},
    editComment: () => {},
    isEditing: false,
    oldContent: '',
  }
  static propTypes = {
    from: string.isRequired,
    addComment: func,
    addReply: func,
    editComment: func,
    isEditing: bool,
    oldContent: string,
    render: func.isRequired,
    // isLoggedIn: bool.isRequired,
    hideAddComment: func.isRequired,
    finishEditComment: func.isRequired,
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

  handleSubmit = (e, from, parent) => {
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

    if (parent) {
      addReply(content, from, parent)
      this.reset()
      return
    }

    addComment(content)
    this.reset()
  }

  reset = () => {
    this.setState({ content: '' })
  }

  handleOnInputStart = e =>
    // const { isLoggedIn } = this.props

    // if (!isLoggedIn) {
    //   return history.replace('/login')
    // }
    this.handleInputChange(e)

  handleCancel = () => {
    const {
      from, isEditing, finishEditComment, hideAddComment,
    } = this.props

    if (isEditing) {
      return finishEditComment(from)
    }
    return hideAddComment(from)
  }

  render() {
    return this.props.render({
      ...this.state,
      isEditing: this.props.isEditing,
      oldContent: this.props.oldContent,
      handleOnInputStart: this.handleOnInputStart,
      handleInputChange: this.handleInputChange,
      handleSubmit: this.handleSubmit,
      handleCancel: this.handleCancel,
      submitButtonText: this.props.isEditing ? '저장' : '댓글',
    })
  }
}

export default connect(null, { ...uiDucks, ...commentDucks })(WithForm)
