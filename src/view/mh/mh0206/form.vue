<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="70px">
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="链接" prop="link">
      <el-input v-model="form.link"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input-number v-model="form.sort" :step="1" :min="1"></el-input-number>
    </el-form-item>
    <el-form-item prop='icon' v-model="form.icon" label="图标">
      <comp-upload ref="uploadIcon" :limit="1"></comp-upload>
    </el-form-item>
    <el-form-item class="submitBt">
      <el-button type="primary" @click="onSubmit" :loading="loading">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Form from '../../../packages/components/form'
  import CompUpload from '../../../packages/components/uplocal-file'
  import {BusinessApi} from './api'
  import {Msg} from '../../../tools/message'

  export default {
    props: ['formInfo'],
    components: {
      Form,
      CompUpload
    },
    watch: {
      formInfo: {
        handler(val, olaval) {
          this.form = val.info
        },
        deep: true
      }
    },
    data() {
      return {
        form: {
          ...this.formInfo.info
        },
        rules: {
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          link: [{
            required: true,
            message: '请输入连接',
            trigger: 'blur'
          }],
          sort: [{
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }],
        },
        loading: false,
      }
    },
    methods: {
      onSubmit() {
        this.$refs['uploadIcon'].submitUpload().then(fileList => {
          this.$refs['form'].validate(valid => {
            if (valid) {
              this.loading = !this.loading;
              const params = {
                ...this.form
              };
              if (this.formInfo.type === 'add') {
                BusinessApi.AddApi(params, fileList).then(res => {
                  if (res) {
                    Msg.success(res.data.message);
                    this.loading = !this.loading;
                    this.closeForm()
                  }
                })
              } else if (this.formInfo.type === 'edit') {
                params.id = this.form.id;
                params.updatedAt = this.form.updatedAt;
                BusinessApi.EditorApi(params, fileList).then(res => {
                  if (res) {
                    Msg.success(res.data.message);
                    this.loading = !this.loading;
                    this.closeForm()
                  }
                })
              }
            } else {
              return false;
            }
          });
        })
      },
      // ..........清空表单信息
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 关闭表单弹框
      closeForm() {
        this.$emit('close', false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .compForm {
    margin: auto;
  }
</style>
