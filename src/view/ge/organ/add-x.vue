<template>
  <el-dialog
    :title="diao_title_x"
    :visible.sync="dialogVisible_x"
    width="450px"
    :before-close="org_onCancel_x">
    <el-form ref="form" :model="listValue" label-width="120px" :rules="rules">
      <el-form-item label="组织编号：">
        <el-input v-model="listValue.code"></el-input>
      </el-form-item>
      <el-form-item label=" 组织名称：" prop="name">
        <el-input v-model="listValue.name"></el-input>
      </el-form-item>
      <el-form-item
        label="学校学段："
        v-if="listValue.orgType === 3 || listValue.orgType === 5">
        <el-select v-model="listValue.phase" placeholder="请选择学段">
          <el-option label="幼儿园" value="1"></el-option>
          <el-option label="小学" value="2"></el-option>
          <el-option label="初中" value="3"></el-option>
          <el-option label="高中" value="4"></el-option>
          <el-option label="大学" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number v-model="listValue.sort" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="状态：" style="margin-bottom: 0">
        <el-switch
          v-model="listValue.status"></el-switch>
        <span>{{listValue.status ? '启用' : '禁用'}}</span>
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
      dialogVisible_x: state => state.setOrgan.dialogVisible_x,
      diao_title_x: state => state.setOrgan.diao_title_x,
      listValue: state => state.setOrgan.org_listValue
    }),
    data() {
      return {
        rules: {
          name: [
            {required: true, message: '请输入组织名称', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      ...mapMutations([
        'org_onCancel_x',
      ]),
      ...mapActions([
        'org_onOk_x'
      ]),
      submit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.org_onOk_x(this.listValue)
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
