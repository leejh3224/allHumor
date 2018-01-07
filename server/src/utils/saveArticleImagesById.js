import fs from 'fs'
import request from 'superagent'
import getImageName from 'utils/getImageName'
import uuid from 'uuid/v1'

const imagePath = '/Users/leejunhyung/allhumor/client/public/images'

export default async function (sources, id) {
  return Promise.all(sources.map(async (src) => {
    try {
      const { body } = await request.get(src)

      // this regex matches two things
      // 1. fullName(with extensions)
      // 2. extensions only
      // so to get whole name, you should filter 2.
      const imageName = getImageName(src)
      const duplicate = fs
        .readdirSync(`${imagePath}/dogdrip`)
        .reduce((acc, fileName) => acc && fileName.includes(id), false)

      if (!duplicate) {
        fs.writeFileSync(`${imagePath}/dogdrip/${id}_${imageName || uuid}`, body, 'binary')
      }
    } catch (error) {
      console.log('error occured while saving images ...', error)
    }
  }))
}
