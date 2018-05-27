<template>
  <el-card class="box-card" style="min-height: 99%">
    <div slot="header" class="clearfix">
      <span>职位管理</span>
    </div>
    <div class="text item">
      <el-table
        :data="tableData1" :span-method="arraySpanMethod"
        border
        size="mini"
        :header-cell-style="{backgroundColor: '#f2f2f2',color: '#333'}"
        :row-class-name='classname'
        style="width: 100%">
        <el-table-column prop="company" label="单位" width="64">
          <template slot-scope="scope">
            <span>{{scope.row.company}}</span>
            <span v-if="scope.row.flex" style="color: #949494;">  (包含 {{scope.row.length}} 个职位)</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="职位名称">
          <template slot-scope="scope">
            <span>{{scope.row.name || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roles" label="角色" width="300">
          <template slot-scope="scope">
            <span>{{scope.row.roles ? scope.row.roles.join('、') : '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="105">
          <template slot-scope="scope">
            <span>{{scope.row.sort || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="105">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status ? 'success' : 'danger'"
              close-transition>{{scope.row.status ? '启用' : '禁用'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template slot-scope="scope">
            <div v-if="!scope.row.flex">
              <el-button
                class="pos_btn_editor"
                type="text" size="small" @click="pos_tableEditor(scope.row)">编辑
              </el-button>
              <el-button
                :style="{color: 'red'}"
                type="text" size="small" @click="pos_leDel(scope.row)">删除
              </el-button>
            </div>
            <div v-else>
              <el-button
                type="text" size="small" @click="pos_tableAdd(scope.row)">添加职位
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pos-diago>
    </pos-diago>
  </el-card>
</template>

<script>
  import CompTable from '../../../packages/components/table'
  import posDiago from './diago'
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      CompTable,
      posDiago
    },
    data () {
      return {}
    },
    created () {
      this.pos_getGE0301A01()
    },
    computed: mapState({
      tableData1: state => state.setPos.tableData1
    }),
    methods: {
      ...mapMutations([
        'pos_tableEditor',
        'pos_tableAdd'
      ]),
      ...mapActions([
        'pos_tableDel',
        'pos_getGE0301A01'
      ]),
      arraySpanMethod ({row, column, rowIndex, columnIndex}) {
        if (row.flex) {
          if (columnIndex === 0) {
            return [1, 5]
          } else if (columnIndex <= 4) {
            return [0, 0]
          }
        }
      },
      classname ({row, column, rowIndex, columnIndex}) {
        if (row.flex) return 'pos_table_hr_tile'
      },
      pos_leDel (data) {
        this.$confirm('你确定要删除这条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.pos_tableDel(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/var.scss";

  .pos_btn_editor {
    color: $bg_main_color;
  }
</style>
<style>
  .el-table tr.pos_table_hr_tile {
    background-color: #f2f2f2;
  }

  .el-table tr.pos_table_hr_tile:hover {
    background-color: #f2f2f2;
  }

  .el-table tr.pos_table_hr_tile > td:first-child {
    border-right: none;
  }
</style>
