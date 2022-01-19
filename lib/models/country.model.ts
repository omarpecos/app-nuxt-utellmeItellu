import { model, models, Schema } from 'mongoose'

const countrySchema = new Schema({
  name: String,
  code: String,
  flag: String,
  langs: [String],
})

const Country = models.Country || model('Country', countrySchema)

export default Country
