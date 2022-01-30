import { model, models, Schema, Document } from 'mongoose'
import { Joke as JokeDTO } from '../joke'

type JokeType = JokeDTO & Document
const jokeSchema = new Schema({
  title: String,
  text: [String],
  country: String,
  lang: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Joke = models.Joke || model<JokeType>('Joke', jokeSchema)

export default Joke
