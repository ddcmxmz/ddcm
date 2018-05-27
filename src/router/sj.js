/**
 * sj
 */
export default [
  { // 首页
    path: 'sj/first-page',
    name: 'sj_first_page',
    meta: {roles: ['admin']},
    component: () => import('../view/sj/first-page')
  },
  { // 审计项目
    path: 'sj/audit-project',
    name: 'sj_audit_project',
    meta: {roles: ['admin']},
    component: () => import('../view/sj/audit-project')
  },
  { // 整改任务
    path: 'sj/change-job',
    name: 'sj_change_job',
    meta: {roles: ['admin']},
    component: () => import('../view/sj/change-job')
  },
  { // 系统设置
    path: 'sj/system-set',
    name: 'sj_system_set',
    meta: {roles: ['admin']},
    component: () => import('../view/sj/system-set')
  }
]
