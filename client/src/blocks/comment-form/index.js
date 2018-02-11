import React from 'react'
import { func, string, bool } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'

import { SendIcon } from 'components/icons'
import WithForm from './with-form'
import ButtonGroup from './button-group'
import TextField from './text-field'

const CommentForm = ({
  from, parent, isEditing, ...props
}) => (
  <WithForm
    {...props}
    render={({
 content, handleInputChange, handleSubmit, handleOnInputStart, handleCancel,
}) => (
  <div
    css={{
          width: '100%',
        }}
  >
    <form
      css={{
            display: 'flex',
            flexDirection: isEditing ? 'column' : 'row',
            alignItems: isEditing ? '' : 'center',
            height: isEditing && 100,
            boxShadow: !isEditing && `0 -2px 5px ${colors.grey}`,
            padding: spacing.small,
            backgroundColor: colors.white,
          }}
      onSubmit={e => handleSubmit(e, from, parent)}
    >
      <TextField
        tagName={isEditing ? 'textarea' : 'input'}
        type="text"
        placeholder="댓글"
        cssProps={{
              flex: 1,
              ...fonts.body,
              marginBottom: isEditing && spacing.small,
              border: 0,
              ':focus': {
                outline: 0,
              },
            }}
        onInput={handleOnInputStart}
        onChange={handleInputChange}
        value={content}
      />
      {isEditing ? (
        <ButtonGroup isEditing={isEditing} onCancel={handleCancel} />
          ) : (
            <button
              type="submit"
              css={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                ':focus': {
                  outline: 0,
                },
              }}
            >
              <SendIcon />
            </button>
          )}
    </form>
  </div>
    )}
  />
)

CommentForm.defaultProps = {
  onCancel: () => {},
  from: null,
  parent: null,
  isEditing: false,
}

CommentForm.propTypes = {
  onCancel: func,
  from: string,
  parent: string,
  isEditing: bool,
}

export default CommentForm
