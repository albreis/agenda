<template lang="pug">
.post-page(v-if="post")
  .page-header
    .container
      .single-post
        .header
          .left
            img(:src="post.images.large")
          .right
            .header
              h1 {{post.title.rendered}}
              h3 {{post.categories[0].name}}
            .footer
              .headline {{post.acf.headline}}
              .data {{post.acf.datas[0].dia}}
              .local {{post.acf.endereco.local}}
              address.cidade-estado 
                span.cidade {{post.acf.endereco.cidade}}&nbsp;
                span.fa.fa-map-marker-alt
                span.estado &nbsp;{{post.acf.endereco.estado}} 
  .page-content
    .container
      .post-content(:class="{'show-full': showFullContent}")
        div(v-html="post.content.rendered")
      .toggle-content(@click="showFullContent=!showFullContent")
        span.fa(:class="{'fa-chevron-up': showFullContent, 'fa-chevron-down': !showFullContent}")
  .ingressos
    .datas
      .data(v-for="data in post.acf.datas")
        strong.dia {{getDateFormated(data.dia).dia}}
        .mes-ano
          strong.mes {{getDateFormated(data.dia).mes}}
          span de
          strong.ano {{getDateFormated(data.dia).ano}}
        .horario
          span.de(v-if="data.hora_de_inicio && data.hora_de_termino") De
          span.hora_inicio(v-if="data.hora_de_inicio") {{data.hora_de_inicio}}
          span.as(v-if="data.hora_de_inicio && data.hora_de_termino") as
          span.hora_termino(v-if="data.hora_de_termino") {{data.hora_de_termino}}
</template>
<script>
export default {
  data() {
    return {
      showFullContent: false,
      post: '',
      meses: {
        '01': 'Janeiro',
        '02': 'Fevereiro',
        '03': 'Março',
        '04': 'Abril',
        '05': 'Maio',
        '06': 'Junho',
        '07': 'Julho',
        '08': 'Agosto',
        '09': 'Setembro',
        '10': 'Outubro',
        '11': 'Novembro',
        '12': 'Dezembro'
      }
    }
  },

  mounted() {
    this.$http.get('eventos?slug=' + this.$route.params.post)
      .then(res => {
        this.post = res.data[0]
      })
  },

  methods: {
    getDateFormated(data) {
      var d = data.split('/')
      return {
        dia: d[0],
        mes: this.meses[d[1]].substr(0,3),
        ano: d[2]
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.post-page
  .page-header
    background #efefef
  .single-post
    padding 50px 0
    .header
      display flex
      background #fff
      .left 
        flex 4
        max-width 600px
        img 
          width 100%
          float left
      .right 
        flex 3
        padding 0 30px
        flex-flow column
        display flex
        justify-content space-between
        .header
          flex 1
          display initial
          color #f43
          font-weight bold
        .footer
          flex 1
          color #222
          flex-grow 0
          padding 30px 0
          .headline
            font-weight bold
            margin-bottom 5px
          .data
            font-size 13px
          .local
            font-weight bold
            margin 30px 0 10px 0
          .cidade-estado
            font-size 14px
            font-style normal
            .fa
              color #f43
  .toggle-content
    z-index 2
    position relative
    text-align center
    padding 30px 0
    font-weight bold
    cursor pointer
    font-size 24px
    background -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 60%)
    background -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 60%)
    background linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 60%)
    margin-top -70px
  .post-content
    padding 30px 0 0 0
    max-height 300px
    transition max-height .1s
    overflow hidden
    position relative
    z-index 1
    &.show-full
      max-height 2000px
      transition max-height 1s
      padding-bottom 60px
      .toggle-content
        margin-top 0
  .ingressos
    .datas
      display flex
      .data
        flex 1
        padding 15px 0
        background #f43
        color #fff
        text-align center
        margin 1px
        .dia
          font-size 40px
        .mes-ano
          font-size 11px
          span
            margin 0 3px
        .horario
          font-size 11px
          span
            margin 0 3px
</style>