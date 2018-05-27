/**
 * 系统设置
 */
export default [
  { // 表单管理
    path: 'cf/create',
    component: () => import('../view/cf/create'),
    children: [
      { // 表单管理
        path: '/',
        name: 'table_create',
        component: () => import('../view/cf/create/table'),
      }, { // 表单项管理
        path: 'item/:id',
        name: 'table_item',
        component: () => import('../view/cf/item')
      }, { // 查看表单
        path: 'show/:id',
        name: 'table_show',
        component: () => import('../view/cf/show')
      }
    ]
  }, { // 表单设计
    path: 'cf/design',
    component: () => import('../view/cf/design'),
    children: [
      { // 表单设计
        path: '/',
        name: 'table_design',
        component: () => import('../view/cf/design/table'),
      },
      { // 表单制作
        path: 'make/:id',
        name: 'table_make',
        component: () => import('../view/cf/design/make'),
      }
    ]
  },
]
