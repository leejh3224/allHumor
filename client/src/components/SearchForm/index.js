import React from 'react'
import { func, string } from 'prop-types'
import { colors, spacing, fonts } from 'styles/theme'

const SearchForm = ({ keyword, handleInputChange, handleSubmit }) => (
  <div
    css={{
      display: 'flex',
      backgroundColor: colors.primary,
      width: '100%',
      padding: spacing.small,
      position: 'relative',
    }}
  >
    <form css={{ display: 'flex', flex: 1 }} onSubmit={handleSubmit}>
      <i
        className="ion-ios-search-strong"
        css={{
          position: 'absolute',
          top: 18,
          left: 26,
          ...fonts.icon,
        }}
      />
      <input
        css={{
          flex: 1,
          ...fonts.body,
          borderRadius: 30,
          textIndent: 50,
          maxHeight: 45,
        }}
        type="text"
        placeholder="검색: 제목, 내용 혹은 작성자"
        onChange={handleInputChange}
        value={keyword}
      />
    </form>
    <button
      css={{
        backgroundColor: colors.primary,
        color: colors.white,
        cursor: 'pointer',
        padding: spacing.small,
        ...fonts.body,
      }}
    >
      취소
    </button>
  </div>
)

SearchForm.propTypes = {
  keyword: string.isRequired,
  handleInputChange: func.isRequired,
  handleSubmit: func.isRequired,
}

export default SearchForm
