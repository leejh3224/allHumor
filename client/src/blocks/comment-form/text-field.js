import { createElement } from 'react'
import { string } from 'prop-types'

const TextField = ({ tagName, cssProps, ...props }) =>
  createElement(tagName, { style: cssProps, ...props })

TextField.propTypes = {
  tagName: string.isRequired,
}

export default TextField
