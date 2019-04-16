import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/home'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/add', // 新增账单记录，异步组件
      name: 'Add',
      component: () => import('./pages/add')
    },
    {
      path: '*', // 匹配所有未定义的路由
      name: 'Home',
      component: Home
    }
  ]
})
