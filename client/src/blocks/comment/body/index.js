import React, { Component } from 'react'
import { shape, arrayOf, bool, func } from 'prop-types'
import { connect } from 'react-redux'

import * as commentReducer from 'store/comment/reducer'
import * as actions from 'store/comment/actions'
import { EditComment } from 'blocks'
import { SimpleLoading } from 'components/loading'
import BodyTemplate from './template'
import Header from './header'
import Text from './text'
import AddReplyButton from './add-reply-button'
import ShowReplyButton from './show-reply-button'

class Body extends Component {
  static propTypes = {
    comment: shape().isRequired,
    replies: arrayOf(shape()).isRequired,
    isEditing: bool.isRequired,
    isTruncated: bool.isRequired,
    toggleExpandText: func.isRequired,
    fetchingRemove: bool.isRequired,
    startAddReply: func.isRequired,
    fetchReplies: func.isRequired,
    toggleExpandReply: func.isRequired,
    isExpanded: bool.isRequired,
  }
  render() {
    const {
      isEditing,
      isTruncated,
      isExpanded,
      toggleExpandText,
      fetchingRemove,
      startAddReply,
      fetchReplies,
      toggleExpandReply,
      replies,
    } = this.props

    const {
      _id, author, content, createdAt, parent, replies: arrayOfReplyIds,
    } = this.props.comment

    if (isEditing) {
      return <EditComment commentId={_id} oldText={content} />
    }

    if (fetchingRemove) {
      return (
        <div
          css={{
            minHeight: 80,
          }}
        >
          <SimpleLoading />
        </div>
      )
    }

    function onClickShowReply() {
      toggleExpandReply(_id)

      if (isExpanded) {
        return
      }

      fetchReplies(_id)
    }

    function checkIsParent() {
      return arrayOfReplyIds // only parent has "replies" field
    }

    return (
      <BodyTemplate
        header={<Header author={author} createdAt={createdAt} />}
        text={
          <Text
            content={content}
            isTruncated={isTruncated}
            onClickShowMore={() => toggleExpandText(_id)}
          />
        }
        addReplyButton={<AddReplyButton onClick={() => startAddReply(author, parent || _id)} />}
        showReplyButton={
          checkIsParent() &&
          !!arrayOfReplyIds.length && (
            <ShowReplyButton
              onClick={onClickShowReply}
              isShowingReply={isExpanded}
              replyCount={replies.length || arrayOfReplyIds.length}
            />
          )
        }
      />
    )
  }
}

export default connect(
  (state, { comment: { _id } }) => ({
    isTruncated: commentReducer.getIsTruncated(state, _id),
    isExpanded: commentReducer.getIsExpanded(state, _id),
    isEditing: commentReducer.getIsEditing(state, _id),
  }),
  actions,
)(Body)
