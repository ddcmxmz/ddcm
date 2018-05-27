/**
 * 人员管理
 */
import {Settint} from '../api';

export default {
  state: {
    /** 弹窗开关 */
    dialogVisible: false,
    diao_title: '添加角色',
    flag: false,
    /** 表格数据 */
    tableData1: [],
    /** 编辑添加数据 */
    listValue: {},
    /** 组织树获取 */
    org_treeData: [],
    /** 职位 */
    options: [],
    /** 当前点击的树 */
    activeTreeNode: null,

    tree: {},
    parent: '',

    page: 1,
    pageSize: 10,
    totalCount: 1,
    keyword: '',
    orgId: null,
    positionId: null,
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
    per_openDiago(state) {
      state.dialogVisible = true;
      state.flag = true;
      state.diao_title = '添加人员';
      state.listValue = {
        status: true,
        workTtype: false
      };
    },
    // 关闭
    per_onCancel(state) {
      state.dialogVisible = false
    },
    per_bigditor(state) {
      state.flag = true;
      state.diao_title = '编辑人员'
    },
    per_handTDClick(state, data) {
      state.flag = false;
      state.dialogVisible = true;
      state.diao_title = '人员信息';
      this.dispatch('per_getId', data);
    },
    per_handleAvatarSuccess(state, data) {
      console.log(data);
    },
    per_table_editor(state, data) {
      state.dialogVisible = true;
      state.flag = true;
      state.diao_title = '编辑人员';
      this.dispatch('per_getId', data);
    },
    per_setData(state, data) {
      state.tableData1 = data.data;
      state.totalCount = data.totalCount
    },
    per_setID(state, data) {
      state.listValue = {
        ...data.data,
        status: !!data.data.status,
        workType: !!data.data.workType
      };
      state.parent = data.data.positiond;
    },
    per_ip_change(state, val) {
      state.keyword = val;
      this.dispatch('per_GE0201A01')
    },
    per_sele_change(state, val) {
      state.orgId = val;
      this.dispatch('per_GE0201A01')
    },
    per_size_change(state, val) {
      state.pageSize = val;
      this.dispatch('per_GE0201A01');
    },
    per_curr_change(state, val) {
      state.page = val;
      this.dispatch('per_GE0201A01');
    },
    per_handleNodeClick(state, val) {
      state.orgId = val.id;
      this.dispatch('per_GE0201A01');
    },
    per_setTreeData(state, data) {
      state.org_treeData = data.data;
    },
    per_formeTree(state, data) {
      state.listValue.organizationId = data.id
    },
    per_clear_sc(state) {
      state.orgId = null;
      this.dispatch('per_GE0201A01');
    },
    per_parentid(state, val) {
      state.parent = val
    },
    per_set0301(state, data) {
      state.options = data.data
    }
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    /**
     * 树菜单
     * @param commit
     */
    per_getTree({commit}) {
      Settint.GE0109A01().then(res => {
        commit('per_setTreeData', res.data)
      });
      Settint.GE0301A01().then(res => {
        commit('per_set0301', res.data)
      })
    },
    // 获取
    per_GE0201A01({commit, state}) {
      Settint.GE0201A01({
        page: state.page,
        pageSize: state.pageSize,
        helpTypeId: state.helpTypeId,
        keyword: state.keyword,
        orgId: state.orgId,
        positionId: state.positionId,
      }).then(res => {
        commit('per_setData', res.data)
      })
    },
    // 编辑删除
    per_other({commit, state}) {
      state.listValue.status = state.listValue.status ? 1 : 0;
      state.listValue.workType = state.listValue.workType ? 1 : 0;
      if (state.listValue.id) {
        Settint.GE0201A04(state.listValue).then(() => {
          commit('per_onCancel')
          this.dispatch('per_GE0201A01')
        })
      } else {
        Settint.GE0201A03(state.listValue).then(() => {
          commit('per_onCancel')
          this.dispatch('per_GE0201A01')
        })
      }
    },
    // del
    per_del({commit}, data) {
      Settint.GE0201A05({id: data.id}).then(() => {
        this.dispatch('per_GE0201A01')
      })
    },
    per_getId({commit}, data) {
      Settint.GE0201A02({id: data.id}).then(res => {
        commit('per_setID', res.data)
      })
    }
  }
}
