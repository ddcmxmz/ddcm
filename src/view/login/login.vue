<template>
  <div class="mh-login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="mh-login-title">系统登录</h3>
      <el-form-item prop="loginStr">
        <el-input
          type="text"
          v-model="ruleForm.loginStr"
          ref="adminput"
          auto-complete="off"
          placeholder="请输入用户名">
          <i slot="prefix" class="icon iconfont icon-my"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="请输入密码"
        >
          <i slot="prefix" class="icon iconfont icon-jiesuo"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="">
        <el-checkbox
          label="记住账号" name="type" v-model="ruleForm.remember"
          style="text-align: left">
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%;"
          type="primary"
          @click.native.prevent="submitForm"
          :loading="loading">登陆
        </el-button>
      </el-form-item>
      <div class="mh-login-footer">财务系统 {{version}} | 重庆奇点新宇科技有限公司™版权所有</div>
    </el-form>
  </div>
</template>

<script>
  import {version} from '../../../package'

  export default {
    name: 'Login',
    components: {},
    /** state 默认信息 */
    data() {
      return {
        loading: false,
        version,
        ruleForm: {
          loginStr: '',
          password: '',
          remember: false
        },
        rules: {
          loginStr: [
            {required: true, message: '请输入登陆账户', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入登陆密码', trigger: 'change'}
          ],
        }
      }
    },
    created() {
      window.addEventListener('keydown', this.Enter);
      this.getUser();
    },
    /** 计算属性 */
    computed: {},
    /** 完成挂载 */
    mounted() {
      this.$refs['adminput'].focus();
    },
    destroyed() {
      window.removeEventListener('keydown', this.Enter)
    },
    /** 方法事件 */
    methods: {
      Enter(e) {
        if (!!this.ruleForm.loginStr && e.which === 13) {
          this.submitForm()
        }
      },
      getUser() {
        this.ruleForm = this.$store.getters.accountPwd
      },
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.$router.push({path: '/'})
            // this.loading = true;
            // this.$store.dispatch('accountLoginSubmit', this.ruleForm).then(() => {
            //   this.loading = false;
            //   this.$router.push({path: '/mh'})
            // }).catch(() => {
            //   this.loading = false
            // })
          } else {
            return false
          }
        })
      },
    },
    /** 监听函数 */
    watch: {
      $route() {
        this.path = this.$route.path.split('/')[2]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mh-login {
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/jiaoShi.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-width: 1000px;
    .el-form-item {
      .el-form-item__content {
        .icon {
          position: absolute;
          left: 8px;
          z-index: 1;
        }
      }
    }
    &-title {
      margin-bottom: 10px;
      text-align: center;
    }

    &-footer {
      font-size: 14px;
      color: #606266;
    }
  }

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    overflow: hidden;
    min-width: 270px;
    .title {
      text-align: center;
      color: #505458;
    }
  }
</style>
