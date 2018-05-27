<template>
  <div>
    <comp-table class-name="audit_table"
      :tableData="tableData"
      :tableHeader="tableHeader"
      :tableAttr="tableAttr"
      :loading="loading"
      @tableOtherClick="tableOtherClick">
    </comp-table>
    <br>
    <comp-pagination
      @handleSizeChange="project_size_change"
      @handleCurrentChange="project_curr_change"
      :page="page"
      :pageSize="pageSize"
      :totalCount="totalCount"
    >
    </comp-pagination>
  </div>
</template>

<script>
  import CompTable from '../../../packages/components/table'
  import CompPagination from '../../../packages/components/pagination'
  import {mapState, mapMutations, mapActions} from 'vuex'
  export default {
    components: {
      CompTable,
      CompPagination
    },
    name: "table",
    data() {
      return {
        loading: false,
        dialogVisible: false,
        tableAttr: {
          border: true,
          operateColumnWidth: 100,
          other: [
            {name: '编辑', type: 'edit'},
            {name: '删除', type: 'del', color: 'red'},
          ],
          row_style: {fontSize: '14px', color: '#333333'}
        },
        tableHeader: [
          {label: 'ID', prop: 'id', width: 80, align: 'center'},
          {label: '项目名称', prop: 'name'},
          {label: '监管单位', prop: 'company',width: 200},
          {label: '监管类别', prop: 'category',width: 250},
          {label: '被审计对象', prop: 'checkCompany', width: 150},
          {label: '问题分类', prop: 'problem'},
          {label: '项目状态', prop: 'status', width: 100, align: 'center',status: {
              on: '整改中',
              off: '整改超时',
              tag: true
            }}
        ],
        tableData: [{
          id: 1,
          name: '财务整改',
          company: '市教委经费监管事务中心',
          category: '中小学财务收支审计',
          checkCompany:'民办学校',
          checkYear:'2017',
          problem:'资金安排、拨付问题',
          content:'现金流整改',
          timeLimit:'2018年06月01日',
          change:'现场整改',
          status:'整改中'
        },
          {
            id: 2,
            name: '固定资产审计整改',
            company: '市教委经费监管事务中心',
            category: '中小学财务收支审计',
            checkCompany:'民办学校',
            checkYear:'2017',
            problem:'资金安排、拨付问题',
            content:'现金流整改',
            timeLimit:'2018年06月01日',
            change:'现场整改',
            status:'整改中'
          },{
            id: 3,
            name: '固定资产审计整改',
            company: '市教委经费监管事务中心',
            category: '高等学校预算执行情况审计',
            checkCompany:'民办学校',
            checkYear:'2017',
            problem:'义务教育保障机说的很对快速颚近三年内制问题',
            content:'现金流整改',
            timeLimit:'2018年06月01日',
            change:'现场整改',
            status:''
          }],
        page: 1,
        pageSize: 10,
        totalCount: 0,
        formInfo: {
          data: {},
          type: 'add'
        }
      }
    },
    mounted() {
      this.getDataList();
    },
    methods:{
      ...mapMutations([
        'project_tableEditor',
        'project_size_change',
        'project_curr_change',
      ]),
      ...mapActions([
        'project_tableDel'
      ]),
      tableOtherClick(row, type) {
        if (type === 'edit') {
          this.project_tableEditor(row)
        } else {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.project_tableDel(row)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      getDataList: function (data) {
        // 带查询条件
        // clientMH0105NewApi.GetListApi(data).then(res => {
        //   this.totalCount = res.data.totalCount
        //   this.pageSize = res.data.pageSize
        //   this.page = res.data.page
        //   var data = res.data.data
        //   this.tableData = data
        // })
        this.totalCount = this.tableData.length;
      },
      handleSizeChange: function (val) {
        this.pageSize = val;
        // 获取数据
      },
      /** 改变页码 */
      handleCurrentChange: function (val) {
        this.page = val;
        // 获取数据
      },
    }
  }
</script>

<style lang="scss" scoped>
  .audit_table /deep/ th:nth-of-type(6) {
    text-align: center;
  }

</style>
