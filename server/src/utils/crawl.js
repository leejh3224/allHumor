import { URL } from 'url'

import loadParser from 'utils/loadParser'
import createArticle from 'utils/createArticle'
import saveImage from 'utils/saveImage'
import getSrcList from 'utils/getSrcList'
import toArrayBuffer from 'utils/toArrayBuffer'
import createImageName from 'utils/createImageName'
import changeChildImageAttributes from 'utils/changeChildImageAttributes'
import sanitizeHtml from 'utils/sanitizeHtml'
import getSelectors from 'utils/getSelectors'

export default async (link) => {
  function toListOfBuffer(list) {
    return Promise.all(list.map(toArrayBuffer))
  }

  function getCategory(url) {
    return {
      'www.dogdrip.net': 'humor',
      'www.kick-off.co.kr': 'soccer',
      'www.ddengle.com': 'bitcoin',
      'www.instiz.net': 'idol',
    }[new URL(url).hostname]
  }

  try {
    const parser = await loadParser(link)

    const {
      authorSelector,
      bodySelector,
      titleSelector,
      uploadDateSelector,
      selectorsForUnneccessaryNode,
    } = getSelectors(link)

    const [body] = parser.getNodesList(bodySelector)
    const imagesInBody = parser.getNodesList(`${bodySelector} img`)
    const videosInBody = parser.getNodesList(`${bodySelector} iframe`)
    const tooManyImages = imagesInBody.length > 2

    if (tooManyImages) {
      return null
    }

    const listOfSrc = getSrcList({ url: link, imagesInBody })
    const listOfBuffer = await toListOfBuffer(listOfSrc)
    const listOfImageName = listOfBuffer.map(createImageName)
    const [thumbnail] = listOfImageName

    await Promise.all(listOfBuffer.map(async (buffer, i) => {
      await saveImage({ buffer, imageName: listOfImageName[i] })
    }))

    const hasImages = imagesInBody.length
    const hasVideos = videosInBody.length

    const getThumbnail = () => {
      if (hasImages) {
        return `/img/${thumbnail}`
      }
      if (hasVideos) {
        return 'video'
      }
      return null
    }

    const toArticle = () =>
      createArticle({
        url: link,
        parser,
        authorSelector,
        titleSelector,
        uploadDateSelector,
        selectorsForUnneccessaryNode,
        additionalFields: {
          category: getCategory(link),
          comments: [],
          thumbnail: getThumbnail(),
          votes: [],
        },
      })

    const updateChildImages = () => {
      const [updatedBody] = listOfImageName.map(imageName =>
        changeChildImageAttributes({
          root: body,
          newSrc: `/img/${imageName}`,
          newStyle: 'max-width: 100%;',
        }))
      return updatedBody
    }

    const [updatedBody, article] = [hasImages ? updateChildImages() : body, toArticle()]

    return {
      ...article,
      body: sanitizeHtml(updatedBody),
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
