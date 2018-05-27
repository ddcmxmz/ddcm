<template>
  <el-card class="box-card" style="min-height: 99%">
    <div slot="header" class="clearfix">
      <span>审计项目列表</span>

    </div>
    <search></search>
    <br>
    <per-table></per-table>
    <project-diago></project-diago>
  </el-card>
</template>

<script>
  import PerTable from './table.vue'
  import Search from './search'
  import projectDiago from './diago'

    export default {
      components: {
        PerTable,
        Search,
        projectDiago
      },
      name: "index",
  }
</script>

<style lang="scss" scoped>
  .header_row_class_name /deep/ th {
    background-color: #f2f2f2;
    text-align: center;
    color: #515151;
    font-size: 13px;
    font-weight: normal;
  }
</style>
