import { Country } from '../models/country'
import { Lang } from '../models/lang'

const endpoints = {
  countries: '/countries',
  countryCode: '/countries/code',
}

export interface ApiResponse<T> {
  data: T
}

export interface ApiResponseError<T> {
  status: number
  error: T
  errors?: T[]
}

export interface ResponseCountries {
  countries: Country[]
  langs: Lang[]
}

export interface ResponseCountryCode {
  country: Country
}

export const fetchAllCountriesAndLangs = async (
  apiUrl: string
): Promise<ApiResponse<ResponseCountries>> => {
  const promise = await fetch(`${apiUrl}/api${endpoints.countries}`)
  return await promise.json()
}

export const fetchCountryCode = async (
  apiUrl: string
): Promise<ApiResponse<ResponseCountryCode>> => {
  const promise = await fetch(`${apiUrl}/api${endpoints.countryCode}`)
  return await promise.json()
}
