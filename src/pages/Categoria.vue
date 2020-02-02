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
              .category(v-if="category && posts.length")
                router-link.category-title(:to="category.slug") {{category.name}}
                hr
                .carousel
                  .prev
                    .fa.fa-chevron-left
                  .events
                    grid-item(v-for="post in posts" :item="post" :category="category")
                  .next
                    .fa.fa-chevron-right
              .load-more(@click="loadMore" v-if="!hideLoadMore") Mais eventos
            .sidebar(v-if="0")
              | sidebar
</template>
<script>
import Vue from 'vue';
import GridItem from '../components/GridItem.vue';
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
      category: {},
      posts: [],
      hideLoadMore: false,
      activeDay: new Date,
      page: 1
    }
  },

  mounted(){
    
    EventBus.$on('changeDate', (date) => {
      this.activeDay = date
    });

    this.$http.get('categoria', {
      params: {
        slug: this.$route.params.category
      }
    }).then(resp => {
      this.category = resp.data[0]
      this.getPosts()
    })

  },
  
  methods: {

    getPosts() {
      
      if(!this.category.id) return;


      this.$http.get('eventos', {
        params: {
          _embed: true,
          per_page: 9,
          page: this.page,
          categoria: [this.category.id],
          dia: this.activeDay.valueOf()
        }
      }).then(resp => {
        //this.posts = resp.data
        for(var i in resp.data) {
          this.posts.unshift(resp.data[i])
        }
        this.hideLoadMore = resp.data.length < 3;
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
  .search
    display flex
    justify-content center
    align-items center
    height 150px
    form
      position relative
      display flex
      flex 1
      max-width 800px
      margin auto
      border-radius 50px
      padding 10px
      border 1px solid #ddd
      .fa
        font-size 24px
        color #ddd
      input
        border none
        height 24px
        width 100%
        padding 0 10px
        &:focus
          outline none
        &::placeholder
          color #999
          font-size 15px
      button
        background #f43
        border none
        font-weight 900
        font-size 12px
        text-transform uppercase
        color #fff
        text-align center
        position absolute
        top -1px
        right -1px
        border-top-right-radius 50px
        border-bottom-right-radius 50px
        line-height 46px
        padding 0 50px
        cursor pointer
        &:focus
          outline none
  .lista
    .list-title
      color #f43
      font-size 25px
      .fa
        color #888
        margin-right 10px
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
            .event
              flex-grow 1
              flex-basis 300px
              min-width 250px
              max-width 380px
              margin 0 15px 30px 15px
              .date
                font-size 12px
                color #777
                font-weight bold
                .far
                  margin-right 5px
                  color #f43
                span
                  span
                    margin 0 4px 0 0
              .tags
                .tag
                  background #e06
                  padding 2px 15px
                  border-radius 10px
                  margin 5px 0
                  color #fff
                  font-weight bold
                  text-transform uppercase 
                  display inline-block
                  font-size 10px 
              .image
                img
                  border-radius 10px
                  width 100%
              .headline
                font-size 12px
                text-transform uppercase
                color #f43
                margin 10px 0
              .title
                font-size 16px
                color #444
                margin 5px 0
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