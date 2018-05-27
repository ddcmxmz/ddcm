<template>
  <div class="text item">
    <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
      <el-table :data="tableData" style="width: 100%" :stripe="true" border
                :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle" v-loading="loading">
        <el-table-column prop="sort" label="排序" width="70" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" header-align="center">
        </el-table-column>
        <el-table-column prop="link" label="链接" header-align="center">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <i @click="tableOtherClick(scope.row, 'edit', scope.$index)"
               class="iconfont icon-edit2 mh-admin-table-icon-edit"></i>
            <i @click="tableOtherClick(scope.row, 'del', scope.$index)"
               class="iconfont icon-shanchu" style="color: red;"></i>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="400px"
        :before-close="handleClose">
        <comp-form
          v-if="dialogTitle==='编辑'"
          ref="newForm"
          @closeForm="closeDialog"
          :formInfo="formInfo">
        </comp-form>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import CompForm from './form'
  import { LinkApi } from './link-api'
  import { Msg } from '../../../tools/message'

  export default {
    data () {
      return {
        loading: false,
        total: 0,
        dialogTitle: '',
        tableData: [],
        dialogVisible: false,
        formInfo: {
          type: '',
          value: {
            id: '',
            sort: '',
            name: '',
            link: '',
            updatedAt: ''
          },
        },
        headerRowStyle: {
          color: 'black'
        },
        headerCellStyle: {
          backgroundColor: '#d7d7d7'
        },
      }
    },
    components: {
      CompForm,
    },
    mounted () {
      this.loadingDate()
    },
    methods: {
      getTableDataTotal () {
        this.$emit('getTotal', this.total)
      },
      tableOtherClick: function (row, type) {
        if (type === 'edit') {
          this.edit(row)
        } else if (type === 'del') {
          this.handleDeleteLink(row)
        } else {
          return false
        }
      },
      closeDialog (result) {
        this.dialogVisible = result
        this.$refs.newForm.resetForm('form')
        this.loadingDate()
      },
      handleClose () {
        this.dialogVisible = false
        this.$refs.newForm.resetForm('form')
      },
      loadingDate () {
        this.loading = true
        LinkApi.GetListApi().then((res) => {
          this.tableData = res.data.data
          this.total = this.tableData.length
          this.getTableDataTotal()
          this.loading = false
        }).catch(res => {
          this.loading = false
          Msg.error(res.data.message)
        })
      },
      edit (row) {
        this.dialogVisible = true
        this.dialogTitle = '编辑'
        this.formInfo.type = 'edit'
        LinkApi.GetItemApi({
          id: row.id
        }).then((res) => {
          this.formInfo.value.id = res.data.data.id
          this.formInfo.value.sort = res.data.data.sort
          this.formInfo.value.name = res.data.data.name
          this.formInfo.value.link = res.data.data.link
          this.formInfo.value.updatedAt = res.data.data.updatedAt
        })
      },
      handleDeleteLink (row) {
        this.$confirm('确定删除此链接, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          LinkApi.DeleteApi({
            id: row.id
          }).then(res => {
            Msg.success(res.data.message)
            this.loadingDate()
          }).catch(res => {
            Msg.error(res.data.message)
          })
        }).catch(() => {
          Msg.info('删除已取消')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-body {
    margin-top: 30px;
  }

  .mh-admin-table-icon-edit {
    color: rgb(18, 150, 219);
    padding-right: 5px;
  }

</style>
