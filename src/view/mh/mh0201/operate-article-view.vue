<template>
  <el-card class="box-card">
    <el-form
      :model="ArticleForm"
      :rules="rules"
      ref="ArticleForm"
      label-width="100px"
      class="demo-ruleForm"
      enctype="multipart/form-data">
      <el-form-item label="文章分类" prop="classify" style="width:35%">
        <el-select v-model="ArticleForm.classify" placeholder="请选择分类" style="width:80%">
          <el-option
            v-for="item in articleClassifyListData"
            :class="item.className"
            :key="item.id"
            :label="item.name"
            name="classify"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :inline="true" label="文章来源" prop="origin" style="width:35%" class="set">
        <el-input v-model="ArticleForm.origin" style="width:80%"></el-input>
      </el-form-item>
      <el-form-item :inline="true" label="展示设置" class="set">
        <!--重复代码 待优化-->
        <button class="show-button"
                style="cursor:pointer"
                type="button"
                v-on:click="handleClickShowList()"
                v-bind:class="{'show-button-click':isShow}">
          <div class="show-button-name">列表显示</div>
          <div class="show-button-img">
            <img :src="trueP"/>
          </div>
        </button>
        <button class="show-button"
                style="cursor:pointer"
                type="button"
                v-on:click="handleClickBlockTop()"
                v-bind:class="{'show-button-click':isStick}">
          <div class="show-button-name">板块置顶</div>
          <div class="show-button-img">
            <img :src="trueP"/>
          </div>
        </button>
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ArticleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="detail">
        <CompEditor ref="detail_editor" v-model="ArticleForm.detail">
        </CompEditor>
      </el-form-item>
      <!--<el-form-item label="上传附件" prop="upload">-->
        <!--<el-upload-->
          <!--class="upload-demo"-->
          <!--:auto-upload="false"-->
          <!--:on-remove="handleDeleteFile"-->
          <!--:file-list="fileList">-->
          <!--<button class="upload-button" type="button" style="cursor:pointer"><img :src="upload"/>&nbsp;&nbsp;上传</button>-->
        <!--</el-upload>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('ArticleForm')"
                   class="submit-button">{{isAddArticle?'发&nbsp;&nbsp;&nbsp;布':'提&nbsp;&nbsp;&nbsp;交'}}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {MH0201Api} from './api';
  import {MH0202Api} from '../mh0202/api';
  import {Msg} from '../../../tools/message';
  import './operate-article-view.scss';
  import CompEditor from 'pkgs/components/editor';
  import upload from '../../../assets/images/upload.png';
  import trueP from '../../../assets/images/trueP.png';

  export default {
    components: {
      CompEditor
    },
    data() {
      return {
        updatedAt: '',
        isAddArticle: true,
        articleClassifyListData: {},
        isShow: false,
        isStick: true,
        upload: upload,
        trueP: trueP,
        fileListIds: '',
        fileList: [],
        ArticleForm: {
          classify: '',
          origin: '',
          title: '',
          detail: ''
        },
        rules: {
          classify: [
            {required: true, message: '请选择分类', trigger: 'change'}
          ],
          origin: [
            {required: true, message: '请输入文章来源', trigger: 'blur'}
          ],
          title: [{required: true, message: '请输入文章标题', trigger: 'blur'}],
          detail: [{}]
        }
      };
    },
    methods: {
      getArticleClassifyListData: function () {
        MH0202Api.GetListApi()
          .then(res => {
            this.articleClassifyListData = this.handleClassifyListData(res.data);
          })
          .catch(err => {
            Msg.error('网络延迟，请重试');
          });
      },
      handleClassifyListData(data) {
        var listData = data.data;
        listData.sort(this.$options.methods.compare('sort'));
        var newData = [];
        listData.map((v, i) => {
          var item = {name: v.name, id: v.id, className: ''};
          newData.push(item);
          if (v.children != null) {
            v.children.sort(this.$options.methods.compare('sort'));
            v.children.map((value, index) => {
              var childrenItem = {name: '- ' + value.name, id: value.id, className: 'children-item'};
              newData.push(childrenItem);
            });
          }
        });
        return newData;
      },
      compare(property) {
        return function (a, b) {
          return a[property] - b[property];
        };
      },
      handleClickShowList() {
        this.isShow = !this.isShow;
      },
      handleClickBlockTop() {
        this.isStick = !this.isStick;
      },

      handleDeleteFile(file, fileList) {
        var fileId = file.id;
        if (fileId !== null && fileId !== undefined) {
          var fileListIds = this.fileListIds;
          if (fileListIds !== '') {
            this.fileListIds = fileListIds + ',' + fileId;
          } else {
            this.fileListIds = fileListIds + fileId;
          }
        }
        fileList.forEach((v, i) => {
          if (v.uid === file.uid) fileList.splice(i, 1);
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            var articleDetail = this.$refs['detail_editor'].getEditorContent();
            var files = this.fileList;
            var articleId = parseInt(this.$route.params.articleId, 10);
            if (
              (articleDetail === null || articleDetail === '') &&
              files.length === 0
            ) {
              Msg.error('文件和内容不能同时为空，修改后请重新确认');
            } else {
              if (this.isAddArticle) {
                var data = [];
                this.fileList.forEach(file => {
                  data.push(file.raw);
                });
                MH0201Api.ArticleAddSubmitApi(
                  {
                    articleTypeId: this.ArticleForm.classify,
                    source: this.ArticleForm.origin,
                    isShow: !this.isShow,
                    isStick: !this.isStick,
                    title: this.ArticleForm.title,
                    content: articleDetail
                  },
                  data
                )
                  .then(res => {
                    Msg.success(res.data.message);
                    this.$router.push({path: '/mh/mh0201'});
                  })
                  .catch(err => {
                    Msg.error('网络延迟，请重试');
                  });
              } else {
                const data = [];
                var fileList = this.fileList;
                if (fileList.length !== 0) {
                  fileList.map((v, i) => {
                    if (v.id === undefined) data.push(v.raw);
                  });
                }
                MH0201Api.ArticleEditSubmitApi(
                  {
                    id: articleId,
                    articleTypeId: this.ArticleForm.classify,
                    source: this.ArticleForm.origin,
                    isShow: !this.isShow,
                    isStick: !this.isStick,
                    title: this.ArticleForm.title,
                    content: articleDetail,
                    updatedAt: this.updatedAt,
                    deleteFileIds: this.fileListIds
                  },
                  data
                )
                  .then(res => {
                    Msg.success(res.data.message);
                    this.$router.push({path: '/mh/mh0201'});
                  })
                  .catch(err => {
                    Msg.error('网络延迟，请重试');
                  });
              }
            }
          } else {
            Msg.error('提交失败，请确认所有输入是否规范');
            return false;
          }
        });
      },
      fetchData() {
        var articleId = parseInt(this.$route.params.articleId, 10);
        if (articleId !== -1) {
          this.isAddArticle = false;
          MH0201Api.GetArticleEditData({id: articleId})
            .then(res => {
              this.ArticleForm.classify = res.data.data.articleTypeId;
              this.ArticleForm.origin = res.data.data.source;
              this.isShow = !res.data.data.isShow;
              this.isStick = !res.data.data.isStick;
              this.ArticleForm.title = res.data.data.title;
              this.$refs['detail_editor'].setEditorContent(res.data.data.content);
              this.updatedAt = res.data.data.updatedAt;
              if (res.data.data.attachments.length > 0) {
                res.data.data.attachments.map((v, i) => {
                  this.fileList.push({
                    id: v.id,
                    name: v.fileName,
                    fileType: v.fileType,
                    url: v.filePath,
                    status: 'finished'
                  });
                });
              }
            })
            .catch(err => {
              Msg.error('网络延迟，请重试');
            });
        } else {
          this.isAddArticle = true;
          // 重置数据
          if (this.$refs['ArticleForm'] !== undefined) {
            this.$refs['ArticleForm'].resetFields();
            this.$refs['detail_editor'].setEditorContent('');
          }
          this.isShow = false;
          this.isStick = true;
          this.fileList = [];
        }
      }
    },
    created() {
      this.fetchData();
    },
    watch: {
      $route: 'fetchData'
    },
    mounted() {
      this.getArticleClassifyListData();
    }
  };
</script>
