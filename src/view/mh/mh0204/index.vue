<template>
  <div id= "load-index">
    <el-card class= "box-card"
             body-style= "border-top: 1px solid #ddd">
      <div slot= "header" class= "tableHead">
        <span class="ngFont">共 <span class="ngNum">{{tableData.length}}</span> 条记录</span>
        <el-button type= "primary" icon= "el-icon-plus"  @click= "add">新增</el-button>
      </div>
      <comp-table @getTableNum= "getTableNum" ref= "compTable" >
      </comp-table>
      <el-dialog
        title= "添加"
        :visible.sync= "dialogVisible"
        width= "408px"
        :before-close= "handleClose">
        <comp-form
          @close= "closeAndRefresh"
          ref= "compForm"
          :formInfo = "formInfo"
        ></comp-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import CompTable from './table'
  import CompForm from './form'

  export default {
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        formInfo: {
          faNgs: [],
          ngId: '',
          type: 'add',
          ng: false
        }
      }
    },
    components: {
      CompTable,
      CompForm,
    },
    methods: {
      // ..........获取到子组件传来的条目数
      getTableNum(tableData, faNgs) {
        this.tableData = tableData;
        this.formInfo.faNgs = faNgs;
      },
      // ..........添加按钮触发的方法
      add() {
        this.dialogVisible = true;
      },
      // ..........关闭添加导航栏对话框
      handleClose() {
        this.dialogVisible = false
        this.$refs.compForm.resetForm('form');
      },
      closeAndRefresh() {
        this.handleClose()
        this.$refs.compTable.getTableData();
      }
    },
  }
</script>

<style lang="scss" scoped>
  .content-body {
    margin-top: 30px;
  }

  .tableClassName {
    background-color: red;
  }

  .tableHead{
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content:space-between;
    align-items:center;
  }

  .ngNum{
    color: red;
  }

  .ngFont{
    font-size: 0.8em;
  }
</style>
