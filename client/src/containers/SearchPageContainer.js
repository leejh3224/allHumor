import { Component } from 'react'
import { func, string, number } from 'prop-types'
import { connect } from 'react-redux'
import * as searchDucks from 'store/modules/search'
// import * as fetchingReducer from 'store/fetching/reducer'
// import * as paginationDucks from 'store/modules/pagination'

class SearchPageContainer extends Component {
  static propTypes = {
    children: func.isRequired,
    loadArticles: func.isRequired,
    category: string.isRequired,
    currentPage: number.isRequired,
  }
  componentDidMount() {
    const { loadArticles, category, currentPage } = this.props
    loadArticles(category, currentPage)
  }
  render() {
    return this.props.children(this.props)
  }
}

export default connect(
  state => ({
    keyword: searchDucks.getKeyword(state),
    searchResult: searchDucks.getResult(state),
    // fetchingSearchResult: fetchingReducer.getFetchingSearchResult(state),
    isSubmitted: searchDucks.getIsSubmitted(state),
    // category: paginationDucks.getArticlesCategory(state),
    // currentPage: paginationDucks.getArticlesCurrentPage(state),
  }),
  { ...searchDucks },
)(SearchPageContainer)
