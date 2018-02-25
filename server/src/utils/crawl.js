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
    return string.includes('.gif')
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

    const [body] = parser.toArray(bodySelector)
    const imagesInBody = parser.toArray(`${bodySelector} img`)

    const gifImagesInBody = []
    const nonGifImagesInBody = []
    imagesInBody.forEach((element) => {
      const src = element.attr('src')
      if (checkGif(src)) {
        gifImagesInBody.push(element)
      } else {
        nonGifImagesInBody.push(element)
      }
    })

    const videosInBody = parser.toArray(`${bodySelector} iframe`).concat(gifImagesInBody)
    const tooManyImages = imagesInBody.length > 2

    if (tooManyImages) {
      return null
    }

    const listOfSrc = getSrcList({ url: link, imagesInBody })
    const listOfBuffer = await toListOfBuffer(listOfSrc)
    let listOfImageName = listOfBuffer.map(createImageName)

    // await Promise.all(listOfBuffer.map(async (buffer, i) => {
    //   await saveImage({ buffer, imageName: listOfImageName[i] })
    // }))

    listOfImageName = listOfImageName.map((name) => {
      if (checkGif(name)) {
        return name.replace(/.gif$/, '.mp4')
      }
      return name
    })

    const hasImages = nonGifImagesInBody.length
    const hasVideos = videosInBody.length
    const [thumbnail] = listOfImageName.filter(name => !name.includes('.mp4'))

    const getThumbnail = () => {
      if (hasImages) {
        return `/img/${thumbnail}`
      }
      if (hasVideos) {
        return '/images/video.png'
      }
      return null
    }

    const updatedBody = hasImages
      ? updateImageAttributes({
        root: body,
        parser,
        imageNames: listOfImageName,
        newStyle: 'max-width: 100%;',
      })
      : body.html()

    const article = {
      ...createArticle({
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
      }),
      body: sanitizeHtml(updatedBody),
    }

    console.log(article)

    return article
  } catch (error) {
    console.log(error)
    return null
  }
}
