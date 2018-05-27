<template>
  <el-tree
    ref="tree"
    :data="data"
    node-key="id"
    highlight-current
    @node-click="handleNodeClick"
    @current-change="currentChange"
    :default-expanded-keys="active"
    :props="{label: 'name'}"
    :expand-on-click-node="false"
    :filter-node-method="filterNode"
    auto-expand-parent>
      <span class="custom-tree-node" slot-scope="{ node, data }" :style="{color: data.status === 0? '#A1A1A1': null}">
          <span>{{ node.label }}</span>
        <span>
            {{data.orgType !==2 ? data.children && data.children.length >0 ? data.children.length : null: null}}
        </span>
      </span>
  </el-tree>
</template>

<script>

  export default {
    name: 'sc-tree',
    data() {
      return {
        data5: []
      };
    },
    props: {
      data: {
        type: Array,
        default() {
          return []
        }
      },
      active: {
        type: Array,
        default() {
          return [1]
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.setCurrentKey()
      }, 300)
    },
    methods: {
      handleNodeClick(data) {
        // console.log(data);
        this.$emit('handleNodeClick', data)
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      currentChange(d) {
        // console.log(d);
      },
      setCurrentKey(key) {
        if (this.active) {
          this.$refs['tree'].setCurrentKey((this.active[0]).toString())
        }
      }
    }
  };
</script>
<style scoped lang="scss">
  @import "../../../assets/styles/var";

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .is-current > .el-tree-node__content .custom-tree-node {
    color: $bg_main_color !important;
  }
</style>
