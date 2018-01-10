import React from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from 'utils/formatDate'
import { ShareButton } from 'components'
import { css } from 'emotion'
import { compose, withState } from 'recompose'
import styles from './ListItem.sass'

const flex = {
  display: 'flex',
}

const h1 = css`
  display: inline-block;
  font-size: 1.3rem;
  font-weight: 600;
  margin-right: 0.5rem;
`

// emotion
// nested selectors
/*
  .${h1} {
    그냥 css
  }
  css 뒤에 ; 붙일 필요도 없음
  hover 문제는 아래와 같이 해결가능 ㄷㄷㄷ
 */

/* eslint-disable */
const ListItem = ({ id, thumbnail, title, author, date, site, hover, setHover }) => (
  <Link className={styles.link} to={`/article/${id}`}>
    <li onMouseEnter={() => setHover('true')} onMouseLeave={() => setHover('false')}>
      <article
        css={{
          ...flex,
          height: 200,
          padding: '1rem',
          ':hover': { backgroundColor: hover && 'red' },
        }}
      >
        <figure className={styles.thumbnail}>
          <img src={thumbnail} alt="썸네일" />
        </figure>
        <div className={styles.content}>
          <div css={{ ...flex, flexWrap: 'wrap' }}>
            <h1 className={h1}>{title}</h1>
            <span className={styles.siteInfo}>{site === 'dogdrip' ? '개드립' : ''}</span>
            <h2 className={styles.author}>
              {author}
              <span css={{ flex: 1, textAlign: 'right' }}>{formatDate(date)}</span>
            </h2>
          </div>
          <div css={{ ...flex, alignItems: 'flex-end' }}>
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

export default compose(withState('hover', 'setHover', false))(ListItem)
