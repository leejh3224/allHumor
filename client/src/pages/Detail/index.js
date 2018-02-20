import React from 'react'
import { shape, string } from 'prop-types'

import ScrollDetector from 'pages/ScrollDetector'
import { Article, CommentList } from 'blocks'
import AddComment from 'blocks/add-comment'
import WithAuth0 from 'pages/WithAuth0'
import { isAuthenticated } from 'utils/auth'

const Detail = ({ location: { pathname } }) => {
  const idRegex = /[^/]+/
  const articleId = idRegex.exec(pathname)[0]
  return (
    <ScrollDetector>
      {({ isAtTheBottom }) => (
        <div>
          <Article articleId={articleId} isLoggedIn={isAuthenticated()} />
          <CommentList isLoggedIn={isAuthenticated()} isAtTheBottom={isAtTheBottom} />
          <div css={{ paddingBottom: 144 }} />
          <div
            css={{
              position: 'fixed',
              bottom: 0,
              width: '100%',
            }}
          >
            <AddComment />
          </div>
        </div>
      )}
    </ScrollDetector>
  )
}

Detail.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
}

export default WithAuth0(Detail)
