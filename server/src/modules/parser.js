import cheerio from 'cheerio'

class Parser {
  constructor({ document, options }) {
    this.document = document
    this.options = options
    this.$ = this.load()
  }
  load() {
    const { document, options } = this
    return cheerio.load(document, options)
  }
  remove(selectors) {
    if (selectors.length) {
      selectors.forEach((selector) => {
        this.$(selector).remove()
      })
    }
    return this
  }
  getNodesList(selector) {
    const nodes = []
    this.$(selector).each((i, el) => {
      nodes.push(this.$(el))
    })
    return nodes
  }
  getText(selector) {
    return this.$(selector).text()
  }
  getHtml(selector) {
    return this.$(selector).html()
  }
}

export default Parser
