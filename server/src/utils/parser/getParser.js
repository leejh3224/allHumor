import dogdrip from 'utils/parser/dogdrip'
import kickoff from 'utils/parser/kickoff'
import ddengle from 'utils/parser/ddengle'
import instiz from 'utils/parser/instiz'

export default domainName =>
  ({
    dogdrip,
    kickoff,
    ddengle,
    instiz,
  }[domainName])
