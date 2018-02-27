import React from 'react'

import { PreviewFeedList } from 'blocks'
import WithAuth0 from 'pages/WithAuth0'

const Home = () => <PreviewFeedList />

Home.propTypes = {}

export default WithAuth0(Home)
