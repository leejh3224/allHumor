import fs from 'fs'
import request from 'superagent'
import getImageName from 'utils/getImageName'
import chalk from 'chalk'
import path from 'path'
import fileType from 'file-type'
import bufferOptimizer from 'utils/bufferOptimizer'

const imagePath = '/Users/leejunhyung/allhumor/client/public/images'

export default async function (sources, site, id) {
  return Promise.all(sources.map(async (src) => {
    try {
      const { body } = await request.get(src)
      const duplicate = await fs
        .readdirSync(`${imagePath}/${site}`)
        .reduce((acc, fileName) => acc && fileName.includes(id), false)
      let imageName = getImageName(src)

      if (!duplicate) {
        const { ext } = fileType(body)

        // sometimes getImageName fails to get extensions from url
        // so we need to add it manually
        if (!path.extname(imageName)) {
          imageName = `${imageName}.${ext}`
        }

        // optimize buffer
        const buffer = await bufferOptimizer(ext, body)
        const wstream = fs.createWriteStream(`${imagePath}/${site}/${id}_${imageName}`, 'binary')
        wstream.write(buffer)
        wstream.end()
      }

      // return formatted src path
      return `images/${site}/${id}_${imageName}`
    } catch (error) {
      console.log(chalk`{cyan [file saving error]} ${error}`)

      return null
    }
  }))
}
