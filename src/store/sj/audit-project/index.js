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
    project_openDiago (state) {
      state.dialogVisible = true
      state.dialog_title = '添加角色'
      state.listValue = {
        permissions: [],
        sort: 1,
        status: true
      }
    },
    // 关闭
    project_onCancel (state) {
      state.dialogVisible = false
    },
    // 点击编辑打开弹窗
    project_tableEditor (state, data) {
      state.dialog_title = '编辑角色'
      state.dialogVisible = true
      this.dispatch('project_getid', data)
    },
    project_setData (state, data) {
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
    project_setID (state, data) {
      state.dialog_qx = data.data
    },
    project_setv (state, data) {
      state.listValue = {
        ...data.data,
        status: !!data.data.status
      }
    },
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    // 删除
    project_tableDel ({commit}, data) {
      Settint.GE0401A04({id: data.id}).then(res => {
        this.dispatch('GetGE401A01')
      })
    },
    // 获取信息
    GetGE401A01 ({commit}) {
      Settint.GE0401A06().then(res => {
        Settint.GE0401A01().then(res => {
          commit('project_setData', res.data)
        })
        commit('project_setID', res.data)
      })
    },
    project_getid ({commit}, data) {
      // 根据id 查询角色表数据
      Settint.GE0401A05({id: data.id}).then(res => {
        commit('project_setv', res.data)
      })
    },
    // 编辑 / 新增
    project_on_ok ({commit}, data) {
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
      commit('project_onCancel')
    },
    project_size_change(state, val) {
      state.pageSize = val;
      this.dispatch('GetGE401A01');
    },
    project_curr_change(state, val) {
      state.page = val;
      this.dispatch('GetGE401A01');
    },
  }
}
