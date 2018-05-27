<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  export default {

    data() {
      return {
      };
    },
    methods: {
      handleClose(done) {
        done()
      }
    },
    props: {
      dialogVisible: false
    }
  }
</script>
