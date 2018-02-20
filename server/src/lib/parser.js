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
  getNodes(selector) {
    const nodes = []
    this.$(selector).each((i, el) => {
      nodes.push(this.$(el))
    })
    return nodes
  }
}

export default Parser
