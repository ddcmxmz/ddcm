/**
 * 帮助信息分类
 */
import {Settint} from '../api';

export default {
  state: {
    dialogVisible: false,
    dialog_title: '添加分类',
    helps_Is_add: false,
    listValue: {},
    tableData1: [],
    selecOption: [],
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
    helps_openDiago(state) {
      state.dialogVisible = true
      state.dialog_title = '添加分类'
      state.listValue = {status: true}
    },
    // 关闭
    helps_onCancel(state) {
      state.dialogVisible = false
    },
    helps_tableEditor(state, row) {
      state.dialog_title = '编辑分类';
      console.log(row);
      state.listValue = {
        ...row,
        name: row.name.replace(/└─/, '').replace(/├─/, ''),
        status: !!row.status
      };
      state.dialogVisible = true
    },
    helps_setData(state, data) {
      state.tableData1 = data
    },
    help_set_data(state, data) {
      console.log(data);
      state.tableData1 = transformation((JSON.parse(JSON.stringify(data.data))));
      state.selecOption = data.data
    }
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    // 帮助信息分类列表获取
    GetGE501A01({commit}) {
      Settint.GE0501A01().then(res => {
        commit('help_set_data', res.data)
      })
    },
    helps_on_ok({commit}, data) {
      data.status = data.status ? 1 : 0;
      if (data.id) {
        Settint.GE0501A03(data).then(res => {
          this.dispatch('GetGE501A01')
        })
      } else {
        // 添加
        Settint.GE0501A02(data).then(res => {
          this.dispatch('GetGE501A01')
        })
      }
      commit('helps_onCancel')
    },
    // del
    delGE0501A04({commit}, data) {
      Settint.GE0501A04({id: data.id}).then(res => {
        console.log(res)
        this.dispatch('GetGE501A01')
      })
    }
  }
}

function transformation(dt) {
  const nd = [];
  restructure(dt, nd);
  return nd
}

function restructure(dt, nd) {
  for (let i = 0; i < dt.length; i++) {
    if (dt[i].children && dt[i].children.length) {
      const ad = [];
      dt[i].children.forEach((v, k) => ad.push({
        ...v,
        name: (k === dt[i].children.length - 1 ? '└─' : '├─') + v.name,
        indent: true
      }));
      dt.splice(i + 1, 0, ...ad)
    }
    nd.push(dt[i]);
  }
}
