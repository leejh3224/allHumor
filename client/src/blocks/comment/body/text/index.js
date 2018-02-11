import React, { Component } from 'react'
import { func, string } from 'prop-types'
import { connect } from 'react-redux'

import * as uiDucks from 'store/modules/ui'
import Base from './base'

class Text extends Component {
  static propTypes = {
    commentId: string.isRequired,
    toggleExpandComment: func.isRequired,
  }
  onClickShowMore = () => {
    const { toggleExpandComment, commentId } = this.props
    toggleExpandComment(commentId)
  }
  render() {
    return <Base {...this.props} onClickShowMore={this.onClickShowMore} />
  }
}

export default connect(null, uiDucks)(Text)
