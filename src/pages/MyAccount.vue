<template lang="pug">
  .page-account
    div {{me}}
</template>
<script>
import { EventBus } from '../event-bus.js'
export default {

  data() {
    return {
      me: ''
    }
  },

  mounted() {
    this.$http.get('users/me').then(res => {
      EventBus.$emit('userLogin')
    })
  }
}
</script>
<style lang="stylus" scoped>

</style>