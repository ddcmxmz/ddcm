<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>表单项数据类型</span>
    </div>
    <div>
      <div class="tab1_t">
        <div>
          <!--<el-input-->
            <!--style="width: 300px"-->
            <!--placeholder="请输入内容"-->
            <!--prefix-icon="el-icon-search"-->
            <!--clearable-->
            <!--class="input-with-select">-->
            <!--<el-button slot="append">查询</el-button>-->
          <!--</el-input>-->
        </div>
        <el-button class="tab1_add" @click="openDialog('add')">添加数据类型</el-button>
      </div>
      <comp-table @getTableNum="getTableNum" ref="compTable">
      </comp-table>
    </div>
    <el-dialog
      :title="'添加数据类型'"
      :visible.sync="dialogVisible"
      width="450px"
      top="5vh"
      :before-close="handleClose">
      <comp-form @close="closeAndRefresh"
                 ref="compForm"
                 :formInfo="formInfo">
      </comp-form>
    </el-dialog>
  </el-card>
</template>

<script>
  import CompTable from './table'
  import CompForm from './form'

  export default {
    components: {
      CompForm,
      CompTable
    },
    data() {
      return {
        dialogVisible: false,
        formInfo: {
          data: {},
          type: 'add'
        }
      }
    },
    methods: {
      getTableNum(data) {
        console.log(data);
        this.formInfo.data = data;
        this.openDialog('edit');
      },
      openDialog(type) {
        this.formInfo.type = type;
        this.formInfo.data = type === 'add' ? {} : this.formInfo.data;
        this.dialogVisible = true;
      },
      handleClose() {
        this.dialogVisible = false;
        this.$refs['compForm'].resetForm('form');
      },
      closeAndRefresh() {
        this.handleClose();
        this.$refs['compTable'].getAllDataType();
      }
    }
  };
</script>
<style scoped lang="scss">
  .tab1_t {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 0;
  }
</style>
