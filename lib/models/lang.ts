import { Expose } from 'class-transformer'

export class Lang {
  @Expose() name: String
  @Expose() code: String
  @Expose() countryCode: String
}
