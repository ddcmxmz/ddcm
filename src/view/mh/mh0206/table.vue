<template>
  <div class="text item">
    <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
      <el-table :data="tableData" style="width: 100%" :stripe="true" border :header-row-style="headerRowStyle"
                :header-cell-style="headerCellStyle" v-loading="loading">
        <el-table-column prop="sort" label="排序" width="70" align="center"></el-table-column>
        <el-table-column prop="iconPath" label="图标" width="150" align="center">
          <template slot-scope="scope">
            <img :style="{width:'50px',height:'50px'}" :onerror="unsetImg" v-if="scope.row.iconPath"
                 :src='`//${scope.row.iconPath}`'>
            <span v-else>暂无图标</span>
          </template>
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
    </el-row>
    <el-dialog title='编辑' :visible.sync="editDialogVisible" width="400px" :before-close="handleClose">
      <comp-form @closeForm='handleClose' @close='closeForm' ref="compForm" :formInfo="formInfo"></comp-form>
    </el-dialog>
  </div>
</template>

<script>
  import CompTable from 'pkgs/components/table'
  import CompForm from './form'
  import {
    Msg
  } from '../../../tools/message'
  import {
    mapActions
  } from 'vuex'
  import {
    BusinessApi
  } from './api.js'
  import unsetImg from '../../../assets/images/unset.png'

  export default {
    data () {
      return {
        unsetImg: 'this.src="' + unsetImg + '"',
        loading: false,
        editDialogVisible: false,
        total: 0,
        tableData: [],
        formInfo: {
          type: 'edit',
          info: {}
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
      CompTable,
      CompForm,
    },
    mounted () {
      this.getTableData()
    },
    methods: {
      ...mapActions([
        'tableOtherClick'
      ]),
      getTableData: function () {
        this.loading = true
        BusinessApi.GetListApi().then(res => {
          if (res.data != null) {
            this.total = res.data.data.length
            this.tableData = res.data.data
            this.getTableDataTotal()
          }
        })
        this.loading = false
      },
      // 获取表格内容数量
      getTableDataTotal () {
        this.$emit('getTableDataTotal', this.total)
      },
      // // 表格操作：编辑、删除
      tableOtherClick (row, type, index) {
        if (type === 'edit') {
          BusinessApi.GetItemApi({
            id: row.id
          }).then(res => {
            if (res) {
              this.formInfo.info = res.data.data
              this.editDialogVisible = true
            }
          })
        } else if (type === 'del') {
          this.deleteEntr(row.id)
        }
      },
      // // 删除数据
      deleteEntr (entrId) {
        this.$confirm('确定删除该入口吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          BusinessApi.DeleteApi({
            id: entrId
          }).then(res => {
            Msg.success(res.data.message)
            this.getTableData()
          })
        }).catch(() => {
          Msg.info('删除已取消')
        })
      },
      // ............关闭编辑对话框
      handleClose () {
        this.editDialogVisible = false
        this.$refs.compForm.resetForm('form')
      },
      closeForm (editDialogVisible) {
        this.editDialogVisible = editDialogVisible
        this.getTableData()
      }
    }
  }
</script>

<style scoped>
  .mh-table-head {
    color: black;
    background-color: #d7d7d7;
  }

  .mh-admin-table-icon-edit {
    color: rgb(18, 150, 219);
    padding-right: 5px;
  }
</style>
