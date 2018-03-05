export default ({
  root, parser, imageNames, newStyle,
}) =>
  root
    .find('img')
    .each((i, el) => {
      const element = parser.$(el)
      const isGifFormat = element.attr('src').endsWith('.gif')

      if (isGifFormat) {
        element.replaceWith(parser.$(`
        <video controls autoplay>
          <source src=/img/${imageNames[i]} type="video/mp4">
        </video>
        `))
      } else {
        element.attr('src', `/img/${imageNames[i]}`).attr('style', newStyle)
      }
    })
    .end()
