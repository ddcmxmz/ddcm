<template>
  <el-form style="width: 80%" ref="form" :model="listValue" label-width="120px" size="small" :rules="rules">
    <el-form-item v-for="item in formItem" :label="item.modelItemName + '：'" :prop="item.modelItemEnglishName"
                  :key="item.id">
      <el-input v-if="item.cfModelDataType.javaType == 'String'"
                v-model="listValue[item.modelItemEnglishName]"></el-input>
      <el-input-number
        v-else-if="item.cfModelDataType.javaType == 'Integer' || item.cfModelDataType.javaType == 'Float' || item.cfModelDataType.javaType == 'Long'"
        v-model="listValue[item.modelItemEnglishName]"></el-input-number>
      <el-radio-group v-if="item.cfModelDataType.javaType == 'Boolean'" v-model="listValue[item.modelItemEnglishName]">
        <el-radio :label="true">是</el-radio>
        <el-radio :label="false">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="submitBt">
      <el-button type="primary" @click="onSubmit('form')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { ItemApi } from '../api/itemApi'
  import { Msg } from '../../../tools/message'
  import { ShowTableApi } from '../api/showTableApi'

  export default {
    props: {
      formInfo: {},
      modelId: 0
    },
    data () {
      let checkForRegex = (rule, value, callback) => {
        console.log(rule, value, callback)
        //callback(new Error('请输入密码'));
      }
      return {
        listValue: Object.assign({}, this.formInfo.data, null),
        type: this.formInfo.type || 'add',
        formItem: [],
        rules: {
          name: {required: true, pattern: /^[a-z]+$/, message: 'qqq', trigger: 'blur'}
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
                this.listValue.modelId = this.modelId
                ShowTableApi.EditData(this.listValue).then((res) => {
                  Msg.success(res.data.message)
                  this.$emit('close')
                }).catch((e) => {
                  Msg.error('发生了一些错误..')
                })
                break
              case 'add':
                this.listValue.modelId = this.modelId
                ShowTableApi.AddData(this.listValue).then((res) => {
                  Msg.success(res.data.message)
                  this.$emit('close')
                }).catch(() => {
                  Msg.error('发生了一些错误..')
                })
                break
              default:
            }
          }
        })
      },
      getHeader () {
        ShowTableApi.GetTitle(this.modelId).then((res) => {
          if (res.data.data) {
            let data = res.data.data || []
//            let rules = {};
//            for (let i = 0; i < data.length; i++) {
//              rules[data[i].modelItemEnglishName] = [{
//                required: true,
//                message: `请输入${data[i].modelItemName}`,
//                trigger: 'change'
//              }]
//            }
//            this.rules = rules;
            this.formItem = data
          }
        }).catch(() => {
          this.loading = false
          Msg.error('发生了一些错误..')
        })
      },
    },
    mounted () {
      this.getHeader()
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
