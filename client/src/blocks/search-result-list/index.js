import React, { Component } from 'react'
import { arrayOf, shape, bool, string } from 'prop-types'
import { connect } from 'react-redux'

import * as searchReducer from 'store/search/reducer'
import * as fetchingReducer from 'store/fetching/reducer'
import * as errorMessageReducer from 'store/errorMessage/reducer'
import { PreviewFeed, NoResult } from 'components'
import { Loading } from 'components/loading'
import { colors, spacing, fonts } from 'styles/theme'
import history from 'utils/history'

class SearchResultList extends Component {
  static defaultProps = {
    errorMessage: null,
    finished: false,
  }
  static propTypes = {
    searchResult: arrayOf(shape()).isRequired,
    fetching: bool.isRequired,
    errorMessage: string,
    finished: bool,
  }
  render() {
    const wrapperStyle = {
      minHeight: '90vh',
    }

    const {
      searchResult, fetching, errorMessage, finished,
    } = this.props

    if (fetching && !searchResult.length) {
      return <Loading />
    }

    if (errorMessage && !searchResult.length) {
      return (
        <NoResult
          heading="이런... 검색결과가 없습니다"
          onClick={() => history.replace('/')}
          buttonContent="홈으로 돌아가기"
        />
      )
    }

    return (
      <div css={wrapperStyle}>
        {!!searchResult.length && (
          <span
            css={{
              display: 'block',
              padding: spacing.medium,
              paddingBottom: 0,
              color: colors.white,
              ...fonts.body,
            }}
          >
            {searchResult.length}건의 검색 결과가 있습니다.
          </span>
        )}
        {finished &&
          !searchResult.length && (
            <NoResult
              heading="이런... 검색결과가 없습니다"
              onClick={() => history.replace('/')}
              buttonContent="홈으로 돌아가기"
            />
          )}
        {!!searchResult.length &&
          searchResult.map(preview => <PreviewFeed key={preview._id} preview={preview} />)}
      </div>
    )
  }
}

export default connect(
  state => ({
    searchResult: searchReducer.getSearchResult(state),
    fetching: fetchingReducer.getFetching(state, 'search'),
    errorMessage: errorMessageReducer.getErrorMessage(state),
    finished: searchReducer.getFinished(state),
  }),
  null,
)(SearchResultList)
