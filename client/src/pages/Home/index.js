import React from 'react'
// import PropTypes from 'prop-types'
import DOMpurify from 'dompurify'
import { Header } from 'layout'
import { ArticleListContainer } from 'containers'

/* eslint-disable */
const Home = () => (
  <div>
    <Header />
    <ArticleListContainer />
    {/* with the help of DOMpurify I can enable dangerously set html */}
    <div dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize('<div>x</div>') }} />
  </div>
)

export default Home
