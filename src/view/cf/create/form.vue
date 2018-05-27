<template>
  <el-form style="width: 80%" ref="form" :model="listValue" label-width="120px" :rules="rules" size="small">
    <el-form-item label="中文名称：" prop="modelName">
      <el-input v-model="listValue.modelName"></el-input>
    </el-form-item>
    <el-form-item label="英文名称：" prop="modelEnglishName">
      <el-input v-model="listValue.modelEnglishName"></el-input>
    </el-form-item>
    <el-form-item label="备注：" prop="remark">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="listValue.remark"></el-input>
    </el-form-item>
    <el-form-item class="submitBt">
      <el-button type="primary" @click="onSubmit('form')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {TableApi} from '../api/tableApi';
  import {Msg} from '../../../tools/message'

  export default {
    props: {
      formInfo: {}
    },
    data() {
      return {
        listValue: Object.assign({}, this.formInfo.data, null),
        type: this.formInfo.type || 'add',
        rules: {
          modelName: [
            {required: true, message: '请输入中文名称', trigger: 'change'},
            {min: 1, max: 255, message: '长度在 1 到 255 个字符', triggers: 'blur'}
          ],
          modelEnglishName: [
            {required: true, message: '请输入英文名称', trigger: 'blur'},
            {min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur'}
          ]
        },
      }
    },
    watch: {
      // ..........监听父组件props的变化
      formInfo: {
        handler(newVal) {
          this.listValue = newVal.data;
          this.type = newVal.type;
        },
        deep: true
      },
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            console.log(this.type);
            switch (this.type) {
              case 'edit':
                TableApi.EditTable(this.listValue).then((res) => {
                  Msg.success(res.data.message);
                  this.$emit('close');
                  this.$parent.handleClose();
                }).catch(() => {
                  Msg.error('发生了一些错误..')
                });
                break;
              case 'add':
                TableApi.AddTable(this.listValue).then((res) => {
                  Msg.success(res.data.message);
                  this.$emit('close');
                  this.$parent.handleClose();
                }).catch(() => {
                  Msg.error('发生了一些错误..')
                });
                break;
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
