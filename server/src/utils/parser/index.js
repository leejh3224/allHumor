import getParser from './getParser'

export default class Parser {
  constructor({ domain, html }) {
    const domainNameRegex = /^(https?:\/\/www.)([\w-_]+)/
    const domainName = domain.match(domainNameRegex)[2]
    const withoutDash = domainName.replace(/-/, '')

    this.domain = domain
    this.html = html
    this.domainName = withoutDash
  }
  async getResult() {
    const { domainName, domain, html } = this
    const parser = getParser(domainName)
    const result = await parser(domain, html)
    return result
  }
}
