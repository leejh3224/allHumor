import React, { Component } from 'react'
import { number, func } from 'prop-types'
import { connect } from 'react-redux'

import * as actions from 'store/article/actions'
import * as articleReducer from 'store/article/reducer'
import { isAuthenticated } from 'utils/auth'
import history from 'utils/history'
import Button from './button'

class ThumbsupButton extends Component {
  static propTypes = {
    voteArticle: func.isRequired,
    voteCount: number.isRequired,
  }
  componentWillUnmount() {
    clearInterval(this.intervalId)
  }
  handleVoting = () => {
    const { voteArticle } = this.props

    if (!isAuthenticated()) {
      return history.replace('/login')
    }
    return voteArticle()
  }
  votingMouseDown = () => {
    this.intervalId = setInterval(() => this.handleVoting(), 500)
  }
  votingMouseUp = () => clearInterval(this.intervalId)

  render() {
    const { voteCount } = this.props
    const { handleVoting, votingMouseDown, votingMouseUp } = this
    return (
      <Button
        counts={voteCount}
        handleVoting={handleVoting}
        votingMouseDown={votingMouseDown}
        votingMouseUp={votingMouseUp}
      />
    )
  }
}

export default connect(
  state => ({
    voteCount: articleReducer.getVoteCount(state),
  }),
  actions,
)(ThumbsupButton)
