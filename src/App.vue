<template>
    <div class="content-main">
        <!-- Renderiza a rota -->
        <router-view></router-view>
    </div>
</template>
<script>
/**
 * Importação do Vue
 */
import Vue from 'vue';

/**
 * Importação do events bus para trabalhar
 * com eventos globais dentro da aplicação
 */
import { EventBus } from './event-bus.js';

/**
 * Class based components
 */
export default class App extends Vue {
    /**
     * Inicializa os dados
     */
    data() {
        return {
            config: {
            }
        }
    }
    mounted() {

        /**
         * Ao montar a aplicação verifica se existe configuração salva na sessionStorage
         */
        if(sessionStorage.config) {
            /**
             * Informações na sessionStorage ficam armazenadas em string
             * é necessário fazer um parser nelas para transforma-las em objetos
             */
            this.config = JSON.parse(sessionStorage.config)
        }
    }

    /**
     * Métodos utilizados na aplicação
     */
    methods() {
        return {

        }
    }

    /**
     * Vamos observar todas as alterações feitas na configuração
     * e atualizar automaticamente os dados guardados na seção,
     * assim caso façamos um refresh de página conseguimos recuperar os dados
     */
    watch(){
        return {
            config:{
                /**
                 * Usei uma configuração complexa de watcher
                 * para poder definir o parâmetro "deep".
                 * Assim garantimos que sejam observado o objeto
                 * em vários níveis de profundidade
                 */
                handler(){
                    /**
                     * Transforma o objeto "config" em string para salvar na sessionStorage
                     */
                    sessionStorage.config = JSON.stringify(this.config)
                },
                /**
                 * Define que o objeto "config" será observado profundamente
                 */
                deep: true
            }
        }
    }
}
</script>

<style lang="stylus">
* {
    box-sizing border-box
}
body
    margin 0
    padding 0
    font-family 'Montserrat'
a, a:hover
    text-decoration none
img
    max-width 100%
.content
    display flex
    flex-basis 300px
    flex-wrap wrap
    width 100%
.container
    max-width 1200px
    display block
    margin auto
</style>