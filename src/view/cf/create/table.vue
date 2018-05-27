<template>
  <div>
    <div class="tab1_t">
      <div></div>
      <el-button class="tab1_add" @click="openDialog">添加表单</el-button>
    </div>
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
    <el-dialog
      :title="'添加表单'"
      :visible.sync="dialogVisible"
      width="450px"
      top="5vh"
      :before-close="handleClose">
      <comp-form @close="closeAndRefresh"
                 ref="compForm"
                 :formInfo="formInfo">
      </comp-form>
    </el-dialog>
  </div>
</template>

<script>
  import CompTable from '../../../packages/components/table'
  import CompPagination from '../../../packages/components/pagination'
  import {TableApi} from '../api/tableApi';
  import {Msg} from '../../../tools/message'
  import CompForm from './form'
  import {mapMutations} from 'vuex'

  export default {
    components: {
      CompTable,
      CompPagination,
      CompForm
    },
    data() {
      return {
        loading: false,
        dialogVisible: false,
        tableAttr: {
          border: true,
          operateColumnWidth: 250,
          other: [
            {name: '编辑', type: 'edit'},
            {name: '删除', type: 'del', color: 'red'},
            {name: '编辑表单项', type: 'editItem'},
            {name: '查看表单', type: 'show'}
          ],
          row_style: {fontSize: '14px', color: '#333333'}
        },
        tableHeader: [
          {label: 'id', prop: 'id', width: 150, hidden: 'hidden'},
          {label: '中文名称', prop: 'modelName', width: 150},
          {label: '英文名称', prop: 'modelEnglishName'},
          {label: '备注', prop: 'remark'}
        ],
        tableData: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,
        formInfo: {
          data: {},
          type: 'add'
        }
      }
    },
    methods: {
      ...mapMutations([
        'table_itemClick',
        'table_showClick'
      ]),
      tableOtherClick(row, type) {
        switch (type) {
          case 'edit':
            this.formInfo = {type: 'edit', data: row};
            this.dialogVisible = true;
            break;
          case 'del':
            TableApi.CheckTable(row.id).then((res) => {
              this.$confirm(res.data.data ? '该表已有数据，是否确认删除？' : '是否确认删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                TableApi.DeleteTable(row).then(res => {
                  Msg.success(res.data.message);
                  this.getAllData();
                }).catch(() => {
                  Msg.error('发生了一些错误..')
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }).catch(() => {
              Msg.error('发生了一些错误,已取消删除')
            });
            break;
          case 'editItem':
            this.$router.push({path: `/table/create/item/${row.id}`});
            this.table_itemClick();
            break;
          case 'show':
            this.$router.push({path: `/table/create/show/${row.id}`});
            this.table_showClick();
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
      getAllData() {
        this.loading = true;
        TableApi.GetAllTableList(this.page, this.pageSize).then((res) => {
          if (res.data.data) {
            this.tableData = res.data.data.data || [];
            this.totalCount = res.data.data.totalCount || 0;
          }
          this.loading = false
        }).catch(() => {
          Msg.error('发生了一些错误..');
          this.loading = false
        })
      },
      openDialog() {
        this.formInfo = {type: 'add', data: {}};
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
        this.$refs['compForm'].resetForm('form');
      },
      closeAndRefresh() {
        this.handleClose();
        this.getAllData();
      }
    },
    mounted() {
      this.getAllData();
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
