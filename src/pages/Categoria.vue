<template lang="pug">
  div
    .agenda
      .search
        form
          .fa.fa-search  
          input(type="search" v-model="s" placeholder="Nome do evento ou local")
          button(type="button") Encontrar
      .lista
        .container
          h3.list-title 
            .fa.fa-calendar-alt
            | Eventos do dia
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
              .days
                .day(v-for="day in week_days" :class="{active: day==activeDay}" @click="activeDay=day")
                  .day-name {{days[day.getDay()].substr(0, 3)}}
                  .day-number {{day.getDate()}}
                  .month {{months[day.getMonth()]}}
              .next(@click="next")
                .fa.fa-angle-right
            img(src="https://via.placeholder.com/100x100").logo
          .main
            .categories
              .category
                router-link.category-title(:to="'categoria/' + $router.path") {{category}}
                hr
                .carousel
                  .prev
                    .fa.fa-chevron-left
                  .events
                    a.event(href="#" v-for="post in posts")
                      .date
                        .far.fa-clock
                        span 
                          span(v-if="post.acf.dia_de_inicio") De {{post.acf.dia_de_inicio}}
                          span(v-if="post.acf.hora_de_inicio") - {{post.acf.hora_de_inicio}}
                          span(v-if="post.acf.dia_de_termino") a {{post.acf.dia_de_termino}}
                          span(v-if="post.acf.hora_de_termino") - {{post.acf.hora_de_termino}}
                      .tags
                        .tag(v-for="tag in post._embedded['wp:term']" v-if="tag[0].taxonomy=='tipos'") {{tag[0].name}}
                      .image(v-if="getImage(post)")
                        img(:src="getImage(post)")
                      h4.headline {{post.acf.headline}}
                      h3.title {{post.title.rendered}}
                  .next
                    .fa.fa-chevron-right
            .sidebar(v-if="0")
              | sidebar
</template>
<script>
import Vue from 'vue';

export default {

  mounted(){
    if(window.innerWidth < 800) {
      this.visibleDays = 1
    }
    this.getWeek()
    this.getPosts()
  },

  data() {
    return {
      category: '',
      posts: [],
      page: 0,
      week: 0,
      visibleDays: 7,
      activeDay: false,
      week_days: [],
      days: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
      months: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      s: '',
      now: new Date,
      curr_date: new Date,
      selectedDate: new Date
    }
  },
  
  methods: {
    getImage(post) {
      var img = post._embedded['wp:featuredmedia'][0].media_details;
      if(img) {
        return post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
      }
      return 'https://via.placeholder.com/388x214';
    },

    getPosts() {
      console.log(this.$route)
      this.$http.get('agenda?_embed&categoria[]=' + this.$route.params.slug + '&dia_de_inicio=' + this.activeDay.valueOf())
      .then(resp => {
        this.posts = resp.data
        this.page = 0
        console.log(resp)
        //this.categorias.push(this.categorias[i])
      })
    },
    
    nextPage(category) {
      if(category.page < category.posts.length){
        category.page++
      }
    },

    prevPage(category) {
      if(category.page > 0){
        category.page--
      }
    },

    getWeek() {
      this.week_days = []
      this.activeDay = false
      for(var d = 0; d < this.visibleDays; d++) {
        var date = new Date(this.curr_date);
        if(this.activeDay===false) {
          this.activeDay = date
        }
        date.setDate(date.getDate() + d);
        this.week_days.push(date)
      }
      console.log(this.curr_date)
    },

    next() {
      this.curr_date = this.curr_date.addDays(this.visibleDays)
      this.getWeek()
    },

    prev() {
      this.curr_date = this.curr_date.subDays(this.visibleDays)
      this.getWeek()
    }
  },

  watch: {
    activeDay() {
      this.getPosts()
    },

    '$route': () => {
      this.getPosts()
    }
  }
}
</script>
<style scoped lang="stylus">
.agenda
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
  .agenda 
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