<template>
  <div>
    <div class="tab1_t">
      <div></div>
      <div style="display: flex;align-content: center">
        <el-button class="tab1_add" @click="openDialog('add')">添加表单项</el-button>
        <el-button class="tab1_add" @click="showTable">查看表单</el-button>
      </div>
    </div>
    <comp-table @getTableNum="getTableNum" ref="compTable" :modelId="modelId">
    </comp-table>
    <el-dialog
      :title="'添加表单项'"
      :visible.sync="dialogVisible"
      width="600px"
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
  import {mapMutations} from 'vuex'

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
    created() {
      this.table_item();
    },
    methods: {
      ...mapMutations([
        'table_showClick',
        'table_item'
      ]),
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
        this.$refs['compTable'].getAllData();
      },
      showTable(){
        this.$router.push({path: `/table/create/show/${this.modelId}`});
        this.table_showClick();
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
