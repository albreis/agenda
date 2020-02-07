import Vue from 'vue';
import Router from 'vue-router';
import Eventos from './pages/Eventos.vue';
import Categoria from './pages/Categoria.vue';
import Post from './pages/Post.vue';
import Search from './pages/Search.vue';
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import Ingresso from './pages/Ingresso.vue';
import MyAccount from './pages/MyAccount.vue';
import VueAnalytics from 'vue-analytics'

Vue.use(Router);

const routes = [
  { path: '/', component: Eventos},
  { path: '/login', component: Login},
  { path: '/criar-conta', component: Signup},
  { path: '/minha-conta', component: MyAccount, meta: {auth: true}},
  { path: '/ingresso', component: Ingresso },
  { path: '/pesquisar', component: Search },
  { path: '/:category', component: Categoria, meta: {auth: true} },
  { path: '/:category/:post', component: Post }
]

const router = new Router({
  //mode: 'history',
  routes: routes // short for `routes: routes`
})

/**
 * Middleware básico para verificação de rotas
 */
router.beforeEach((to, from, next) => {
  /**
   * Verifica se é preciso estar autenticado para
   * acessar a rota, caso verdadeiro redireciona
   * para a tela de login
   */
  if (to.meta && to.meta.auth && !sessionStorage.token) {
    next('/login');
    return;
  }
  next();
});

Vue.use(VueAnalytics, {
  id: 'UA-77272248-2',
  router
})

export default router