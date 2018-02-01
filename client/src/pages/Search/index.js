import React from 'react'
import { fonts, spacing } from 'styles/theme'
import { SearchForm, PreviewItem } from 'components'
import { SearchPageContainer, PreviewListContainer } from 'containers'

const Search = () => (
  <SearchPageContainer>
    {({
 keyword, handleInputChange, handleSubmit, searchResult,
}) => {
      const results = Object.values(searchResult)
      return (
        <div>
          <SearchForm
            keyword={keyword}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <div>
            <h1
              css={{
                ...fonts.header,
                padding: spacing.medium,
              }}
            >
              {results.length
                ? `총 ${results.length}건의 검색 결과가 있습니다.`
                : '검색 결과가 존재하지 않습니다.'}
            </h1>
          </div>
          {results.length ? results.map(article => <PreviewItem article={article} />) : null}
          <div
            css={{
              marginTop: spacing.medium,
            }}
          >
            <h1
              css={{
                ...fonts.header,
                paddingLeft: spacing.medium,
              }}
            >
              인기 게시물
            </h1>
            <PreviewListContainer order="popularity" />
          </div>
        </div>
      )
    }}
  </SearchPageContainer>
)

Search.propTypes = {}

export default Search
