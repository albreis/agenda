<template lang="pug">
  div
    .eventos
      app-search
      .lista
        .container
          h3.list-title 
            .fa.fa-calendar-alt
            | Eventos do dia
          app-days-bar
          .main
            .categories
              .category(v-if="events.today.length")
                .carousel
                  .prev
                    .fa.fa-chevron-left
                  .events
                    grid-item(v-for="event in events.today" :item="event")
                  .next
                    .fa.fa-chevron-right
              .category(v-if="events.next.length")
                h3 Próximos eventos
                hr
                .carousel
                  .prev
                    .fa.fa-chevron-left
                  .events
                    grid-item(v-for="event in events.next" :item="event")
                  .next
                    .fa.fa-chevron-right
            .sidebar(v-if="0")
              | sidebar
</template>
<script>
import Vue from 'vue';
import GridItem from '../components/GridItem';
import Search from '../components/Search.vue';
import DaysBar from '../components/DaysBar.vue';
import { EventBus } from '../event-bus.js';

export default {

  components: {
    appDaysBar: DaysBar,
    gridItem: GridItem,
    appSearch: Search
  },

  data() {
    return {
      events: {
        today: [],
        next: []
      },
      activeDay: ''
    };
  },

  mounted(){

    EventBus.$on('changeDate', (date) => {
      this.activeDay = date
    });


  },
  
  methods: {

    getTodayEvents(index) {
      this.$http.get('eventos', {
        params: {
          _embed: true,
          per_page: 12,
          dia: this.activeDay.valueOf()
        }
      }).then(resp => {
        this.events.today = resp.data
        this.getNextEvents()
      })
    },

    getNextEvents() {
      var exclude = []
      this.events.today.forEach((item) => {
        return exclude.push(item.id);
      })
      this.$http.get('eventos', {
        params: {
          _embed: true,
          per_page: 12,
          //exclude: exclude
        }
      }).then(resp => {
        this.events.next = resp.data
      })
    }

  },

  watch: {
    activeDay() {
      this.getTodayEvents()
    }
  }
}
</script>
<style scoped lang="stylus">
.eventos
  .lista
    .list-title
      color #f43
      font-size 25px
      .fa
        color #888
        margin-right 10px
  .main
    display flex
    .categories
      padding 30px 0
      flex 1
      .category
        .category-title
          color #f43
          font-weight bold
        .carousel
          display flex
          justify-content space-between
          align-items center
          margin auto
          position relative
          .prev, .next
            display none
            border-radius 100px
            background #fff
            text-align center
            width 50px
            height 50px
            flex 1
            font-size 30px
            text-align center
            color #f43
            position absolute
            cursor pointer
            justify-content center
            align-items center
            box-shadow 0 0 10px rgba(0,0,0,0.2)
            .fa
              display flex
          &_:hover
            .prev, .next
              display flex
          .next
            right 5px
          .prev
            left 5px
          .events
            display flex
            justify-content left
            align-items center
            margin 0 -15px
            flex-wrap wrap
    .sidebar
      flex 1
      min-width 300px
      padding 15px
@media all and (max-width: 800px)
  .eventos 
    .main
      padding 15px
    .lista 
      .list-title
        text-align center
      .daybar 
        .logo
          display none
        .days-carousel
          margin-left 15px
          margin-right 15px
        .now
          text-align center
          .day-number
            font-size 28px
            line-height 74px
            background #f43
            color #fff
            margin 15px 15px
</style>