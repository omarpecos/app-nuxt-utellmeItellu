import { Country } from '../models/country'
import { Joke } from '../models/joke'
import { Lang } from '../models/lang'

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
  const promise = await fetch(`${apiUrl}/api${endpoints.countries}`)
  return await promise.json()
}

export const fetchCountryCode = async (
  apiUrl: string
): Promise<ApiResponse<ResponseCountryCode>> => {
  const promise = await fetch(`${apiUrl}/api${endpoints.countryCode}`)
  return await promise.json()
}

/* Countries/Languages methods */
export const fetchCreateJoke = async (
  apiUrl: string,
  joke: Joke
): Promise<ApiResponse<Joke>> => {
  const promise = await fetch(`${apiUrl}/api${endpoints.createJoke}`, {
    method: 'POST',
    body: JSON.stringify(joke),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await promise.json()
}
