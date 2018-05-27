<template>
  <div id="mh0202">
    <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
      <template>
        <el-table
          :data="tableData"
          :stripe="true"
          :border="true"
          v-loading= "loading"
          :header-row-style="headerRowStyle"
          :header-cell-style="headerCellStyle"
        >
          <el-table-column
            align="center"
            prop="sort"
            label="排序"
            width="70"
            >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="名称">
            <template slot-scope="scope">
              <div class="mh-admin-header-name">
                <span>{{scope.row.name}}</span>
                <span>{{scope.row.articleCount}} 条文章</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="showAtHome"
            label="在首页显示"
            width="120">
            <template slot-scope="scope">
              <i v-if="scope.row.showAtHome" class="iconfont icon-yes"></i>
              <i class="iconfont icon-no"  v-else></i>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="operation"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <i @click="tableOtherClicks(scope.row,'edit')"
              class="iconfont icon-edit2 icon-edit" ></i>
              <i @click="tableOtherClicks(scope.row,'delete')"
              class="iconfont icon-shanchu" style="color: red;"></i>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-row>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="408px"
      :before-close="handleClose">
      <comp-form
        @closeForm="closeAndRefresh"
        ref="compForm"
        :formInfo="formInfo"
        :allClassifiy="allClassifiy"
      ></comp-form>
    </el-dialog>
  </div>
</template>

<script>
  import Table from 'pkgs/components/table'
  import CompForm from './form'
  import { Msg } from '../../../tools/message'
  import {MH0202Api} from './api'
  export default {
    name: 'new-vuex-table',
    data() {
      return {
        dialogVisible: false,
        loading: false,
        tableData: [],
        formInfo: {
          parentClassifiy: [],
          type: 'edit',
          classifiyItem: {}
        },
        headerRowStyle: {
          color: 'black'
        },
        headerCellStyle: {
          backgroundColor: '#d7d7d7'
        },
        allClassifiy: []
      }
    },
    components: {
      Table,
      CompForm
    },
    mounted() {
      this.newGetTableData();
    },
    methods: {
      newGetTableData() {
        this.loading = true;
        MH0202Api.GetListApi().then(ret => {
          this.tableData = this.dataToTable(ret.data.data)
          this.allClassifiy = ret.data.data
          this.loading = false
          this.setTableNum();
        }).catch(err => {
          Msg.error('连接超时，请稍后再试!')
        })
      },
      // 将获取到的导航栏列表数据转化为可进行渲染的表格数据格式
      dataToTable(data) {
        var newTableData = [];
        var childrenLength = 0;
        var space = '';
        data.forEach(item => {
          childrenLength = 0;
          space = '';
          if (item.children) {
            childrenLength = item.children.length;
          }
          newTableData.push(this.createTableData(item.id, item.sort, item.name, item.articleCount, item.showAtHome))
          for (var i = 0; i < item.name.length; i++) {
            space += '　';
          }
          switch (childrenLength) {
            case 1:
              newTableData.push(
                this.createTableData(
                  item.children[0].id,
                  item.children[0].sort,
                  space + '└─' + item.children[0].name,
                  item.children[0].articleCount,
                  item.children[0].showAtHome)
              );
              break;
            case 0:

              break;
            default: {
              if (item.children) {
 for (let i = 0; i < item.children.length; i++) {
                  if (i === item.children.length - 1) {
                    newTableData.push(this.createTableData(
                      item.children[i].id,
                      item.children[i].sort,
                      space + '└─' + item.children[i].name,
                      item.children[i].articleCount,
                      item.children[i].showAtHome))
                  } else {
                    newTableData.push(this.createTableData(
                      item.children[i].id,
                      item.children[i].sort,
                      space + '├─' + item.children[i].name,
                      item.children[i].articleCount,
                      item.children[i].showAtHome))
                  }
                }
}
            }
          }
        })
        return newTableData;
      },
      // 构造表格渲染所需的数据格式
      createTableData(id, sort, name, articleCount, showAtHome) {
        return {
          id: id,
          sort: sort,
          name: name,
          articleCount: articleCount,
          showAtHome: showAtHome,
        }
      },
      // 计算父级分类数量，并传回到父组件进行渲染
      setTableNum: function () {
        var data = this.tableData;
        var parentClassifiy = this.selectfirstClass(data)
        this.formInfo.parentClassifiy = parentClassifiy
        this.$emit('getTableNum', data, parentClassifiy)
      },
      // 获取到所有一级分类
      selectfirstClass(getTableData) {
        var firstClassList = [{
          id: 0,
          name: '无父级分类'
        }];
        getTableData.map(item => {
          if (item.name.indexOf('　') === -1) {
            firstClassList.push({
              id: item.id,
              name: item.name,
            })
          }
        })
        return firstClassList;
      },
      tableOtherClicks(row, type) {
        if (type === 'edit') {
          MH0202Api.GetItemApi({
            id: row.id
          }).then(res => {
            if (res) {
              var getClassifyData = res.data.data;
              this.formInfo.classifiyItem = getClassifyData
              this.dialogVisible = true;
            }
          })
        } else if (type === 'delete') {
          this.deleteEntr(row.id)
        }
      },
      // 删除数据
      deleteEntr(entrId) {
        this.$confirm('确定删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          MH0202Api.DeleteApi({
            id: entrId
          }).then(res => {
            Msg.success(res.data.message)
            this.newGetTableData()
          }).catch((err) => {
          Msg.error(err.data.message)
          });
        })
      },
      // 关闭编辑对话框
      handleClose() {
        this.dialogVisible = false
        this.$refs.compForm.resetForm('form');
      },
      closeAndRefresh() {
        this.handleClose()
        this.newGetTableData();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .show-at-home{
    width: 20px;
  }
  .mh-admin-header-name {
    display: flex;
    justify-content: space-between;
  }
  .iconfont{
    font-size: 20px;
  }
  .icon-shanchu,.icon-edit{
    cursor: pointer;
  }
  .icon-edit{
    color: rgb(18, 150, 219);
    padding-right:  5px;
  }
  .icon-yes{
    color: #089c0b;
  }
  .icon-no{
    color: #d81e06
  }
</style>
