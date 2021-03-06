import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Home from './views/home'
import notFound from './views/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: notFound
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: 'comment',
        component: () => import('./views/comment')
      },
      {
        path: 'material',
        component: () => import('./views/material')
      },
      {
        path: 'articles',
        component: () => import('./views/articles')
      },
      {
        path: 'publish',
        component: () => import('./views/publish')
      },
      {
        path: 'publish/:articleId',
        component: () => import('./views/publish')
      }, {
        path: 'account',
        component: () => import('./views/account')
      }]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue') // 按需加载
    // }
  ]
})
