/**
 * 职位管理
 */
import { Settint } from '../api'

const defaTtable = [
  {company: '市教委', orgType: 2, flex: true, children: []},
  {company: '市教委内部机构', orgType: 3, flex: true, children: []},
  {company: '区县教委', orgType: 4, flex: true, children: []},
  {company: '区县教委下属单位', orgType: 5, flex: true, children: []},
  {company: '其他组织', orgType: 9, flex: true, children: []},
]

export default {
  state: {
    dialogVisible: false,
    dialog_title: '添加角色',
    pos_Is_add: false,
    listValue: {},
    options: [],
    tableData1: defaTtable
  },
  /** 计算属性 */
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(value => value.done)
    // }
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    // 打开
    pos_tableAdd (state, data) {
      state.dialogVisible = true
      state.dialog_title = '添加职位'
      state.listValue = {
        company: data.company,
        orgType: data.orgType,
        roles: [],
        status: true,
        name: '',
        sort: 1
      }
    },
    // 关闭
    pos_onCancel (state) {
      state.dialogVisible = false
    },
    pos_tableEditor (state, data) {
      state.dialog_title = '编辑职位'
      state.dialogVisible = true
      state.listValue.company = data.company
      this.dispatch('pos_editor', data)
    },
    pos_setData (state, data) {
      const nd = JSON.parse(JSON.stringify(defaTtable))
      data.data.forEach(n => {
        const d = []
        n.roles.forEach(k => d.push(k.name))
        n.roles = d
      });
      [...nd].forEach(v => {
        [...data.data].forEach(k => {
          if (v.orgType === k.orgType) {
            v.children.push(k)
          }
        })
      })
      let ad = []
      nd.forEach(a => {
        a.length = a.children.length
        ad = [...ad, a, ...a.children]
      })
      state.tableData1 = ad
    },
    pos_setID (state, data) {
      const d = []
      data.data.roles.forEach(v => d.push(v.id))
      data.data.roles = d
      state.listValue = {
        ...data.data,
        status: !!data.data.status
      }
    },
    pos_setv (state, data) {
      state.options = data.data
    },
    pos_setoptions (state, data) {
      state.options = data.data
    }
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    // 删除
    pos_tableDel ({commit}, data) {
      Settint.GE0301A04({id: data.id}).then(res => {
        this.dispatch('pos_getGE0301A01')
      })
    },
    // 获取信息
    pos_getGE0301A01 ({commit}) {
      Settint.GE0301A01().then(res => {
        commit('pos_setData', res.data)
      })
      Settint.GE0401A01().then(res => {
        commit('pos_setoptions', res.data)
      })
    },
    // 根据id 查询角色表数据
    pos_editor ({commit}, data) {
      // commit('pos_setID', {})
      // 根据id 查询角色表数据
      // Settint.GE0301A05({id: data.id}).then(res => {
      //   commit('pos_setv', res.data)
      // })
      // 获取权限
      Settint.GE0301A06({id: data.id}).then(res => {
        commit('pos_setID', res.data)
      })
    },
    // 编辑 / 新增
    pos_on_ok ({commit}, data) {
      data.status = data.status ? 1 : 0
      if (data.id) {
        Settint.GE0301A03(data).then(res => {
          this.dispatch('pos_getGE0301A01')
        })
      } else {
        Settint.GE0301A02(data).then(res => {
          this.dispatch('pos_getGE0301A01')
        })
      }
      commit('pos_onCancel')
    },
  }
}
