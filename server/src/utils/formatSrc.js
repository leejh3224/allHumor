import getImageName from 'utils/getImageName'

export default (html, site, id) =>
  html.replace(/src="[http:|https:]{4,}\/\/[\w./]{0,}"/g, (matched) => {
    const imageName = getImageName(matched)
    return `src="images/${site}/${id}_${imageName}"`
  })
