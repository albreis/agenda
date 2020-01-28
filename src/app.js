import Vue from 'vue';
import Router from 'vue-router';
import App from './App';
import Agenda from './pages/Agenda.vue';
import AgendaSingle from './pages/AgendaSingle';
import '@fortawesome/fontawesome-free/js/fontawesome';
import axios from 'axios';

Vue.use(axios);

Vue.use(Router);

Date.prototype.addDays = function(days) {
  this.setDate(this.getDate()+days);
  return this;
}
Date.prototype.subDays = function(days) {
  this.setDate(this.getDate()-days);
  return this;
}

const routes = [
  { path: '/', component: Agenda },
  { path: '/[:id]', component: AgendaSingle }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new Router({
  routes // short for `routes: routes`
})

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