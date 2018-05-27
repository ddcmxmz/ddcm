<template>
  <div>
    <comp-table
      :tableData="tableData1"
      :tableHeader="tableHeader1"
      :tableAttr="tableAttr"
      className="tableClassName"
      @handTDClick="per_handTDClick"
      @tableOtherClick="tableOtherClick">
    </comp-table>
    <br/>
    <comp-pagination
      @handleSizeChange="per_size_change"
      @handleCurrentChange="per_curr_change"
      :page="page"
      :pageSize="pageSize"
      :totalCount="totalCount"
    >
    </comp-pagination>
  </div>
</template>

<script>
  import CompTable from '../../../packages/components/table'
  import CompPagination from '../../../packages/components/pagination'
  import moke from '../../../mock/ge/personnel'
  import {mapState, mapMutations, mapActions} from 'vuex'

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
      tableData1: state => state.setPer.tableData1,
      page: state => state.setPer.page,
      pageSize: state => state.setPer.pageSize,
      totalCount: state => state.setPer.totalCount,
    }),
    methods: {
      ...mapMutations([
        'per_handTDClick',
        'per_size_change',
        'per_curr_change',
        'per_table_editor',
      ]),
      ...mapActions([
        'per_del'
      ]),
      tableOtherClick(row, type) {
        if (type === 'editor') {
          this.per_table_editor(row)
        } else {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.per_del(row)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
    },
  }
</script>
<style scoped lang="scss">

</style>
