<template>
  <div class="payment">
    <el-form ref="form" :model="form" :rules="rules" label-width="60px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :step="1" :min="1"></el-input-number>
      </el-form-item>
      <el-form-item class="submitBt">
        <el-button type="primary" :loading="loading" @click="onSubmit('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {LinkApi} from './link-api'
  import {Msg} from '../../../tools/message'
    export default {
      props: ['formInfo'],
      watch: {
        formInfo: {
          handler(val, olaval) {
            this.form = val.value
          },
          deep: true
        }
      },
      data() {
        return {
          rules: {
            sort: [
              {required: true, message: '请输入排序编号', trigger: 'blur'},
            ],
            name: [
              {required: true, message: '请输入链接名称', trigger: 'blur'}
            ],
            link: [
              {required: true, message: '请输入链接地址', trigger: 'blur'}
            ],
          },
          form: {
            id: this.formInfo.value ? this.formInfo.value.id : '',
            name: this.formInfo.value ? this.formInfo.value.name : '',
            link: this.formInfo.value ? this.formInfo.value.link : '',
            sort: this.formInfo.value ? this.formInfo.value.sort : '',
            updatedAt: this.formInfo.value ? this.formInfo.value.updatedAt : '',
          },
          loading: false,
        }
      },
      methods: {
        closeForm() {
          this.$emit('closeForm', false)
        },
        // ..........清空表单信息
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
        onSubmit(form) {
          this.$refs['form'].validate(valid => {
            if (valid) {
              this.loading = !this.loading;
              const data = {
                  ...this.form
                }
              if (this.formInfo.type === 'add') {
                LinkApi.AddApi(data).then(res => {
                  Msg.success(res.data.message)
                  this.loading = !this.loading;
                  this.closeForm()
                }).catch(res => {
                  Msg.error(res.data.message)
                })
              } else if (this.formInfo.type === 'edit') {
                data.id = this.form.id
                data.updatedAt = this.form.updatedAt
                LinkApi.EditApi(data).then(res => {
                    Msg.success(res.data.message)
                    this.loading = !this.loading;
                    this.closeForm()
                  }).catch(res => {
                    Msg.error(res.data.message)
                  })
              }
            } else {
              return false;
            }
          });
        },
      }
    }
</script>

<style lang="scss" scoped>
  .compForm {
    width:300px;
  }
</style>
