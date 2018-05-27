import Vue from 'vue'
import Router from 'vue-router'
import mh from './mh'
import ge from './ge'
import xm from './xm'
import sj from './sj'
import cf from './cf'

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/login/login')
    },
    {
      path: '/',
      component: () => import('../packages/ui/container'),
      children: [
        {
          path: '/',
          name: 'main',
          component: () => import('../view')
        },
        ...mh,
        ...xm,
        ...sj,
        ...ge,
        ...cf,
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/packages/ui/errorPage/404.vue')
    },
    {
      path: '*',
      name: 'err',
      redirect: '404',
    },
  ],
  scrollBehavior: () => ({y: 0}),
});

export default router
