import Jurisdiction from '../../router/mh'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  }
  return true
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  return asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
}

const permission = {
  state: {
    isCollapse: false,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
    },
    COLLAPSE: (state) => {
      state.isCollapse = !state.isCollapse
    },
    SLIDER_OPEN(state) {
      state.isCollapse = true
    },
    SLIDER_CLOSE(state) {
      state.isCollapse = false
    }
  },
  actions: {
    GetRouters({commit}, roles) {
      return new Promise(resolve => {
        let accessedRouters;
        if (roles.indexOf('mh') >= 0) {
          accessedRouters = Jurisdiction
        } else {
          accessedRouters = filterAsyncRouter(Jurisdiction, roles)
        }
        commit('SET_ROUTERS', accessedRouters);
        window.sessionStorage.setItem('add.router', true);
        resolve()
      })
    }
  }
};

export default permission
