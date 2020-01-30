<template lang="pug">
  .search
        form
          .fa.fa-search  
          input(type="search" v-model="s" placeholder="Nome do evento ou local")
          button(@click="search" type="button") Encontrar
</template>
<script>
export default {
  data() {
    return {
      s: ''
    }
  },

  created() {
    this.s = this.$route.query.s
  },

  methods: {
    search(){
      this.$router.push({path: `/pesquisar?s=${this.s}`, props: (route) => ({ query: route.query.s })})
    }
  }
}
</script>
<style lang="stylus">
.search
  display flex
  justify-content center
  align-items center
  height 150px
  form
    position relative
    display flex
    flex 1
    max-width 800px
    margin auto
    border-radius 50px
    padding 10px
    border 1px solid #ddd
    .fa
      font-size 24px
      color #ddd
    input
      border none
      height 24px
      width 100%
      padding 0 10px
      &:focus
        outline none
      &::placeholder
        color #999
        font-size 15px
    button
      background #f43
      border none
      font-weight 900
      font-size 12px
      text-transform uppercase
      color #fff
      text-align center
      position absolute
      top -1px
      right -1px
      border-top-right-radius 50px
      border-bottom-right-radius 50px
      line-height 46px
      padding 0 50px
      cursor pointer
      &:focus
        outline none
</style>