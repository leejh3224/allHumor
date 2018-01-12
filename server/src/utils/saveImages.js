import getImageName from 'utils/getImageName'
import chalk from 'chalk'
import axios from 'axios'
import sharp from 'sharp'

const imagePath = '/Users/leejunhyung/allhumor/client/public/article/images'

// gif 는 mp4로 대신 html video 태그 삽입하는 코드 필요.
export default function (sources, site, id) {
  return Promise.all(sources.map(async (src) => {
    try {
      const { data } = await axios.get(src, {
        responseType: 'arraybuffer',
      })
      const buffer = sharp(data)
      const meta = await buffer.metadata()
      const imageName = getImageName(src)

      const f = meta.format
      const w = meta.width
      const h = meta.height

      if (f === 'gif') {
        console.log(id, f)
      }

      if (w > 1000) {
        // big images
        await buffer
          .resize(700, Math.round(h * (700 / w)))
          .jpeg({ quality: 75 })
          .toFile(`${imagePath}/${site}/${id}_${imageName}`)
      } else {
        await buffer
          .resize(w, h)
          .jpeg({ quality: 75 })
          .toFile(`${imagePath}/${site}/${id}_${imageName}`)
      }

      return `images/${site}/${id}_${imageName}` // 프론트에서 이미지를 보여주기 좋은 형식으로 변환
    } catch (error) {
      console.log(chalk`{cyan [file saving error]} ${error}`)

      return null
    }
  }))
}
