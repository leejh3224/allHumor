import axios from 'axios'
import Parser from 'modules/parser'

async function getDocument(targetUrl) {
  try {
    const { data: document } = await axios.get(targetUrl)
    return document
  } catch (error) {
    console.log(error)
    return null
  }
}

export default async (url) => {
  try {
    const document = await getDocument(url)
    const parser = new Parser({
      document,
      options: {
        // 라틴 계열의 문자가 아닌 문자를 파싱하기 위해 꺼야함
        // https://github.com/cheeriojs/cheerio/issues/866
        decodeEntities: false,
      },
    })

    return parser
  } catch (error) {
    console.log(error)
  }
}
