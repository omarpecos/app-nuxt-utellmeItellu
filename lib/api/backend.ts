import type {
  ApiResponseCountries,
  ApiResponseCountryCode,
} from '../models/country'

const endpoints = {
  countries: '/countries',
  countryCode: '/countries/code',
}

export const fetchAllCountriesAndLangs = async (
  apiUrl: string
): Promise<ApiResponseCountries> => {
  const promise = await fetch(`${apiUrl}/api${endpoints.countries}`)
  return await promise.json()
}

export const fetchCountryCode = async (
  apiUrl: string
): Promise<ApiResponseCountryCode> => {
  const promise = await fetch(`${apiUrl}/api${endpoints.countryCode}`)
  return await promise.json()
}
