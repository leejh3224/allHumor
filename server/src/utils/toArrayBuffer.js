import axios from 'axios'

export default async (src) => {
  try {
    const { data: buffer } = await axios.get(src, {
      responseType: 'arraybuffer',
    })
    return buffer
  } catch (error) {
    console.log(error)
  }
}
