<template>
  <el-card class="box-card" style="min-height: 99%">
    <div slot="header" class="clearfix">
      <span>帮助信息分类</span>
    </div>
    <div class="text item">
      <div class="tab1_t">
        <span style="font-size: 14px;color:#333;">共 <span style="color: red">{{tableData1.length}}</span> 个下级组织</span>
        <el-button class="tab1_add" @click="helps_openDiago">添加分类</el-button>
      </div>
      <comp-table
        :tableData="tableData1"
        :tableHeader="tableHeader1"
        :tableAttr="tableAttr"
        className="tableClassName"
        @tableOtherClick="role_tableOtherClick">
      </comp-table>
    </div>
    <role-diago>
    </role-diago>
  </el-card>
</template>

<script>
  import CompTable from '../../../packages/components/table'
  import moke from '../../../mock/ge/help-class'
  import RoleDiago from './diago'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      CompTable,
      RoleDiago
    },
    data() {
      return {
        tableAttr: moke.tableAttr,
        tableHeader1: moke.cloums,
      }
    },
    computed: mapState({
      tableData1: state => state.setHelps.tableData1,
    }),
    created() {
      this.GetGE501A01()
    },
    methods: {
      ...mapMutations([
        'helps_openDiago',
        'helps_tableEditor'
      ]),
      ...mapActions([
        'GetGE501A01',
        'delGE0501A04'
      ]),
      role_tableOtherClick(row, index) {
        if (index === 'editor') {
          this.helps_tableEditor(row)
        } else {
          this.$confirm('你确定要删除这条数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delGE0501A04(row)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      }
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
