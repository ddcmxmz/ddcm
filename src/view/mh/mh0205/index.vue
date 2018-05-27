<template>
  <div id="new-vuex">
    <el-card class="box-card" body-style="border-top: 1px solid #ddd">
      <div slot="header" class="clear-fix">
        <div class="mh-admin-head">
          <p>共 <span class="mh-total"> {{total}}</span> 条记录</p>
          <el-button style="background-color: rgb(51,171,159)" type="primary" icon="el-icon-plus" @click="add">
            新增
          </el-button>
        </div>
      </div>
      <div class="text item">
        <comp-table @getTotal="getTotal" ref="compTable">
        </comp-table>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
          <comp-form ref="newForm" @closeForm="closeDialog" :formInfo="formInfo">
          </comp-form>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
  import CompTable from './linkTable'
  import CompForm from './form'

  export default {
    data() {
      return {
        loading: false,
        total: 0,
        dialogTitle: '',
        dialogVisible: false,
        formInfo: {
          type: '',
          value: false,
        },
      }
    },
    components: {
      CompTable,
      CompForm,
    },
    methods: {
      closeDialog(result) {
        this.dialogVisible = result;
        this.$refs.newForm.resetForm('form')
        this.$refs.compTable.loadingDate()
      },
      handleClose() {
        this.dialogVisible = false;
        this.$refs.newForm.resetForm('form')
      },
      getTotal(total) {
        this.total = total
      },
      add() {
        this.dialogVisible = true;
        this.dialogTitle = '新增';
        this.formInfo.type = 'add';
        this.formInfo.value = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .mh-admin-head {
    justify-content: space-between;
    display: flex;
    align-items: center;
  }

  .mh-admin-head p {
    font-size: 14px;
  }

  .mh-total {
    color: red;
  }
</style>
