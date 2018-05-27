<template>
  <el-select v-model="sel" placeholder="请选择学段" @change="change">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.value"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
  /**
   * 学校学段选择框，自带接口数据
   * 返回 change 事件
   */
  import {Settint} from '@/store/ge/api'

  export default {
    name: 'sc-section',
    data() {
      return {
        options: [],
        sel: null,
      };
    },
    props: {
      value: [String, Number],
    },
    created() {
      if (this.value) {
        this.sel = this.value
      }
      Settint.GE9001A01({parentKey: 'ORG_SCHOOL_PHASE'}).then(res => {
        this.options = res.data.data;
      })
    },
    methods: {
      change(val) {
        this.$emit('change', val)
      }
    }
  };
</script>
<style scoped lang="scss">
</style>
