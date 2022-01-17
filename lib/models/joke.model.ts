import { model, models, Schema } from 'mongoose'

const jokeSchema = new Schema({
  title: String,
  text: String,
  country: String,
  lang: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Joke = models.Joke || model('Joke', jokeSchema)

export default Joke
