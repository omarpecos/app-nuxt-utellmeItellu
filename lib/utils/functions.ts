import { Country } from '../models/country'
import { Lang } from '../models/lang'

export const getFullCountryObject = (country: Country, arr: Lang[]) => {
  const { langs } = country
  const langsOfCountry = arr?.filter(({ code }) => langs.includes(code))

  return {
    ...country,
    languages: langsOfCountry,
  } as Country
}
