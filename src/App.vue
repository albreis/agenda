<template>
    <div class="content-main">
        <!-- Renderiza a rota -->
        <router-view></router-view>
    </div>
</template>

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