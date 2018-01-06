import React from 'react'
import { number, func, arrayOf } from 'prop-types'
import styles from './Pagination.sass'

const Pagination = ({
  currentPage,
  loadPage,
  lastPage,
  rangeMinMax,
  loadNextMinPage,
  loadPrevMinPage,
}) => (
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
    {rangeMinMax.map(num => (
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

Pagination.propTypes = {
  currentPage: number.isRequired,
  loadPage: func.isRequired,
  lastPage: number.isRequired,
  rangeMinMax: arrayOf(number).isRequired,
  loadNextMinPage: func.isRequired,
  loadPrevMinPage: func.isRequired,
}

export default Pagination
