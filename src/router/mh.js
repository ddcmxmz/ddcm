/**
 * 门户前台
 */
export default [
  // 文章
  {
    path: 'mh/mh0201',
    name: 'admin_mh0201',
    component: () => import('../view/mh/mh0201/index')
  },
  // 文章管理
  {
    path: 'mh/mh0201/:articleId',
    name: 'admin_mh0201/:articleId',
    component: () => import('../view/mh/mh0201/operate-article-view')
  },
  // 文章分类管理
  {
    path: 'mh/mh0202',
    name: 'admin_mh0202',
    component: () => import('../view/mh/mh0202')
  },
  // 轮播图管理
  {
    path: 'mh/mh0203',
    name: 'admin_mh0203',
    component: () => import('../view/mh/mh0203')
  },
  // 导航栏管理
  {
    path: 'mh/mh0204',
    name: 'admin_mh0204',
    component: () => import('../view/mh/mh0204')
  },
  // 友情链接
  {
    path: 'mh/mh0205',
    name: 'admin_mh0205',
    component: () => import('../view/mh/mh0205')
  },
  // 办事服务入口
  {
    path: 'mh/mh0206',
    name: 'admin_mh0206',
    component: () => import('../view/mh/mh0206')
  },
  // 中心信箱
  {
    path: 'mh/mh0207',
    name: 'admin_mh0207',
    component: () => import('../view/mh/mh0207')
  },
  // 中心信箱详情
  {
    path: 'mh/mh0207/:id',
    name: 'admin_mailDetails',
    component: () => import('../view/mh/mh0207/details')
  }
]
