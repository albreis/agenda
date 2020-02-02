<template lang="pug">
  .search
    form(@submit="search")
      .fa.fa-search  
      input(type="search" v-model="s" placeholder="Nome do evento ou local")
      button(type="submit") Encontrar
    .adv-search
      .container
        small
          strong Avançado: 
        label
          input(v-model="filter.aceita_milhas" type="checkbox") 
          span Aceita milhas
</template>
<script>
export default {
  data() {
    return {
      s: '',
      filter: {
        aceita_milhas: true
      }
    }
  },

  created() {
    this.s = this.$route.query.s
  },

  methods: {
    search(){
      this.$router.push({path: `/pesquisar?s=${this.s}`, props: (route) => ({ query: route.query.s })})
      return false;
    }
  }
}
</script>
<style lang="stylus">
.search
  display flex
  justify-content center
  align-items center
  height 70px
  margin 50px 0
  flex-flow wrap
  .adv-search
    display flex
    flex 1
    flex-basis 100%
    text-align left
    label
      cursor pointer
      span
        padding 2px 10px
        border-radius 10px
        background #efefef
        text-transform lowercase
        font-size 11px
        margin 5px 5px 5px 0
      input
        display none
        &:checked + span
          background #f43
          color #fff
          font-weight bold
    .container
      width 100%
      max-width 800px
      padding 0 20px
      small
        cursor pointer
  form
    position relative
    display flex
    flex 1
    max-width 800px
    margin 0 auto
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
@media all and (max-width: 800px)
  .search
    form
      button 
        display none
</style>