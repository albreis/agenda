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
      .data(v-for="data in post.acf.datas" @click="selectDate(data)" :class="{active: dateSelected==data}")
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
    .setores(v-if="dateSelected")
      .container
        .left
          .list-setores(v-if="!setorSelected")
            h2(v-if="checkDate(setorSelected)") Selecione o Setor
            .setor(v-for="setor in post.acf.setores" @click="selectSetor(setor)" :class="{active: setorSelected == setor}" v-if="checkDate(setor)")
              h3 {{setor.nome}}
          .list-entradas(v-if="setorSelected")
            button(@click="setorSelected=''")
              .fa.fa-chevron-left
              span Alterar setor
            h2 Selecione o tipo de entrada
            .entradas
              .entrada(v-for="entrada in setorSelected.entradas" @click="selectEntrada(entrada)" :class="{active: entradaSelected == entrada}")
                h3 {{entrada.nome}}
                input(v-if="entradaSelected == entrada || (entradaSelected && entradaSelected.quantidade)" v-model="checkout[post.id].datas[dateSelected.dia].setores[setorSelected.nome].reservas[entrada.nome].quantidade.qty" type="text")
        .right(v-if="setorSelected.aceita_reservar_loca")
</template>
<script>
import Vue from 'vue';

export default {
  data() {
    return {
      /**
       * Data selecionada
       */
      dateSelected: '',

      /**
       * Setor selecionado
       */
      setorSelected: '',

      /**
       * Entrada selecionada
       */
      entradaSelected: '',

      /**
       * Reserva selecionada
       */
      reservaSelected: '',

      /**
       * Dados do checkout
       */
      checkout: {},

      /**
       * Mostrar contetudo completo?
       */
      showFullContent: false,

      /**
       * Post
       */
      post: '',

      /**
       * Nomes dos meses
       */
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

    /**
     * Verifica-se se existem dados de checkout na seção
     * para se caso a pessoa tenha dado refresh na página
     */
    if(sessionStorage.checkout) {
        this.checkout = JSON.parse(sessionStorage.checkout)
    }

    /**
     * Faz a chama a API para buscar dados do Post
     */
    this.$http.get('eventos',{params: {slug: this.$route.params.post}})
      .then(res => {
        /**
         * Define o post
         */
        this.post = res.data[0]

        /**
         * Adiciona o post no checkout para ser recuperado na finalização
         * da compra
         * 
         * Obs.: Usar Vue.set garante que o objeto manterá sua propriedade reativa
         */
        Vue.set(this.checkout, this.post.id, this.post);

        /**
         * Inicializa o atributo "datas" dentro do item
         * do checkout para inserir as datas selecionadas
         */
        Vue.set(this.checkout[this.post.id], 'datas', {});
      })
  },

  watch: {
    /**
     * Observa a mudança da data selecionada
     */
    dateSelected() {
      /**
       * Ao alterar a data é necessário limpar os atributos:
       */
      this.setorSelected = ''
      this.entradaSelected = ''
      this.reservaSelected = ''
    },
    
    /**
     * Observa mudança de setor
     */
    setorSelected() {
      /**
       * Ao alterar o setor precisa limpar os atributos:
       */
      this.entradaSelected = ''
      this.reservaSelected = ''
    },
    
    /**
     * Observa mudança do tipo de entrada
     */
    entradaSelected() {
      /**
       * Ao alterar a entrada precisa limpar a reserva selecionada.
       * Apenas em checkout onde seja necessário selecionar poltrona, mesa, etc
       */
      this.reservaSelected = ''
    },

    /**
     * Observa qualquer alteração nos dados do checkout
     * A opção "deep" faz com que sejam observadas alterações
     * em todos os níveis do objeto
     */
    checkout:{
      /**
       * Função responsável pela manipulação das observações
       */
      handler: function() {
        /**
         * Atualiza sessioStorage com os novos dados.
         * O objeto "checkout" é transformado em string usando
         * JSON.stringify
         */
        sessionStorage.checkout = JSON.stringify(this.checkout)
      },
      deep: true
    }
  },

  methods: {

    /**
     * Seleciona a data
     */
    selectDate(date) {
      /**
       * Define a data selecionada
       */
      this.dateSelected = date

      /**
       * Se a data ainda não existe no checkout é adicionada
       */
      if(!this.checkout[this.post.id].datas[this.dateSelected.dia]) 
        Vue.set(this.checkout[this.post.id].datas, this.dateSelected.dia, date)

      /**
       * Inicializa o atributo "setores" para essa data no checkout.
       * Esse atributo receberá dados dos setores que formos selecionando
       * para comprarmos ingressos
       */
      if(!this.checkout[this.post.id].datas[this.dateSelected.dia].setores) 
        Vue.set(this.checkout[this.post.id].datas[this.dateSelected.dia], 'setores', {})
    },

    /**
     * Seleciona o setor
     */
    selectSetor(setor) {
      /**
       * Define o setor selecionado atualmente
       */
      this.setorSelected = setor

      /**
       * Verifica se o setor selecionado já existe dentro do atributo "setores"
       * da data selecionada. Caso não exista ele é adicionado.
       */
      if(!this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome])
        Vue.set(this.checkout[this.post.id].datas[this.dateSelected.dia].setores, this.setorSelected.nome, setor)

      /**
       * Cada setor dentro do checkout possui "reservas".
       * Essas "reservas" podem ser um numero referente a um tipo de ingresso.
       * Ou pode ter também um código referente a um assento de teatro por exemplo.
       * 
       * Se o atributo "reservas" não estiver inicializado para esse setor
       * ele será criado.
       */
      if(!this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome].reservas)
        Vue.set(this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome], 'reservas', {})
    },

    /**
     * Seleciona entrada
     */
    selectEntrada(entrada) {
      /**
       * Define a entrada selecionada atualmente
       */
      this.entradaSelected = entrada

      /**
       * Se a entrada não existe no atributo "reservas" do setor selecionado
       * será adicionada
       */
      if(!this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome].reservas[this.entradaSelected.nome])
        Vue.set(this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome].reservas, this.entradaSelected.nome, entrada)
      
      /**
       * As reservas possuem 2 atributos: 
       * qty = quantidade reservada
       * code = código da reserva (para assentos de teatro, etc)
       * 
       * Para venda de ingressos onde não se escolhe numero de poltrona, mesa, etc
       * só é necessário o atributo "qty".
       * 
       * Poltronas de teatro por exemplo irão ter o atributo "code" com o código da poltrona
       * e qty com o valor 1 (já é uma poltrona é para uma pessoa)
       * 
       * Ingressos para show onde não precisa-se reservar mesas, cadeiras, etc
       * ficarão com o atributo "code" em branco e podem ter o atributo "qty" com qualquer valor
       *
       * Obs.: os valores variam de acordo com as configurações do evento, 
       * podendo haver mínimo e máximo
       */
      if(!this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome].reservas[this.entradaSelected.nome].quantidade)
        Vue.set(this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome].reservas[this.entradaSelected.nome], 'quantidade', {qty: 0, code: ''})
    },

    /**
     * Verifica se o setor está disponível na data atual
     */
    checkDate(setor) {
      var datas = setor.setor_disponivel_nas_datas;
      var i;
      for(i in datas) {
        /**
         * Se o setor estiver disponível retorna "true" e para a execução
         */
        if(datas[i].value == this.checkout[this.post.id].datas[this.dateSelected.dia].dia) 
          return true;
      }

      /**
       * Senão retorna "false"
       */
      return false;
    },

    /**
     * Retorna a data dividida em componentes: dia, mes e ano
     */
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
  padding-bottom 300px
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
        cursor pointer
        &.active
          color #f43
          background #fff
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
    .list-setores
      .setor
        padding 30px
        background #efefef
        margin 10px 0
        cursor pointer
        h3
          margin 0
    .list-entradas
      button
        padding 10px 15px
        border none
        background #444
        color #fff
        text-transform uppercase
        margin-top 30px
        .fa
          margin-right 10px
      .entradas
        display flex
        justify-content space-between
        .entrada
          padding 15px
          margin 10px 0
          background #efefef
          cursor pointer
          display flex
          flex 1
          max-width 45%
          h3
            flex 1
            margin 0
          input
            flex 1
            text-align center
            max-width 50px
</style>