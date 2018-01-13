import React from 'react'
import { bool } from 'prop-types'
import { Header } from 'layout'
import StickyOnScroll from 'pages/StickyOnScroll'
import { PreviewListContainer, PaginationContainer, CategoryGroupContainer } from 'containers'

const Home = ({ isSticky }) => (
  <div>
    <Header />
    <CategoryGroupContainer isSticky={isSticky} />
    <section css={{ paddingTop: isSticky ? 50 : 0 }}>
      <PreviewListContainer />
    </section>
    <PaginationContainer />
  </div>
)

Home.propTypes = {
  isSticky: bool.isRequired,
}

export default StickyOnScroll(Home)
