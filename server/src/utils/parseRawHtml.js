import cheerio from 'cheerio'
import axios from 'axios'
import Parser from 'utils/parser'

export default async (url) => {
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data, {
      decodeEntities: false,
    })
    const parser = new Parser({ domain: url, html: $ })
    const article = await parser.getResult()
    return article
  } catch (error) {
    console.log(error)
    return null
  }
}
