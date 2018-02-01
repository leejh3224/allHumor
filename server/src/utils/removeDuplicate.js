import Article from 'models/Article'

export default async (urls, site) => {
  const [fromDB = { articleIds: [] }] = await Article.aggregate([
    {
      $match: { site },
    },
    {
      $group: { _id: null, articleIds: { $push: '$articleId' } },
    },
    {
      $project: { _id: 0, articleIds: 1 },
    },
  ])

  return urls
    .map((url) => {
      const getArticleId = str => str.replace(/[http|https]{1,}:\/\/www.[\w.]{1,}\//, '')
      const hasCrawled = fromDB.articleIds.includes(getArticleId(url))

      if (hasCrawled) {
        return null
      }

      return url
    })
    .filter(url => url)
}
