/**
 * 系统设置
 */
export default [
  { // 组织单位
    path: 'ge/organ',
    name: 'ge_organ',
    meta: {roles: ['MH:ARTICLE:CREATE', 'MH:ARTICLE:READ']},
    component: () => import('../view/ge/organ')
  },
  { // 人员管理
    path: 'ge/personnel',
    name: 'ge_personnel',
    meta: {roles: ['MH:ARTICLE:MANAGE']},
    component: () => import('../view/ge/personnel')
  },
  { // 职位管理
    path: 'ge/position',
    name: 'ge_position',
    meta: {roles: ['admin']},
    component: () => import('../view/ge/position')
  },
  { // 角色权限
    path: 'ge/role',
    name: 'ge_role',
    meta: {roles: ['admin']},
    component: () => import('../view/ge/role')
  },
  { // 帮助信息分类
    path: 'ge/help-class',
    name: 'ge_help_class',
    meta: {roles: ['admin']},
    component: () => import('../view/ge/help-class')
  },
  { // 帮助信息
    path: 'ge/help',
    component: () => import('../view/ge/help'),
    children: [
      { // 帮助信息首页
        path: '/',
        name: 'ge_help',
        meta: {roles: ['admin']},
        component: () => import('../view/ge/help/table'),
      },
      { // 帮助信息编辑、查看页
        path: 'editor/:id',
        name: 'ge_help_editor',
        meta: {roles: ['admin']},
        component: () => import('../view/ge/help/editor'),
      }
    ]
  },
  { // 设置
    path: 'ge/set',
    name: 'ge_set',
    meta: {roles: ['admin']},
    component: () => import('../view/ge/set')
  },
]
