import imagemin from 'imagemin'
import imageminGiflossy from 'imagemin-giflossy'
import imageminPngquant from 'imagemin-pngquant'
import imageminMozjpeg from 'imagemin-mozjpeg'

export default (ext, body) => {
  let options

  if (ext === 'gif') {
    options = {
      use: [
        imageminGiflossy({
          optimizationLevel: 3,
          colors: 256,
          lossy: 80,
          optimize: 3,
        }),
      ],
    }
  } else if (ext === 'png') {
    options = {
      use: [
        imageminPngquant({
          quality: '30',
        }),
      ],
    }
  } else if (ext === 'jpg') {
    options = {
      use: [
        imageminMozjpeg({
          quality: '30',
        }),
      ],
    }
  }

  return imagemin.buffer(body, options)
}
