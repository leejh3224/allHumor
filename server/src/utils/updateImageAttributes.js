export default ({
  root, parser, imageNames, newStyle,
}) =>
  root
    .find('img')
    .each((i, el) => {
      if (
        !parser
          .$(el)
          .attr('src')
          .endsWith('.gif')
      ) {
        parser
          .$(el)
          .attr('src', `/img/${imageNames[i]}`)
          .attr('style', newStyle)
      } else {
        parser.$(el).replaceWith(parser.$(`
        <video controls autoplay>
          <source src=/img/${imageNames[i]} type="video/mp4">
        </video>
        `))
      }
    })
    .end()
