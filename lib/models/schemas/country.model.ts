import { model, models, Schema } from 'mongoose'
import { Country as CountryDTO } from '../country'

type CountryType = CountryDTO & Document
const countrySchema = new Schema({
  name: String,
  code: String,
  flag: String,
  langs: [String],
})

const Country = models.Country || model<CountryType>('Country', countrySchema)

export default Country
