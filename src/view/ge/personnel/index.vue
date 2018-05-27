<template>
  <el-card class="box-card" style="min-height: 99%">
    <div slot="header" class="clearfix">
      <span>人员管理</span>
    </div>
    <div>
      <div class="tab1_t">
        <div>
          <el-popover
            ref="popover4"
            width="250"
            trigger="click">
            <el-input
              v-model="filterText"
              style="width: 250px"
              clearable
              placeholder="输入关键字进行过滤">
            </el-input>
            <comp-tree
              ref="tree2"
              :active="activeTreeNode"
              :data="org_treeData"
              @handleNodeClick="handleNodeClick">
            </comp-tree>
          </el-popover>
          <el-input
            v-model="sratch"
            style="width: 250px"
            v-popover:popover4
            clearable
            @change="per_ip_clear"
            placeholder="请选择组织">
          </el-input>
          <el-select
            @change="per_sele_change"
            v-model="value"
            clearable
            style="width: 150px"
            placeholder="请选择职位">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>&nbsp;&nbsp;
          <el-input
            style="width: 240px"
            :value="keyword"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            clearable
            @change="per_ip_change"
            class="input-with-select">
            <el-button slot="append">查询</el-button>
          </el-input>
        </div>
        <el-button class="tab1_add" @click="per_openDiago">添加人员</el-button>
      </div>
      <br>
      <per-table></per-table>
    </div>
    <add-dialog
      :dialogVisible="dialogVisible"
      :flag="flag"
      :diao_title="diao_title"
      :listValue="listValue"
      :treeData="org_treeData"
      :options="options"
      :parent="parent"
      @onCancel="per_onCancel"
      @parentid="per_parentid"
      @bigditor="per_bigditor"
      @onOK="per_other"
      @formeTree="per_formeTree"
      @handleAvatarSuccess="per_handleAvatarSuccess"
    >
    </add-dialog>
  </el-card>
</template>

<script>
  import PerTable from './table.vue'
  import {mapMutations, mapState, mapActions} from 'vuex'
  import AddDialog from '../organ/add-diaog'
  import CompTree from '../../../packages/components/tree'

  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.$refs['tree'].filter(val)
      }
    },
    components: {
      PerTable,
      AddDialog,
      CompTree
    },
    data() {
      return {
        filterText: '',
        sratch: null,
        value: ''
      }
    },
    computed: mapState({
      dialogVisible: state => state.setPer.dialogVisible,
      flag: state => state.setPer.flag,
      diao_title: state => state.setPer.diao_title,
      listValue: state => state.setPer.listValue,
      keyword: state => state.setPer.keyword,
      orgId: state => state.setPer.orgId,
      activeTreeNode: state => state.setPer.activeTreeNode,
      org_treeData: state => state.setPer.org_treeData,
      positionId: state => state.setPer.positionId,
      options: state => state.setPer.options,
      parent: state => state.setPer.parent,

    }),
    created() {
      this.per_GE0201A01()
      this.per_getTree()
    },
    methods: {
      ...mapMutations([
        'per_openDiago',
        'per_onCancel',
        'per_bigditor',
        'per_handleAvatarSuccess',
        'per_ip_change',
        'per_sele_change',
        'per_handleNodeClick',
        'per_formeTree',
        'per_clear_sc',
        'per_parentid'
      ]),
      ...mapActions([
        'per_GE0201A01',
        'per_other',
        'per_getTree'
      ]),
      handleNodeClick(val) {
        this.per_handleNodeClick(val);
        this.sratch = val.name
      },
      per_ip_clear(val) {
        !val && this.per_clear_sc();
      }
    },
  }
</script>
<style scoped lang="scss">

  .tab1_t {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 0;
  }
</style>
