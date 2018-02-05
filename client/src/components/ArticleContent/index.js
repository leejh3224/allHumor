import React from 'react'
import { shape, string, number, func } from 'prop-types'

import ArticleContentTemplate from './template'
import Title from './Title'
import ArticleMeta from './ArticleMeta'
import Content from './Content'
import Voting from './Voting'
import Navigation from './Navigation'

const ArticleContent = ({
  article: {
    articleId, title, site, author, uploadDate, content,
  },
  counts,
  handleVoting,
  votingMouseDown,
  votingMouseUp,
}) => (
  <ArticleContentTemplate
    title={<Title title={title} />}
    articleMeta={
      <ArticleMeta
        site={site}
        author={author}
        uploadDate={uploadDate}
        originalArticleUrl={`${
          {
            dogdrip: 'http://www.dogdrip.net/',
            ddengle: 'https://www.ddengle.com/board_vote_all/',
            kickoff: 'http://www.kick-off.co.kr/pub/overseas.aspx?mode=view&postNum=',
            instiz: 'https://www.instiz.net/fanclip?no=',
          }[site]
        }${articleId}`}
      />
    }
    content={<Content content={content} />}
    voting={
      <Voting
        counts={counts}
        handleVoting={handleVoting}
        votingMouseDown={votingMouseDown}
        votingMouseUp={votingMouseUp}
      />
    }
    navigation={<Navigation />}
  />
)

ArticleContent.propTypes = {
  article: shape({
    title: string.isRequired,
    site: string.isRequired,
    author: string.isRequired,
    uploadDate: string.isRequired,
    content: string.isRequired,
  }).isRequired,
  counts: number.isRequired,
  handleVoting: func.isRequired,
  votingMouseDown: func.isRequired,
  votingMouseUp: func.isRequired,
}

export default ArticleContent
