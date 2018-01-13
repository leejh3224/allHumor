import getImageName from 'utils/getImageName'
import chalk from 'chalk'
import axios from 'axios'
import sharp from 'sharp'
import imagemin from 'imagemin'
import imageminGiflossy from 'imagemin-giflossy'
import fs from 'fs'

const imagePath = '/Users/leejunhyung/allhumor/client/public/article/images'

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
        const newWidth = w > 300 ? 300 : w
        const newHeight = w > 300 ? Math.round(h * (300 / w)) : h

        const optimizedGifBuffer = await imagemin.buffer(data, {
          plugins: [
            imageminGiflossy({
              lossy: 30,
              colors: 180,
              resize: `${newWidth}x${newHeight}`,
            }),
          ],
        })

        await fs.writeFileSync(
          `${imagePath}/${site}/${id}_${imageName}`,
          optimizedGifBuffer,
          'binary',
        )
      } else {
        /* eslint-disable no-lonely-if */
        if (w > 700) {
          // big images
          await buffer
            .resize(700, Math.round(h * (700 / w)))
            .jpeg({ quality: 80 })
            .toFile(`${imagePath}/${site}/${id}_${imageName}`)
        } else {
          await buffer.jpeg({ quality: 80 }).toFile(`${imagePath}/${site}/${id}_${imageName}`)
        }
      }

      return `images/${site}/${id}_${imageName}` // 프론트에서 이미지를 보여주기 좋은 형식으로 변환
    } catch (error) {
      console.log(chalk`{cyan [file saving error]} ${error}`)

      return null
    }
  }))
}
