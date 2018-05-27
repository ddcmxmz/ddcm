<template>
  <div class="searchBox">
      <el-select v-model="value" vale-key="id" filterable placeholder="选择监管单位" style="width: 160px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value" vale-key="id" filterable placeholder="选择监管类别" style="width: 180px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value" vale-key="id" filterable placeholder="选择被审计对象" style="width: 150px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value" vale-key="id" filterable placeholder="问题分类"style="width: 140px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value" vale-key="id" filterable placeholder="项目状态" style="width: 140px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select v-model="value" vale-key="id" filterable placeholder="选择年度" style="width: 120px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
        <el-input
          style="width: 240px"
          :value="keyword"
          placeholder="项目名称"
          prefix-icon="el-icon-search"
          clearable
          @change="per_ip_change"
          class="input-with-select">
          <el-button slot="append">查询</el-button>
        </el-input>
    <el-button class="tab1_add" @click="project_openDiago">添加项目</el-button>
  </div>
</template>

<script>
  import {mapState, mapMutations, mapActions} from 'vuex'
  export default {
    name: "search",
    data() {
      return {
        formInline: {
          num: '',
          PhoneNum: '',
          code:''
        }
      }
    },
    methods: {
      ...mapMutations([
        'project_openDiago',
      ]),
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .searchBox /deep/ .el-input__inner {
    font-size: 13px;
  }
  .tab1_add {
    float: right;
  }
</style>
