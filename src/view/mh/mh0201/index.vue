<template>
  <el-card class="box-card">
    <!--查询行-->
    <div class="query-row">
      <el-form :inline="true"
               ref="queryForm"
               :model="queryForm"
               class="demo-form-inline">
        <el-form-item label="" prop="classify">
          <el-select v-model="queryForm.classify" placeholder="请选择分类">
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
        <el-form-item label="" prop="key_word">
          <el-input v-model="queryForm.key_word" placeholder="标题来源作者对应关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuerySubmit('queryForm')">
            查&nbsp;&nbsp;&nbsp;询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--间隔行-->
    <div class="center-row">
      <div class="data-num">
        <div style="fontSize:14px">
          共<span v-bind:style="{color:'red'}">{{dataNum}}</span>条记录
        </div>
      </div>
      <router-link to="/admin/mh0201/-1">
        <button style="cursor:pointer"><img class="add" :src="add">&nbsp;&nbsp;发布新文章</button>
      </router-link>
    </div>
    <!--datatable部分-->
    <div class="bottom-row">
        <el-table :data="tableData"
            :loading="loading"
            border
            :header-row-style="articleHeaderRowStyle"
            :header-cell-style="articleHeaderCellStyle"
            :row-class-name="articleTableRowClassName"
            style="width: 100%"
            >
        <el-table-column fixed align="center" prop="id" label="ID" width="50">
        </el-table-column>
        <el-table-column align="center" prop="classify" label="分类" width="100">
        </el-table-column>
        <el-table-column prop="title" label="标题">
          <template slot-scope="scope">
            <a style="cursor:pointer" class="title-url" @click="openArticleDetailPage(scope.row.id)">
              {{scope.row.title}}
            </a>
            <span v-if="scope.row.isStick" style="color:#c30">[置顶]</span>
          </template>
        </el-table-column>
        <el-table-column prop="origin" label="来源" width="120">
        </el-table-column>
        <el-table-column prop="author" label="作者" width="100">
        </el-table-column>
        <el-table-column prop="isShow" label="是否显示" align="center" width="80">
          <template slot-scope="scope">
            <ShowImg :show="scope.row.isShow"></ShowImg>
          </template>
        </el-table-column>
        <el-table-column align="right" prop="readNum" label="阅读统计" width="100">
        </el-table-column>
        <el-table-column align="center" prop="date" label="发布时间" width="180">
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <a class="operate-button operate-button-edit" @click="handleArticleEdit(scope.row.id)">
              <i class="el-icon-edit-outline"></i>
            </a>
            <a class="operate-button operate-button-delete" @click="handleArticleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>
            </a>
          </template>
        </el-table-column>
      </el-table>
      <div style="marginTop:30px"></div>
      <div style="textAlign: right">
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[15, 30, 45, 60]"
        :page-size="15"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataNum">
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import { MH0201Api } from './api';
import { MH0202Api } from '../mh0202/api';
import { Msg } from '../../../tools/message';
import './index.scss';
import ShowImg from './is-show-img';
import add from '../../../assets/images/add.png';

export default {
  name: 'article-manage',
  components: {
    ShowImg
  },
  data() {
    return {
      loading: false,
      articleClassifyListData: {},
      classifyId: 0,
      queryForm: {
        classify: '',
        key_word: ''
      },
      dropdownMenuData: [],
      articleHeaderRowStyle: {
        color: 'black'
      },
      articleHeaderCellStyle: {
        backgroundColor: '#d7d7d7'
      },
      page: 1,
      page_size: 15,
      article_type_id: null,
      key_word: '',
      add: add,
      currentPage: 1,
      dataNum: 0,
      tableData: []
    };
  },
  methods: {
    getArticleClassifyListData: function() {
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
      var headItem = { name: '请选择分类', id: -1 };
      newData.push(headItem);
      listData.map((v, i) => {
        var item = { name: v.name, id: v.id, className: '' };
        newData.push(item);
        if (v.children != null) {
          v.children.sort(this.$options.methods.compare('sort'));
          v.children.map((value, index) => {
            var childrenItem = {
              name: '- ' + value.name,
              id: value.id,
              className: 'children-item'
            };
            newData.push(childrenItem);
          });
        }
      });
      return newData;
    },
    compare(property) {
      return function(a, b) {
        return a[property] - b[property];
      };
    },
    getArticleListData: function() {
      this.loading = true;
      MH0201Api.GetArticleListApi({
        page: this.page,
        pageSize: this.page_size,
        articleTypeId: this.article_type_id,
        keyWord: this.key_word
      })
        .then(res => {
          this.loading = false;
          this.tableData = this.handleGetDataToTable(res.data.data);
          this.dataNum = res.data.totalCount;
        })
        .catch(err => {
          Msg.error('网络延迟，请重试');
        });
    },
    handleGetDataToTable(data) {
      var tableData = [];
      data.map((v, i) => {
        tableData.push({
          id: v.id,
          classify: v.articleTypeName,
          title: v.title,
          origin: v.source,
          author: v.author,
          isShow: v.isShow,
          isStick: v.isStick,
          readNum: v.viewCount,
          date: v.createdAt
        });
      });
      return tableData;
    },
    handleQuerySubmit(formName) {
      this.$refs[formName].validate(valid => {
        var classifyId = this.queryForm.classify;
        var flag = null;
        if (classifyId === -1) {
          classifyId = flag;
        }
        if (valid) {
          this.key_word = this.queryForm.key_word;
          this.article_type_id = classifyId;
          this.getArticleListData();
        } else {
          Msg.error('提交失败，请确认所有输入是否规范');
          return false;
        }
      });
    },
    openArticleDetailPage(id) {
      window.open(window.location.origin + '#/mh0103/' + id);
    },
    articleTableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'change-color-row';
      }
    },
    handleSizeChange(val) {
      this.page_size = val;
      this.getArticleListData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page = val;
      this.getArticleListData();
    },
    handleArticleDelete(index, row) {
      this.$confirm('确定删除吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      })
        .then(() => {
          MH0201Api.DeleteArticleApi({ id: row.id })
            .then(res => {
              Msg.success(res.data.message);
              this.getArticleListData();
            })
            .catch(err => {
              Msg.error('网络延迟，请重试');
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleArticleEdit(id) {
      this.$router.push({ path: '/mh/mh0201/' + id });
    }
  },

  mounted() {
    this.getArticleListData();
    this.getArticleClassifyListData();
  }
};
</script>
