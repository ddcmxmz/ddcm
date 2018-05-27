<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 50px; font-size: 16px; margin-left: 30px">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        key="/"
        to="/">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index)  in levelList"
        :key="item.name + index"
        :to="item.path">
        {{renderZhCN(item.name)}}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import mock from '@/mock/menu.json'

  export default {
    name: 'comp-bread',
    data() {
      return {
        levelList: null,
        menuList: mock.menu
      }
    },
    methods: {
      renderZhCN(path) {
        let val = [];
        const x = /:/.test(path);
        if (path !== '/' && !x) {
          for (let k = 0; k < this.menuList.length; k++) {
            const d = [];
            this.menuList[k].menuGroup.find(v => {
              if ((v.to).trim()) {
                if (this.menuList[k].to === path) {
                  d.push(this.menuList[k].submenu)
                } else {
                  if (v.to.indexOf(path) >= 0) {
                    d.push(v.label)
                  }
                }
              }
            });
            val.push(d[0])
          }
        }
        val = val.filter(v => !!v);
        return val[0]
      },
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name);
        const first = [];
        matched[0].path.substring(1).split('/').forEach(v => v && first.push({path: v, name: v}));
        this.levelList = first
      },
    },
    created() {
      this.getBreadcrumb()
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
  }
</script>
