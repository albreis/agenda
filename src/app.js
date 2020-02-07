import Vue from 'vue';
import App from './App';
import '@fortawesome/fontawesome-free/js/fontawesome';
import axios from './Request.js';
import Auth from './auth.js';
import router from './routes.js';

// Vue.use(require('@websanova/vue-auth'), {
//   auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
//   http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
//   router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
//   rolesVar: 'type',
//   loginData: {url: 'jwt-auth/v1/token', method: 'POST', redirect: '/', fetchUser: true},
//   fetchData: {url: 'wp-json/wp/v2/users/me', method: 'GET'},
//   refreshData: {url: 'jwt-auth/v1/token/validate', method: 'GET', atInit: false}
// })

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