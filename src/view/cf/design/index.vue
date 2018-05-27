<template>
  <el-card class="box-card table_card" :class="screen ? 'bard_screen':''" style="min-height: 99%"
           body-style="padding:0">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in bread"
          :to="item.to"
          v-bind:key="item.to"
        >{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="screen" @click="click" v-if="isSC">
        <i class="icon iconfont icon-quanping"></i>
      </div>
    </div>
    <div class="text item">
      <router-view></router-view>
    </div>
  </el-card>
</template>

<script>

  export default {
    data() {
      return {
        bread: [],
        screen: false,
        isSC: false
      }
    },
    created() {
      this.defaultBread();
      window.addEventListener('keydown', this.esc);
    },
    destroyed() {
      window.removeEventListener('keydown', this.esc)
    },
    methods: {
      defaultBread() {
        if (this.$route.path.indexOf('make') > -1) {
          this.bread = [{name: '表单设计', to: '/cf/design'}, {name: '表单制作', to: ''}];
          this.isSC = true;
          this.screen = true;
          this.$message.info('按 ESC 即可退出全屏模式')
        } else {
          this.bread = [{name: '表单设计', to: '/cf/design'}];
          this.isSC = false;
          this.screen = false;
        }
      },
      click() {
        this.screen = !this.screen;
      },
      esc(e) {
        if (this.isSC && this.screen && e.which === 27) {
          this.screen = false
        }
      }
    },
    watch: {
      $route() {
        this.defaultBread();
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

  .screen {
    position: absolute;
    right: 20px;
    top: 10px;
    cursor: pointer;
  }

  .table_card {
    position: relative;
  }

  .bard_screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    .set_organ_body {
      height: calc(100vh - 51px);
    }
  }
</style>
