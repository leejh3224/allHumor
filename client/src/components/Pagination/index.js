import React from 'react'
import { number, func } from 'prop-types'
import range from 'lodash/range'
import styles from './Pagination.sass'

/* eslint-disable */
const Pagination = ({
  currentPage,
  loadPage,
  minPage,
  maxPage,
  lastPage,
  loadNextMinPage,
  loadPrevMinPage,
}) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.pageButton} ${styles.large}`}
        onClick={() => currentPage !== 1 && loadPage(1)}
      >
        처음
      </button>
      <button className={styles.pageButton} onClick={loadPrevMinPage}>
        <i className="ion-ios-arrow-left" />
      </button>
      {range(minPage, maxPage).map(num => (
        <button
          key={num}
          onClick={() => loadPage(num)}
          className={`${styles.pageButton} ${currentPage === num && styles.active}`}
        >
          {num}
        </button>
      ))}
      <button className={styles.pageButton} onClick={loadNextMinPage}>
        <i className="ion-ios-arrow-right" />
      </button>
      <button
        className={`${styles.pageButton} ${styles.large}`}
        onClick={() => currentPage !== lastPage && loadPage(lastPage)}
      >
        마지막
      </button>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: number.isRequired,
  loadPage: func.isRequired,
  firstPage: number.isRequired,
  lastPage: number.isRequired,
}

export default Pagination
