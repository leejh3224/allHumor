import mongoose from 'mongoose'
import config from 'config'

const env = process.env.NODE_ENV || 'development'
const { mongoUri } = config[env]

export default {
  connect: () => {
    /* use promise for mongoose */
    mongoose.Promise = global.Promise

    return mongoose
      .connect(mongoUri)
      .then(() => console.log(`connected to ${mongoUri}`))
      .catch(e => console.log(e))
  },
  disconnect: () => mongoose.disconnect(() => console.log('closing db ...')),
}
