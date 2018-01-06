import HTMLtoJSX from 'htmltojsx'

export default (html) => {
  const converter = new HTMLtoJSX({
    createClass: false,
    indent: '\t',
  })
  return converter.convert(html)
}
