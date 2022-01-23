<template>
  <NuxtLink class="app-navigator-link" :to="to">
    <v-row justify="center" align="center">
      <v-icon class="mr-2"> mdi-arrow-{{ arrowDir }}-circle </v-icon>
      <span>{{ text }}</span>
    </v-row>
  </NuxtLink>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  name: 'NavigatorLink',
})
export default class CountryToolbar extends Vue {
  @Prop({
    type: String,
    default: 'left',
  })
  arrowDir: String
  // TODO: in a future we must has other config (external url, internal, openNewTab ...)

  @Prop({
    type: String,
    default: '/',
  })
  to: String

  @Prop({
    type: String,
    default: 'Return',
  })
  text: String
}
</script>

<style lang="scss">
.app-navigator-link {
  margin: 2rem 0.5rem;
  text-decoration: none !important;
  cursor: pointer;
}
</style>
