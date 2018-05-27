<template>
  <div>
    <div class="tab1_t">
      <div>
        <el-select
          :value="helpTypeId"
          clearable
          filterable
          @change="help_select_change"
          style="width: 180px"
          placeholder="请选择帮助信息分类">
          <el-option
            v-for="item in tableData1"
            :key="item.id"
            :label="item.helpName"
            :value="item.id">
          </el-option>
        </el-select>&nbsp;&nbsp;
        <el-input
          :value="htlp_keywords"
          style="width: 350px"
          placeholder="请输入搜索内容"
          prefix-icon="el-icon-search"
          @change="help_input_cge"
          clearable
          class="input-with-select">
          <el-button slot="append" @click="GetGE601A01">查询</el-button>
        </el-input>
      </div>

      <router-link to="/setting/help/editor/add" class="add_htlp_link">
        <el-button class="tab1_add" @click="help_addClick">添加帮助信息</el-button>
      </router-link>

    </div>
    <comp-table
      :tableData="tableData1"
      :tableHeader="tableHeader1"
      :tableAttr="tableAttr"
      className="tableClassName"
      @tableOtherClick="role_tableOtherClick">
    </comp-table>
    <br>
    <comp-pagination
      @help_SizeChange="help_SizeChange"
      @handleCurrentChange="help_CurrentChange"
      :page="page"
      :pageSize="pageSize"
      :totalCount="totalCount"
    >
    </comp-pagination>
  </div>
</template>

<script>
  import CompTable from '../../../packages/components/table'
  import moke from '../../../mock/ge/help'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import CompPagination from '../../../packages/components/pagination'

  export default {
    components: {
      CompTable,
      CompPagination
    },
    data() {
      return {
        tableAttr: moke.tableAttr,
        tableHeader1: moke.cloums,
      }
    },
    computed: mapState({
      tableData1: state => state.setHelp.tableData1,
      page: state => state.setHelp.page,
      pageSize: state => state.setHelp.pageSize,
      totalCount: state => state.setHelp.totalCount,
      helpTypeId: state => state.setHelp.helpTypeId,
      htlp_keywords: state => {
        return state.setHelp.htlp_keywords
      },
    }),
    created() {
      this.GetGE601A01()
    },
    methods: {
      ...mapMutations([
        'help_addClick',
        'help_taleEditorClick',
        'help_SizeChange',
        'help_CurrentChange',
        'help_input_cge',
        'help_select_change'
      ]),
      ...mapActions([
        'GetGE601A01',
        'help_tableDel'
      ]),
      role_tableOtherClick(row, index) {
        if (index === 'editor') {
          this.help_taleEditorClick();
          this.$router.push(`/ge/help/editor/${row.id}`)
        } else {
          this.$confirm('你确定要删除这条数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.help_tableDel(row)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
    }
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
