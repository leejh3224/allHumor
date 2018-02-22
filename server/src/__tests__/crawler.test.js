// import request from 'superagent'
// import cheerio from 'cheerio'
import axios from 'axios'
import { URL } from 'url'
import config from 'config'
import app from 'app'
import loadParser from 'utils/loadParser'
import selectLinks from 'utils/selectLinks'
import createArticle from 'utils/createArticle'
import normalizeUrl from 'normalize-url'
import saveImage from 'utils/saveImage'
import getSrcList from 'utils/getSrcList'
import srcToArrayBuffer from 'utils/srcToArrayBuffer'
import createImageName from 'utils/createImageName'
import changeChildImageAttributes from 'utils/changeChildImageAttributes'
import sanitizeHtml from 'utils/sanitizeHtml'
import getSelectorsForArticle from 'utils/getSelectorsForArticle'

const env = process.env.NODE_ENV
const { port } = config[env]
let server

beforeAll(async () => {
  app.init()
  server = app.listen(port, () => console.log(`now connected to port: ${port}`))
})

afterAll(() => {
  // you can only close listening instance
  server.close()
})

// test('GET /crawlers/dogdrip/:page', async () => {
//   // dogdrip main url은 page만 바꿔주면 됨
//   const page = 1
//   const dogdripMainUrl = `http://www.dogdrip.net/index.php?mid=dogdrip&page=${page}`
//   const kickOffUrl = `http://www.kick-off.co.kr/pub/overseas.aspx?pageNum=${page}&condition=I`
//   const ddengleUrl = `https://www.ddengle.com/index.php?mid=board_vote_all&page=${page}`
//   const instizUrl = `https://www.instiz.net/bbs/list.php?id=fanclip&page=${page}`

//   try {
//     const links = await selectLinks({
//       url: ddengleUrl,
//       selector: 'tbody tr .title .bubble',
//       selectorsForUnneccessaryNode: [],
//     })
//     return links
//   } catch (error) {
//     console.log(error)
//   }
// })

function isValidImg(img) {
  return img.attr('src')
}

// test('createArticle', async () => {
//   try {
//     const dogdripArticle = await createArticle({
//       url: 'http://www.dogdrip.net/154910945',
//       ...getSelectorsForArticle('http://www.dogdrip.net/154910945'),
//     })
//     const kickoffArticle = await createArticle({
//       url:
//         'http://www.kick-off.co.kr/pub/overseas.aspx?mode=view&postNum=98382&pageNum=1&searchType=&searchText=&condition=I',
//       ...getSelectorsForArticle('http://www.kick-off.co.kr/pub/overseas.aspx?mode=view&postNum=98382&pageNum=1&searchType=&searchText=&condition=I')
//     })
//     const ddengleArticle = await createArticle({
//       url: 'https://www.ddengle.com/board_vote_all/6205132',
//       ...getSelectorsForArticle('https://www.ddengle.com/board_vote_all/6205132')
//     })
//     const instizArticle = await createArticle({
//       url: 'https://www.instiz.net/fanclip?no=462207&page=1',
//       ...getSelectorsForArticle('https://www.instiz.net/fanclip?no=462207&page=1')
//     })
//     return [
//       dogdripArticle,
//       kickoffArticle,
//       ddengleArticle,
//       instizArticle,
//     ]
//   } catch (error) {
//     console.log(error)
//   }
// })

// test('extracting img src and transform it to valid form', async () => {
//   try {
//     const list = await getSrcList(
//        'http://www.dogdrip.net/154944718',
//     )
//     console.log(list)
//   } catch (error) {
//     console.log(error)
//   }
// })

// test('save images', async () => {
//   const srcList = [
//     'http://www.dogdrip.net/dvs/b/i/18/02/17/78/697/469/154/2fa447219d36358094ff03f14f00255c.jpg',
//   ]
//   await saveImage(srcList)
//   await console.log('finished')
// })

// test('', async () => {
//   try {
//     const parser = await loadParser('http://www.dogdrip.net/155005165')
//     console.log(parser.getNodesList('.contentBody .xe_content').map(el =>
//       el
//         .find('img')
//         .attr('src', 'aa')
//         .end()
//         .html()))
//   } catch (error) {
//     console.log(error)
//   }
// })

test('get array of buffer', async () => {
  const link = 'http://www.dogdrip.net/155057914'

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
  }

  const [body, withoutBody] = await Promise.all([updateChildImages(), toArticle()])

  return {
    ...withoutBody,
    body,
  }
})
