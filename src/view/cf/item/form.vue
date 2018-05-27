<template>
  <el-form style="width: 80%" ref="form" :model="listValue" label-width="200px" :rules="rules" size="small">
    <el-form-item label="中文名称：" prop="modelItemName">
      <el-input v-model="listValue.modelItemName"></el-input>
    </el-form-item>
    <el-form-item label="英文名称：" prop="modelItemEnglishName">
      <el-input v-model="listValue.modelItemEnglishName"></el-input>
    </el-form-item>
    <el-form-item label="模板类型：" prop="modelDataTypeId">
      <el-select v-model="listValue.modelDataTypeId" placeholder="请选择数据类型">
        <el-option v-for="item in dataType" :label="item.descName" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="长度：" prop="length">
      <el-input-number v-model="listValue.length"></el-input-number>
    </el-form-item>
    <el-form-item label="数据校验方式：" prop="checkWay">
      <el-select v-model="listValue.checkWay" placeholder="请选择数据校验方式">
        <el-option v-for="item in checkWay" :label="item.name" :value="item.type" :key="item.type"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="自定义正则表达式：" :prop="listValue.checkWay == 'custom'?'checkRegex':null"
                  v-if="listValue.checkWay == 'custom'">
      <el-input v-model="listValue.checkRegex"></el-input>
    </el-form-item>
    <el-form-item label="数据校验提示：">
      <el-input v-model="listValue.checkMessage"></el-input>
    </el-form-item>
    <el-form-item label="是否显示：" prop="displayCol">
      <el-select v-model="listValue.displayCol" placeholder="请选择是否显示">
        <el-option label="是" :value="1"></el-option>
        <el-option label="否" :value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否可空：" prop="notNull">
      <el-select v-model="listValue.notNull" placeholder="请选择是否可空">
        <el-option label="可空" :value="1"></el-option>
        <el-option label="不可空" :value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序：" prop="sort">
      <el-input-number v-model="listValue.sort"></el-input-number>
    </el-form-item>
    <el-form-item class="submitBt">
      <el-button type="primary" @click="onSubmit('form')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { DataTypeApi } from '../api/dataTypeApi'
  import { ItemApi } from '../api/itemApi'
  import { Msg } from '../../../tools/message'
  import { checkWay, checkRegex } from '../util/util'

  export default {
    props: {
      formInfo: {},
      modelId: 0
    },
    data () {
      console.log(checkWay)
      return {
        listValue: Object.assign({}, this.formInfo.data, null),
        type: this.formInfo.type || 'add',
        dataType: [],
        checkWay: checkWay,
        rules: {
          modelItemName: [
            {required: true, message: '请输入中文名称', trigger: 'change'},
          ],
          modelItemEnglishName: [
            {required: true, message: '请输入英文名称', trigger: 'blur'}
          ],
          modelDataTypeId: [
            {required: true, message: '请选择模板类型', trigger: 'blur'}
          ],
          length: [
            {required: true, message: '请输入输入长度', trigger: 'blur'}
          ],
          checkWay: [
            {required: true, message: '请选择选择数据校验方式', trigger: 'blur'}
          ],
          checkRegex: [
            {required: true, message: '请输入自定义正则表达式', trigger: 'blur'}
          ],
          displayCol: [
            {required: true, message: '请确认是否显示', trigger: 'blur'}
          ],
          notNull: [
            {required: true, message: '请确认是否可空', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '请输入排序', trigger: 'blur'}
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
                this.listValue.modelId = this.modelId
                ItemApi.EditTableItem(this.listValue).then((res) => {
                  Msg.success(res.data.message)
                  this.$emit('close')
                }).catch(() => {
                  Msg.error('发生了一些错误..')
                })
                break
              case 'add':
                this.listValue.modelId = this.modelId
                if (this.listValue.checkWay !== 'no' && this.listValue.checkWay !== 'notNull' && this.listValue.checkWay !== 'custom') {
                  this.listValue.checkRegex = checkRegex[this.listValue.checkWay]
                }
                this.listValue.checkRegex = this.listValue.checkRegex || ''
                ItemApi.AddTableItem(this.listValue).then((res) => {
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
      getDataType () {
        DataTypeApi.GetAllDataType().then((res) => {
          this.dataType = res.data.data
        }).catch(() => {
          Msg.error('发生了一些错误..')
        })
      },
      onSelectChange (data) {
        console.log(data)
      }
    },
    mounted () {
      this.getDataType()
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
