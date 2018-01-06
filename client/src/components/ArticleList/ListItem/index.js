import React from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from 'utils/formatDate'
import styles from './ListItem.sass'

const ListItem = ({
  id, thumbnail, title, author, date, type,
}) => (
  <li>
    <article className={styles.article}>
      <figure className={styles.thumbnail}>
        <img src={thumbnail} alt="썸네일" />
      </figure>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link className={styles.title} to={`/article/${id}`}>
            <h1>{title}</h1>
          </Link>
          <h2 className={styles.author}>
            {author}
            <span className={styles.siteInfo}>{type === 'dogdrip' ? '개드립' : ''}</span>
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
          <a className={styles.action} href="/">
            <i className="ion-share" />
            <span className={styles.actionGuide}>공유</span>
          </a>
        </div>
      </div>
    </article>
  </li>
)

ListItem.propTypes = {
  thumbnail: string.isRequired,
  title: string.isRequired,
  author: string.isRequired,
  date: string.isRequired,
  id: string.isRequired,
  type: string.isRequired,
}

export default ListItem
