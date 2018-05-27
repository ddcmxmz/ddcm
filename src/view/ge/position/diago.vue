<template>
  <el-dialog
    :title="dialog_title"
    :visible.sync="dialogVisible"
    width="620px"
    :before-close="pos_onCancel">
    <el-form ref="form" :model="listValue" label-width="120px" :rules="rules">
      <el-form-item label="职位分类：">
        <span>{{listValue.company}}</span>
      </el-form-item>
      <el-form-item label=" 职位名称：" prop="name">
        <el-input v-model="listValue.name"></el-input>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input-number v-model="listValue.sort" :min="0"></el-input-number>
      </el-form-item>
      <el-form-item label="状态：">
        <el-switch
          v-model="listValue.status"></el-switch>
        <span>{{listValue.status ? '启用' : '禁用'}}</span>
      </el-form-item>
      <el-form-item label="角色：" style="margin-bottom: 0">
        <el-select v-model="listValue.roles" multiple placeholder="请选择" style="width: 280px">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
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
      dialogVisible: state => state.setPos.dialogVisible,
      pos_Is_add: state => state.setPos.pos_Is_add,
      dialog_title: state => state.setPos.dialog_title,
      listValue: state => {
        return state.setPos.listValue
      },
      options: state => state.setPos.options,
    }),
    data() {
      return {
        rules: {
          name: [
            {required: true, message: '请输入职位名称', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      ...mapMutations([
        'pos_onCancel',
      ]),
      ...mapActions([
        'pos_on_ok'
      ]),
      submit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.pos_on_ok(this.listValue)
          } else {
            return false
          }
        })
      }
    },
  }
</script>
<style scoped lang="scss">

</style>
