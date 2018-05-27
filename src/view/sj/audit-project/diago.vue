<template>
  <el-dialog
    :title="dialog_title"
    :visible.sync="dialogVisible"
    width="620px"
    :before-close="project_onCancel">
    <el-form ref="form" :model="listValue" label-width="120px" :rules="rules">
      <el-form-item label="项目名称：" prop="name">
        <el-input v-model="listValue.name"></el-input>
      </el-form-item>
      <el-form-item label="被审计单位：" prop="checkCompany">
        <el-input v-model="listValue.checkCompany"></el-input>
      </el-form-item>
      <el-form-item label="监管单位：" prop="company">
        <el-input v-model="listValue.company" ></el-input>
      </el-form-item>
      <el-form-item label="监管类别：" prop="category">
        <el-input v-model="listValue.category" ></el-input>
      </el-form-item>
      <el-form-item label="被审计对象：" prop="checkObject">
        <el-input v-model="listValue.checkObject" ></el-input>
      </el-form-item>
      <el-form-item label="审计年度：" prop="checkYear">
        <el-input v-model="listValue.checkYear"></el-input>
      </el-form-item>
      <el-form-item label="问题分类：" prop="problem">
        <el-input v-model="listValue.problem"></el-input>
      </el-form-item>
      <el-form-item label="审计时间：" prop="time">
        <el-input v-model="listValue.time" :min="0"></el-input>
      </el-form-item>
      <el-form-item label="文件上传:" prop="files">
            <upload-file
              ref="refsUpload" label=" ">
            </upload-file>
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
  import uploadFile from '../../../packages/components/uplocal-file'
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    components: {
      TitleCard,
      ViewCont,
      MaskedInput,
      uploadFile
    },
    computed: mapState({
      dialogVisible: state => state.setProject.dialogVisible,
      dialog_title: state => state.setProject.dialog_title,
      dialog_qx: state => {
        return state.setProject.dialog_qx
      },
      listValue: state => {
        return state.setProject.listValue
      },
    }),
    data () {
      return {
        rules: {
          name: [
            {required: true, message: '请输入项目名称', trigger: 'blur'},
          ],
          checkCompany: [
            {required: true, message: '请输入', trigger: 'blur'},
          ],
          company: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          category: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          checkObject: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          checkYear: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          problem: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          time: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      ...mapMutations([
        'project_onCancel'
      ]),
      ...mapActions([
        'project_on_ok'
      ]),
      submit () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.project_on_ok(this.listValue)
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
