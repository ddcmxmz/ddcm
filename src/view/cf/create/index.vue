<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in table_title"
          :to="item.to"
          v-bind:key="item.to"
        >{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text item">
      <router-view></router-view>
    </div>
  </el-card>
</template>

<script>
  import CompTable from './table'
  import CompForm from './form'
  import {mapState, mapMutations} from 'vuex'

  export default {
    components: {
      CompTable,
      CompForm
    },
    computed: mapState({
      table_title: state => state.tableCreate.table_title,
    }),
    created() {
      if (this.$route.path === '/cf/create') {
        this.table_initBread()
      }
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations([
        'table_initBread'
      ]),
    },
    watch: {
      $route() {
        if (this.$route.path === '/cf/create') {
          this.table_initBread()
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .tab1_t {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 0;
  }

  .el-breadcrumb {
    height: 20px;
    line-height: 20px;
  }
</style>
