import React, { Component } from 'react'
import { number, func, bool } from 'prop-types'
import { connect } from 'react-redux'

import * as votingDucks from 'store/modules/voting'
import history from 'utils/history'
import Button from './button'

class ThumbsupButton extends Component {
  static propTypes = {
    isLoggedIn: bool.isRequired,
    voteArticle: func.isRequired,
    voteCount: number.isRequired,
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
    voteCount: votingDucks.getVoteCount(state),
  }),
  votingDucks,
)(ThumbsupButton)
