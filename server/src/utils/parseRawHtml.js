import cheerio from 'cheerio'
import axios from 'axios'
import parser from 'utils/parser'

export default async (url, site) => {
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data, {
      decodeEntities: false,
    })

    const article = await parser({ url, html: $, site })

    return article
  } catch (error) {
    console.log(error)
    return null
  }
}
