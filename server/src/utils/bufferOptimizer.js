import imagemin from 'imagemin'
import imageminGifsicle from 'imagemin-gifsicle'
import imageminPngquant from 'imagemin-pngquant'
import imageminMozjpeg from 'imagemin-mozjpeg'

export default (ext, body) => {
  let options

  if (ext === 'gif') {
    options = {
      use: [imageminGifsicle()],
    }
  } else if (ext === 'png') {
    options = {
      use: [
        imageminPngquant({
          quality: '60',
        }),
      ],
    }
  } else if (ext === 'jpg') {
    options = {
      use: [
        imageminMozjpeg({
          quality: '60',
        }),
      ],
    }
  }

  return imagemin.buffer(body, options)
}
