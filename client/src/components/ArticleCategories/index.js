import React from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './ArticleCategories.sass'

const categories = {
  전체: 'all',
  개드립: 'dogdrip',
  오유: 'all',
  디씨: 'all',
  네이트판: 'all',
  인스티즈: 'all',
}

const ArticleCategories = ({ selected }) => (
  <nav className={styles.container}>
    {Object.keys(categories).map(name => (
      <Link
        key={name}
        to={`/${categories[name]}/1`}
        className={`${styles.item} ${selected === categories[name] && styles.active}`}
      >
        {name}
      </Link>
    ))}
  </nav>
)

ArticleCategories.propTypes = {
  selected: string.isRequired,
}

export default ArticleCategories
