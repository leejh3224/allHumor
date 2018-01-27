import React, { Component } from 'react'
import history from 'utils/history'
import { func, string, shape, number, bool } from 'prop-types'
import { connect } from 'react-redux'
import { ArticleContent, Voting } from 'components'
import isEmpty from 'lodash/isEmpty'
import * as articleDucks from 'store/modules/article'
import * as votingDucks from 'store/modules/voting'

class ArticleContentContainer extends Component {
  static propTypes = {
    loadArticle: func.isRequired,
    articleId: string.isRequired,
    articleContent: shape({}).isRequired,
    voteArticle: func.isRequired,
    voteCount: number.isRequired,
    isLoggedIn: bool.isRequired,
  }
  componentWillMount() {
    const { articleId, loadArticle } = this.props
    loadArticle(articleId)
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  handleVoting = () => {
    const { isLoggedIn, voteArticle } = this.props

    if (!isLoggedIn) {
      return history.replace('/login')
    }
    return voteArticle()
  }
  votingMouseDown = () => {
    this.intervalId = setInterval(() => this.handleVoting(), 500)
  }
  votingMouseUp = () => clearInterval(this.intervalId)

  render() {
    const { articleContent, articleId, voteCount } = this.props
    const { handleVoting, votingMouseDown, votingMouseUp } = this

    if (!isEmpty(articleContent)) {
      return [
        <ArticleContent
          key="article_content"
          article={articleContent[articleId]}
        />,
        <Voting
          key="article_votes"
          counts={voteCount}
          handleVoting={handleVoting}
          votingMouseDown={votingMouseDown}
          votingMouseUp={votingMouseUp}
        />,
      ]
    }
    return 'loading...'
  }
}

export default connect(
  state => ({
    articleContent: articleDucks.getArticles(state),
    voteCount: votingDucks.getVoteCount(state),
  }),
  {
    ...articleDucks,
    ...votingDucks,
  },
)(ArticleContentContainer)
