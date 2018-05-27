<template>
  <el-form style="width: 80%" ref="form" :model="listValue" label-width="120px" :rules="rules" size="small">
    <el-form-item label="名称：" prop="descName">
      <el-input v-model="listValue.descName"></el-input>
    </el-form-item>
    <el-form-item label="控件类型：" prop="dataType">
      <el-input v-model="listValue.dataType"></el-input>
    </el-form-item>
    <el-form-item label="java类型：" prop="javaType">
      <el-select v-model="listValue.javaType" placeholder="请选择java类型">
        <el-option label="Integer" value="Integer"></el-option>
        <el-option label="String" value="String"></el-option>
        <el-option label="Long" value="Long"></el-option>
        <el-option label="Boolean" value="Boolean"></el-option>
        <el-option label="Float" value="Float"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="长度：" prop="dataSize">
      <el-input-number v-model="listValue.dataSize"></el-input-number>
    </el-form-item>
    <el-form-item class="submitBt">
      <el-button type="primary" @click="onSubmit('form')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { DataTypeApi } from '../api/dataTypeApi'
  import { Msg } from '../../../tools/message'

  export default {
    props: {
      formInfo: {}
    },
    data () {
      return {
        listValue: Object.assign({}, this.formInfo.data, null),
        type: this.formInfo.type || 'add',
        rules: {
          descName: [
            {required: true, message: '请输入名称', trigger: 'change'},
          ],
          dataType: [
            {required: true, message: '请输入控件类型', trigger: 'blur'}
          ],
          javaType: [
            {required: true, message: '请选择java类型', trigger: 'blur'}
          ],
          dataSize: [
            {required: true, message: '请输入输入长度', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      // ..........监听父组件props的变化
      formInfo: {
        handler (newVal) {
          this.listValue = newVal.data
          this.type = newVal.type
        },
        deep: true
      },
    },
    methods: {
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      onSubmit (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            switch (this.type) {
              case 'edit':
                DataTypeApi.EditDataType(this.listValue).then((res) => {
                  Msg.success(res.data.message)
                  this.$emit('close')
                  this.$parent.handleClose()
                }).catch(() => {
                  Msg.error('发生了一些错误..')
                })
                break
              case 'add':
                DataTypeApi.AddDataType(this.listValue).then((res) => {
                  Msg.success(res.data.message)
                  this.$emit('close')
                  this.$parent.handleClose()
                }).catch(() => {
                  Msg.error('发生了一些错误..')
                })
                break
              default:
            }
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .avatar-uploader {
    width: 128px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }

  .oragn_addd_up {
    display: inline-block;
    position: absolute;
    top: 40px;
    right: 40px;
    text-align: center;
  }
</style>
