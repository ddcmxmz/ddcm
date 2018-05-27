<template>
  <el-card class="box-card" style="min-height: 99%">
    <div class="text item">
      <el-tabs v-model="activeName">
        <el-tab-pane label="系统设置" name="first">系统设置</el-tab-pane>

        <el-tab-pane label="邮件服务" name="second">
          <el-form ref="form" :model="form" label-width="120px" style="width: 40%">
            <el-form-item label="SMTP服务器：">
              <el-input v-model="form.name" placeholder="smtp.163.com"></el-input>
            </el-form-item>
            <el-form-item label="SMTP端口号：">
              <el-input v-model="form.desc" placeholder="一般为 25 或 465"></el-input>
            </el-form-item>
            <el-form-item label="发件人邮箱：">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="发件人昵称：">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="邮箱密码：">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="属性设置" name="third">属性设置</el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    components: {},
    data() {
      return {
        activeName: 'first',
        form: {}
      }
    },
    methods: {
      ...mapMutations([]),
      onSubmit() {
        // todo
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
