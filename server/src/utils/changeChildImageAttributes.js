export default ({ root, newSrc, newStyle }) =>
  root
    .find('img')
    .attr('src', newSrc)
    .attr('style', newStyle)
    .removeAttr('data-original')
    .end()
    .html()
