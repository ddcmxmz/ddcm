<template>
  <div class="text item">
    <el-row :gutter="10" style="margin-left: 0; margin-right: 0">
      <comp-table
        :stripe="true"
        :tableData="tableData"
        :tableHeader="tableHeader"
        :tableAttr="tableAttr"
        :loading="loading"
        @tableOtherClick="tableOtherClick"
      >
      </comp-table>
    </el-row>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="408px"
      :before-close="handleClose">
      <comp-form
        @close="closeAndRefresh"
        ref="compForm"
        :formInfo="formInfo"
        :ngData="dataByGet"
      ></comp-form>
    </el-dialog>
  </div>
</template>

<script>
  import CompTable from 'pkgs/components/table'
  import CompForm from './form'
  import {Msg} from '../../../tools/message'
  import {Mh0204Api} from './api'

  export default {
    data() {
      return {
        loading: false,
        tableAttr: {
          noIndex: false,
          other: [
            {name: '编辑', type: 'edit'},
            {name: '删除', type: 'delete'},
          ],
          border: true,
          stripe: true,
          headerStyle: {
            textAlign: 'center',
            color: '#333333',
            backgroundColor: 'rgb(215, 215, 215)'
          },
          highlightCurrentRow: true
        },
        tableHeader: [
          {
            width: '100',
            prop: 'sort',
            label: '排序',
          }, {
            prop: 'name',
            label: '标题',
          }, {
            prop: 'link',
            label: '链接',
          },
        ],
        tableData: [],
        dataByGet: [],
        dialogVisible: false,
        formInfo: {
          faNgs: [],
          ngId: -1,
          type: 'edit',
          ifHasChildren: 'false',
          ng: {}
        },
      }
    },
    computed: {
      totalDataNum: function () {
        return this.tableData.length
      }
    },
    components: {
      CompTable,
      CompForm,
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      // ............获取导航栏列表
      getTableData: function () {
        this.loading = true
        Mh0204Api.GetNgListApi({withChildren: 1}).then(res => {
          var data = res.data.data
          this.dataByGet = data
          this.tableData = this.dataToTable(data)
          this.loading = false
          this.setTableNum()
        }).catch(err => {
          Msg.error('发生了一些错误..')
        })
      },
      // ............将获取到的导航栏列表数据转化为可进行渲染的表格数据格式
      dataToTable(data) {
        var tableData = []
        var childrenLength = 0
        var space = ''
        data.forEach(item => {
          childrenLength = 0
          space = ''
          if (item.children) {
            childrenLength = item.children.length
          }
          tableData.push(this.createTableData(item.id, item.sort, item.name, item.link))
          for (var i = 0; i < item.name.length; i++) {
            space += '　'
          }
          switch (childrenLength) {
            case 1:
              tableData.push(
                this.createTableData(
                  item.children[0].id,
                  item.children[0].sort,
                  space + '└─ ' + item.children[0].name,
                  item.children[0].link)
              )
              break
            case 0 :
              break
            default : {
              if (item.children) {
                for (let i = 0; i < item.children.length; i++) {
                  if (i === item.children.length - 1) {
                    tableData.push(this.createTableData(
                      item.children[i].id,
                      item.children[i].sort,
                      space + '└─ ' + item.children[i].name,
                      item.children[i].link)
                    )
                  } else {
                    tableData.push(this.createTableData(
                      item.children[i].id,
                      item.children[i].sort,
                      space + '├─ ' + item.children[i].name,
                      item.children[i].link)
                    )
                  }
                }
              }
            }
          }
        })
        return tableData
      },
      // ............构造表格渲染所需的数据格式
      createTableData(id, sort, name, link) {
        return {
          id: id,
          sort: sort,
          name: name,
          link: link,
        }
      },
      // ............表格操作选项（编辑&删除）
      tableOtherClick(row, type, index) {
        switch (type) {
          case 'edit':
            Mh0204Api.GetNgApi({id: row.id}).then(res => {
              var ngData = res.data.data
              if (ngData.parentId === undefined) {
                var newNgData = {
                  id: ngData.id,
                  parentId: 0,
                  name: ngData.name,
                  link: ngData.link,
                  sort: ngData.sort,
                  updatedAt: ngData.updatedAt,
                }
                this.formInfo.ng = newNgData
              } else {
                this.formInfo.ng = ngData
              }
              this.formInfo.ifHasChildren = this.ifHasChildren(row.id)
              this.dialogVisible = true
            }).catch(err => {
              Msg.error('发生了一些问题..')
            })
            break
          case 'delete' :
            this.deleteNg(row.id)
            break
          default :
            Msg.error('请重新操作')
        }
      },
      // ............删除导航栏
      deleteNg(ngId) {
        this.$confirm('此操作将永久删除该导航栏（如果有子导航将一并删除）, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (!this.checkIfDelete(ngId)) {
            Mh0204Api.DeleteNgApi(ngId).then(res => {
              Msg.success(res.data.message)
              this.getTableData()
            }).catch(err => {
              Msg.error('发生了一些错误..')
            })
          }
        }).catch((e) => {
          if (e) {
            Msg.error(e)
          } else {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }
        })
      },
      // ............计算导航栏条目数量，并传回到父组件进行渲染
      setTableNum: function () {
        var data = this.tableData
        var faNgs = this.selectfaNgs(data)
        this.formInfo.faNgs = faNgs
        this.$emit('getTableNum', data, faNgs)
      },
      // ............获取到所有一级导航栏
      selectfaNgs(getTableData) {
        var tableData = [{
          id: 0,
          name: '无父级导航栏'
        }]
        getTableData.map(item => {
          if (item.name.indexOf('　') === -1) {
            tableData.push({
              id: item.id,
              name: item.name,
            })
          }
        })
        return tableData
      },
      // ............关闭编辑对话框
      handleClose() {
        this.dialogVisible = false
        this.$refs.compForm.resetForm('form')
      },
      // ............关闭编辑对话框并刷新表格信息
      closeAndRefresh() {
        this.handleClose()
        this.getTableData()
      },
      // ............判断导航栏是否允许删除
      checkIfDelete(selfId) {
        let ifHasChildren = this.ifHasChildren(selfId)
        if (ifHasChildren === true) {
          throw new Error('当前导航栏存在子导航栏，无法删除。')
        }
        return false
      },
      // ............判断是否存在子导航栏
      ifHasChildren(selfId) {
        var data = this.dataByGet
        var ifHasChildren = false
        data.forEach(item => {
          if (item.id === selfId && item.children.length !== 0) {
            ifHasChildren = true
          }
        })
        return ifHasChildren
      }
    }
  }
</script>

<style scoped>
  .has-gutter {
    font-size: 1em;
    color: black
  }
</style>
