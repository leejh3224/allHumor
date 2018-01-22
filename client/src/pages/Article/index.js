import React, { Component } from 'react'
import { shape, string, bool, func } from 'prop-types'
import StickyOnScroll from 'pages/StickyOnScroll'
import {
  ArticleContentContainer,
  CategoryGroupContainer,
  CommentsContainer,
  HeaderContainer,
} from 'containers'

class Article extends Component {
  static propTypes = {
    location: shape({ pathname: string.isRequired }).isRequired,
    isSticky: bool.isRequired,
    auth: shape({ isAuthenticated: func.isRequired, logout: func.isRequired })
      .isRequired,
  }
  state = {
    userId: '',
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated()) {
      this.props.auth.getProfile((err, profile) => {
        if (profile) {
          this.setState(prev => ({
            ...prev,
            userId: profile.identities[0].user_id,
          }))
        }
      })
    }
  }

  render() {
    const {
      auth: { isAuthenticated, logout },
      location: { pathname },
      isSticky,
    } = this.props
    const { userId } = this.state

    const idRegex = /(article)\/([\w]{0,})/
    const articleId = idRegex.exec(pathname)[2]
    return (
      <div>
        <HeaderContainer isLoggedIn={isAuthenticated()} logout={logout} />
        <CategoryGroupContainer isSticky={isSticky} />
        <section css={{ paddingTop: isSticky ? 50 : 0 }}>
          <ArticleContentContainer articleId={articleId} userId={userId} />
        </section>
        <CommentsContainer />
      </div>
    )
  }
}

export default StickyOnScroll(Article)
