/**
 * 帮助信息分类
 */
import {Settint} from '../api';

export default {
  state: {
    /** 添加 、编辑保存的值 */
    form: {},
    hp_title: [],
    /** 表格数据 */
    tableData1: [],
    page: 1,
    pageSize: 10,
    totalCount: 1,
    /** 下拉框查询值 */
    helpTypeId: '',
    /** 搜索值 input */
    htlp_keywords: ''
  },
  /** 计算属性 */
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(value => value.done)
    // }
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    help_taleEditorClick(state) {
      const le = state.hp_title.length
      if (le > 1) {
        state.hp_title.pop()
      }
      state.hp_title = [...state.hp_title, {name: '编辑帮助信息'}]
    },
    help_addClick(state) {
      const le = state.hp_title.length
      if (le > 1) {
        state.hp_title.pop()
      }
      state.hp_title = [...state.hp_title, {name: '添加帮助信息'}]
    },
    help_initBread(state) {
      state.hp_title = [{name: '帮助信息', to: '/ge/help'}]
    },
    help_add(state, data = {status: true}) {
      state.form = data;
      state.hp_title = [{name: '帮助信息', to: '/ge/help'}, {name: '添加帮助信息', to: ''}]
    },
    help_setBrodEd(state, data) {
      state.hp_title = [{name: '帮助信息', to: '/ge/help'}, {name: '编辑帮助信息', to: ''}];
      state.form = {
        ...data.data,
        status: !!data.data.status
      }
    },
    htlp_set_tableData1(state, data) {
      state.tableData1 = data.data;
      state.page = data.page;
      state.pageSize = data.pageSize;
      state.totalCount = data.totalCount
    },
    help_SizeChange(state, val) {
      state.pageSize = val
    },
    help_CurrentChange(state, val) {
      state.page = val
    },
    help_input_cge(state, val) {
      state.htlp_keywords = val;
      this.dispatch('GetGE601A01');
    },
    help_select_change(state, val) {
      state.helpTypeId = val;
      this.dispatch('GetGE601A01');
    },
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    // 删除
    help_tableDel({commit}, data) {
      Settint.GE0601A05({id: data.id}).then(res => {
        this.dispatch('GetGE601A01')
      })
    },
    // 获取信息
    GetGE601A01({commit, state}, page) {
      Settint.GE0601A01({
        page: state.page,
        pageSize: state.pageSize,
        helpTypeId: state.helpTypeId,
        keyword: state.htlp_keywords
      }).then(res => {
        commit('htlp_set_tableData1', res.data)
      })
    },
    // 根据id 查询角色表数据
    async help_getid({commit}, data) {
      return new Promise(resolve => {
        Settint.GE0601A02({id: data.id}).then(res => {
          commit('help_setBrodEd', res.data)
          resolve(res.data)
        });
      })
    },
    // 编辑 / 新增
    help_on_ok({commit}, data) {
      return new Promise(resolve => {
        data.status = data.status ? 1 : 0;
        if (data.id) {
          Settint.GE0601A04(data).then(res => {
            // this.dispatch('GetGE601A01');
            resolve()
          })
        } else {
          Settint.GE0601A03(data).then(res => {
            // this.dispatch('GetGE601A01');
            resolve()
          })
        }
      })
    },
  }
}
