import React from 'react'
// import PropTypes from 'prop-types'
import styles from './Pagination.sass'

const Pagination = () => (
  <div className={styles.container}>
    <button className={`${styles.pageButton} ${styles.large}`}>처음</button>
    <button className={styles.pageButton}>
      <i className="ion-ios-arrow-left" />
    </button>
    <button className={styles.pageButton}>1</button>
    <button className={styles.pageButton}>2</button>
    <button className={styles.pageButton}>3</button>
    <button className={styles.pageButton}>4</button>
    <button className={styles.pageButton}>5</button>
    <button className={styles.pageButton}>
      <i className="ion-ios-arrow-right" />
    </button>
    <button className={`${styles.pageButton} ${styles.large}`}>마지막</button>
  </div>
)

Pagination.propTypes = {}

export default Pagination
