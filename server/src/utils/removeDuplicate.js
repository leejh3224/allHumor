import Article from 'models/Article'

export default async (links) => {
  const domainNameRegex = /^(https?:\/\/www.)([\w-_]+)/
  const domainName = links[0].match(domainNameRegex)[2]

  const [fromDB = { articleIds: [] }] = await Article.aggregate([
    {
      $match: { site: domainName },
    },
    {
      $group: { _id: null, articleIds: { $push: '$articleId' } },
    },
    {
      $project: { _id: 0, articleIds: 1 },
    },
  ])

  const getArticleId = (link) => {
    const queryStringRegex = /(no|postNum)=?(\d+)/
    const routeParamsRegex = /\/(\d+)/

    if (queryStringRegex.test(link)) {
      return link.match(queryStringRegex)[2]
    }
    return link.match(routeParamsRegex)[1]
  }

  return links.filter((link) => {
    const articleId = getArticleId(link)
    const isSaved = fromDB.articleIds.includes(articleId)
    return !isSaved
  })
}
