import { injectGlobal } from 'emotion'
import { colors, fonts } from 'styles/theme'

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
  p, div {
    font-size: ${fonts.body.fontSize}px;
    line-height: ${fonts.body.lineHeight};
  }
  iframe {
    width: 100%;
    height: 400px;

    @media(max-width: 499px) {
      height: 250px;
    };
  }
`
