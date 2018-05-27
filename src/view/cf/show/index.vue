<template>
  <div>
    <div class="tab1_t">
      <div></div>
      <el-button class="tab1_add" @click="openDialog('add')">添加数据</el-button>
    </div>
    <comp-table @getTableNum="getTableNum" ref="compTable" :modelId="modelId">
    </comp-table>
    <el-dialog
      :title="'添加数据'"
      :visible.sync="dialogVisible"
      width="450px"
      top="5vh"
      :before-close="handleClose">
      <comp-form @close="closeAndRefresh"
                 ref="compForm"
                 :formInfo="formInfo"
                 :modelId="modelId">
      </comp-form>
    </el-dialog>
  </div>
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
        modelId: this.$route.params.id,
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
        this.$refs['compTable'].getTableData();
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
