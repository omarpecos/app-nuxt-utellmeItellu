import express, { Router, json } from 'express'

const app = express()
app.use(json())

const apiRouter = Router()

apiRouter.get('/hello', (_req, res) => {
  const date = new Date().toISOString()
  res.json({
    date,
    msg: 'Hello men!',
  })
})

// Not found route middleware
apiRouter.use('/**', (_req, res) => {
  res.status(404).json({ status: 404, error: 'Not founded route' })
})

app.use('/api', apiRouter)

module.exports = app
