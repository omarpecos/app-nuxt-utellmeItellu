<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card v-if="!hasConfig">
        <v-card-title class="headline">
          Welcome to Utellme,Itellu
        </v-card-title>
        <v-card-text>
          <p>U should select country/lang first</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/country"> Select now</v-btn>
        </v-card-actions>
      </v-card>
      <div v-else>
        <h3>Country/lang selected, well done!</h3>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    hasConfig: {
      get() {
        return this.$store.getters.hasConfig
      },
    },
  },
}
</script>
