<template>  
    <div class="location">
      <span @click="getGeolocation" class="fa fa-map-marker-alt"></span> 
      <span class="current-location" @click="showList = !showList">{{currentLocation.join(' - ')}}</span>
      <!-- <span class="fa fa-chevron-down"></span> -->
      <div class="cidades" v-if="showList">
        <div v-if="userLocation" class="user-city" @click="select(userLocation)">
          <span class="fas fa-street-view"></span> {{userLocation.cidade}} - {{userLocation.estado}}
        </div>
        <div v-if="!userLocation" class="user-city" @click="getGeolocation">
          <span class="fa fa-crosshairs"></span> Buscar minha localização
        </div>
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
      userLocation: false,
      /**
       * Localização atual
       */
      currentLocation: [],

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
     * Fecha o seletor ao clica no conteudo
     */
    EventBus.$on('clickOnBody', () => {
      this.showList= false
    })
    EventBus.$on('routeChanged', () => {
      this.showList= false
    })

    /**
     * Inicializa a locallização atual
     */
    this.currentLocation = [sessionStorage.cidade||'Todas as cidades', sessionStorage.estado].filter(el => el)

    /**
     * Busca as localizadades disponíveis para pesquisa
     */
    this.getLocations()

    /**
     * Verifica se o usuário tem localização definida
     */
    if(sessionStorage.userLocation) {
      this.userLocation = JSON.parse(sessionStorage.userLocation)
    }
  },

  methods: {
    getGeolocation() {
      //Check if browser supports W3C Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          this.$http.post('geocode',{
            lat: lat,
            lng: lng
          }).then(res => {
            if(res.data.results && res.data.results.length) {
              this.userLocation = {cidade: res.data.results[0].components.city, estado: res.data.results[0].components.state}
              this.select(this.userLocation)
              sessionStorage.userLocation = JSON.stringify(this.userLocation)
            }
          }).catch(err => {
            console.log(err)
          })
        }, err => {
          console.log(err)
        });
      } 
      //Get latitude and longitude;
      
    },
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
  .user-city
    background #f33
    color #fff
    .fa-crosshairs
      font-size 14px
  .fa
    font-size 20px
    cursor pointer
  .current-location 
    padding 0 5px
    font-size 14px
    font-weight bold
    cursor pointer
  .cidades
    position absolute
    overflow hidden
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