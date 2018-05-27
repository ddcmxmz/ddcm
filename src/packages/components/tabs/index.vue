<template>
  <el-menu
    :default-active="activeName"
    style="line-height: 47px;margin-left: 50px"
    @select="handleClick"
    class="el-menu-main" mode="horizontal">
    <el-menu-item
      v-for="item in tab" v-bind:key="item.to"
      :index="item.to"
    >
      <router-link class="link_me" :to="item.children[0].to">{{item.label}}</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
  import mock from '@/mock/menu.json'

  export default {
    data() {
      return {
        activeName: 'second',
        tab: mock.menu,
      };
    },
    methods: {
      handleClick(tab) {
        this.$emit('changeTabs', tab)
      },
      getBreadcrumb() {
        this.activeName = this.$route.path.split('/')[1]
      }
    },
    created() {
      this.getBreadcrumb()
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    }
  };
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/var";

  .link_me {
    color: $font_title_color;
    text-decoration: none;
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .is-active {
    a {
      color: $bg_main_color;
    }
  }

  .el-menu-main {
    border-bottom: none;
    .el-menu-item {
      height: 100%;
      line-height: 46px;
    }
  }
</style>
