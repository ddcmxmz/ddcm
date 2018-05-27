export default {
  cloums: [
    {
      label: 'ID',
      prop: 'id',
      width: 60,
      align: 'center'
    }, {
      label: '帮助信息分类',
      prop: 'helpName',
      width: 120,
      align: 'center'
    }, {
      label: '标题',
      prop: 'title',
    }, {
      label: '阅读次数',
      prop: 'ydcs',
      width: 120,
      align: 'center'
    }, {
      label: '排序',
      prop: 'sort',
      width: 120,
      align: 'center'
    }, {
      label: '状态',
      prop: 'status',
      width: 120,
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
