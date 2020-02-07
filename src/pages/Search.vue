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
              .category
                .category-title Pesquisando: {{s}}
                hr
                .carousel
                  .prev
                    .fa.fa-chevron-left
                  .events
                    grid-item(v-for="post in posts" :item="post")
                  .next
                    .fa.fa-chevron-right
              .load-more(@click="loadMore" v-if="showLoadMore") Mais eventos
</template>
<script>
import Vue from 'vue';
import DaysBar from '../components/DaysBar.vue';
import GridItem from '../components/GridItem.vue';
import Search from '../components/Search.vue';
import { EventBus } from '../event-bus.js';

export default {

  components: {
    appDaysBar: DaysBar,
    gridItem: GridItem,
    appSearch: Search
  },

  data() {
    return {
      posts: [],
      page: 0,
      activeDay: '',
      showLoadMore: false,
      s: '',
    }
  },

  mounted(){
    
    EventBus.$on('dateChanged', (date) => {
      this.activeDay = date
    });

    this.s = this.$route.query.s

  },
  
  methods: {

    getPosts() {      
      this.$http.get('eventos', {
        params: {
          _embed: true, 
          search: this.s,
          dia: this.activeDay.valueOf(),
          page: this.page
        }
      })
      .then(resp => {
        for(var i in resp.data) {
          this.posts.unshift(resp.data[i])
        }
        this.showLoadMore = resp.data.length >= 3;
      })
    },

    loadMore() {
      this.page++
      this.getPosts()
    },

  },

  watch: {
    activeDay() {
      this.posts = []
      this.page = 1
      this.getPosts()
    }

  }
}
</script>
<style scoped lang="stylus">
.eventos
  .load-more
    padding 10px 30px
    color #fff;
    background #f43
    display table
    margin 30px auto
    cursor pointer
    border-radius 30px
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
      flex 5
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
    .search
      padding-left 15px
      padding-right 15px
      form
        &:before
          content 'Pesquisar'
          display block
          color #f43
          text-transform uppercase
          font-size 16px
          font-weight bold
          position absolute
          top -25px
          left 0
          text-align center
          width 100%
        button
          display none
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