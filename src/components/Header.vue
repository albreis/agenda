<template>
  <header id="header">
    <h1 @click="$router.push('/')">Agenda VueJS</h1>
    <ul>
      <li v-for="cat in categorias" :key="cat.name">
        <router-link :to="{path: cat.slug, name: cat.name}">
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
      categorias: []
    }
  },
  mounted() {
    this.$http.get('categoria?_embed&__hide_empty=1')
      .then(res => {
        this.categorias = res.data
      })
  }
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