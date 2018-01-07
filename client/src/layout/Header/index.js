import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './Header.sass'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <Link className={styles.brand} to="/all/1">
        ALL유머
      </Link>
      <Link to="/" className={styles.loginButton}>
        로그인
      </Link>
    </div>
    {/* eslint-disable jsx-a11y/anchor-is-valid */}
    <nav className={styles.tabLinks}>
      <Link className={styles.tabLink} to="/all/1">
        새 글
      </Link>
      <Link className={styles.tabLink} to="/">
        공유
      </Link>
      <Link className={styles.tabLink} to="/">
        검색
      </Link>
    </nav>
  </header>
)

Header.propTypes = {}

export default Header
