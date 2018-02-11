import React, { Component } from 'react'
import { shape, arrayOf } from 'prop-types'

import { CommentForm } from 'blocks'
import BodyTemplate from './template'
import Header from './header'
import Text from './text'
import AddReplyButton from './add-reply-button'
import ShowReplyButton from './show-reply-button'

class Body extends Component {
  static propTypes = {
    comment: shape().isRequired,
    repliesList: arrayOf(shape()).isRequired,
  }
  render() {
    const { repliesList } = this.props
    const {
      _id,
      author,
      content,
      createdAt,
      replies,
      isTruncated,
      isEditing,
      isFetchingEditingComment,
      isFetchingRemovingComment,
      isShowingReply,
    } = this.props.comment

    if (isEditing) {
      return <CommentForm isEditing={isEditing} oldContent={content} from={_id} />
    }

    if (isFetchingEditingComment) {
      return <p>수정하는 중입니다 ...</p>
    }

    if (isFetchingRemovingComment) {
      return <p>삭제하는 중입니다 ...</p>
    }

    return (
      <BodyTemplate
        header={<Header author={author} createdAt={createdAt} />}
        text={<Text commentId={_id} content={content} isTruncated={isTruncated} />}
        addReplyButton={<AddReplyButton commentId={_id} />}
        showReplyButton={
          replies &&
          replies.length > 0 && (
            <ShowReplyButton
              commentId={_id}
              isShowingReply={isShowingReply}
              replyCount={repliesList.length || replies.length}
            />
          )
        }
      />
    )
  }
}

export default Body
