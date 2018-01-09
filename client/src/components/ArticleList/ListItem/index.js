import React from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from 'utils/formatDate'
import { ShareButton } from 'components'
import styles from './ListItem.sass'

const ListItem = ({
  id, thumbnail, title, author, date, site,
}) => (
  <Link className={styles.link} to={`/article/${id}`}>
    <li>
      <article className={styles.article}>
        <figure className={styles.thumbnail}>
          <img src={thumbnail} alt="썸네일" />
        </figure>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <span className={styles.siteInfo}>{site === 'dogdrip' ? '개드립' : ''}</span>
            <h2 className={styles.author}>
              {author}
              <span className={styles.timestamp}>{formatDate(date)}</span>
            </h2>
          </div>
          <div className={styles.footer}>
            <div className={styles.meta}>
              <i className="ion-ios-chatbubble-outline" /> 12
            </div>
            <div className={styles.meta}>
              <i className="ion-thumbsup" /> 12
            </div>
            <ShareButton />
          </div>
        </div>
      </article>
    </li>
  </Link>
)

ListItem.propTypes = {
  thumbnail: string.isRequired,
  title: string.isRequired,
  author: string.isRequired,
  date: string.isRequired,
  id: string.isRequired,
  site: string.isRequired,
}

export default ListItem
