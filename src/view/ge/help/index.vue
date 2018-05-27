<template>
  <el-card class="box-card" style="min-height: 99%">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in hp_title"
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
  import {mapState, mapMutations} from 'vuex'

  export default {
    data() {
      return {}
    },
    computed: mapState({
      hp_title: state => state.setHelp.hp_title,
    }),
    created() {
      if (this.$route.path === '/ge/help') {
        this.help_initBread()
      }
    },
    methods: {
      ...mapMutations([
        'help_initBread'
      ]),
    },
    watch: {
      $route() {
        if (this.$route.path === '/ge/help') {
          this.help_initBread()
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
