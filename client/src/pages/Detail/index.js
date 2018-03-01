import React from 'react'

import ScrollDetector from 'pages/ScrollDetector'
import { Article, CommentList } from 'blocks'
import AddComment from 'blocks/add-comment'
import WithAuth0 from 'pages/WithAuth0'
import { isAuthenticated } from 'utils/auth'

const Detail = () => (
  <ScrollDetector>
    {({ isAtTheBottom }) => (
      <div>
        <Article isLoggedIn={isAuthenticated()} />
        <CommentList isLoggedIn={isAuthenticated()} isAtTheBottom={isAtTheBottom} />
        <div css={{ paddingBottom: 100 }} />
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

export default WithAuth0(Detail)
