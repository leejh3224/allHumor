import fileType from 'file-type'
import uuid from 'uuid/v4'

export default async function (buffer) {
  const { ext: fileExtenstion } = fileType(buffer)
  return `${uuid()}.${fileExtenstion}`
}
