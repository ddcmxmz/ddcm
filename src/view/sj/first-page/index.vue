<template>
  <div id="load-index" class="sj-index-box">
    <el-card class="box-card" body-style="border-top: 1px solid #ddd">
      <div slot="header" class="clearfix">
        <span>首页</span>
      </div>
      <div class="sj-auditOfProjects-box">
        <div class="sj-auditProject">
          <span class="sj-auditOfProjects-title">审计项目情况</span>
          <span class="sj-auditOfProjects-more">更多>></span>
        </div>
        <div class="text item">
          <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
            <comp-table class-name="sj-auditOfProjects-table"
              :tableData="tableData"
              :tableHeader="tableHeader"
              :tableAttr="tableAttr"
              className="tableClassName"
              @tableOtherClick="tableOtherClick"
            >
            </comp-table>
          </el-row>
        </div>
      </div>
      <div class="blank-both"></div>
      <div class="sj-rectificationTasks-box">
        <div class="sj-rectificationTasks">
          <span class="sj-rectificationTasks-title">整改任务情况</span>
          <span class="sj-rectificationTasks-more">更多>></span>
        </div>
        <div class="text item">
          <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
            <comp-table class-name="sj-rectificationTasks-table"
              :tableData="tableData"
              :tableHeader="tableHeader"
              :tableAttr="tableAttr"
              className="tableClassName"
              @tableOtherClick="tableOtherClick"
            >
            </comp-table>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import CompTable from 'pkgs/components/table'

  export default {
    data() {
      return {
        tableAttr: {
          border: true,
          row_style: {
            fontSize: '14px',
            color: '#333333'
          }
        },
        tableHeader: [
          {
            prop: 'year',
            label: '年度',
            width: 100,
          }, {
            prop: 'all',
            label: '全部',
            width: 100
          }, {
            prop: 'onGoingAudit',
            label: '正在审计',
            width: 100
          }, {
            prop: 'beingRectified',
            label: '正在整改',
            width: 100
          }, {
            prop: 'overtimeRectification',
            label: '整改超时',
            width: 100
          }, {
            prop: 'rectificationEnd',
            label: '整改结束',
            width: 100
          },
        ],
        tableData: [],
      }
    },
    components: {
      CompTable,
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      getTableData: function () {
        setTimeout(() => {
          this.tableData = [{
            year: '2016',
            all: '16',
            onGoingAudit: '2',
            beingRectified: '4',
            overtimeRectification: '5',
            rectificationEnd: '5',
          }, {
            year: '2017',
            all: '16',
            onGoingAudit: '2',
            beingRectified: '4',
            overtimeRectification: '5',
            rectificationEnd: '5',
          }, {
            year: '2018',
            all: '16',
            onGoingAudit: '2',
            beingRectified: '4',
            overtimeRectification: '5',
            rectificationEnd: '5',
          }]
        }, 1000)
      },
      tableOtherClick(row, index) {
        console.log(row);
        console.log(index);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-body {
    margin-top: 30px;
  }
  .sj-auditProject,.sj-rectificationTasks{
    height: 40px;
    font-size: 14px;
    width:600px;
  }
  .sj-auditOfProjects-title,.sj-rectificationTasks-title{
    display: block;
    padding-top: 15px;
    float:left;
  }
  .sj-auditOfProjects-more,.sj-rectificationTasks-more{
    float:right;
    padding-top: 15px;
  }
  .sj-auditOfProjects-box,.sj-rectificationTasks-box{
    height:250px;
    float:left;
  }
  .sj-index-box{
    width:1500px;
  }
  .blank-both{
    float:left;
    width:50px;
    height:250px;
  }
  .sj-auditOfProjects-table,.sj-rectificationTasks-table{
    width:600px;
  }
</style>
