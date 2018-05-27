<template>
  <el-card class="box-card set_organ" body-style="padding:0">
    <div slot="header" class="clearfix">
      <span>组织单位管理</span>
    </div>
    <div class="set_organ_body">
      <div class="bg-purple">
        <sc-tree
          :active="active_tree"
          :data="org_treeData"
          @handleNodeClick="org_handleNodeClick">
        </sc-tree>
      </div>
      <div class="bg-purple-light">
        <sc-card title="单位信息">
          <sc-view
            :listData="listData"
            :listValue="listValue"
            className="view_cont_item"
            labelWidth="90"
            col="3"
          >
          </sc-view>
          <el-button class="title_card_editor" @click="org_editor_d_x(listValue)" :disabled="!listValue.orgType">编辑
          </el-button>
        </sc-card>
        <el-tabs v-model="activeName" style="margin-top: 15px;">
          <el-tab-pane label="下级单位" name="1">
            <div class="tab1_t">
              <div>
                <sc-section :value="seVal" @change="org_sele_change"></sc-section>
                <el-input
                  style="width: 280px"
                  :value="keyword1"
                  placeholder="请输入组织名称"
                  prefix-icon="el-icon-search"
                  clearable
                  class="input-with-select">
                  <el-button slot="append" @click="org_table1_getData">查询</el-button>
                </el-input>
              </div>
              <el-button class="tab1_add" @click="org_openDiago_x">添加下级组织</el-button>
            </div>
            <br>
            <sc-table
              :tableData="tableData1"
              :tableHeader="tableHeader1"
              :tableAttr="tableAttr"
              className="tableClassName"
              @tableOtherClick="tableOtherClick">
            </sc-table>
            <br/>
            <sc-pagination
              @handleSizeChange="organ_SizeChange1"
              @handleCurrentChange="organ_CurrentChange1"
              :page="page1"
              :pageSize="pageSize1"
              :totalCount="totalCount1"
            >
            </sc-pagination>
          </el-tab-pane>
          <el-tab-pane label="人员" name="2">
            <div class="tab1_t">
              <el-input
                style="width: 350px"
                :value="keyword"
                placeholder="请输入姓名或手机号"
                prefix-icon="el-icon-search"
                clearable
                @change="organ_input_serch"
                class="input-with-select">
                <el-button slot="append" @click="org_table2_getData">查询</el-button>
              </el-input>
              <el-button class="tab1_add" @click="org_openDiago">添加人员</el-button>
            </div>
            <br/>

            <sc-table
              :tableData="tableData2"
              :tableHeader="cloums1"
              :tableAttr="tableAttr"
              className="tableClassName"
              @handTDClick="org_handTDClick"
              @handTDsetClick="org_fzr"
              @tableOtherClick="tableOtherClick2">
            </sc-table>
            <br/>
            <sc-pagination
              @handleSizeChange="organ_SizeChange"
              @handleCurrentChange="organ_CurrentChange"
              :page="page"
              :pageSize="pageSize"
              :totalCount="totalCount"
            >
            </sc-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <add-dialog
      :dialogVisible="dialogVisible"
      :flag="flag"
      :listValue="perForm"
      :diao_title="diao_title"
      :treeData="org_treeData"
      :parent="parent"
      :options="options"
      @parentid="org_parentid"
      @onCancel="org_onCancel"
      @bigditor="org_bigditor"
      @onOK="org_onOK"
      @formeTree="org_formeTree"
      @handleAvatarSuccess="org_handleAvatarSuccess"
    >
    </add-dialog>
    <add-xdialog>
    </add-xdialog>
  </el-card>
</template>

<script>
  import moke from '../../../mock/ge/organ'
  import AddDialog from './add-diaog'
  import AddXdialog from './add-x.vue'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import {hasPermission} from '@/tools/utils'

  export default {
    components: {
      AddDialog,
      AddXdialog,
    },
    data() {
      return {
        tableAttr: moke.tableAttr,
        tableHeader1: moke.tableHeader1,
        listData: moke.listData,
        cloums1: moke.cloums1,
        activeName: '1',
        phase1: null,
        seVal: ''
      }
    },
    created() {
      this.org_defaultActive();
      this.org_getTree();
      this.getPos();
    },
    computed: mapState({
      dialogVisible: state => state.setOrgan.dialogVisible,
      flag: state => state.setOrgan.flag,
      diao_title: state => state.setOrgan.diao_title,
      org_treeData: state => state.setOrgan.org_treeData,
      tableData1: state => state.setOrgan.org_tableData1,
      tableData2: state => state.setOrgan.org_tableData2,
      listValue: state => state.setOrgan.org_listValue,
      active_tree: state => state.setOrgan.active_tree,
      perForm: state => state.setOrgan.perForm,
      parent: state => state.setOrgan.parent,
      options: state => state.setOrgan.options,

      page1: state => state.setOrgan.page1,
      pageSize1: state => state.setOrgan.pageSize1,
      totalCount1: state => state.setOrgan.totalCount1,
      keyword1: state => state.setOrgan.keyword1,

      page: state => state.setOrgan.page,
      pageSize: state => state.setOrgan.pageSize,
      totalCount: state => state.setOrgan.totalCount,
      keyword: state => state.setOrgan.keyword,
    }),
    methods: {
      ...mapMutations([
        'org_openDiago',
        'org_onCancel',
        'org_openDiago_x',
        'org_bigditor',
        'org_handleAvatarSuccess',
        'org_tableOtherClick',
        'org_handleNodeClick',
        'org_editor_d_x',
        'organ_input_serch',
        'organ_SizeChange',
        'organ_CurrentChange',
        'organ_SizeChange1',
        'organ_CurrentChange1',
        'org_formeTree',
        'org_parentid',
        'org_sele_change'
      ]),
      ...mapActions([
        'org_getTree',
        'org_delA04',
        'org_getGE0101A01',
        'org_fzr',
        'org_table2_editor',
        'org_onOK',
        'org_delGE0201A05',
        'org_handTDClick',
        'org_table2_getData',
        'getPos',
        'org_defaultActive',
        'org_table1_getData',
        'getScool'
      ]),
      tableOtherClick(row, type) {
        if (type === 'editor') {
          this.org_editor_d_x(row)
        } else {
          this.$confirm('你确定要删除这条数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.org_delA04(row)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      },
      tableOtherClick2(row, type) {
        if (type === 'editor') {
          this.org_table2_editor(row)
        } else {
          this.$confirm('你确定要删除这条数据吗?, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.org_delGE0201A05(row)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      },
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/var";

  .header_row_class_name {
    font-size: 14px;
    color: $font_title_color;
  }

  .td_active_editor {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      color: $bg_main_color;
    }
  }

  .set_organ {
    &_body {
      min-height: calc(100vh - 115px);
      display: flex;
    }
  }

  .bg-purple {
    border-right: 1px solid #ebeef5;
    min-width: 220px;
    padding: 10px;
  }

  .bg-purple-light {
    padding: 25px 15px;
    width: calc(100% - 270px);
  }

  .title_card_editor {
    position: absolute;
    right: 10px;
    top: 15px;
  }

  .tab1_t {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 0;
  }
</style>
