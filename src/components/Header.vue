<template>
  <header id="header">
    <h1>Agenda VueJS</h1>
    <ul>
      <li v-for="cat in categorias" :key="cat.id">
        <router-link :to="cat.slug">
          {{ cat.name }}
        </router-link>
      </li>
    </ul>
  </header>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: ['categorias']
}
</script>
<style lang="stylus">
#header
  display flex
  background #f43
  color #fff
  justify-content space-between
  padding 15px
  align-items center
  h1
    flex 1
    margin 0
  ul
    flex 3
    list-style none
    padding 0
    margin 0
    li
      display inline-block
      &+li
        margin-left 30px
      a
        color #fff
        text-decoration none
        &.active
          font-weight bold
</style>