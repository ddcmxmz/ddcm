<template>
  <div id="new2">
    <span>分页测试文件</span>
    <comp-pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :page="page"
      :pageSize="pageSize"
      :totalCount="totalCount"
    >
    </comp-pagination>
  </div>
</template>

<script>
  import CompPagination from './'

  export default {
    name: 'new2',
    data() {
      return {
        /** 分页信息 */
        page: 1,
        /** 每页数量  默认50 */
        pageSize: 50,
        /** 总数  需要动态获取 */
        totalCount: 200
      }
    },
    components: {
      CompPagination
    },
    methods: {
      /** 改变每页显示数量 */
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
  .content-body {
    margin-top: 30px;
  }
</style>
