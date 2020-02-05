<template lang="pug">
router-link.event(:to="`${item.categories[0].slug}/${item.slug}`")
  .image(v-if="getImage(item)")
    img(:src="getImage(item)")
  .footer
    .date
      .far.fa-clock
      span 
        span(v-if="item.acf.datas[0].dia") 
          span(v-if="item.acf.datas.length > 1") De
          span(v-else) Dia
          span {{item.acf.datas[0].dia}}
          span(v-if="item.acf.datas[0].hora_de_inicio") as {{item.acf.datas[0].hora_de_inicio}}
        span(v-if="item.acf.datas.length > 1")
          span até {{item.acf.datas[item.acf.datas.length - 1].dia}}
          span(v-if="item.acf.datas[item.acf.datas.length - 1].hora_de_termino") 
            span as {{item.acf.datas[item.acf.datas.length - 1].hora_de_termino}}
    h3.title 
      strong(v-html="item.title.rendered")
    h4.headline 
      span(v-if="item.acf.endereco.cidade") {{item.acf.endereco.cidade}} 
      span(v-if="item.acf.endereco.estado") 
        .fa.fa-map-marker-alt
        | &nbsp;
        span {{item.acf.endereco.estado}}
    .tags(v-if="item.tags")
      .tag(v-for="tag in item.tags") {{tag.name}}
</template>
<script>
export default {
  props: ['item'],

  methods: {
    getImage(item) {
      if(item.images.medium) {
        return item.images.medium;
      }
      return 'https://via.placeholder.com/300x200';
    }
  }
}
</script>
<style lang="stylus" scoped>
.event
  flex-grow 1
  flex-basis 300px
  min-width 250px
  max-width 380px
  margin 0 15px 30px 15px
  text-align center
  box-shadow 0 0 5px rgba(0,0,0,0.2)
  border-radius 10px
  .footer
    padding 10px
  .date
    font-size 12px
    color #777
    font-weight bold
    margin-bottom 5px
    .far
      margin-right 5px
      color #f43
    span
      span
        margin 0 4px 0 0
  .tags
    .tag
      background #ccc
      padding 2px 15px
      border-radius 10px
      margin 5px 5px 5px 0
      color #666
      font-weight bold
      text-transform uppercase 
      display inline-block
      font-size 10px 
  .image
    img
      border-radius 10px
      width 100%
  .headline
    font-size 10px
    color #444
    text-transform uppercase
    margin 5px 0
  .title
    font-size 18px
    color #f43
    margin 5px 0
    font-weight 600
    min-height 50px
</style>