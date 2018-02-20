import React from 'react'
import { fonts, spacing } from 'styles/theme'
import WithAuth0 from 'pages/WithAuth0'
import { SearchPageContainer } from 'containers'

const Search = () => (
  <SearchPageContainer>
    {({
      // keyword,
      // handleInputChange,
      // handleSubmit,
      searchResult,
      fetchingSearchResult,
      isSubmitted,
    }) => {
      const results = Object.values(searchResult)
      return (
        <div>
          {/* <SearchForm
            keyword={keyword}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          /> */}
          {fetchingSearchResult ? (
            '검색결과를 불러오는 중...'
          ) : (
            <div>
              <h1
                css={{
                  ...fonts.header,
                  padding: isSubmitted ? spacing.medium : 0,
                  paddingBottom: 0,
                }}
              >
                {(() => {
                  if (isSubmitted) {
                    if (results.length) {
                      return `총 ${results.length}건의 검색 결과가 있습니다.`
                    }
                    return '검색 결과가 존재하지 않습니다.'
                  }
                  return null
                })()}
              </h1>
              {results.length ? results.map(<div />) : null}
            </div>
          )}
        </div>
      )
    }}
  </SearchPageContainer>
)

Search.propTypes = {}

export default WithAuth0(Search)
