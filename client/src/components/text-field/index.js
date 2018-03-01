import { createElement } from 'react'
import { string } from 'prop-types'

import { fonts, spacing } from 'styles/theme'

const style = {
  flex: 1,
  ...fonts.body,
  border: 0,
  ':focus': {
    outline: 0,
  },
  marginTop: spacing.xsmall,
}

const TextField = ({ tagName, ...props }) =>
  createElement(tagName, {
    type: 'text',
    placeholder: '여기에 댓글을 입력해주세요.',
    style,
    ...props,
  })

TextField.defaultProps = {
  tagName: 'input',
}

TextField.propTypes = {
  tagName: string,
}

export default TextField
