/**
 * 组织单位
 */
import {Settint} from '../api'
import {Msg} from '../../../tools/message'

export default {
  state: {
    /** 打开新增人员 */
    dialogVisible: false,
    /** 打开新增组织 */
    dialogVisible_x: false,
    flag: false,
    /** 新增人员的标题 */
    diao_title: '新增人员',
    /** 新增组织标题 */
    diao_title_x: '编辑组织',
    /** 树菜单数据 */
    org_treeData: [],
    /** 下级组织列表 */
    org_tableData1: [],
    /** 人员表格数据列表 */
    org_tableData2: [],
    /** 存放人员信息 */
    perForm: {},
    /** 单位信息 */
    org_listValue: {},
    /** 当前点击的菜单项 */
    activeTreeNode: {},
    /** 菜单展开的key */
    active_tree: [5],

    options: [],
    parent: '',

    page1: 1,
    pageSize1: 10,
    totalCount1: 1,
    phase1: null,
    keyword1: '',

    page: 1,
    pageSize: 10,
    totalCount: 1,
    keyword: '',
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    // 打开
    org_openDiago(state) {
      state.dialogVisible = true;
      state.flag = true;
      state.diao_title = '新增人员';
      state.parent = state.activeTreeNode.name;
      state.perForm = {
        organizationId: state.activeTreeNode.parentId
      }
    },
    // 关闭
    org_onCancel(state) {
      state.dialogVisible = false;
      state.perForm = {}
    },
    // 点击编辑
    org_bigditor(state) {
      state.flag = true;
      state.diao_title = '编辑人员'
    },
    // 上传图片
    org_handleAvatarSuccess(state, file) {
      // state.imageUrl = file
    },
    // 打开添加人员，
    org_openDiago_x(state) {
      if (!state.activeTreeNode.orgType) return Msg.error('请选择组织单位');
      state.dialogVisible_x = true;
      state.diao_title_x = '添加组织';
      state.org_listValue = {
        orgType: state.activeTreeNode.parentId === 4 ? 5 : state.activeTreeNode.orgType,
        parentId: state.activeTreeNode.id,
        positions: [],
        name: '',
        orgNo: '',
        sort: 1,
        status: true,
      }
    },
    org_editor_d_x(state, data) {
      state.dialogVisible_x = true;
      state.diao_title_x = '编辑组织';
      // state.org_listValue = JSON.parse(JSON.stringify({...data, org_type: data.orgType}))
      this.dispatch('org_GE0101A01', {...data, flag: true})
    },
    org_onCancel_x(state) {
      state.dialogVisible_x = false
    },
    // 点击菜单执行
    org_handleNodeClick(state, data) {
      state.activeTreeNode = data;
      state.active_tree = [data.id];
      this.dispatch('org_table2_getData', data);
      this.dispatch('org_table1_getData', data);
      this.dispatch('org_GE0101A01', data)
    },
    org_setdwZz(state, data) {
      state.org_tableData1 = data.data;
      state.totalCount1 = data.totalCount
    },
    org_tableOtherClick(state) {
      state.flag = true;
      state.dialogVisible = true
    },
    org_setTreeData(state, data) {
      state.org_treeData = data.data;
    },
    org_set101A01(state, data) {
      state.org_listValue = {
        ...data.data,
        status: !!data.data.status
      };
      state.activeTreeNode = data.data
    },
    org_table2_set_editor(state, data) {
      state.perForm = data.data;
      state.flag = true;
      state.dialogVisible = true;
      state.diao_title = '编辑人员'
    },
    org_table2_set_cha(state, data) {
      state.flag = false;
      state.dialogVisible = true;
      state.diao_title = '人员信息';
      state.perForm = data.data
    },
    organ_input_serch(state, val) {
      state.keyword = val;
      // this.dispatch('org_table2_getData')
    },

    organ_SizeChange(state, val) {
      state.pageSize = val;
      this.dispatch('org_table2_getData')
    },
    /** 改变页码 */
    organ_CurrentChange(state, val) {
      state.page = val;
      this.dispatch('org_table2_getData')
    },
    organ_SizeChange1(state, val) {
      state.pageSize1 = val;
      this.dispatch('org_table1_getData')
    },
    /** 改变页码 */
    organ_CurrentChange1(state, val) {
      state.page1 = val;
      this.dispatch('org_table1_getData')
    },
    org_table2_getDatas(state, data) {
      state.org_tableData2 = data.data
    },

    org_formeTree(state, data) {
      state.perForm.parentId = data.id
    },
    org_parentid(state, val) {
      state.parent = val
    },
    org_set0301(state, data) {
      state.options = data.data
    },
    org_sele_change(state, val) {
      state.phase1 = val;
      this.dispatch('org_table1_getData')
    },
    org_schoot(state, data) {
      console.log(data.data);
    }
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    handleNodeClick({commit}, data) {
      commit('handleNodeClick', data)
    },
    /**
     * 职位获取
     * @param commit
     */
    getPos({commit}) {
      Settint.GE0301A01().then(res => {
        commit('org_set0301', res.data)
      })
    },

    /**
     * 获取学校学段
     * @param commit
     */
    // getScool({commit}) {
    //   Settint.GE9001A01({parentKey: 'ORG_SCHOOL_PHASE'}).then(res => {
    //     commit('org_schoot', res.data)
    //   })
    // },
    /**
     * 树菜单
     * @param commit
     */
    // 组织机构树获取（全）
    org_getTree({commit}) {
      Settint.GE0109A01().then(res => {
        commit('org_setTreeData', res.data)
      })
    },
    // 点击菜单树查询 根据组织分类或组织ID查询下级组织
    // org_getGE0109A01({commit}, data) {
    //   if (data.parentId) {
    //     Settint.GE0109A02({id: data.parentId}).then(res => {
    //       commit('org_setdwZz', res.data)
    //     })
    //   }
    // },
    org_defaultActive({commit, state}) {
      Settint.GE0101A01({id: state.active_tree[0]}).then(res => {
        commit('org_set101A01', res.data);
        // commit('org_setdwZz', res.data)
      });
      this.dispatch('org_table2_getData');
      this.dispatch('org_table1_getData');
    },
    /**
     * 组织
     */
    org_GE0101A01({commit}, data) {
      Settint.GE0101A01({id: data.id}).then(res => {
        commit('org_set101A01', res.data);
        // if (!data.flag) commit('org_setdwZz', res.data)
      })
    },
    // 获取组织分页
    org_table1_getData({commit, state}) {
      Settint.GE0109A02({
        id: state.active_tree[0],
        page: state.page1,
        pageSize: state.pageSize1,
        phase: state.phase1,
        keyword: state.keyword1,
      }).then(res => {
        commit('org_setdwZz', res.data)
      })
    },
    // 发送添加请求
    org_onOk_x({commit, state}, data) {
      data.status = data.status ? 1 : 0;
      if (data.id) {
        Settint.GE0101A03(data).then(res => {
          this.dispatch('org_getTree');
          this.dispatch('org_GE0101A01', state.activeTreeNode)
        })
      } else {
        Settint.GE0101A02(data).then(res => {
          this.dispatch('org_getTree');
          this.dispatch('org_GE0101A01', state.activeTreeNode)
        })
      }
      commit('org_onCancel_x')
    },
    // 删除组织
    /**
     * @param commit
     * @param state
     * @param data
     */
    org_delA04({commit, state}, data) {
      Settint.GE0101A04({id: data.id}).then(res => {
        this.dispatch('org_getTree');
        this.dispatch('org_GE0101A01', state.activeTreeNode)
      })
    },
    // todo 设置负责人
    org_fzr({commit}, data) {
      Settint.GE0101A05({...data, userId: data.id, manage: !data.manager}).then(res => {
        this.dispatch('org_table2_getData')
      })
    },
    /**
     * 人员
     */
    org_table2_getData({commit, state}) {
      Settint.GE0201A01({
        page: state.page,
        orgId: state.activeTreeNode.id,
        pageSize: state.pageSize,
        keyword: state.keyword,
      }).then(res => {
        commit('org_table2_getDatas', res.data)
      })
    },
    org_table2_editor({commit}, data) {
      Settint.GE0201A02({id: data.id}).then(res => {
        commit('org_table2_set_editor', res.data)
      })
    },
    org_handTDClick({commit}, data) {
      Settint.GE0201A02({id: data.id}).then(res => {
        commit('org_table2_set_cha', res.data)
      })
    },
    // 人员编辑
    org_onOK({commit, state}) {
      state.perForm.status = state.perForm.status ? 1 : 0;
      state.perForm.workType = state.perForm.workType ? 1 : 0;
      if (state.perForm.id) {
        Settint.GE0201A04(state.perForm).then(res => {
          this.dispatch('org_table2_getData')
        })
      } else {
        Settint.GE0201A03(state.perForm).then(res => {
          this.dispatch('org_table2_getData')
        })
      }
      commit('org_onCancel')
    },
    // 根据ID删除人员
    org_delGE0201A05({commit}, data) {
      Settint.GE0201A05({id: data.id}).then(res => {
        this.dispatch('org_table2_getData');
        Promise.resolve()
      })
    },
  }
}
