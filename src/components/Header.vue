<template>
  <header id="header">
    <h1 @click="$router.push('/')">Vuegenda</h1>
    <ul>
      <li v-for="cat in categorias" :key="cat.name" :class="{active: $route.path == cat.slug}">
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
  align-items center
  h1
    flex 1
    margin 0
    padding 15px
  ul
    flex 2
    list-style none
    padding 0
    margin 0
    display flex
    align-items right
    li
      display flex
      flex 1
      white-space nowrap
      justify-content space-evenly
      line-height 66px
      border-bottom 5px solid transparent
      &+li
        margin-left 30px
      &.active
        border-bottom 5px solid #fff
        font-weight bold
        a
          color #ff0
      a
        color #fff
        text-decoration none
</style>