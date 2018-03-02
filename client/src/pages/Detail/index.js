import React from 'react'

import { Article, CommentList } from 'blocks'
import AddComment from 'blocks/add-comment'
import WithAuth0 from 'pages/WithAuth0'
import { isAuthenticated } from 'utils/auth'

const Detail = () => (
  <div>
    <Article isLoggedIn={isAuthenticated()} />
    <CommentList isLoggedIn={isAuthenticated()} />
    <div css={{ paddingBottom: 100 }} />
    <AddComment />
  </div>
)

export default WithAuth0(Detail)
