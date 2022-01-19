import { model, models, Schema } from 'mongoose'

const langSchema = new Schema({
  name: String,
  code: String,
  countryCode: String,
})

const Lang = models.Lang || model('Lang', langSchema)

export default Lang
