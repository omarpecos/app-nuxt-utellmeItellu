import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Request } from 'express'
import { fetchAllCountriesAndLangs, fetchCountryCode } from '~/lib/api/backend'
import { getFullCountryObject } from '~/lib/utils/functions'

export const state = () => ({
  apiUrl: '',
  countries: undefined as any[] | undefined,
  langs: undefined as any[] | undefined,
  selectedCountry: undefined as any | undefined,
  selectedLang: undefined as any | undefined,
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
      const tasks = [
        fetchAllCountriesAndLangs(state.apiUrl),
        fetchCountryCode(state.apiUrl),
      ]
      const [
        {
          data: { countries, langs },
        },
        { data: country },
      ] = await Promise.all(tasks)
      commit('SET_COUNTRIES', countries)
      commit('SET_LANGS', langs)
      dispatch('setSelectedCountry', country)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  },
  setSelectedCountry({ commit, state }, country) {
    if (country) {
      const countryObject = getFullCountryObject(country, state.langs || [])
      commit('SET_SELECTED_COUNTRY', countryObject)
    } else {
      commit('SET_SELECTED_COUNTRY', country)
    }
  },
  setSelectedLang({ commit }, lang) {
    commit('SET_SELECTED_LANG', lang)
  },
}

export const mutations: MutationTree<RootState> = {
  SET_API_URL: (state, apiUrl) => {
    state.apiUrl = apiUrl
  },
  SET_COUNTRIES: (state, countries) => {
    state.countries = countries
  },
  SET_LANGS: (state, langs) => {
    state.langs = langs
  },
  SET_SELECTED_COUNTRY: (state, country) => {
    state.selectedCountry = country
  },
  SET_SELECTED_LANG: (state, lang) => {
    state.selectedLang = lang
  },
}

export const getters: GetterTree<RootState, RootState> = {
  apiUrl(state) {
    return state.apiUrl
  },
  allCountriesAndLangs(state) {
    return {
      countries: state.countries,
      langs: state.langs,
    }
  },
  selectedCountry(state) {
    return state.selectedCountry
  },
  selectedLang(state) {
    return state.selectedLang
  },
  hasConfig(state) {
    return state.selectedCountry && state.selectedLang
  },
}
