// lib import
import express, { Router, json } from 'express'
const requestCountry = require('request-country')

const app = express()
app.use(json())

const apiRouter = Router()

apiRouter.get('/code', (req, res) => {
  const country = requestCountry(req, 'ES') // or requestCountry('2.2.2.2')
  res.json({
    country,
    lang: country,
  })
})

// Not found route middleware
apiRouter.use('/**', (_req, res) => {
  res.status(404).json({ status: 404, error: 'Not founded route' })
})

app.use('/api/countries', apiRouter)

module.exports = app
