import fs from 'fs'

import chalk from 'chalk'
import sharp from 'sharp'
import fileType from 'file-type'
import ffmpeg from 'fluent-ffmpeg'

const imagePath = '/Users/leejunhyung/Google 드라이브/allhumor/client/public/img'

function getNewSize({ sizeLimit, width, height }) {
  const isBigImage = width > sizeLimit

  return {
    newWidth: isBigImage ? sizeLimit : width,
    newHeight: isBigImage ? Math.round(height * (sizeLimit / width)) : height,
  }
}

async function saveGifAsMp4({ buffer, imageName }) {
  try {
    const gifFilePath = `${imagePath}/${imageName}`
    const mp4FilePath = `${imagePath}/${imageName.replace(/.gif/, '.mp4')}`

    await fs.writeFileSync(gifFilePath, buffer)
    await ffmpeg()
      .input(gifFilePath)
      .outputOptions([
        '-movflags faststart',
        '-pix_fmt yuv420p',
        '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2',
      ])
      .save(mp4FilePath)
      .on('error', (err) => {
        console.log(err)
      })
      .on('end', async () => {
        await fs.unlinkSync(gifFilePath)
      })
  } catch (error) {
    console.log(error)
  }
}

async function saveAsJPEG({ buffer, imageName }) {
  try {
    const SIZE_LIMIT = 700

    const resizer = sharp(buffer)
    const { width, height } = await resizer.metadata()
    const { newWidth, newHeight } = getNewSize({
      sizeLimit: SIZE_LIMIT,
      width,
      height,
    })

    await resizer
      .resize(newWidth, newHeight)
      .jpeg({ quality: 80 })
      .toFile(`${imagePath}/${imageName}`)
  } catch (error) {
    console.log(error)
  }
}

export default async ({ buffer, imageName }) => {
  try {
    const { ext: fileExtenstion } = fileType(buffer)

    if (fileExtenstion === 'gif') {
      await saveGifAsMp4({ buffer, imageName })
    } else {
      await saveAsJPEG({ buffer, imageName })
    }
  } catch (error) {
    console.log(chalk`{cyan [save image]} ${error}`)
  }
}
