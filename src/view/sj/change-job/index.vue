<template>
  <el-card class="box-card" style="min-height: 99%">
    <div slot="header" class="clearfix">
      <span>整改任务</span>
    </div>
    <search></search>
    <br>
    <per-table></per-table>
  </el-card>
</template>

<script>
  import PerTable from './table.vue'
  import Search from './search'
    export default {
        name: "index",
      components: {
        PerTable,
        Search
      },
    }
</script>

<style scoped>

</style>
