import React from 'react'
import { func, string } from 'prop-types'
import { spacing, fonts } from 'styles/theme'

import WithForm from './with-form'
import ButtonGroup from './button-group'

const CommentForm = ({ from, parent, ...props }) => (
  <WithForm
    {...props}
    render={({
      content,
      handleInputChange,
      handleSubmit,
      submitButtonText,
      handleOnInputStart,
      handleCancel,
    }) => (
      <div
        css={{
          marginBottom: spacing.medium,
          width: '100%',
        }}
      >
        <form onSubmit={e => handleSubmit(e, from, parent)}>
          <textarea
            type="text"
            placeholder="댓글"
            css={{
              width: '100%',
              height: 80,
              ...fonts.small,
              padding: spacing.small,
            }}
            onInput={handleOnInputStart}
            onChange={handleInputChange}
            value={content}
          />
          <ButtonGroup onCancel={handleCancel} submitButtonText={submitButtonText} />
        </form>
      </div>
    )}
  />
)

CommentForm.defaultProps = {
  onCancel: () => {},
  from: null,
  parent: null,
}

CommentForm.propTypes = {
  onCancel: func,
  from: string,
  parent: string,
}

export default CommentForm
