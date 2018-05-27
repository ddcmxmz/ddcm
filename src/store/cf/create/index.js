export default {
  state: {
    table_title: []
  },
  /** 计算属性 */
  getters: {},
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    table_itemClick(state) {
      const le = state.table_title.length;
      if (le > 1) {
        state.table_title.pop()
      }
      state.table_title = [...state.table_title, {name: '表单项管理'}]
    },
    table_showClick(state) {
      const le = state.table_title.length;
      if (le > 1) {
        state.table_title.pop()
      }
      state.table_title = [...state.table_title, {name: '查看表单'}]
    },
    table_initBread(state) {
      state.table_title = [{name: '表单管理', to: '/cf/create'}]
    },
    table_item(state) {
      state.table_title = [{name: '表单管理', to: '/cf/create'}, {name: '表单项管理'}]
    },
    table_show(state) {
      state.table_title = [{name: '表单管理', to: '/cf/create'}, {name: '查看表单'}]
    }
  }
}
