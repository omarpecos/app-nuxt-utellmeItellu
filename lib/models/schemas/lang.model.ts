import { model, models, Schema } from 'mongoose'
import { Lang as LangDTO } from '../lang'

type LangType = LangDTO & Document
const langSchema = new Schema({
  name: String,
  code: String,
  countryCode: String,
})

const Lang = models.Lang || model<LangType>('Lang', langSchema)

export default Lang
