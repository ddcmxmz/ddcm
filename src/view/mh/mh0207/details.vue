<template>
  <div>
    <!--步骤条`-->
    <el-card class="box-card">
      <el-steps class="mh-admin-center-email-step"
                :active="data.status === 0 ? 1 : data.transfers.length ? data.transfers.length + 2 : 2"
                v-if="data.status === 0" align-center>
        <el-step title="收信" icon="el-icon-message" :description="data.createdAt"></el-step>
        <el-step title="转发" icon="el-icon-edit" v-for="(item,index) in data.transfers"
                 :description="item.createdAt" :key="index"></el-step>
        <el-step title="办理" icon="el-icon-success" :description="data.finishedAt || '未办理'"></el-step>
      </el-steps>
    </el-card>

    <!--个人信息-->
    <div class="box-card detail-panel">
      <h3 class="detail-panel-title">个人信息</h3>
      <div class="name">
        <label>姓名：</label>
        <span>{{data.addresserName}}</span>
      </div>
      <div class="number">
        <label>手机号码：</label>
        <span>{{data.addresserMobile}}</span>
      </div>
      <div class="email">
        <label>Email：</label>
        <span>{{data.addresserEmail}}</span>
      </div>
      <div class="address">
        <label>联系地址：</label>
        <span>{{data.addresserAddress}}</span>
      </div>
    </div>

    <!--信件内容-->
    <div class="box-card detail-panel">
      <h3 class="detail-panel-title">信件内容</h3>
      <div class="handle" style="margin-top: 20px;
    margin-left: 80px;">
        <label>提交到单位：</label>
        <span>{{data.toOrganization}}</span>
      </div>
      <div class="created_time" style="margin-top: 20px;
    margin-left: 97px;">
        <label>提交时间：</label>
        <span>{{data.createdAt}}</span>
      </div>
      <div class="title" style="margin-top: 20px;
    margin-left: 129px;">
        <label>标题：</label>
        <span>{{data.title}}</span>
      </div>
      <div class="content" style="margin-top: 20px;
    margin-left: 129px;">
        <label style="float: left">内容：</label>
        <div style="width: 520px; margin-left: 50px">{{data.content}}
        </div>
      </div>
      <div class="other_files" v-if="data.attachments && data.attachments.length > 0"
           v-for="(item) in data.attachments"
           v-bind:key="item"
           style="margin-top: 20px; margin-left: 129px">
        <label>附件：</label>
        <span>{{item.fileName}} {{item.size}}</span>
      </div>
    </div>

    <!--转发记录-->
    <div class="box-card detail-panel" v-if="data.transfers && data.transfers.length > 0">
      <h3 class="detail-panel-title">转发记录</h3>
      <div v-for="(item) in data.transfers" v-bind:key="item">
        <div class="mh-admin-center-email-send-record">
          <p>{{item.fromOrganization}}
            <span class="user">{{item.userName}}</span>
            转发给 <span class="user">{{item.toOrganization}}</span>
            处理<span class="tip time">{{item.createdAt}}</span>
          </p>
          <p class="tip">{{item.reason}}</p>
        </div>
      </div>
    </div>

    <!--回复表单-->
    <div class="box-card detail-panel" v-if="data.status === 0">
      <h3 class="detail-panel-title">办理回复</h3>
      <el-form :model="replyForm" :rules="replyFormRules" ref="replyForm" label-width="100px"
               :disabled="!data.canHandle"
               class="demo-ruleForm">
        <el-form-item label="是否公开：" prop="isOpen">
          <el-switch v-model="replyForm.isOpen"></el-switch>
        </el-form-item>
        <el-form-item label="回复内容：" prop="handleContent">
          <el-input type="textarea" :autosize="{ minRows: 4}" v-model="replyForm.handleContent"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="replyFormSubmit" :disabled="!data.canHandle">提交办理结果</el-button>
          <el-button @click="sendFormVisible = true" :disabled="!data.canHandle">转发其他单位处理</el-button>
          <!--转发弹框-->
          <el-dialog title="转发其他单位处理" :visible.sync="sendFormVisible">
            <el-form :model="sendForm" ref="sendForm" :rules="sendFormRules" :disabled="!data.canHandle">
              <el-form-item label="转发单位：" prop="toOrganizationId" :label-width="formLabelWidth">
                <el-select v-model="sendForm.toOrganizationId" placeholder="请选择单位">
                  <el-option label="重庆市教委" value="1"></el-option>
                  <el-option label="渝北区教委" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="转发理由：" prop="reason" :label-width="formLabelWidth" style="margin-top: 20px;">
                <el-input type="textarea" :autosize="{ minRows: 2,maxRows:6}" placeholder="转发理由"
                          v-model="sendForm.reason" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="sendFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="SendToOthersOrganization" :disabled="!data.canHandle">确 定</el-button>
            </div>
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>

    <!--办理结果-->
    <div class="box-card detail-panel" v-if="data.status === 1">
      <h3 class="detail-panel-title">办理结果</h3>
      <div class="handle" style="margin-top: 20px;margin-left: 97px;">
        <label>办理单位：</label>
        <span>{{data.handleOrganization}}</span>
      </div>
      <div class="created_time" style="margin-top: 20px;margin-left: 97px;">
        <label>回复时间：</label>
        <span>{{data.finishedAt}}</span>
      </div>
      <div class="title" style="margin-top: 20px;
    margin-left: 97px;">
        <label>回复结果：</label>
        <span>{{data.handleContent}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { Msg } from '../../../tools/message'
  import { MH0207Api } from './api'

  export default {
    name: 'details',
    watch: {
      $route () {
        this.loadData()
      }
    },
    data () {
      return {
        data: {},
        // 回复表单
        replyForm: {
          id: this.$route.id,
          isOpen: false,
          handleContent: ''
        },
        // 回复表单规则
        replyFormRules: {
          handleContent: [
            {required: true, message: '请填写回复内容', trigger: 'blur'}
          ]
        },
        sendFormVisible: false,
        // 转发表单
        sendForm: {
          id: this.$route.id,
          toOrganizationId: '',
          reason: '',
        },
        // 转发表单规则
        sendFormRules: {
          toOrganizationId: [
            {required: true, message: '请选择单位', trigger: 'blur'}
          ],
          reason: [
            {required: true, message: '请填写转发理由', trigger: 'blur'}
          ]
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      // 加载数据
      loadData () {
        const params = {
          id: this.$route.params.id
        }
        // 获取信件详情
        MH0207Api.GetMailMassage(params).then(res => {
          this.data = res.data.data
        }).catch(err => {
          this.$router.back()
        })
      },

      // 提交办理结果
      replyFormSubmit () {
        if (this.validateForm('replyForm')) {
          const params = {
            ...this.replyForm
          }
          MH0207Api.HandleEmail(params).then(res => {
            this.loadData()
            Msg.success('办理成功')
          }).catch(err => {
            Msg.error('提交失败')
          })
        }
      },

      // 转发
      SendToOthersOrganization () {
        if (this.validateForm('sendForm')) {
          const params = {
            ...this.sendForm
          }
          MH0207Api.SendToOthers(params).then(res => {
            Msg.success('转发成功')
            this.$router.push('/mh/mh0207')
          }).catch(err => {
            Msg.error('信件转发失败')
          })
        }
      },
      // 表单验证
      validateForm (formName) {
        this.$refs[formName].validate((valid) => {
          return !!valid
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .name {
    margin-top: 20px;
    margin-left: 80px;
    width: 50%;
    float: left;
  }

  .number {
    margin-top: 20px;
  }

  .detail-panel {
    background: white;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding: 20px;
    margin: 20px 0 0 0;
  }

  .detail-panel-title {
    position: relative;
    top: -32px;
  }

  .email {
    margin-top: 20px;
    margin-left: 80px;
    margin-bottom: 40px;
    width: 50%;
    float: left;
  }

  .address {
    margin-top: 20px;
  }

  textarea.el-textarea__inner {
    height: 194px;
  }

  .mh-admin-center-email {
    &-step {
      .el-step__icon.is-icon {
        border: 2px solid #53c5ed;
        border-radius: 50%;
        padding: 5px;
      }
    }
    &-send-record {
      font-size: 14px;
      p {
        margin: 5px;
      }
      .user {
        color: #3c92d3;
      }
      .tip, .time {
        color: #909090;
      }
      .time {
        margin-left: 15px;
      }
    }
  }
</style>
