// lib import
import express, { Router, json, Request, Response, NextFunction } from 'express'
// Mongoose models
import Joke from '../lib/models/joke.model'
import { ValidationTypes, checkInput } from '../lib/validation/jokes'

const app = express()
app.use(json())

const middlewares = {
  validate:
    (op: ValidationTypes) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { body } = req
        const input = await checkInput(body, op)
        req.input = input
        next()
      } catch (error: any) {
        const status = 400
        const details = error.details.reduce((prev: any, curr: any) => {
          prev[curr.context.label] = curr.message
          return prev
        }, {})
        res.status(status).json({
          status,
          errors: details,
          error,
        })
      }
    },
}

const apiRouter = Router()

apiRouter.get('/', async (req, res) => {
  const country = req.headers['x-app-country'] || 'ES'
  const jokes = await Joke.aggregate([
    {
      $match: { country },
    },
    { $sort: { lastUpdate: -1 } },
    {
      $group: {
        _id: '$lang',
        jokes: {
          $addToSet: {
            _id: '$_id',
            country: '$country',
            lang: '$lang',
            title: '$title',
            text: '$text',
            createdAt: '$createdAt',
            updatedAt: '$updatedAt',
          },
        },
      },
    },
  ])

  res.json({
    country,
    data: jokes,
  })
})

apiRouter.post(
  '/',
  middlewares.validate(ValidationTypes.CREATE),
  async (req, res) => {
    const { input } = req
    const joke = new Joke(input)
    await joke.save()
    res.json({
      data: joke,
    })
  }
)

// Not found route middleware
apiRouter.use('/**', (_req, res) => {
  res.status(404).json({ status: 404, error: 'Not founded route' })
})

app.use('/api/jokes', apiRouter)

module.exports = app
