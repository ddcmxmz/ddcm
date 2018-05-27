<template>
  <div id="load-index">
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>系统设置</span>
      </div>
      <div class="sj-regulatoryUnit">
        <span class="sj-regulatoryUnit-title">监管单位</span>
        <el-button plain class="sj-add-regulatoryUnit-button">新增</el-button>
      </div>
      <div class="text item">
        <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
          <comp-table class-name="sj-regulatoryUnit-table"
            :tableData="tableData"
            :tableHeader="tableHeader"
            :tableAttr="tableAttr"
            className="tableClassName"
            @tableOtherClick="tableOtherClick"
          >
          </comp-table>
        </el-row>
      </div>
      <div class="systemSetting-blank"></div>
      <div class="sj-regulatoryType">
        <span class="sj-regulatoryType-title">监管类别</span>
        <el-button plain class="sj-add-regulatoryType-button">新增</el-button>
      </div>
      <div class="text item">
        <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
          <comp-table
            :tableData="tableData"
            :tableHeader="tableHeader"
            :tableAttr="tableAttr"
            className="tableClassName"
            @tableOtherClick="tableOtherClick"
          >
          </comp-table>
        </el-row>
      </div>
      <div class="systemSetting-blank"></div>
      <div class="sj-auditedObject">
        <span class="sj-auditedObject-title">被审计对象</span>
        <el-button plain class="sj-add-auditedObject-button">新增</el-button>
      </div>
      <div class="text item">
        <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
          <comp-table
            :tableData="tableData"
            :tableHeader="tableHeader"
            :tableAttr="tableAttr"
            className="tableClassName"
            @tableOtherClick="tableOtherClick"
          >
          </comp-table>
        </el-row>
        <div class="systemSetting-blank"></div>
      </div>
      <div class="sj-auditedObject">
        <span class="sj-auditedObject-title">问题分类</span>
        <el-button plain class="sj-add-auditedObject-button">新增</el-button>
      </div>
      <div class="text item">
        <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
          <comp-table
            :tableData="tableData"
            :tableHeader="tableHeader"
            :tableAttr="tableAttr"
            className="tableClassName"
            @tableOtherClick="tableOtherClick"
          >
          </comp-table>
        </el-row>
        <div class="systemSetting-blank"></div>
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
          },
          other: [
            {name: '编辑', type: 'editor'},
            {name: '删除', type: 'del', color: 'red'},
          ]
        },
        tableHeader: [
          {
            prop: 'id',
            label: 'ID',
            width: 100,
          }, {
            prop: 'supervisoryUnit',
            label: '监管单位',
            width: 300,
          }
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
        this.loading = true
        setTimeout(() => {
          this.tableData = [{
            id: 1,
            supervisoryUnit: '当然感染',
          }, {
            id: 2,
            supervisoryUnit: '德国',
          }, {
            id: 3,
            supervisoryUnit: '分号',
          }, {
            id: 4,
            supervisoryUnit: '分号',
          }]
          this.loading = false
        }, 1000)
      },
//      tableOtherClick(row, index) {
//        console.log(row);
//        console.log(index);
//      },
//      handleSizeChange(val) {
//        console.log(`每页 ${val} 条`);
//      },
//      handleCurrentChange(val) {
//        console.log(`当前页: ${val}`);
//      }
    }
  }
</script>

<style lang="scss" scoped>


  .sj-regulatoryUnit,.sj-regulatoryType,.sj-auditedObject{
    height: 50px;
    font-size: 14px;
    width:540px;
  }
  .sj-regulatoryUnit-title,.sj-regulatoryType-title,.sj-auditedObject-title{
    display: block;
    padding-top: 15px;
    float:left;
    font-weight: bold;
  }
  .systemSetting-blank{
    height:50px;
  }
  .tableClassName /deep/{
    th:nth-of-type(2),td:nth-of-type(2){
      text-align: left;
    }
  }
  .sj-add-regulatoryUnit-button,.sj-add-regulatoryType-button,.sj-add-auditedObject-button{
    position: relative;
    float:right;
  }
  .sj-regulatoryUnit-table{
    width:540px;
  }
</style>
