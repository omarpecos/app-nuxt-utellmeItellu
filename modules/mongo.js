import mongoose from 'mongoose'

const uri = process.env.MONGO_URI
const db = process.env.MONGO_DB

if (!uri) throw new Error('Missing environment variable MONGO_URI')
if (!db) throw new Error('Missing environment variable MONGO_DB')

const MONGO_URI = `${process.env.MONGO_URI}/${process.env.MONGO_DB}`

export default function () {
  this.nuxt.hook('render:setupMiddleware', async () => {
    /* Work at is seems only create 1 connection (for now)
     await mongoose.connect(MONGO_URI, {
      useUnifiedTopology: true,
    }) */
    if (global.connection) return
    if (!global.connectionPromise) {
      global.connectionPromise = mongoose.connect(MONGO_URI, {
        useUnifiedTopology: true,
      })
    }
    const client = await global.connectionPromise
    global.connection = client
    // return global.connection
  })
}
