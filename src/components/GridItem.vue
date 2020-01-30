<template lang="pug">
router-link.event(:to="`${item._embedded['wp:term'][0][0].slug}/${item.slug}`")
  .date
    .far.fa-clock
    span 
      span(v-if="item.acf.dia_de_inicio") De {{item.acf.dia_de_inicio}}
      span(v-if="item.acf.hora_de_inicio") - {{item.acf.hora_de_inicio}}
      span(v-if="item.acf.dia_de_termino") a {{item.acf.dia_de_termino}}
      span(v-if="item.acf.hora_de_termino") - {{item.acf.hora_de_termino}}
  .tags(v-if="item._embedded")
    .tag(v-for="tag in item._embedded['wp:term']" v-if="tag[0].taxonomy=='tipos'") {{tag[0].name}}
  .image(v-if="getImage(item)")
    img(:src="getImage(item)")
  h4.headline {{item.acf.headline}}
  h3.title {{item.title.rendered}}
</template>
<script>
export default {
  props: ['item', 'category'],

  methods: {
    getImage(item) {
      var img = item._embedded['wp:featuredmedia'][0].media_details;
      if(img) {
        return img.sizes.medium.source_url;
      }
      return 'https://via.placeholder.com/388x214';
    }
  }
}
</script>
<style lang="stylus">
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
</style>