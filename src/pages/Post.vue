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
              h1(v-html="post.title.rendered")
              h3(v-html="post.categories[0].name")
            .footer
              .headline(v-html="post.acf.headline")
              //- .data {{post.acf.datas[0].dia}}
              .local(v-html="post.acf.endereco.local")
              address.cidade-estado 
                span.cidade(v-html="post.acf.endereco.cidade")
                span.fa.fa-map-marker-alt
                span.estado(v-html="post.acf.endereco.estado") 
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
            h2 Selecione o Setor
            .setor(v-for="setor in post.acf.setores" @mouseover="setHov(setor)" @mouseout="setOut(setor)" @click="selectSetor(setor)" :class="{active: setorSelected == setor, selected: setorSelected == setor, hovered: setorHovered == setor.nome}" v-if="checkDate(setor)")
              h3 {{setor.nome}}
          .list-entradas(v-if="setorSelected")
            h2(v-if="!entradaSelected") Selecione o tipo de entrada
            h3(v-if="setorSelected") Setor: {{setorSelected.nome}} 
              small.change(@click="setorSelected=''") [alterar]
            h3(v-if="entradaSelected") Tipo de entrada: {{entradaSelected.nome}} 
              small.change(@click="entradaSelected=''") [alterar]
            h3(v-if="currentReservas").reservas Reservas
              span.reserva(v-for="(reserva, index) in currentReservas" @click="unselect(index)") [{{reserva.code}}]
            .entradas(v-if="!entradaSelected")
              .entrada(v-for="entrada in setorSelected.entradas" @click="selectEntrada(entrada)" :class="{active: entradaSelected == entrada}")
                h3 {{entrada.nome}}
                input(v-if="entradaSelected == entrada || (entradaSelected && entradaSelected.quantidade)" v-model="checkout[post.id].datas[dateSelected.dia].setores[setorSelected.nome]._entradas[entrada.nome].quantidade.qty" type="text")
        .right(v-if="setorSelected.mostrar_mapa")
          app-map-evento(:mapa="post.acf.mapa_do_local" v-if="!setorSelected")
          app-map-setor(:mapa="setorSelected.mapa_do_setor" v-if="entradaSelected")

</template>
<script>
import Vue from 'vue';
import MapEvento from '../components/MapEvento.vue';
import MapSetor from '../components/MapSetor.vue';
import { EventBus } from '../event-bus.js';

export default {
  components: {
    appMapEvento: MapEvento,
    appMapSetor: MapSetor
  },

  data() {
    return {
      setorHovered: '',
      currentSetor: '',
      currentReservas: [],
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

    EventBus.$on('setorSelected', (setor) => {
      this.currentSetor = setor
    })
    EventBus.$on('setorHovered', (setor) => {
      this.setorHovered = setor
    })
    EventBus.$on('reservaSelected', (reservas) => {
      this.currentReservas = reservas      
      console.log('reservas selecionadas', reservas)
    })

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
     * Observa mudanças ao selecionar o setor
     * usando o mapa SVG
     */
    currentSetor() {
      for(var i in this.post.acf.setores) {
        if(this.currentSetor == this.post.acf.setores[i].nome) {
          this.selectSetor(this.post.acf.setores[i]);
          return;
        }
      }
    },

    currentReservas() {
      if(this.dateSelected && this.setorSelected && this.entradaSelected)
        Vue.set(this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome]._entradas[this.entradaSelected.nome], 'reservas', this.currentReservas)
    },
    
    /**
     * Observa a mudança da data selecionada
     */
    dateSelected() {
      /**
       * Ao alterar a data é necessário limpar os atributos:
       */
      //this.setorSelected = ''
      //this.entradaSelected = ''
      //this.reservaSelected = ''
      //this.currentReservas = []
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
      this.currentReservas = []
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
      this.currentReservas = []
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

    unselect(index) {
      this.currentReservas.splice(index, 1)
    },

    setHov(setor) {
      EventBus.$emit('setHov', setor.nome)
    },

    setOut(setor) {
      EventBus.$emit('setOut', setor.nome)
    },

    /**
     * Seleciona a data
     */
    selectDate(date) {
      /**
       * Define a data selecionada
       */
      this.dateSelected = date == this.dateSelected ? '' : date

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
      if(!this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome]._entradas)
        Vue.set(this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome], '_entradas', {})
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
      if(!this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome]._entradas[this.entradaSelected.nome])
        Vue.set(this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome]._entradas, this.entradaSelected.nome, entrada)

      /**
       * Inicializa o array de reservas
       */
      if(!this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome]._entradas[this.entradaSelected.nome].reservas)
        Vue.set(this.checkout[this.post.id].datas[this.dateSelected.dia].setores[this.setorSelected.nome]._entradas[this.entradaSelected.nome], 'reservas', [])
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
  .change
    cursor pointer
    color red
    font-size: 13px
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
              margin 0 3px
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
          background #f5f5f5
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
.setores
  .reservas
    .reserva
      margin 0 5px
      color red
  .container
    display flex
    .left
      flex 1
    .right
      flex 1
      padding 15px
      max-width 70%
    .list-setores
      .setor
        padding 30px
        background #efefef
        margin 15px 0
        cursor pointer
        &.selected, &.hovered
          outline 2px solid red
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