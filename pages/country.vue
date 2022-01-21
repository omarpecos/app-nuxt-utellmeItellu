<template>
  <v-row>
    <v-col class="text-center">
      <CountrySelector />
    </v-col>
  </v-row>
</template>

<script>
import CountrySelector from '../components/countries/countrySelector.vue'
export default {
  name: 'CountryPage',
  components: { CountrySelector },
}
</script>
