<template>
    <div class="content-main">
        <app-header></app-header>
        <!-- Renderiza a rota -->
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>
<script>
import Vue from 'vue'
import Header from './components/Header.vue';

export default {    
  components: {
    appHeader: Header
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
</style>