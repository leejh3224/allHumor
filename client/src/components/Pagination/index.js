import React from 'react'
import { number, func, arrayOf, string } from 'prop-types'
import { Link } from 'react-router-dom'
import { spacing, colors, media } from 'styles/theme'
import { css } from 'emotion'

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `1px solid ${colors.lightGrey}`,
  width: 50,
  height: 50,
  textDecoration: 'none',
  marginRight: spacing.xsmall,

  [media.lessThan('medium')]: {
    width: 40,
    height: 40,
  },
}

const LongButtonStyle = {
  ...buttonStyle,
  width: 100,

  [media.lessThan('medium')]: {
    width: 70,
    height: 40,
  },
}

const activeStyle = {
  backgroundColor: colors.primary,
  color: colors.white,
}

const LastButtonStyle = {
  ...LongButtonStyle,
  marginRight: 0,
}

const Pagination = ({
  currentPage,
  lastPage,
  rangeMinMax,
  loadArticles,
  loadNextPage,
  loadPrevPage,
  category,
  nextPage,
  prevPage,
}) => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'center',
      margin: spacing.medium,

      [media.lessThan('medium')]: {
        margin: spacing.small,
      },
    }}
  >
    <Link
      to={`/${category}/1`}
      css={LongButtonStyle}
      onClick={() => currentPage !== 1 && loadArticles(category, 1)}
    >
      처음
    </Link>
    <Link
      to={`/${category}/${currentPage <= 5 ? 1 : prevPage}`}
      css={buttonStyle}
      onClick={loadPrevPage}
    >
      <i className="ion-ios-arrow-left" />
    </Link>
    {rangeMinMax.map(page => (
      <Link
        to={`/${category}/${page}`}
        key={page}
        onClick={() => loadArticles(category, page)}
        css={css(buttonStyle, currentPage === page && activeStyle)}
      >
        {page}
      </Link>
    ))}
    <Link
      to={`/${category}/${nextPage >= lastPage ? lastPage : nextPage}`}
      css={buttonStyle}
      onClick={loadNextPage}
    >
      <i className="ion-ios-arrow-right" />
    </Link>
    <Link
      to={`/${category}/${lastPage}`}
      css={LastButtonStyle}
      onClick={() =>
        currentPage !== lastPage && loadArticles(category, lastPage)
      }
    >
      마지막
    </Link>
  </div>
)

Pagination.propTypes = {
  currentPage: number.isRequired,
  lastPage: number.isRequired,
  rangeMinMax: arrayOf(number).isRequired,
  loadArticles: func.isRequired,
  loadNextPage: func.isRequired,
  loadPrevPage: func.isRequired,
  category: string.isRequired,
  nextPage: number.isRequired,
  prevPage: number.isRequired,
}

export default Pagination
