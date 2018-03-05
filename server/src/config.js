import mongoose from 'mongoose'

export default {
  mongo: {
    init: ({ host, db }) => {
      try {
        mongoose.connect(`mongodb://${host}:27017/${db}`)
      } catch (error) {
        console.log(error)
      }
    },
    development: {
      host: 'localhost',
      db: 'allhumor',
    },
  },
  etc: {
    port: '3030',
    clientPath: '../build/client',
  },
}
