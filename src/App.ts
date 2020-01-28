/**
 * Importação do Vue
 */
import Vue from 'vue';

/**
 * Importação do events bus para trabalhar
 * com eventos globais dentro da aplicação
 */
import { EventBus } from './event-bus.js';
import { Component, Watch } from 'vue-property-decorator'
/**
 * Class based components
 */
@Component
export default class App extends Vue {
    /**
     * Inicializa os dados
     */
    config: Object;

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
    @Watch('config', {deep: true})
    onChangeconfig() {
        sessionStorage.config = JSON.stringify(this.config)
    }
}