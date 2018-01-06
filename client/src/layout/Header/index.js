import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './Header.sass'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.wrapper}>
      <div className={styles.brand}>ALL유머</div>
      <a href="/" className={styles.loginButton}>
        로그인
      </a>
    </div>
    {/* eslint-disable jsx-a11y/anchor-is-valid */}
    <nav className={styles.tabLinks}>
      <Link className={styles.tabLink} to="/">
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
