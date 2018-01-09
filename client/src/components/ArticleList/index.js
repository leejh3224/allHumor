import React from 'react'
import { arrayOf, object } from 'prop-types'
import ListItem from './ListItem'

const ArticleList = ({ articles }) => (
  <ul>
    {articles.map((article) => {
      const {
 _id, author, uploadDate, title, thumbnail, site,
} = article

      return (
        <ListItem
          key={_id}
          id={_id}
          author={author}
          date={uploadDate}
          title={title}
          thumbnail={`../../../${thumbnail || 'images/noimage.jpg'}`}
          site={site}
        />
      )
    })}
  </ul>
)

ArticleList.propTypes = {
  articles: arrayOf(object).isRequired,
}

export default ArticleList
