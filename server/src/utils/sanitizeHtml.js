import sanitizeHtml from 'sanitize-html'

export default html =>
  sanitizeHtml(html, {
    allowedTags: [
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      'a',
      'ul',
      'ol',
      'nl',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'caption',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'img',
      'iframe',
    ],
    allowedAttributes: {
      img: ['src', 'alt', 'data-original'],
      iframe: ['src', 'allowfullscreen', 'width', 'height'],
    },
  })
