import { Expose } from 'class-transformer'
import { Lang } from './lang'

export class Country {
  @Expose() name: String
  @Expose() code: String
  @Expose() flag: String
  @Expose() langs: String[]
  @Expose() languages?: Lang[]
}

export interface ApiResponseCountries {
  data: {
    countries: Country[]
    langs: Lang[]
  }
}

export interface ApiResponseCountryCode {
  data: {
    country: Country
  }
}
