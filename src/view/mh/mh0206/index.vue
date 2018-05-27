<template>
  <div id="mh0206">
    <el-card class="box-card" body-style= "border-top: 1px solid #ddd">
      <div slot="header" class="clear-fix">
        <div class="mh-admin-head">
          <p>共 <span class="mh-total">{{total}}</span> 条记录</p>
          <el-button class="mh-server-link-btn" type="primary" icon="el-icon-plus" @click="add">
            新增
          </el-button>
        </div>
      </div>
      <div class="text item">
        <comp-table ref="compTable" @getTableDataTotal="getTableDataTotal">
        </comp-table>
        <el-dialog title='添加' :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
          <comp-form @closeForm='handleClose' @close='closeForm' ref="compForm" :formInfo="formInfo"></comp-form>
        </el-dialog>
      </div>
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
        total: 0,
        formInfo: {
          type: 'add',
          info: false
        },
      }
    },
    components: {
      CompTable,
      CompForm,
    },
    methods: {
      // ..........获取到子组件传来的条目数
      getTableDataTotal(total) {
        this.total = total
      },
      // ..........添加按钮触发的方法
      add() {
        this.dialogVisible = true;
      },
      // ..........关闭添加对话框
      handleClose() {
        this.dialogVisible = false
        this.$refs.compForm.resetForm('form')
      },
      closeForm(dialogVisible) {
        this.dialogVisible = dialogVisible
        this.$refs.compForm.resetForm('form')
        this.$refs.compTable.getTableData()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .content-body {
    margin-top: 30px;
  }
  .mh-total{
    color: red;
  }
  .mh-server-link-btn{
    background-color: rgb(51,171,159);
  }
  .tableClassName {
    background-color: red;
  }
  .tableHead {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mh-admin-head{
    justify-content:space-between;display: flex;align-items:center;
  }
  .mh-admin-head p{
    font-size: 14px;
  }
</style>
