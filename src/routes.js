import Vue from 'vue';
import Router from 'vue-router';
import Eventos from './pages/Eventos.vue';
import Categoria from './pages/Categoria.vue';
import Post from './pages/Post.vue';
import Search from './pages/Search.vue';
import Login from './pages/Login.vue';
import Ingresso from './pages/Ingresso.vue';
import MyAccount from './pages/MyAccount.vue';
import VueAnalytics from 'vue-analytics'

Vue.use(Router);

const routes = [
  { path: '/', component: Eventos},
  { path: '/login', component: Login},
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

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.auth && !sessionStorage.token) {
      next('/login');
      return;
    }
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

Vue.use(VueAnalytics, {
  id: 'UA-77272248-2',
  router
})

export default router