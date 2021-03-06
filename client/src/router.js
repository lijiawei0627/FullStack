import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: () => import('./views/Index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '*',
      component: () => import('./views/404.vue')
    },
    {
      path: '/index',
      component: () => import('./views/Index.vue'),
      children: [
        {path: '', component: () => import ('./views/Home.vue')},
        {path: '/home', name: 'Home', component: () => import ('./views/Home.vue')},
        {path: '/infoshow', name: 'Infoshow', component: () => import ('./views/InfoShow.vue')},
        {path: '/fundlist', name: 'FundList', component: () => import ('./views/FundList.vue')}
      ]
    }
  ]
})
