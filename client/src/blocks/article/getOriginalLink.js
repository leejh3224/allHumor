export default (site, articleId) =>
  ({
    dogdrip: 'http://www.dogdrip.net/',
    ddengle: 'https://www.ddengle.com/board_vote_all/',
    kickoff: 'http://www.kick-off.co.kr/pub/overseas.aspx?mode=view&postNum=',
    instiz: 'https://www.instiz.net/fanclip?no=',
  }[site] + articleId)
