import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Request } from 'express'
import {
  fetchAllCountriesAndLangs,
  fetchCountryCode,
  ResponseCountries,
} from '~/lib/api/backend'
import { getFullCountryObject } from '~/lib/utils/functions'
import { Country } from '~/lib/models/country'
import { Lang } from '~/lib/models/lang'

export const state = () => ({
  apiUrl: '',
  countries: undefined as Country[] | undefined,
  langs: undefined as Lang[] | undefined,
  selectedCountry: undefined as Country | undefined,
  selectedLang: undefined as Lang | undefined,
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }, { req }: { req: Request }) {
    const host = req.headers.host
    await dispatch('initializeStore', host)
  },
  async initializeStore({ state, commit, dispatch }, host) {
    try {
      const apiUrl = `http${host.includes('localhost') ? '' : 's'}://${host}`
      commit('SET_API_URL', apiUrl)
      const {
        data: { countries, langs },
      } = await fetchAllCountriesAndLangs(state.apiUrl)
      const {
        data: { country },
      } = await fetchCountryCode(state.apiUrl)
      commit('SET_COUNTRIES', countries)
      commit('SET_LANGS', langs)
      dispatch('setSelectedCountry', country)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  setSelectedCountry({ commit, state }, country: Country) {
    if (country) {
      const countryObject = getFullCountryObject(country, state.langs || [])
      commit('SET_SELECTED_COUNTRY', countryObject)
    } else {
      commit('SET_SELECTED_COUNTRY', country)
    }
  },
  setSelectedLang({ commit }, lang: Lang) {
    commit('SET_SELECTED_LANG', lang)
  },
}

export const mutations: MutationTree<RootState> = {
  SET_API_URL: (state, apiUrl) => {
    state.apiUrl = apiUrl
  },
  SET_COUNTRIES: (state, countries: Country[]) => {
    state.countries = countries
  },
  SET_LANGS: (state, langs: Lang[]) => {
    state.langs = langs
  },
  SET_SELECTED_COUNTRY: (state, country: Country) => {
    state.selectedCountry = country
  },
  SET_SELECTED_LANG: (state, lang: Lang) => {
    state.selectedLang = lang
  },
}

export const getters: GetterTree<RootState, RootState> = {
  apiUrl(state) {
    return state.apiUrl
  },
  allCountriesAndLangs(state): ResponseCountries {
    return {
      countries: state.countries || [],
      langs: state.langs || [],
    }
  },
  selectedCountry(state) {
    return state.selectedCountry
  },
  selectedLang(state) {
    return state.selectedLang
  },
  hasConfig(state): Boolean {
    return !!(state.selectedCountry && state.selectedLang)
  },
}
