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
    <app-location-selector></app-location-selector>
    <div class="user-menu" @click="login">
      <span v-if="!user" class="fa fa-user"></span>
      <img v-if="user" :src="user.picture.thumbnail" /> 
    </div>
    <div class="toggle" @click="showMenuMobile = !showMenuMobile">
      <span class="fa fa-bars"></span>
    </div>
    <span v-if="user" class="btn-logout" @click="logout">Sair</span>
    <span v-if="!user" class="btn-logout" @click="login">Login</span>
  </header>
</template>
<script>
import LocationSelector from './LocationSelector.vue';
import { EventBus } from '../event-bus.js';

export default {
  components: {
    appLocationSelector: LocationSelector
  },
  
  data() {
    return {
      user: '',
      showMenuMobile: false,
      location: {
        label: 'Todas as cidades',
        value:''
      },
      categorias: []
    }
  },

  methods: {
    getUser() { 
  
      if(sessionStorage.token.trim() != '') {
        this.$http.get('users/me').then(res => {
          sessionStorage.user = JSON.stringify(res.data)
          this.user = res.data
        })
      }
    
    },

    logout() {
      this.$auth.post('token/validate').then(res => {
        console.log(res)
        sessionStorage.token = ''
        sessionStorage.user = ''
        this.user = ''
        EventBus.$emit('userLogout')
      })
    },

    login() {
      var url = '/login';
      if(sessionStorage.token) {
        url = '/minha-conta'
      }
      this.$router.push(url)
    }
  },

  mounted() {  

    this.getUser()

    EventBus.$on('userLogin', () => {
      this.getUser()
    })

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
  .btn-logout
    margin-right 30px
    cursor pointer
  .user-menu
    margin-right 15px
    border-radius 100px
    border 2px solid #fff
    width 40px
    height 40px
    line-height 34px
    text-align center
    font-size 24px
    cursor pointer
    img
      border-radius 100px
      width 40px
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
        margin-left 15px
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