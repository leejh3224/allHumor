import { createElement } from 'react'
import { string, shape } from 'prop-types'

import { fonts } from 'styles/theme'

const style = {
  flex: 1,
  ...fonts.body,
  border: 0,
  ':focus': {
    outline: 0,
  },
}

const TextField = ({ tagName = 'input', ...props }) =>
  createElement(tagName, {
    type: 'text',
    placeholder: '여기에 댓글을 입력해주세요.',
    style,
    ...props,
  })

TextField.propTypes = {
  tagName: string.isRequired,
  cssProps: shape().isRequired,
}

export default TextField
