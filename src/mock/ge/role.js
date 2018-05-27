export default {
  cloums: [
    {
      label: '排序',
      prop: 'sort',
      width: 60,
      align: 'center'
    }, {
      label: '角色名称',
      prop: 'name',
      width: 150,
    }, {
      label: '描述',
      prop: 'description',
      width: 220,
    }, {
      label: '权限',
      prop: 'permissions',
      array: true
    }, {
      label: '状态',
      prop: 'status',
      width: 100,
      align: 'center',
      status: {
        on: '启用',
        off: '禁用',
        tag: true
      }
    },
  ],
}
