import { injectGlobal } from 'emotion'
import { colors, fonts } from 'styles/theme'

const videoStyle = `
  width: 100%;
  height: 400px;

  @media(max-width: 499px) {
    height: 250px;
  };
`

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
  body, div, span, p, ul, img, figure, h1, button, input {
    margin: 0;
    padding: 0;
    border: 0;
  }
  input:focus {
    outline: 0;
  }
  // 크롤링 된 게시물의 줄간격 및 글자크기
  p, div {
    font-size: ${fonts.body.fontSize}px;
    line-height: ${fonts.body.lineHeight};
  }
  // 크롤링 된 비디오의 크기
  iframe, embed, video {
    ${videoStyle}
  }
`
