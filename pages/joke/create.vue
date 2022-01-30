<template>
  <div class="app-create-page">
    <h1>Create</h1>
    <ListenerComponent />
  </div>
</template>

<script>
import ListenerComponent from '@/components/jokes/Listener'
export default {
  name: 'CreateJoke',
  components: {
    ListenerComponent,
  },
}
</script>
<style lang="scss">
.app-create-page {
  h1 {
    text-align: center;
  }
}
</style>
