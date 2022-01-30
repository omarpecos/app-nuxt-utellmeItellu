// lib import
import express, { Router, json, Request, Response, NextFunction } from 'express'

import { ValidationTypes, checkInput } from '../lib/validation/jokes'
// Mongoose models
import { Joke } from '../lib/models/schemas'

const app = express()
app.use(json())

const middlewares = {
  loadResource: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jokeUuid } = req.params
      const joke = await Joke.findById(jokeUuid)
      if (joke) {
        req.resource = joke
        next()
      } else throw new Error('404 - Not Found')
    } catch (error: any) {
      const status = 404
      res.status(status).json({
        status,
        error: 'Not found',
      })
    }
  },
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
    { $sort: { updatedAt: -1 } },
    {
      $group: {
        _id: '$lang',
        jokes: {
          $push: {
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

apiRouter.get('/:jokeUuid', middlewares.loadResource, (req, res) => {
  const { resource: joke } = req
  res.json({
    data: joke,
  })
})

apiRouter.post(
  '/',
  middlewares.validate(ValidationTypes.CREATE),
  async (req, res) => {
    const { input } = req
    const joke = new Joke(input)
    await joke.save()
    res.status(201).json({
      data: joke,
    })
  }
)

apiRouter.patch(
  '/:jokeUuid',
  middlewares.loadResource,
  middlewares.validate(ValidationTypes.UPDATE),
  async (req, res) => {
    const { resource, input } = req
    const joke = await Joke.findByIdAndUpdate(
      resource.id,
      {
        ...input,
        updatedAt: new Date().toISOString(),
      },
      { new: true }
    )

    res.json({
      data: joke,
    })
  }
)

apiRouter.delete('/:jokeUuid', middlewares.loadResource, async (req, res) => {
  const { resource } = req
  await resource.remove()

  res.status(204).json({})
})

// Not found route middleware
apiRouter.use('/**', (_req, res) => {
  res.status(404).json({ status: 404, error: 'Not founded route' })
})

app.use('/api/jokes', apiRouter)

module.exports = app
