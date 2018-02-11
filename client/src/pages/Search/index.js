import React from 'react'
import { fonts, spacing } from 'styles/theme'
import { SearchForm, ImageLink } from 'components'
import WithAuth0 from 'pages/WithAuth0'
import { SearchPageContainer } from 'containers'

const Search = () => (
  <SearchPageContainer>
    {({
      keyword,
      handleInputChange,
      handleSubmit,
      searchResult,
      fetchingSearchResult,
      isSubmitted,
    }) => {
      const results = Object.values(searchResult)
      return (
        <div>
          <SearchForm
            keyword={keyword}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          {fetchingSearchResult ? (
            '검색결과를 불러오는 중...'
          ) : (
            <div>
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
                  게시판 바로가기
                </h1>
                <div
                  css={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                  }}
                >
                  <ImageLink width={150} height={150} name="유머" imageName="humor.png" />
                  <ImageLink width={150} height={150} name="비트코인" imageName="bitcoin.jpg" />
                  <ImageLink width={150} height={150} name="축구" imageName="soccer.png" />
                  <ImageLink width={150} height={150} name="아이돌" imageName="idol.jpg" />
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }}
  </SearchPageContainer>
)

Search.propTypes = {}

export default WithAuth0(Search)
