import { Country } from '../models/country'
import { Joke } from '../models/joke'
import { Lang } from '../models/lang'
import { HTTPMethods, makeRequest } from './clients/back'

const endpoints = {
  countries: '/countries',
  countryCode: '/countries/code',
  createJoke: '/jokes',
}

/* Interfaces */

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

/* Countries/Languages methods */

export const fetchAllCountriesAndLangs = async (
  apiUrl: string
): Promise<ApiResponse<ResponseCountries>> => {
  return await makeRequest({
    url: `${apiUrl}/api${endpoints.countries}`,
  })
}

export const fetchCountryCode = async (
  apiUrl: string
): Promise<ApiResponse<ResponseCountryCode>> => {
  return await makeRequest({
    url: `${apiUrl}/api${endpoints.countryCode}`,
  })
}

/* Countries/Languages methods */
export const fetchCreateJoke = async (
  apiUrl: string,
  joke: Joke
): Promise<ApiResponse<Joke>> => {
  return await makeRequest({
    url: `${apiUrl}/api${endpoints.createJoke}`,
    method: HTTPMethods.POST,
    body: JSON.stringify(joke),
  })
}
