import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './ArticleCategories.sass'

const ArticleCategories = () => (
  <nav className={styles.container}>
    <Link to="/all/1" className={styles.item}>
      전체
    </Link>
    <Link to="/dogdrip/1" className={styles.item}>
      개드립
    </Link>
    <Link to="/all/1" className={styles.item}>
      오유
    </Link>
    <Link to="/all/1" className={styles.item}>
      디씨
    </Link>
    <Link to="/all/1" className={styles.item}>
      네이트판
    </Link>
    <Link to="/all/1" className={styles.item}>
      인스티즈
    </Link>
  </nav>
)

ArticleCategories.propTypes = {}

export default ArticleCategories
