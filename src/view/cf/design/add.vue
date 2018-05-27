<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="620px"
    :before-close="helps_onCancel">
    <el-form ref="form" :model="listValue" label-width="100px" :rules="rules">
      <el-form-item label="表单分类：" prop="type">
        <el-select v-model="listValue.type" placeholder="请选择模板类型">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="表单模型：" prop="modelId">
        <el-select v-model="listValue.modelId" placeholder="请选择表单模型">
          <el-option
            v-for="item in formMode"
            :key="item.id"
            :label="item.modelName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" 模板名称：" prop="name">
        <el-input v-model="listValue.name" style="width: 195px;"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number v-model="listValue.sort" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label=" 说明：">
        <el-input v-model="listValue.expound" type="textarea" :rows="3"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        rules: {
          type: [
            {required: true, message: '请选择模板类型', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入模板名称', trigger: 'blur'},
          ],
          modelId: [
            {required: true, message: '请选择模板模型', trigger: 'blur'},
          ],
        },
      }
    },
    props: {
      title: {
        type: String,
        default: '添加模板设计'
      },
      dialogVisible: {
        type: Boolean
      },
      options: {
        type: Array,
      },
      formMode: {
        type: Array,
      },
      listValue: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      submit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.$emit('submit');
          } else {
            return false
          }
        })
      },
      helps_onCancel() {
        this.$emit('calcle')
      }
    }
  }
</script>
<style scoped lang="scss">

</style>
