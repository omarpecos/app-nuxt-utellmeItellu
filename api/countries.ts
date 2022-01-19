// lib import
import express, { Router, json } from 'express'
// models import
import Country from '../lib/models/country.model'
import Lang from '../lib/models/lang.model'
const requestCountry = require('request-country')

const app = express()
app.use(json())

const apiRouter = Router()

// Get country from request (ip)
apiRouter.get('/code', async (req, res) => {
  const countryCode = requestCountry(req, 'ES') // or requestCountry('2.2.2.2')
  const country = await Country.findOne({ code: countryCode })
  res.json({
    data: country,
  })
})

// Get all countries/langs
apiRouter.get('/', async (_req, res) => {
  const countriesTask = Country.find({})
  const langsTask = Lang.find({})

  const [countries, langs] = await Promise.all([countriesTask, langsTask])

  res.json({
    data: {
      countries,
      langs,
    },
  })
})

// Not found route middleware
apiRouter.use('/**', (_req, res) => {
  res.status(404).json({ status: 404, error: 'Not founded route' })
})

app.use('/api/countries', apiRouter)

module.exports = app
