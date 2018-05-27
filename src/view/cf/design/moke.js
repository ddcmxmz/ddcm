export default {
  cloums: [
    {
      label: '排序',
      prop: 'sort',
      width: 80,
      align: 'center'
    }, {
      label: '模板名称',
      prop: 'name',
      width: 150,
    }, {
      label: '模板类型',
      prop: 'type',
      width: 120,
      status: {
        on: '表格',
        off: '表单',
      }
    }, {
      label: '说明',
      prop: 'expound',
    }, {
      label: '创建日期',
      prop: 'updateAt',
      width: 150,
    }
  ],
  tableAttr: {
    border: true,
    size: 'mini',
    minWidth: 1000,
    other: [
      {name: '编辑', type: 'editor'},
      {name: '制作', type: 'preview'},
      {name: '删除', type: 'del', color: 'red'},
    ],
    row_style: {
      fontSize: '14px',
      color: '#333333'
    }
  }
}
