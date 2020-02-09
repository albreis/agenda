import Vue from 'vue';
import App from './App';
import '@fortawesome/fontawesome-free/js/fontawesome';
import axios from './Request.js';
import Auth from './auth.js';
import router from './routes.js';
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.prototype.$http = axios
Vue.prototype.$auth = Auth
Vue.prototype.$categories = []

Date.prototype.addDays = function(days) {
  this.setDate(this.getDate()+days);
  return this;
}
Date.prototype.subDays = function(days) {
  this.setDate(this.getDate()-days);
  return this;
}

const bus = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

Object.defineProperty(Vue.prototype, '$bus', {
    get(){
        return this.$root.bus;
    },
    set(newInstance){
        this.$root.bus = newInstance;
    },
});