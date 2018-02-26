import { URL } from 'url'

import loadParser from 'utils/loadParser'
import createArticle from 'utils/createArticle'
import saveImage from 'utils/saveImage'
import getSrcList from 'utils/getSrcList'
import toArrayBuffer from 'utils/toArrayBuffer'
import createImageName from 'utils/createImageName'
import updateImageAttributes from 'utils/updateImageAttributes'
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

  function checkGif(string) {
    return string.endsWith('.gif')
  }

  function changeGifToMp4Extension(list) {
    return list.map((name) => {
      if (checkGif(name)) {
        return name.replace(/.gif$/, '.mp4')
      }
      return name
    })
  }

  function getThumbnailPath({ imageList, hasEmbededVideos = false }) {
    if (hasEmbededVideos) {
      return '/images/video.png'
    }

    if (!imageList.length) {
      return '/images/noImage.jpg'
    }

    const [thumbnail] = imageList

    if (thumbnail.endsWith('.mp4')) {
      return '/images/video.png'
    }

    return `/img/${thumbnail}`
  }

  function saveBunchOfImages({ buffers, imageNames }) {
    return Promise.all(buffers.map(async (buffer, i) => {
      await saveImage({ buffer, imageName: imageNames[i] })
    }))
  }

  try {
    const { bodySelector } = getSelectors(link)

    const parser = await loadParser(link)
    const [body] = parser.toArray(bodySelector)
    const allImagesInBody = parser.toArray(`${bodySelector} img`)

    const tooManyImages = allImagesInBody.length > 2
    if (tooManyImages) {
      return null
    }

    const listOfSrc = getSrcList({ url: link, imageTags: allImagesInBody })
    const listOfBuffer = await toListOfBuffer(listOfSrc)
    let listOfImageName = listOfBuffer.map(createImageName)
    await saveBunchOfImages({ buffers: listOfBuffer, imageNames: listOfImageName })

    // after saving gif images as mp4 format, change its extension too.
    listOfImageName = changeGifToMp4Extension(listOfImageName)
    const embedVideos = parser.toArray(`${bodySelector} iframe,embed`) || []
    const hasEmbededVideos = embedVideos.length
    const updatedBody = allImagesInBody.length
      ? updateImageAttributes({
        root: body,
        parser,
        imageNames: listOfImageName,
        newStyle: 'max-width: 100%;',
      })
      : body
    const article = {
      ...createArticle({
        url: link,
        parser,
        additionalFields: {
          category: getCategory(link),
          comments: [],
          thumbnail: getThumbnailPath({ imageList: listOfImageName, hasEmbededVideos }),
          votes: [],
        },
      }),
      body: sanitizeHtml(updatedBody.html()),
    }

    return article
  } catch (error) {
    console.log(error)
    return null
  }
}
