export default {
  cloums: [
    {
      label: '排序',
      prop: 'sort',
      width: 60,
      align: 'center'
    }, {
      label: '分类名称',
      prop: 'name',
      indent: true
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
  tableAttr: {
    border: true,
    size: 'mini',
    minWidth: 1000,
    other: [
      {name: '编辑', type: 'editor'},
      {name: '删除', type: 'del', color: 'red'},
    ],
    row_style: {
      fontSize: '14px',
      color: '#333333'
    }
  }
}
