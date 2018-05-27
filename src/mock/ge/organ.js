export default {
  listData: [
    {
      label: '组织名称',
      prop: 'name',
    }, {
      label: '组织编号',
      prop: 'code',
    }, {
      label: '组织类型',
      prop: 'orgType',
    }, {
      label: '负责人',
      prop: 'fzr',
    }, {
      label: '排序',
      prop: 'sort',
    }, {
      label: '状态',
      prop: 'status',
      status: {
        on: '启用',
        off: '禁用',
        tag: false
      }
    },
  ],
  cloums1: [
    {
      label: '序号',
      prop: 'sort',
      width: 60,
      align: 'center'
    }, {
      label: '姓名',
      prop: 'name',
      width: 286,
      link: true,
      hover: {
        label: ['设为负责人', '取消负责人'],
      }
    }, {
      label: '性别',
      prop: 'gender',
      width: 70,
      align: 'center',
      status: {
        on: '男',
        off: '女',
      }
    }, {
      label: '职位',
      prop: 'positionName',
      width: 117,
      align: 'center'
    }, {
      label: '政治面貌',
      prop: 'polityName',
      width: 126,
      align: 'center'
    }, {
      label: '手机号',
      prop: 'phone',
      width: 153,
      align: 'center'
    }, {
      label: '办公电话',
      prop: 'officeTel',
      width: 179,
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
  tableHeader1: [
    {
      label: '排序',
      prop: 'sort',
      width: 60,
      align: 'center'
    }, {
      label: '组织编号',
      prop: 'code',
      width: 100,
    }, {
      label: '组织名称',
      prop: 'name',
    }, {
      label: '负责人',
      prop: 'fzr',
      width: 180,
    }, {
      label: '状态',
      prop: 'status',
      align: 'center',
      width: 100,
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
  },
}
