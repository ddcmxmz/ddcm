<template>
  <el-dialog
    :title="dialog_title"
    :visible.sync="dialogVisible"
    width="620px"
    :before-close="role_onCancel">
    <el-form ref="form" :model="listValue" label-width="120px" :rules="rules">
      <el-form-item label="角色名称：" prop="name">
        <el-input v-model="listValue.name"></el-input>
      </el-form-item>
      <el-form-item label=" 描述：">
        <el-input v-model="listValue.description"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number v-model="listValue.sort" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="状态：">
        <el-switch
          v-model="listValue.status"></el-switch>
        <span>{{!listValue.status ? '启用' : '禁用'}}</span>
      </el-form-item>
      <el-form-item label="权限：" style="margin-bottom: 0">
        <el-checkbox-group v-model="listValue.permissions">
          <el-checkbox
            :label="item.id"
            v-for="(item, index) in dialog_qx"
            :style="{marginLeft: !index? '30px': null}"
            :key="item.id">
            {{item.name}}
          </el-checkbox>
        </el-checkbox-group>
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
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      TitleCard,
      ViewCont,
      MaskedInput
    },
    computed: mapState({
      dialogVisible: state => state.setRole.dialogVisible,
      dialog_title: state => state.setRole.dialog_title,
      dialog_qx: state => {
        return state.setRole.dialog_qx
      },
      listValue: state => {
        return state.setRole.listValue
      },
    }),
    data () {
      return {
        rules: {
          name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      ...mapMutations([
        'role_onCancel',
      ]),
      ...mapActions([
        'role_on_ok'
      ]),
      submit () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.role_on_ok(this.listValue)
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
