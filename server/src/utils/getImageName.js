export default (string) => {
  const imageNames = string.match(/[\w]{0,}.(gif|jpe?g|tiff|png)/i)
  return imageNames ? imageNames.filter(matched => matched.length > 4) : null
}
