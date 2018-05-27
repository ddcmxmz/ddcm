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
  import {ItemApi} from '../api/itemApi'
  import {TableApi} from '../api/tableApi'
  import {ShowTableApi} from '../api/showTableApi'
  import {Msg} from '../../../tools/message'

  export default {
    components: {
      CompTable,
      CompPagination
    },
    props: {
      modelId: {}
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
        tableHeader: [],
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
              ShowTableApi.DeleteData(this.modelId, row.id).then(res => {
                Msg.success(res.data.message);
                this.getTableData();
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
        this.getTableData();
      },
      /** 改变页码 */
      handleCurrentChange: function (val) {
        this.page = val;
        // 获取数据
        this.getTableData();
      },
      getHeader() {
        ShowTableApi.GetTitle(this.modelId).then((res) => {
          if (res.data.data) {
            let data = res.data.data;
            let result = [];
            for (let i = 0; i < data.length; i++) {
              if (i === 0)
                result.push({label: data[i].modelItemName, prop: data[i].modelItemEnglishName});
              else
                result.push({label: data[i].modelItemName, prop: data[i].modelItemEnglishName});
            }
            this.tableHeader = result;
          }
        }).catch(() => {
          this.loading = false;
          Msg.error('发生了一些错误..')
        })
      },
      getTableData: function () {
        this.loading = true;
        ShowTableApi.GetData(this.page,this.pageSize,this.modelId).then((res) => {
          if(res.data.data){
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
      this.getTableData();
      this.getHeader();
    }
  }
</script>
<style scoped lang="scss">

</style>
