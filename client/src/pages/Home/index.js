import React from 'react'

import ScrollDetector from 'pages/ScrollDetector'
import { PreviewFeedList } from 'blocks'
import WithAuth0 from 'pages/WithAuth0'

const Home = () => (
  <ScrollDetector>
    {({ isAtTheBottom }) => <PreviewFeedList isAtTheBottom={isAtTheBottom} />}
  </ScrollDetector>
)

Home.propTypes = {}

export default WithAuth0(Home)
