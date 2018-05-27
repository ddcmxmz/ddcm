<template>
  <el-dialog
    :title="dialog_title"
    :visible.sync="dialogVisible"
    width="620px"
    :before-close="helps_onCancel">
    <el-form ref="form" :model="listValue" label-width="120px" :rules="rules">
      <el-form-item label="上级分类：">
        <el-select v-model="listValue.parentId" placeholder="请选择上级分类">
          <el-option
            v-for="item in selecOption"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label=" 分类名称：" prop="name">
        <el-input v-model="listValue.name"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number v-model="listValue.sort" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="状态：">
        <el-switch
          v-model="listValue.status"></el-switch>
        <span>{{!!listValue.status ? '启用' : '禁用'}}</span>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import TitleCard from '../../../packages/ui/title-card'
  import ViewCont from '../../../packages/components/view-cont'
  import MaskedInput from 'singularity-masked-input'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      TitleCard,
      ViewCont,
      MaskedInput
    },
    computed: mapState({
      dialogVisible: state => state.setHelps.dialogVisible,
      dialog_title: state => state.setHelps.dialog_title,
      listValue: state => state.setHelps.listValue,
      selecOption: state => state.setHelps.selecOption,
    }),
    data() {
      return {
        rules: {
          name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'},
          ],
        },
        checkList: []
      }
    },
    methods: {
      ...mapMutations([
        'helps_onCancel',
      ]),
      ...mapActions([
        'helps_on_ok'
      ]),
      submit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.helps_on_ok(this.listValue)
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style scoped lang="scss">

</style>
