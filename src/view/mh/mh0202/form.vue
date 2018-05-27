<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="父级分类" prop="parentId">
      <template v-if="form.hasChildrenCount">
        <el-select disabled="true" style="width:233px" v-model="form.parentId" placeholder="选择父级分类">
          <el-option v-for="item in parentClassifiy" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </template>
      <template v-else>
        <el-select style="width:233px" v-model="form.parentId" placeholder="选择父级分类">
          <el-option v-for="item in parentClassifiy" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </template>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name" style="width:233px"></el-input>
    </el-form-item>
    <el-form-item label="排序" prop="sort">
      <el-input-number v-model="form.sort" :step="1" :min="1"></el-input-number>
    </el-form-item>
    <el-form-item label="显示设置" prop="showAtHome">
      <button class="button-style"
              type="button"
              v-on:click="handleClickShowAtHome()"
              v-bind:class="{'button-click':!isShowAtHome}">
        <div class="button-name">首页显示</div>
        <div class="button-img">
          <img :src="trueP"/>
        </div>
      </button>
    </el-form-item>
    <el-form-item class="submitBt">
      <el-button type="primary" @click="onSubmit('form')">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {
    Msg
  } from '../../../tools/message'
  import {
    MH0202Api
  } from './api';
  import trueP from '../../../assets/images/trueP.png';

  export default {
    data() {
      return {
        trueP: trueP,
        isShowAtHome: this.formInfo.classifiyItem ? this.formInfo.classifiyItem.showAtHome : false,
        form: {
          id: this.formInfo.classifiyItem ? this.formInfo.classifiyItem.id : 0,
          parentId: this.formInfo.classifiyItem ? this.formInfo.classifiyItem.parentId : '',
          name: this.formInfo.classifiyItem ? this.formInfo.classifiyItem.name : '',
          sort: this.formInfo.classifiyItem ? this.formInfo.classifiyItem.sort : 1,
          updatedAt: this.formInfo.classifiyItem ? this.formInfo.classifiyItem.updatedAt : '',
          hasChildrenCount: this.formInfo.classifiyItem.childrenCount > 0,
        },
        parentClassifiy: this.formInfo.parentClassifiy,
        rules: {
          name: [{
            required: true,
            message: '请输入分类名称',
            trigger: 'blur'
          },
            {
              min: 1,
              max: 10,
              message: '长度在 1 到 10 个字符',
              trigger: 'blur'
            }
          ],
          sort: [{
            required: true,
            message: '请输入数字',
            trigger: 'blur'
          }]
        }
      }
    },
    props: {
      formInfo: {},
      allClassifiy: {}
    },
    watch: {
      formInfo: {
        handler(newval, oldval) {
          this.form = {
            id: newval.classifiyItem ? newval.classifiyItem.id : -1,
            parentId: newval.classifiyItem ? newval.classifiyItem.parentId : '',
            name: newval.classifiyItem ? newval.classifiyItem.name : '',
            sort: newval.classifiyItem ? newval.classifiyItem.sort : 1,
            updatedAt: newval.classifiyItem ? newval.classifiyItem.updatedAt : '',
            hasChildrenCount: newval.classifiyItem.childrenCount > 0,
          }
          this.isShowAtHome = newval.classifiyItem ? newval.classifiyItem.showAtHome : false;
          this.parentClassifiy = newval.parentClassifiy;
        },
        deep: true
      },
      allClassifiy: {
        handler(newval, oldval) {
          this.allClassifiy = newval;
        },
        deep: true
      }
    },
    methods: {
      handleClickShowAtHome() {
        this.isShowAtHome = !this.isShowAtHome;
      },
      onSubmit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            switch (this.formInfo.type) {
              case 'add':
                var addNg = {}
                if (this.form.parentId > 0) {
                  addNg = {
                    name: this.form.name,
                    parentId: this.form.parentId,
                    sort: this.form.sort,
                    showAtHome: this.isShowAtHome,
                  }
                } else {
                  addNg = {
                    name: this.form.name,
                    parentId: null,
                    sort: this.form.sort,
                    showAtHome: this.isShowAtHome,
                  }
                }
                MH0202Api.AddApi(addNg).then(res => {
                  Msg.success(res.data.message)
                  this.$emit('closeForm')
                }).catch(err => {
                  Msg.error('添加失败')
                  this.$emit('closeForm')
                })
                break;
              case 'edit':
                try {
                  this.checkEdit(this.form.id, this.form.parentId)
                } catch (err) {
                  Msg.error(err)
                  this.$emit('closeForm')
                  return false;
                }
                var editClassify = {}
                if (this.form.parentId > 0) {
                  editClassify = {
                    id: this.form.id,
                    name: this.form.name,
                    parentId: this.form.parentId,
                    sort: this.form.sort,
                    showAtHome: this.isShowAtHome,
                    updatedAt: this.form.updatedAt,
                  }
                } else {
                  editClassify = {
                    id: this.form.id,
                    name: this.form.name,
                    sort: this.form.sort,
                    showAtHome: this.isShowAtHome,
                    updatedAt: this.form.updatedAt,
                  }
                }
                MH0202Api.EditorApi(editClassify).then(res => {
                  Msg.success(res.data.message)
                  this.$emit('closeForm')
                }).catch(err => {
                  Msg.error('编辑失败')
                  this.$emit('closeForm')
                })
                break;
              default:
            }
          } else {
            Msg.error('请完善所有信息');
            return false;
          }
        });
      },
      checkEdit(selfId, parentId) {
        if (selfId === parentId) {
          throw new Error('父级分类不能作为自己的子分类，请重新选择。');
        }
        return true;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .submitBt {
    display: flex;
    justify-content: flex-end;
  }

  .button-style {
    padding: 0;
    border: 1px solid #5fb878;
    border-radius: 2px;
    background-color: #fff;
    outline: none;
    cursor: pointer;
  }

  .button-name {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    color: #fff;
    background-color: #5fb878;
    padding: 5px 8px 4px 8px;
  }

  .button-img {
    display: inline-block;
    padding: 5px 8px 5px 4px;
    img {
      height: 16px;
      vertical-align: top;
    }
  }

  .button-click {
    border: 1px solid #d2d2d2;
    .button-name {
      background-color: #d2d2d2;
    }
    img {
      opacity: 0;
    }
  }
</style>
