<template>
  <div v-loading="loading" >
    <el-card v-for="(item,index) in carousels" :key="index" class="box-card" style="margin:10px 0 10px 0;height: 35%; width: 1150px">
      <div>
        <el-button style="margin-left: 97%; padding:5px" type="danger" icon="el-icon-circle-close" plain
                   @click="deleteCard(item.id)"></el-button>
      </div>

      <div class="mh-admin-carousel-item-img">
        <img :src="`//${item.imagePath}`" :onerror="unsetImg">
        <p style="text-align: center">{{item.title}}</p>
      </div>

      <div style="display: inline-block;margin-left:10%;vertical-align: middle;">
        <el-form :label-position="labelPosition" :ref="`carousel-${item.id}`" :model="item" label-width="100px"
                     :rules="rules">

          <el-form-item label="显示标题:" prop="title">
            <el-input size="40px" v-model="item.title" ></el-input>
          </el-form-item>

          <el-form-item label="链接:" prop="link">
            <el-input v-model="item.link" ></el-input>
          </el-form-item>
          <!--@blur="submitForm(item.id)"-->
          <el-form-item label="排序:" prop="sort">
            <el-input v-model="item.sort" ></el-input>
          </el-form-item>
          <comp-upload :ref="`imgUpload-${item.id}`" :limit="1"></comp-upload>

        </el-form>
      </div>
      <div style="display: inline-block;margin-left:10%;vertical-align: middle;">
        <el-button type="primary"  @click="submitForm(item.id)">确定</el-button>
      </div>

    </el-card>
    <el-button type="primary" icon="el-icon-plus" @click="addCard">新增</el-button>

  </div>

</template>

<script>
  import {CarouselApi} from './api';
  import {Msg} from '../../../tools/message';
  import CompUpload from '../../../packages/components/uplocal-file';
  import unsetImg from '../../../assets/images/unset.png';
  import ElButton from '../../../../node_modules/element-ui/packages/button/src/button.vue';

  export default {
    components: {
      ElButton,
      CompUpload,
    },
    data() {
      return {
        carousels: [],
        unsetImg: 'this.src="' + unsetImg + '"',
        loading: false,
        labelPosition: 'top',
        rules: {
          title: [{
            required: false,
            message: '请输入标题',
//            trigger: 'blur'
          }],
          link: [{
            required: false,
            message: '请输入链接',
//            trigger: 'blur'
          }],
          sort: [{
            required: false,
            message: '请输入排序',
//            trigger: 'blur'
          }],
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.loading = true;
        CarouselApi.GetListApi().then(res => {
          this.carousels = res.data.data;
          this.loading = false;
        }).catch(err => {
          Msg.error('出错了');
          this.loading = false;
        })
      },
      submitForm(id) {
        this.$refs[`imgUpload-${id}`][0].submitUpload().then(fileList => {
          this.$refs[`carousel-${id}`][0].validate(valid => {
            if (valid) {
              const params = {
                ...this.$refs[`carousel-${id}`][0].model
              };
              CarouselApi.EditorApi(params, fileList).then(res => {
                Msg.success(res.data.message);
                this.loadData();
              }).catch(err => {
                Msg.error('更新失败')
              })
            } else {
              return false;
            }
          })
        })
      },
      // 新增
      addCard() {
        CarouselApi.AddApi().then(res => {
          this.carousels.push({id: res.data.data.id});
        }).catch(err => {
          Msg.error('新增失败')
        })
      },
      // 删除
      deleteCard(id) {
        this.$confirm('确定删除吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'danger'
        }).then(() => {
          CarouselApi.DeleteApi({id: id}).then(res => {
            Msg.success('删除成功');
            this.loadData();
          })
        }).catch((err) => {
          Msg.info('已取消')
        });
      }
    }
  }

</script>

<style scoped lang="scss">
  .mh-admin-carousel-item-img {
    display: inline-block;
    width: 455px;
    height: 303px;
    vertical-align: middle;
    img {
      width: 450px;
      height: 300px;
    }
  }
</style>
