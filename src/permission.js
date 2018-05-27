import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {store} from './store'
import {Msg} from './tools/message';
import {hasPermission} from './tools/utils'

NProgress.configure({showSpinner: false}); // NProgress Configuration

/** 路由控制 */
router.beforeEach((to, from, next) => {
  NProgress.start();
  /** 判断用户是否已经登录 */
  if (!store.getters.isLogin) {
    /** 已经登录情况下访问 /login, 则直接进入 /admin */
    if (to.path === '/login') {
      next();
      NProgress.done()
    } else {
      if (isAddRouter) {
        /* eslint-disable no-constant-condition */
        // if (hasPermission(store.getters.roles, to.meta.roles)) {
        //   next()
        // } else {
        //   next({path: '/404', replace: true, query: {noGoBack: true}})
        // }
        next()
      } else {
        /** 获取当前权限菜单加入到路由中 */
        store.dispatch('GetRouters', store.getters.roles).then(() => {
          router.addRoutes(store.getters.addRouters);
          next({...to, replace: true}); // *** 后面不可再出现代码。否则会重复执行此函数 ***
        });
      }
    }
  } else {
    if (noPermission('/login')) {
      next();
    } else {
      next('/login');
      NProgress.done();
      Msg.error('检测到您当前未登录，请先登录');
    }
  }
});

router.afterEach(() => {
  NProgress.done()
});

function isAddRouter() {
  return !!window.sessionStorage.getItem('add.router')
}

function noPermission(path) {
  return ['/404', '/login'].indexOf(path) > -1
}
