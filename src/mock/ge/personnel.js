export default {
  cloums: [
    {
      label: '序号',
      prop: 'sort',
      width: 60,
      align: 'center'
    }, {
      label: '姓名',
      prop: 'name',
      width: 114,
      link: true
    }, {
      label: '所属单位',
      prop: 'parentId',
      minWidth: 174,
    }, {
      label: '职位',
      prop: 'positions',
      width: 190,
    }, {
      label: '政治面貌',
      prop: 'polityName',
      width: 114,
      align: 'center'
    }, {
      label: '性别',
      prop: 'gender',
      width: 58,
      align: 'center',
      status: {
        on: '男',
        off: '女',
      }
    }, {
      label: '手机号',
      prop: 'phone',
      width: 153,
      align: 'center'
    }, {
      label: '办公电话',
      prop: 'officeTel',
      width: 151,
    }, {
      label: 'Email',
      prop: 'email',
      width: 148,
    }, {
      label: 'QQ',
      prop: 'qq',
      width: 123,
    }, {
      label: '用户状态',
      prop: 'status',
      width: 108,
      align: 'center',
      status: {
        on: '启用',
        off: '禁用',
        tag: true
      }
    }, {
      label: '在职状态',
      prop: 'workType',
      width: 108,
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
    fixed: 'right',
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
