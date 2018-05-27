<template>
  <div class="title_card">
    <div class="title_card_t">{{title}}</div>
    <slot>
      暂无数据
    </slot>
  </div>
</template>

<script>
  export default {
    name: 'sc-card',
    data () {
      return {}
    },
    props: {
      title: {
        type: String,
        default: '设置名称'
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/styles/var";

  .title_card {
    border: 1px solid $title_card_bor;
    padding: 20px 10px;
    position: relative;
    background-color: $title_card_bg;
    &_t {
      position: absolute;
      top: -12px;
      left: 15px;
      font-size: 16px;
      padding: 0 1px;
      background-color: transparent;
    }
  }
</style>
