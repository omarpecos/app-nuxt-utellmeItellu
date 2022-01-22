<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="app-country-selector">
        <v-card-title class="headline">
          Country and language selection
        </v-card-title>
        <v-card-text>
          <div>
            <!-- Country Selection -->
            <div v-if="selectedCountry">
              <h3>Country selected</h3>
              <v-row
                class="app-country-selector_selected"
                justify="center"
                align="center"
              >
                <v-img
                  :max-width="50"
                  :max-height="50"
                  :src="selectedCountry.flag"
                  :alt="selectedCountry.name + '_flag'"
                ></v-img>
                <strong>{{ selectedCountry.name }}</strong>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                  @click="selectCountry(null)"
                >
                  <v-icon dark> mdi-minus </v-icon>
                </v-btn>
              </v-row>
            </div>
            <div v-else>
              <p>Select country</p>

              <v-btn
                class="mx-2"
                dark
                color="primary"
                medium
                :loading="loading"
                @click="getCountryFromIp"
              >
                Try to get it from your network

                <template #loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>

              <v-input
                append-icon="mdi-close"
                prepend-icon="mdi-earth"
                hint="Press ENTER for search"
                :persistent-hint="true"
                :value="textSearch"
                @click:append="() => (textSearch = '')"
              >
                <v-text-field
                  v-model="textSearch"
                  label="Country Search"
                  @keypress.enter="() => searchForCountry(textSearch)"
                ></v-text-field>
              </v-input>

              <div v-if="countrySearch.length">
                <v-btn
                  v-for="c in countrySearch"
                  :key="c._id"
                  class="mx-2 app-country-selector_button"
                  dark
                  color="primary"
                  small
                  @click="() => selectCountry(c)"
                >
                  <v-img :src="c.flag" :alt="c.name + '_flag'"></v-img>
                  {{ c.name }}
                </v-btn>
              </div>
            </div>
            <!-- Lang Selection -->
            <div v-if="selectedCountry">
              <div v-if="selectedLang">
                <h3>Language selected</h3>
                <v-row
                  class="app-country-selector_selected"
                  justify="center"
                  align="center"
                >
                  <v-img
                    :max-width="50"
                    :max-height="50"
                    :src="selectedCountry.flag"
                    :alt="selectedCountry.name + '_flag'"
                  ></v-img>
                  <strong>{{ selectedLang.name }}</strong>
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="primary"
                    @click="selectLang(null)"
                  >
                    <v-icon dark> mdi-minus </v-icon>
                  </v-btn>
                </v-row>
              </div>
              <div v-else>
                <div v-if="selectedCountry.languages.length">
                  <v-btn
                    v-for="lang in selectedCountry.languages"
                    :key="lang._id"
                    class="mx-2 app-country-selector_button"
                    dark
                    color="primary"
                    small
                    @click="() => selectLang(lang)"
                  >
                    <v-img
                      :src="selectedCountry.flag"
                      :alt="selectedCountry.name + '_flag'"
                    ></v-img>
                    {{ lang.name }}
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Getter } from 'nuxt-property-decorator'
import { fetchCountryCode, ResponseCountries } from '~/lib/api/backend'
import { Country } from '~/lib/models/country'
import { Lang } from '~/lib/models/lang'
import { getFullCountryObject } from '~/lib/utils/functions'

@Component({
  name: 'CountrySelector',
})
export default class CountrySelector extends Vue {
  @Getter('apiUrl') apiUrl: string
  @Getter('allCountriesAndLangs') allData: ResponseCountries

  @Getter('selectedCountry') selectedCountry: Country
  @Getter('selectedLang') selectedLang: Lang

  loading = false
  textSearch = ''
  countrySearch: Country[] = []

  searchForCountry(input: string) {
    const { countries } = this.allData
    const regex: RegExp = new RegExp(`(${input.toLowerCase()}+?)`, 'g')

    this.countrySearch = countries.filter(({ name }: Country) => {
      // const match = regex.test(name.toLowerCase())
      const match = name.toLowerCase().match(regex)
      return !!match
    })
  }

  selectCountry(country: Country | null) {
    if (!country) {
      this.$store.dispatch('setSelectedLang', undefined)
      this.countrySearch = []
    }
    this.$store.dispatch('setSelectedCountry', country || undefined)
  }

  selectLang(lang: Lang | null) {
    this.$store.dispatch('setSelectedLang', lang || undefined)
  }

  async getCountryFromIp() {
    this.loading = true
    try {
      const {
        data: { country },
      } = await fetchCountryCode(this.apiUrl)
      const countryObject = getFullCountryObject(country, this.allData.langs)
      this.$store.dispatch('setSelectedCountry', countryObject)
      this.loading = false
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.app-country-selector {
  .v-input {
    align-items: center;
  }

  .app-country-selector_selected {
    min-height: 100px;
  }

  .app-country-selector_button,
  .app-country-selector_selected {
    .v-image {
      margin-right: 10px;
    }
  }
}
</style>
