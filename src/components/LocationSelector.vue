<template>  
    <div class="location">
      <span class="fa fa-map-marker-alt"></span> 
      <span class="current-location" @click="showList = !showList">{{currentLocation.join(' - ')}}</span>
      <!-- <span class="fa fa-chevron-down"></span> -->
      <div class="cidades" v-if="showList">
        <div @click="reset">Todas as cidades</div>
        <div v-for="(local, key) in locations" :key="key" @click="select(local)">
          {{local.cidade}} - {{local.estado}}
        </div>
      </div>
    </div>
</template>
<script>
/**
 * Importa o gerenciador de eventos globais
 */
import {EventBus } from '../event-bus.js'

export default {
  data() {
    return {
      /**
       * Localização atual
       */
      currentLocation: '',

      /**
       * Exibir lista de cidades
       */
      showList: false,

      /**
       * Array de cidades
       */
      locations: []
    }
  },

  mounted() {

    /**
     * Inicializa a locallização atual
     */
    this.currentLocation = [sessionStorage.cidade||'Todas as cidades', sessionStorage.estado].filter(el => el)

    /**
     * Busca as localizadades disponíveis para pesquisa
     */
    this.getLocations()
  },

  methods: {
    /**
     * Reseta a configuração de localização
     */
    reset() {
      /**
       * Remove a cidade selecionada na session
       */
      sessionStorage.cidade = ''

      /**
       * Remove o estado atual na session
       */
      sessionStorage.estado = ''

      /**
       * Define a localização atual
       */
      this.currentLocation = ['Todas as cidades']

      /**
       * Esconde o menu
       */
      this.showList = false

      /**
       * Emite a notificação de que houve mudança de localização
       */
      EventBus.$emit('locationChanged')
    },
    /**
     * Seleciona um local
     */
    select(local) {
      /**
       * Guarda a cidade selecionada na session
       */
      sessionStorage.cidade = local.cidade

      /**
       * Guarda o estado atual na session
       */
      sessionStorage.estado = local.estado

      /**
       * Define a localização atual
       */
      this.currentLocation = [local.cidade, local.estado].filter(el => el.trim())

      /**
       * Esconde o menu
       */
      this.showList = false

      /**
       * Emite a notificação de que houve mudança de localização
       */
      EventBus.$emit('locationChanged')
    },

    /**
     * Faz o request das localizações disponíveis
     */
    getLocations() {
      this.$http.get('advanced-search').then(res => {
        this.locations = res.data.cidades
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.location
  margin-right 30px
  padding 8px 15px
  border 1px solid #fff
  border-radius 5px
  position relative
  .fa
    font-size 20px
  .current-location 
    padding 0 5px
    font-size 14px
    font-weight bold
    cursor pointer
  .cidades
    position absolute
    top 120%
    border-radius 6px
    right 0
    background #fff
    box-shadow 0 0 5px rgba(0,0,0,0.3)
    z-index 99
    color #f43
    font-size 12px
    white-space nowrap
    div
      font-weight bold
      padding 10px
      cursor pointer
      &:hover
        background #f43
        color #fff
</style>