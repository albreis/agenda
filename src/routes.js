import Vue from 'vue';
import Router from 'vue-router';
import Agenda from './pages/Agenda.vue';
import Categoria from './pages/Categoria.vue';
import Post from './pages/Post.vue';

Vue.use(Router);

const routes = [
  { path: '/', component: Agenda},
  { path: '/:category', component: Categoria },
  { path: '/:category/:post', component: Post }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new Router({
  //mode: 'history',
  routes: routes // short for `routes: routes`
})

export default router