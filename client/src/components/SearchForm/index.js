import React from 'react'
import { func, string } from 'prop-types'

import { MagnifyingGlassIcon } from 'components/icons'
import { colors, spacing, fonts } from 'styles/theme'

const SearchForm = ({ keyword, handleInputChange, handleSubmit }) => (
  <div
    css={{
      display: 'flex',
      backgroundColor: colors.primary,
      width: '100%',
      padding: `${spacing.small}px ${spacing.medium}px`,
      position: 'relative',
    }}
  >
    <form css={{ display: 'flex', flex: 1 }} onSubmit={handleSubmit}>
      <MagnifyingGlassIcon
        color={colors.black}
        cssProps={{
          position: 'absolute',
          top: 21,
          left: 30,
        }}
      />
      <input
        css={{
          flex: 1,
          ...fonts.body,
          height: 56,
          borderRadius: 6,
          textIndent: 50,
          maxHeight: 45,
        }}
        type="text"
        placeholder="검색: 제목, 내용 혹은 작성자"
        onChange={handleInputChange}
        value={keyword}
      />
    </form>
  </div>
)

SearchForm.propTypes = {
  keyword: string.isRequired,
  handleInputChange: func.isRequired,
  handleSubmit: func.isRequired,
}

export default SearchForm
