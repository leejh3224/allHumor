import { URL } from 'url'

import loadParser from 'utils/loadParser'
import createArticle from 'utils/createArticle'
import saveImage from 'utils/saveImage'
import getSrcList from 'utils/getSrcList'
import srcToArrayBuffer from 'utils/srcToArrayBuffer'
import createImageName from 'utils/createImageName'
import changeChildImageAttributes from 'utils/changeChildImageAttributes'
import sanitizeHtml from 'utils/sanitizeHtml'
import getSelectorsForArticle from 'utils/getSelectorsForArticle'

export default async (link) => {
  const {
    authorSelector,
    bodySelector,
    titleSelector,
    uploadDateSelector,
    selectorsForUnneccessaryNode,
  } = getSelectorsForArticle(link)

  const listOfSrc = await getSrcList(link)

  function toListOfBuffer(list) {
    return Promise.all(list.map(srcToArrayBuffer))
  }

  const listOfBuffer = await toListOfBuffer(listOfSrc)

  async function createImageNameAndSaveImage(buffer) {
    const name = await createImageName(buffer)
    await saveImage({ buffer, imageName: name })
    return name
  }

  function toListOfImageName(list) {
    return Promise.all(list.map(createImageNameAndSaveImage))
  }

  const listOfImageName = await toListOfImageName(listOfBuffer)

  function getCategory(url) {
    return {
      'www.dogdrip.net': 'humor',
      'www.kick-off.co.kr': 'soccer',
      'www.ddengle.com': 'bitcoin',
      'www.instiz.net': 'idol',
    }[new URL(url).hostname]
  }

  async function checkVideos(url) {
    try {
      const parser = await loadParser(url)
      const iframes = parser.getNodesList(`${bodySelector} iframe`)
      return !!iframes.length
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function getThumbnail(url) {
    const images = listOfImageName

    const hasImages = images.length
    const hasVideos = await checkVideos(url)

    if (hasImages) {
      const [thumbnail] = images
      return `/img/${thumbnail}`
    }

    if (hasVideos) {
      return 'video'
    }
    return null
  }

  async function toArticle() {
    return createArticle({
      url: link,
      authorSelector,
      titleSelector,
      uploadDateSelector,
      selectorsForUnneccessaryNode,
      additionalFields: {
        category: getCategory(link),
        comments: [],
        thumbnail: await getThumbnail(link),
        votes: [],
      },
    })
  }

  async function updateChildImages() {
    try {
      const parser = await loadParser(link)
      const [root] = await parser.getNodesList(bodySelector)

      if (listOfImageName.length) {
        const [changedBody] = listOfImageName.map(imageName =>
          changeChildImageAttributes({
            root,
            newSrc: `/img/${imageName}`,
            newStyle: 'max-width: 100%;',
          }))
        return sanitizeHtml(changedBody)
      }
      return sanitizeHtml(root)
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const [body, withoutBody] = await Promise.all([updateChildImages(), toArticle()])

  return {
    ...withoutBody,
    body,
  }
}
