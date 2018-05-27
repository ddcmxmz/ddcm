<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="父级导航" prop="parentId">
      <template v-if="ifHasChildren">
        <el-select :disabled="true" v-model="form.parentId" placeholder="请选择父级导航">
          <el-option
            v-for="item in faNgs"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </template>
      <template v-else>
        <el-select v-model="form.parentId" placeholder="请选择父级导航">
          <el-option
            v-for="item in faNgs"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </template>
    </el-form-item>
    <el-form-item label="标题" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="链接" prop="link">
      <el-input v-model="form.link"></el-input>
    </el-form-item>
    <el-form-item label="排序">
      <el-input-number v-model="form.sort" :step="1" :min="1"></el-input-number>
    </el-form-item>
    <el-form-item class="submitBt">
      <el-button type="primary" @click="onSubmit('form')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { Msg } from '../../../tools/message'
  import { Mh0204Api } from './api'

  export default {
    data () {
      return {
        form: {
          id: this.formInfo.ng ? this.formInfo.ng.id : -1,
          parentId: this.formInfo.ng ? this.formInfo.ng.parentId : '',
          name: this.formInfo.ng ? this.formInfo.ng.name : '',
          link: this.formInfo.ng ? this.formInfo.ng.link : '',
          sort: this.formInfo.ng ? this.formInfo.ng.sort : 1,
          updatedAt: this.formInfo.ng ? this.formInfo.ng.updatedAt : '',
        },
        ifHasChildren: this.formInfo.ifHasChildren,
        faNgs: this.formInfo.faNgs,
        rules: {
          parentId: [
            {required: true, message: '请选择父级导航', trigger: 'change'},
          ],
          name: [
            {required: true, message: '请输入导航名称', trigger: 'blur'},
            {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
          ],
          link: [
            {required: true, message: '请输入地址链接', trigger: 'blur'}
          ]
        }
      }
    },
    props: {
      formInfo: {},
      ngData: {},
    },
    watch: {
      // ..........监听父组件props的变化
      formInfo: {
        handler (newval, oldval) {
          this.form = {
            id: newval.ng ? newval.ng.id : -1,
            parentId: newval.ng ? newval.ng.parentId : '',
            name: newval.ng ? newval.ng.name : '',
            link: newval.ng ? newval.ng.link : '',
            sort: newval.ng ? newval.ng.sort : 1,
            updatedAt: newval.ng ? newval.ng.updatedAt : '',
          }
          this.faNgs = newval.faNgs
          this.ifHasChildren = newval.ifHasChildren
        },
        // ..........由于监听的方式是通过比较内存地址是否变化，
        // ..........而对象内部属性的改变并不会引起对象内存地址的改变
        // ..........因而设置deep:true进行深度观察
        deep: true
      },
      ngData: {
        handler (newval, oldval) {
          this.ngData = newval
        },
        deep: true
      }
    },
    methods: {
      // ..........提交导航栏表单信息
      onSubmit (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            switch (this.formInfo.type) {
              case 'edit' :
                var editNg = null
                var selfId = this.form.id
                var parentId = this.form.parentId
                try {
                  if (this.checkEdit(selfId, parentId)) {
                    editNg = {
                      id: selfId,
                      parentId: parentId,
                      name: this.form.name,
                      link: this.form.link,
                      sort: this.form.sort,
                      updatedAt: this.form.updatedAt,
                    }
                  }
                  if (editNg != null) {
                    Mh0204Api.EditeNgApi(editNg).then(res => {
                      Msg.success(res.data.message)
                      this.$emit('close')
                      this.$parent.handleClose()
                    }).catch(err => {
                      Msg.error('发生了一些错误..')
                      this.$emit('close')
                    })
                  }
                } catch (e) {
                  Msg.error(e)
                }
                break
              case 'add' :
                var addNg = {
                  name: this.form.name,
                  link: this.form.link,
                  sort: this.form.sort,
                  parentId: this.form.parentId
                }
                Mh0204Api.AddNgApi(addNg).then(res => {
                  Msg.success(res.data.message)
                  this.$emit('close')
                }).catch(err => {
                  Msg.error('发生了一些错误..')
                  this.$emit('close')
                })
                break
              default :
            }
          } else {
            Msg.error('请完善导航栏所有信息')
            return false
          }
        })
      },
      // ..........清空导航栏表单信息
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      // ..........判断导航栏的编辑是否允许
      checkEdit (selfId, parentId) {
        var data = this.ngData
        if (selfId === parentId) {
          throw new Error('导航栏无法将自身作为父级导航栏，请重新选择。')
        } else {
          data.forEach(item => {
            if (item.id === selfId && item.children.length !== 0 && parentId !== 0) {
              throw new Error('当前导航栏存在子导航栏，导航栏只能存在两级，请重新选择。')
            }
          })
        }
        return true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .submitBt {
    display: flex;
    justify-content: flex-end;
  }
</style>
