<template>
  <el-card class="box-card" style="min-height: 99%">
    <div slot="header" class="clearfix">
      <span>角色管理</span>
    </div>
    <div class="text item">
      <div class="tab1_t">
        <span style="font-size: 14px;color:#333;">共 <span style="color: red">{{data.length}}</span> 个下级组织</span>
        <el-button class="tab1_add" @click="role_openDiago">添加角色</el-button>
      </div>
      <comp-table
        :tableData="data"
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
  import moke from '../../../mock/ge/role'
  import RoleDiago from './diago'
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      CompTable,
      RoleDiago
    },
    data () {
      return {
        tableAttr: {
          border: true,
          size: 'mini',
          minWidth: 1000,
          other: [
            {name: '编辑', type: 'editor'},
            {name: '删除', type: 'del', color: 'red'},
          ],
          row_style: {
            fontSize: '14px',
            color: '#333333'
          }
        },
        tableHeader1: moke.cloums,
      }
    },
    computed: mapState({
      data: state => state.setRole.data,
    }),
    created () {
      this.GetGE401A01()
    },
    methods: {
      ...mapMutations([
        'role_openDiago',
        'role_tableEditor'
      ]),
      ...mapActions([
        'GetGE401A01',
        'role_tableDel'
      ]),
      role_tableOtherClick (row, index) {
        if (index === 'editor') {
          this.role_tableEditor(row)
        } else {
          this.$confirm('你确定要删除这条数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.role_tableDel(row)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
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
