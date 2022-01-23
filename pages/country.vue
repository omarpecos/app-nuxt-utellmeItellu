<template>
  <v-row>
    <v-col class="text-center">
      <NavigatorLink text="Back to home" />
      <CountrySelector />
    </v-col>
  </v-row>
</template>

<script>
import CountrySelector from '../components/countries/countrySelector.vue'
import NavigatorLink from '../components/navigatorLink.vue'
export default {
  name: 'CountryPage',
  components: { CountrySelector, NavigatorLink },
}
</script>
