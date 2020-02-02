<template>
  <header id="header">
    <h1 @click="$router.push('/')">Vuegenda</h1>
    <ul :class="{active: showMenuMobile}">
      <li v-for="cat in categorias" :key="cat.name" :class="{active: $route.params.category == cat.slug}">
        <router-link :to="{path: '/' + cat.slug, params: {name: cat.name, id: cat.id}, meta: {title: cat.name}}">
          {{ cat.name }}
        </router-link>
      </li>
    </ul>
    <div class="location">
      <span class="fa fa-map-marker-alt"></span> 
      <span class="current-location">{{location.label}} </span>
      <!-- <span class="fa fa-chevron-down"></span> -->
    </div>
    <div class="user-menu">
      <span class="fa fa-user"></span> 
    </div>
    <div class="toggle" @click="showMenuMobile = !showMenuMobile">
      <span class="fa fa-bars"></span>
    </div>
  </header>
</template>
<script>

import { EventBus } from '../event-bus.js';

export default {
  data() {
    return {
      showMenuMobile: false,
      location: {
        label: 'Todas as cidades',
        value:''
      },
      categorias: []
    }
  },
  mounted() {

    EventBus.$on('clickOnBody', () => { this.showMenuMobile = false})

    this.$http.get('categoria?_embed&__hide_empty=1')
      .then(res => {
        this.categorias = res.data
      })
  },
  
  watch: {
    '$route': function(){
      this.showMenuMobile = false
    }
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
  .location
    margin-right 30px
    padding 8px 15px
    border 1px solid #fff
    border-radius 5px
    .fa
      font-size 20px
    .current-location 
      padding 0 5px
      font-size 14px
      font-weight bold
  .user-menu
    margin-right 30px
    border-radius 100px
    border 2px solid #fff
    width 40px
    height 40px
    line-height 34px
    text-align center
    font-size 24px
  .toggle
    cursor pointer
    display none
    font-size 32px
    color #fff
    margin-right 20px
  h1
    flex 1
    margin 0
    padding 15px
    cursor pointer
  ul
    flex 3
    list-style none
    padding 0
    margin 0 30px 0 0
    display flex
    align-items right
    flex-wrap wrap
    li
      display flex
      flex 1
      white-space nowrap
      justify-content space-evenly
      line-height 26px
      border-bottom 5px solid transparent
      font-weight bold
      font-size 16px
      &+li
        margin-left 20px
      &.active
        border-bottom 2px solid #fff
        font-weight bold
        a
          color #f5f500
      a
        color #fff
        text-decoration none
@media all and (max-width: 800px)
  body
    .content-main
      padding-top 70px
      position relative
  #header
    z-index 9
    position fixed
    top 0
    left 0
    width 100%
    .toggle 
      display flex
    ul
      position absolute
      width 70%
      background #111
      height 100vh
      left -80%
      top 0
      z-index 99
      display block
      transition 0.5s left
      overflow hidden
      &.active
        width 80%
        transition 0.5s left
        left 0
      li
        padding 10px 0
        text-align left
        min-width 100%
        border-bottom none
        a
          width 100%
          padding 0 15px
        &.active
          border-bottom none
      li + li
        margin-left 0

</style>