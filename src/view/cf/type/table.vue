<template>
  <div>
    <comp-table
      :tableData="tableData"
      :tableHeader="tableHeader"
      :tableAttr="tableAttr"
      :loading="loading"
      @tableOtherClick="tableOtherClick">
    </comp-table>
    <br/>
    <comp-pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
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
  import {DataTypeApi} from '../api/dataTypeApi'
  import {Msg} from '../../../tools/message'

  export default {
    components: {
      CompTable,
      CompPagination
    },
    data() {
      return {
        loading: false,
        tableAttr: {
          border: true,
          size: 'mini',
          other: [
            {name: '编辑', type: 'edit'},
            {name: '删除', type: 'del', color: 'red'}
          ],
          row_style: {fontSize: '14px', color: '#333333'}
        },
        tableHeader: [
          {label: 'id', prop: 'id', width: 200, hidden: 'hidden'},
          {label: '名称', prop: 'descName', width: 200},
          {label: '控件类型', prop: 'dataType'},
          {label: '长度', prop: 'dataSize', width: 100, align: 'center'},
          {label: 'java类型', prop: 'javaType', width: 140}
        ],
        tableData: [],
        page: 1,
        pageSize: 10,
        totalCount: 0
      }
    },
    methods: {
      tableOtherClick(row, type) {
        switch (type) {
          case 'edit':
            this.$emit('getTableNum', Object.assign({}, row, null));
            break;
          case 'del' :
            this.$confirm('是否确认删除？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              DataTypeApi.DeleteDataType(row.id).then(res => {
                Msg.success(res.data.message);
                this.getAllDataType();
              }).catch(() => {
                Msg.error('发生了一些错误..')
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            });
            break;
          default :
            Msg.error('请重新操作')
        }
      },
      handleSizeChange: function (val) {
        this.pageSize = val;
        // 获取数据
        this.getAllDataType();
      },
      /** 改变页码 */
      handleCurrentChange: function (val) {
        this.page = val;
        // 获取数据
        this.getAllDataType();
      },
      getAllDataType: function () {
        this.loading = true;
        DataTypeApi.GetDataType(this.page, this.pageSize).then((res) => {
          if (res.data.data) {
            this.tableData = res.data.data.data || [];
            this.totalCount = res.data.data.totalCount || 0;
          }
          this.loading = false;
        }).catch(() => {
          this.loading = false;
          Msg.error('发生了一些错误..')
        })
      }
    },
    mounted() {
      this.getAllDataType();
    }
  }
</script>
<style scoped lang="scss">

</style>
