<template>
  <el-card class="box-card set_organ" style="min-height: 99%">
    <div slot="header" class="clearfix">
      <span>审计整改管理模块</span>
    </div>
    <div class="set_organ_body">
      <comp-chart :style="{width: '100%',height: '80vh'}"></comp-chart>
    </div>
  </el-card>
</template>

<script>
  import CompChart from '../../../packages/components/chart'
  export default {
    components: {
      CompChart
    },
    data() {
      return {
        date: '',
      }
    },
    methods: {}
  }
</script>
<style scoped lang="scss">
  .set_organ {
    min-height: 500px;
    &_body {
      min-height: 500px;
      display: flex;
    }
  }

  .set_organ_body {
    padding: 10px;
  }
</style>
