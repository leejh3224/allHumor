import getImageName from 'utils/getImageName'

export default (html, type, id) =>
  html.replace(/src="[http:|https:]{4,}\/\/[\w./]{0,}"/g, (matched) => {
    const imageName = getImageName(matched)
    return `src="images/${type}/${id}_${imageName}"`
  })
