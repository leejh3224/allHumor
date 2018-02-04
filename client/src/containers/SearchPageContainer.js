import { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import * as searchDucks from 'store/modules/search'
import * as fetchingDucks from 'store/modules/fetching'

class SearchPageContainer extends Component {
  static propTypes = {
    children: func.isRequired,
  }
  state = {}
  render() {
    return this.props.children(this.props)
  }
}

export default connect(
  state => ({
    keyword: searchDucks.getKeyword(state),
    searchResult: searchDucks.getResult(state),
    fetchingSearchResult: fetchingDucks.getFetchingSearchResult(state),
    isSubmitted: searchDucks.getIsSubmitted(state),
  }),
  searchDucks,
)(SearchPageContainer)
