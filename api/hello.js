import express, { Router, json } from 'express'

import Joke from '../lib/models/joke.model'

const app = express()
app.use(json())

const apiRouter = Router()

apiRouter.get('/hello', async (_req, res) => {
  const date = new Date().toISOString()
  const all = await Joke.find({})

  res.json({
    date,
    msg: 'Hello men!',
    data: all,
  })
})

// Not found route middleware
apiRouter.use('/**', (_req, res) => {
  res.status(404).json({ status: 404, error: 'Not founded route' })
})

app.use('/api', apiRouter)

module.exports = app
