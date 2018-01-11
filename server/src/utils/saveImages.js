import fs from 'fs'
import getImageName from 'utils/getImageName'
import chalk from 'chalk'
import path from 'path'
import fileType from 'file-type'
import bufferOptimizer from 'utils/bufferOptimizer'
import axios from 'axios'

const imagePath = '/Users/leejunhyung/allhumor/client/public/article/images'

export default function (sources, site, id) {
  return Promise.all(sources.map(async (src) => {
    try {
      const { data } = await axios.get(src, {
        responseType: 'arraybuffer',
      })
      const { ext } = fileType(data)
      let imageName = getImageName(src)
      const hasFileExtension = path.extname(imageName)

      if (!hasFileExtension) {
        imageName = `${imageName}.${ext}`
      }

      const buffer = await bufferOptimizer(ext, data)

      await fs.writeFileSync(`${imagePath}/${site}/${id}_${imageName}`, buffer, 'binary')

      return `images/${site}/${id}_${imageName}` // 프론트에서 이미지를 보여주기 좋은 형식으로 변환
    } catch (error) {
      console.log(chalk`{cyan [file saving error]} ${error}`)

      return null
    }
  }))
}
