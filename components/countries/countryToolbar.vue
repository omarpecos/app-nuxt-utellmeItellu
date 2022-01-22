<template>
  <NuxtLink class="app-country-toolbar" v-if="hasConfig" to="/country">
    <v-row justify="center" align="center">
      <v-icon class="mr-2"> mdi-earth </v-icon>
      <v-img
        class="mr-2"
        :max-height="18"
        :max-width="24"
        :src="selectedCountry.flag"
        :alt="selectedCountry.name + '_flag'"
      ></v-img>
      <span>{{ selectedLang.name }}</span>
    </v-row>
  </NuxtLink>
</template>

<script lang="ts">
import { Component, Vue, Getter } from 'nuxt-property-decorator'
import { Country } from '~/lib/models/country'
import { Lang } from '~/lib/models/lang'

@Component({
  name: 'CountryToolbar',
})
export default class CountryToolbar extends Vue {
  @Getter('selectedCountry') selectedCountry: Country
  @Getter('selectedLang') selectedLang: Lang
  @Getter('hasConfig') hasConfig: boolean
}
</script>

<style lang="scss">
.app-country-toolbar {
  text-decoration: none !important;
  width: fit-content;
  padding: 1rem;
  cursor: pointer;
}
</style>
