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
  import {Msg} from '../../../tools/message'
  import {checkWay} from '../util/util'

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
        tableHeader: [
          {label: 'id', prop: 'id', width: 200, hidden: 'hidden'},
          {label: '中文名称', prop: 'modelItemName'},
          {label: '英文名称', prop: 'modelItemEnglishName'},
          {label: '模板类型', prop: 'descName', width: 150},
          {label: '长度', prop: 'length', width: 60, align: 'cent er'},
          {label: '数据校验', prop: 'checkWayLabel'},
          {label: '是否显示', prop: 'displayColLabel', width: 80},
          {label: '是否可空', prop: 'notNullLabel', width: 80}
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
              ItemApi.DeleteTableItem(row).then(res => {
                Msg.success(res.data.message);
                this.getAllData();
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
        this.getAllData();
      },
      /** 改变页码 */
      handleCurrentChange: function (val) {
        this.page = val;
        // 获取数据
        this.getAllData();
      },
      getAllData: function () {
        this.loading = true;
        ItemApi.GetTableItem(this.page, this.pageSize, this.modelId).then((res) => {
          if (res.data.data) {
            this.tableData = res.data.data.data || [];
            this.totalCount = res.data.data.totalCount || 0;
            let data = res.data.data.data || [];
            let result = [];
            for (let i = 0; i < data.length; i++) {
              let temp = data[i] || {};
              temp.descName = temp.cfModelDataType.descName;
              temp.dataType = temp.cfModelDataType.dataType;
              for (let j = 0; j < checkWay.length; j++) {
                if (checkWay[j].type === temp.checkWay) {
                  temp.checkWayLabel = checkWay[j].name;
                }
              }
              temp.notNullLabel = temp.notNull?'可空':'不可空';
              temp.displayColLabel = temp.displayCol?'显示':'不显示';
              result.push(temp);
            }
            this.tableData = result;
            this.totalCount = res.data.data.totalCount;
          }
          this.loading = false;
        }).catch(() => {
          this.loading = false;
          Msg.error('发生了一些错误..')
        })
      },
      checkTable() {
        this.loading = false;
        TableApi.CheckTable(this.modelId).then((res) => {
          if (res.data.data) {
            this.tableAttr.other = null
          }
          this.loading = false;
        }).catch(() => {
          this.loading = false;
          Msg.error('发生了一些错误..')
        })
      }
    },
    mounted() {
      this.getAllData();
      this.checkTable();
    }
  }
</script>
<style scoped lang="scss">

</style>
