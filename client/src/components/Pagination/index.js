import React from 'react'
import { number, func, arrayOf, string } from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './Pagination.sass'

const Pagination = ({
  currentPage,
  loadPage,
  lastPage,
  rangeMinMax,
  loadNextPage,
  loadPrevPage,
  category,
  nextPage,
  prevPage,
}) => (
  <div className={styles.container}>
    <Link
      to={`/${category}/1`}
      className={`${styles.pageButton} ${styles.large}`}
      onClick={() => currentPage !== 1 && loadPage(1)}
    >
      처음
    </Link>
    <Link
      to={`/${category}/${currentPage > 0 && currentPage < 6 ? 1 : prevPage}`}
      className={styles.pageButton}
      onClick={loadPrevPage}
    >
      <i className="ion-ios-arrow-left" />
    </Link>
    {rangeMinMax.map(num => (
      <Link
        to={`/${category}/${num}`}
        key={num}
        onClick={() => loadPage(num)}
        className={`${styles.pageButton} ${currentPage === num && styles.active}`}
      >
        {num}
      </Link>
    ))}
    <Link to={`/${category}/${nextPage}`} className={styles.pageButton} onClick={loadNextPage}>
      <i className="ion-ios-arrow-right" />
    </Link>
    <Link
      to={`/${category}/${lastPage}`}
      className={`${styles.pageButton} ${styles.large}`}
      onClick={() => currentPage !== lastPage && loadPage(lastPage)}
    >
      마지막
    </Link>
  </div>
)

Pagination.propTypes = {
  currentPage: number.isRequired,
  loadPage: func.isRequired,
  lastPage: number.isRequired,
  rangeMinMax: arrayOf(number).isRequired,
  loadNextPage: func.isRequired,
  loadPrevPage: func.isRequired,
  category: string.isRequired,
  nextPage: number.isRequired,
  prevPage: number.isRequired,
}

export default Pagination
