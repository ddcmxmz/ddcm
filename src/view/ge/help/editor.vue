<template>
  <div class="text item">
    <el-form ref="form" :model="form" label-width="150px" :rules="rules">
      <el-form-item label="帮助信息分类：" prop="helpTypeId">
        <el-select v-model="form.helpTypeId" placeholder="请选择分类" clearable>
          <el-option label="一级分类" :value="1"></el-option>
          <el-option label="二级分类" :value="2"></el-option>
          <el-option label="三级分类" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <div style="display: flex">
        <el-form-item label="模块：">
          <el-select v-model="form.module" placeholder="请选择模块" clearable>
            <el-option label="请选择" value=0></el-option>
            <el-option label="门户后台" value=1></el-option>
            <el-option label="办公自动化系统" value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" style="margin-bottom: 0">
          <el-switch
            v-model="form.status"></el-switch>
          <span>{{form.status ? '启用' : '禁用'}}</span>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input-number v-model="form.sort" :min="0"></el-input-number>
        </el-form-item>
      </div>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <comp-editor ref="help_editor">
        </comp-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import CompEditor from '../../../packages/components/editor'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    components: {
      CompEditor
    },
    data() {
      return {
        rules: {
          // helpTypeId: [
          //   {required: true, message: '请选择分类', trigger: 'blur'},
          // ],
          status: [
            {required: true, message: '', trigger: 'blur'},
          ],
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
          ],
        },
      }
    },
    computed: mapState({
      form: state => state.setHelp.form
    }),
    methods: {
      ...mapMutations([
        'help_add',
      ]),
      ...mapActions([
        'help_on_ok',
        'help_getid'
      ]),
      onSubmit() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.help_on_ok(Object.assign(this.form,
              {content: this.$refs['help_editor'].getEditorContent()})).then(() => {
              this.$router.push({path: '/ge/help'})
            })
          } else {
            return false
          }
        })
      }
    },
    created() {
      const prm = this.$route.params;
      if (prm.id === 'add') {
        this.help_add()
      } else {
        this.help_getid(prm).then(data => this.$refs['help_editor'].setEditorContent(data.data.content))
      }
    },
  }
</script>
<style scoped lang="scss">
  .tab1_t {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px 0;
  }
</style>
