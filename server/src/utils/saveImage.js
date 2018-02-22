import fs from 'fs'

import chalk from 'chalk'
import sharp from 'sharp'
import imagemin from 'imagemin'
import imageminGiflossy from 'imagemin-giflossy'
import fileType from 'file-type'

const imagePath = '/Users/leejunhyung/Google 드라이브/allhumor/client/public/img'

function getNewSize({ sizeLimit, width, height }) {
  const isBigImage = width > sizeLimit

  return {
    newWidth: isBigImage ? sizeLimit : width,
    newHeight: isBigImage ? Math.round(height * (sizeLimit / width)) : height,
  }
}

export default async ({ buffer, imageName }) => {
  try {
    const resizer = sharp(buffer)
    const { width, height } = await resizer.metadata()
    const { ext: fileExtenstion } = fileType(buffer)

    const SIZE_LIMIT_FOR_GIF_IMAGE = 300
    const SIZE_LIMIT_FOR_NON_GIF_IMAGE = 700

    const { newWidth, newHeight } = getNewSize({
      sizeLimit: fileExtenstion === 'gif' ? SIZE_LIMIT_FOR_GIF_IMAGE : SIZE_LIMIT_FOR_NON_GIF_IMAGE,
      width,
      height,
    })

    if (fileExtenstion === 'gif') {
      const optimizedGifBuffer = await imagemin.buffer(buffer, {
        plugins: [
          imageminGiflossy({
            lossy: 30,
            colors: 256,
            resize: `${newWidth}x${newHeight}`,
          }),
        ],
      })

      await fs.writeFileSync(`${imagePath}/${imageName}`, optimizedGifBuffer, 'binary')
    } else {
      await resizer
        .resize(newWidth, newHeight)
        .jpeg({ quality: 80 })
        .toFile(`${imagePath}/${imageName}`)
    }
  } catch (error) {
    console.log(chalk`{cyan [save image]} ${error}`)
  }
}
