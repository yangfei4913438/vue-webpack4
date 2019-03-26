import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/heart',
      name: 'Heart',
      component: () => import('./components/heart.vue')
    },
    {
      path: '/round',
      name: 'Round',
      component: () => import('./components/round.vue')
    }
  ]
})
