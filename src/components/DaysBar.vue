<template lang="pug">
  .daybar
    .now
      .day-number {{now.getDate()}}
      .day-text
        .day-name {{days[now.getDay()]}}
        .day-my 
          span {{months[now.getMonth()]}} 
          span {{now.getYear().toString().substr(1, 2)}}
    .days-carousel
      .prev(@click="prev")
        .fa.fa-angle-left
      .days(:class="{animating: animating}")
        .day(v-for="day in week_days" :class="{active: day==activeDay}" @click="activeDay=day")
          .day-name {{days[day.getDay()].substr(0, 3)}}
          .day-number {{day.getDate()}}
          .month {{months[day.getMonth()]}}
      .next(@click="next")
        .fa.fa-angle-right
    img(src="https://via.placeholder.com/100x100").logo
</template>
<script>

import { EventBus } from '../event-bus.js';

export default {

  data() {
    return {
      /**
       * Dias estão sendo animados?
       */
      animating: false,

      /**
       * Dias visíveis
       */
      visibleDays: 7,

      /**
       * Dia selecionado
       */
      activeDay: false,

      /**
       * Lista dos dias visíveis
       */
      week_days: [],

      /**
       * Nome dos dias
       */
      days: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],

      /**
       * Abreviação dos meses
       */
      months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],

      /**
       * Data atual selecionada
       */
      curr_date: new Date,

      /**
       * Data de hoje
       */
      now: new Date


    }
  },

  mounted(){
    /**
     * Se a largura disponível for menor que 800
     * mostra um dia por vez
     */
    if(window.innerWidth < 800) {
      this.visibleDays = 1
    }

    /**
     * Inicializa a renderização da semana
     */
    this.getWeek()
  },
  
  methods: {
    /**
     * Monta a exibição da semana
     */
    getWeek() {
      var app = this
      this.week_days = []
      this.activeDay = false

      /**
       * Anima os dias
       */
      this.animating = true

      /**
       * Itera sobre os dias para montar a semana
       */
      for(var d = 0; d < this.visibleDays; d++) {
        /**
         * Inicializa um objeto Date baseado na data atual
         */
        var date = new Date(this.curr_date);

        /**
         * Define o primeir dia como ativo
         */
        if(this.activeDay===false) {
          this.activeDay = date
        }

        /**
         * Incrementa os dias para criar a semana
         */
        date.setDate(date.getDate() + d);

        /**
         * Adiciona o dia na semana
         */
        this.week_days.push(date)
      }

      /**
       * Timeout para pausar a animação
       */
      setTimeout(function(){
        app.animating = false
      }, 1000)
    },

    /**
     * Navega para o futuro no tempo
     */
    next() {
      /**
       * Adiciona dias na data atual
       */
      this.curr_date = this.curr_date.addDays(this.visibleDays)
      this.getWeek()
    },

    /**
     * Navega para o passado
     */
    prev() {
      /**
       * Subtri dias da data atual
       */
      this.curr_date = this.curr_date.subDays(this.visibleDays)
      this.getWeek()
    }
  },

  watch: {
    activeDay() {
      EventBus.$emit('dateChanged', this.activeDay)
    }
  }
}
</script>

<style lang="stylus">
.daybar
  display flex
  align-items center
  justify-content center
  .now
    flex 1
    display flex
    justify-content center
    align-items center
    .day-number
      max-width 100px
      line-height 100px
      text-align center
      font-weight bold
      flex 1
      padding 0 20px
      font-size 50px
      color #f43
      box-shadow 0 0 15px rgba(0,0,0,0.1)
      border-radius 100px
      margin 30px
    .day-text
      flex auto
      max-width 62px
      font-weight bold
      color #666
      .day-name
        display block
        clear both
        padding-bottom 10px
        margin-bottom 10px
        border-bottom 1px solid #ddd
      .day-my
        display flex
        justify-content space-between
        span
          display flex
  .days-carousel
    display flex
    justify-content space-evenly
    align-items center
    margin 0 0 0 50px
    max-width 760px
    .prev
      font-size 30px
      color #f43
      cursor pointer
    .days
      display flex
      justify-content center
      &.animating
        .day
          transition transform 1s
          transform rotateY(360deg)
      .day
        flex 1
        cursor pointer
        text-align center
        color #888
        box-shadow 0 0 10px rgba(0,0,0,0.2)
        margin 0 10px
        border-radius 100px
        padding 10px 27px
        width 80px
        font-size 13px
        .day-name
          display block
        .day-number
          display block
          font-size 24px
          font-weight bold
        .month
          display block
        &.active
          .day-number
            color #f43
    .next
      font-size 30px
      color #f43
      cursor pointer
  .logo
    margin 0 50px
</style>