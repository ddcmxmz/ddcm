<template>
  <el-card class="box-card set_organ" style="min-height: 99%">
    <div slot="header" class="clearfix">
      <span>项目执行管理模块</span>
    </div>
    <div class="set_organ_body">
      项目执行管理模块
    </div>
  </el-card>
</template>

<script>

  export default {
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
