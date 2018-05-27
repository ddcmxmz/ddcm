<template>
  <div style="padding: 20px">
    <div class="table_design_sh">
      <div>
        <el-select
          v-model="search.type"
          clearable
          filterable
          @change="handSelChange"
          style="width: 180px"
          placeholder="请选择模板分类">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>&nbsp;&nbsp;
        <el-input
          v-model="search.query"
          style="width: 350px"
          placeholder="请输入模板关键字"
          prefix-icon="el-icon-search"
          clearable
          class="input-with-select">
          <el-button slot="append" @click="getData">查询</el-button>
        </el-input>
      </div>
      <div>
        <el-button slot="append" @click="handSearch">添加模板</el-button>
      </div>
    </div>
    <br>
    <div>
      <comp-table
        :tableData="tableData"
        :tableHeader="cloums"
        :tableAttr="tableAttr"
        @tableOtherClick="tableOtherClick">
      </comp-table>
      <br/>
      <comp-pagination
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :page="search.page"
        :pageSize="search.pageSize"
        :totalCount="totalCount"
      >
      </comp-pagination>
    </div>
    <comp-add
      :dialogVisible="dialogVisible"
      :title="title"
      :listValue="listValue"
      :options="options"
      :formMode="formMode"
      @calcle="calcle"
      @submit="submit"
    ></comp-add>
  </div>
</template>

<script>
  import NProgress from 'nprogress' // progress bar
  import moment from 'moment';
  import CompTable from '../../../packages/components/table'
  import CompPagination from '../../../packages/components/pagination'
  import CompAdd from './add'
  import moke from './moke'
  import {Table} from '../api'

  export default {
    components: {
      CompTable,
      CompPagination,
      CompAdd
    },
    data() {
      return {
        date: '',
        search: {
          query: '',
          type: undefined,
          page: 1,
          pageSize: 15,
        },
        totalCount: 0,
        options: [
          {name: '表单', id: 0},
          {name: '表格', id: 1},
        ],
        cloums: moke.cloums,
        tableData: [],
        tableAttr: moke.tableAttr,

        formMode: [],
        dialogVisible: false,
        listValue: {},
        title: '添加',
      }
    },
    created() {
      this.getData();
      this.showTabel()
    },
    methods: {
      showTabel() {
        Table.CFModelShowAllTable().then(res => {
          this.formMode = res.data.data;
        })
      },
      getData() {
        NProgress.start();
        Table.CFDynamicFormShowDataByPage(this.search).then((res) => {
          NProgress.done();
          if (res.data.data) {
            const d = res.data.data;
            this.totalCount = d.totalCount;
            [...d.data].forEach(v => {
              v.updateAt = moment(v.updateAt).format('YYYY-MM-DD HH:mm')
            });
            this.tableData = [...d.data]
          }
        });
      },
      handSelChange() {
        this.getData();
      },
      handSearch() {
        this.dialogVisible = true;
        this.title = '添加设计模板';
        this.listValue = {
          sort: this.tableData.length + 1
        }
      },
      handleSizeChange(val) {
        this.search.pageSize = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.search.page = val;
        this.getData();
      },
      calcle() {
        this.dialogVisible = false;
        this.listValue = {}
      },
      tableOtherClick(row, type) {
        if (type === 'editor') {
          Table.CFDynamicFormShowDataById({id: row.id}).then(res => {
            this.dialogVisible = true;
            this.title = '编辑设计模板';
            this.listValue = res.data.data
          })
        } else if (type === 'preview') {
          this.$router.push(`/cf/design/make/${row.id}`)
        } else {
          this.$confirm('是否确认删除？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            Table.CFDynamicFormDeleteData({id: row.id}).then(res => {
              this.getData();
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          });
        }
      },
      submit() {
        if (this.listValue.id) {
          Table.CFDynamicFormEditData(this.listValue).then(res => {
            this.calcle();
            this.getData();
          })
        } else {
          Table.CFDynamicFormAddData(this.listValue).then(res => {
            this.calcle();
            this.getData()
          })
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .table_design_sh {
    display: flex;
    justify-content: space-between;
  }
</style>
