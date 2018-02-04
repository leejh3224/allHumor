import dogdrip from 'utils/parser/dogdrip'
import kickoff from 'utils/parser/kickoff'
import ddengle from 'utils/parser/ddengle'
import instiz from 'utils/parser/instiz'

const options = {
  dogdrip,
  kickoff,
  ddengle,
  instiz,
}

export default async ({ url, html, site }) => {
  const result = await options[site](url, html)
  return result
}
