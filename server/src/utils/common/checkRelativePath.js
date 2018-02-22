export default function checkRelativePath(url) {
  const typesOfRelativePath = ['./', '../', '/']
  return typesOfRelativePath.some(type => url.startsWith(type))
}
