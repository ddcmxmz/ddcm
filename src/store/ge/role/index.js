/**
 * 角色权限
 */
import { Settint } from '../api'

export default {
  state: {
    /** 打开编辑弹窗 */
    dialogVisible: false,
    dialog_title: '添加角色',
    /** 添加、编辑 */
    listValue: {},
    /** 表格数据 */
    data: [],
    /** 保存所有权限 */
    dialog_qx: []
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
    role_openDiago (state) {
      state.dialogVisible = true
      state.dialog_title = '添加角色'
      state.listValue = {
        permissions: [],
        sort: 1,
        status: true
      }
    },
    // 关闭
    role_onCancel (state) {
      state.dialogVisible = false
    },
    // 点击编辑打开弹窗
    role_tableEditor (state, data) {
      state.dialog_title = '编辑角色'
      state.dialogVisible = true
      this.dispatch('role_getid', data)
    },
    role_setData (state, data) {
      data.data.forEach(v => {
        const a = []
        v.permissions.forEach(k => {
          k = state.dialog_qx.find(j => {
            if (k === j.id) a.push(j.name)
          })
        })
        v.permissions = a
      })
      state.data = data.data
    },
    role_setID (state, data) {
      state.dialog_qx = data.data
    },
    role_setv (state, data) {
      state.listValue = {
        ...data.data,
        status: !!data.data.status
      }
    },
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    // 删除
    role_tableDel ({commit}, data) {
      Settint.GE0401A04({id: data.id}).then(res => {
        this.dispatch('GetGE401A01')
      })
    },
    // 获取信息
    GetGE401A01 ({commit}) {
      Settint.GE0401A06().then(res => {
        Settint.GE0401A01().then(res => {
          commit('role_setData', res.data)
        })
        commit('role_setID', res.data)
      })
    },
    role_getid ({commit}, data) {
      // 根据id 查询角色表数据
      Settint.GE0401A05({id: data.id}).then(res => {
        commit('role_setv', res.data)
      })
    },
    // 编辑 / 新增
    role_on_ok ({commit}, data) {
      data.status = data.status ? 1 : 0
      if (data.id) {
        Settint.GE0401A03(data).then(res => {
          this.dispatch('GetGE401A01')
        })
      } else {
        Settint.GE0401A02(data).then(res => {
          this.dispatch('GetGE401A01')
        })
      }
      commit('role_onCancel')
    },
  }
}
