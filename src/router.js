import Vue from 'vue';
import Router from 'vue-router';
import Heart from './components/heart.vue';
import Round from './components/round.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/heart',
      name: 'Heart',
      component: Heart
    },
    {
      path: '/round',
      name: 'Round',
      component: Round
    }
  ]
})
