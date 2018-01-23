import React, { Component } from 'react'
import history from 'utils/history'
import { func, string, shape, number } from 'prop-types'
import { connect } from 'react-redux'
import { ArticleContent, Voting } from 'components'
import isEmpty from 'lodash/isEmpty'
import * as entityDucks from 'store/modules/entity'
import * as paginationDucks from 'store/modules/pagination'
import * as votingDucks from 'store/modules/voting'

class ArticleContentContainer extends Component {
  static propTypes = {
    loadArticle: func.isRequired,
    articleId: string.isRequired,
    articleContent: shape({}).isRequired,
    voteArticle: func.isRequired,
    voteCounts: number.isRequired,
    userId: string.isRequired,
  }
  componentWillMount() {
    const { articleId, loadArticle } = this.props
    loadArticle(articleId)
  }
  handleVoting = (userId) => {
    if (this.props.userId === '') {
      return history.replace('/login')
    }
    return this.props.voteArticle(userId)
  }
  votingMouseDown = (userId) => {
    this.intervalId = setInterval(() => this.handleVoting(userId), 700)
  }
  votingMouseUp = () => clearInterval(this.intervalId)

  render() {
    const {
      articleContent, articleId, voteCounts, userId,
    } = this.props
    const { votingMouseDown, votingMouseUp } = this

    if (!isEmpty(articleContent)) {
      return [
        <ArticleContent
          key="article_content"
          article={articleContent[articleId]}
        />,
        <Voting
          key="article_votes"
          counts={voteCounts}
          userId={userId}
          votingMouseDown={votingMouseDown}
          votingMouseUp={votingMouseUp}
        />,
      ]
    }
    return 'loading...'
  }
}

/* eslint-disable */
export default connect(
  state => ({
    articleContent: entityDucks.selectors.getArticles(state),
    voteCounts: votingDucks.selectors.getVoteCounts(state),
  }),
  {
    loadArticle: paginationDucks.actions.loadArticle,
    voteArticle: votingDucks.actions.voteArticle,
  },
)(ArticleContentContainer)
