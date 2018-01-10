import { injectGlobal } from 'emotion'
import { colors } from 'styles/theme'

/* eslint-disable no-unused-expressions */
export default injectGlobal`
  * {
    box-sizing: border-box;
    font-family: Malgun Gothic, Dotum, sans-serif;
    color: ${colors.font};
  }
  ol, ul {
    list-style: none;
  }
  body, div, span, p, ul, img, figure, h1 {
    margin: 0;
    padding: 0;
    border: 0;
  }
`
