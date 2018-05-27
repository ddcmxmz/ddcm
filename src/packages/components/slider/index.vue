<template>
  <div width="200px" style="background-color: rgb(238, 241, 246)">
    <div class="mh-admin-title" :style="{width: isCollapse?'63px':'179px'}">
      <router-link class="head-link" to="/">{{isCollapse?'经费监管':'重庆市教育经费监管中心'}}</router-link>
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      unique-opened
      background-color="#304156"
      text-color="#ffffff"
      :defaultActive="defaopen"
      active-text-color="#ffffff"
      width="180px"
      :collapse="isCollapse"
    >
      <el-submenu
        v-if="submenu.children"
        v-for="(submenu) in menuList" :index="submenu.to"
        :key="submenu.to">
        <template slot="title">
          <i :class="submenu.icon"></i>
          <span slot="title">{{submenu.submenu || submenu.label}}</span>
        </template>
        <el-menu-item-group v-for="(menu) in submenu.children" :key="menu.to">
          <router-link class="head-link" :to="menu.to">
            <el-menu-item :index="menu.to">
              <i :class="submenu.icon"></i>
              <span slot="title">{{menu.label}}</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link class="head-link" :to="submenu.to" v-else>
        <el-menu-item :index="submenu.to">
          <i :class="submenu.icon"></i>
          <span slot="title">{{submenu.label}}</span>
        </el-menu-item>
      </router-link>
    </el-menu>
    <span class="side_trgger" @click="COLLAPSE" :style="{left: isCollapse?'74px':'190px'}">
       <i class="iconfont" :class="menuToger"></i>
    </span>
  </div>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'slider',
    data() {
      return {
        defaopen: '/oa/excel',
      }
    },
    props: {
      menuList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created() {
      this.setActiveMenu()
    },
    methods: {
      ...mapMutations(['COLLAPSE']),
      iconClass(icon) {
        return `el-icon-${icon}`
      },
      setActiveMenu() {
        const pt = this.$route.path.split('/');
        pt.length > 3 && pt.pop();
        pt.length > 3 && pt.pop();
        this.defaopen = pt.join('/')
      }
    },
    computed: {
      ...mapState({
        isCollapse: state => state.permission.isCollapse,
      }),
      menuToger: function () {
        return !this.isCollapse ? 'icon-shouqicaidan' : 'icon-zhankaicaidan'
      },
      menuTogerTitle: function () {
        return this.isCollapse ? '展开菜单' : '收起菜单';
      },
    },
    watch: {
      $route() {
        this.setActiveMenu()
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../assets/styles/var";

  .el-menu-vertical-demo.el-menu {
    height: calc(100% - 46px);
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }

  .side_trgger {
    position: absolute;
    top: 11px;
    z-index: 1;
    -webkit-transition: all .3s ease-in-out;
    transition: 0.3s left ease-in-out;
    > i {
      font-size: 24px;
      color: #666;
      &:hover {
        color: $bg_main_color;
        cursor: pointer;
      }
    }
  }

  .el-menu-item {
    a {
      color: rgb(191, 203, 217);
    }
  }

  .el-menu {
    height: 100%;
  }

  .el-menu-item.is-active > a {
    color: $bg_main_color;
  }

  .el-menu-item-group a {
    text-decoration: none;
  }

  .el-menu-item a {
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }

  .head-link {
    text-decoration: none;
    &:active {
      text-decoration: none;
    }
  }

  .mh-admin-title {
    height: 45px;
    text-align: center;
    line-height: 45px;
    background-color: $bg_main_color;
    padding-right: 1px;
    border-right: 1px solid #fff;
    transition: 0.3s all ease-in-out;
    border-bottom: 1px solid #dddddd;
    > a {
      color: #FFFFFF;
      font-size: 14px;
      text-decoration: none;
    }
  }

  .el-menu-item.is-active {
    background-color: $bg_main_color !important;
  }

  .el-menu.el-menu-vertical-demo {

  }
</style>
