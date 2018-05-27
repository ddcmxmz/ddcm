<template>
  <div id="mh0202">
    <el-card class="box-card">
      <div slot="header" class="clear-fix">
        <div class="mh-admin-head">
          <p>共<span class="record-num">{{tableData.length}}</span>条记录</p>
          <el-button class="mh-server-link-btn" type="primary" icon="el-icon-plus" @click="add">
            新增
          </el-button>
        </div>
      </div>
      <div class="text item">
        <comp-table @getTableNum="getTableNum" ref="compTable">
        </comp-table>
        <el-dialog
          title="添加"
          :visible.sync="dialogVisible"
          width="408px"
          :before-close="handleClose">
          <comp-form
            @closeForm="closeAndRefresh"
            ref="compForm"
            :formInfo="formInfo"
          ></comp-form>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
  import CompTable from './table'
  import CompForm from './form'

  export default {
    name: 'new-vuex',
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        formInfo: {
          parentClassifiy: [],
          type: 'add',
          classifiyItem: false
        }
      }
    },
    components: {
      CompTable,
      CompForm,
    },
    methods: {
      getTableNum(tableData, parentClassifiy) {
        this.tableData = tableData;
        this.formInfo.parentClassifiy = parentClassifiy;
      },
      add() {
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false
        this.$refs.compForm.resetForm('form');
      },
      closeAndRefresh() {
        this.handleClose()
        this.$refs.compTable.newGetTableData();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mh-admin-head{
    justify-content:space-between;display: flex;align-items:center;
  }
  .mh-admin-head p{
    font-size: 14px;
  }
  .record-num{
    color: red;
    padding: 0 6px;
  }
  .mh-server-link-btn{
    background-color: rgb(51,171,159);
    width: 68px;
    height: 30px;
    font-size: 12px;
    padding: 10px;
  }
</style>
