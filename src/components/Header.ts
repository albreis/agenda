/**
 * Importação do Vue
 */
import Vue from 'vue';

/**
 * Importação do events bus para trabalhar
 * com eventos globais dentro da aplicação
 */

import { Component } from 'vue-property-decorator';

/**
 * Class based components
 */
@Component
export default class Header extends Vue {
  text: string = ''
}