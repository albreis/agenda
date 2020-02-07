<template>
    <div class="content-main">
        <app-header></app-header>
        <!-- Renderiza a rota -->
        <div class="main-inner" @click="clickOnBody">
            <router-view :key="$route.fullPath"></router-view>
        </div>
        <footer>
            <small>Desenvolvido por <a href="https://www.albreis.com.br" target="_blank"><strong>Albreis - Design & Programação</strong></a>| Versão {{version}}</small>
        </footer>
    </div>
</template>
<script>
import Vue from 'vue'
import Header from './components/Header.vue';
import { EventBus } from './event-bus.js';
import pgk from '../package.json';

export default {    
  components: {
    appHeader: Header
  },

  mounted() {
      var app = this
      setInterval(() => {
          EventBus.$emit('autoRefresh')
      }, 60000)
  },

  data() {
      return {
        version: pgk.version
      } 
  },

  methods: {
      clickOnBody() {
          EventBus.$emit('clickOnBody')
      }
  }
}
</script>

<style lang="stylus">
* {
    box-sizing border-box
}
body
    margin 0
    padding 0
    font-family 'Montserrat'
a, a:hover
    text-decoration none
img
    max-width 100%
.content
    display flex
    flex-basis 300px
    flex-wrap wrap
    width 100%
.container
    max-width 1200px
    display block
    margin auto
.main-inner
    min-height 80vh
footer
    text-align center
    padding 30px 
    a
        color #111
        margin-right 8px
</style>