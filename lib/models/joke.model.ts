import { Schema, model } from 'mongoose'

const jokeSchema = new Schema({
  title: String,
  text: String,
})

const Joke = model('Joke', jokeSchema)
export default Joke
