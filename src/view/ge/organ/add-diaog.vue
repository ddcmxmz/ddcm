<template>
  <el-dialog
    :title="diao_title"
    :visible.sync="dialogVisible"
    width="1120px"
    top="5vh"
    :before-close="onCancel">
    <title-card title="基本信息">
      <el-form
        style="width: 80%"
        ref="form1"
        :model="listValue"
        label-width="120px"
        :rules="rules1"
        size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="listValue.name" v-if="flag"></el-input>
              <div v-else>{{listValue.name}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 性别：">
              <el-radio-group v-model="listValue.gender" v-if="flag">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
              <div v-else>{{listValue.gender || '-'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label=" 人员编号：">
              <el-input v-model="listValue.staffNumber" v-if="flag"></el-input>
              <div v-else>{{listValue.staffNumber || '-'}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 民族：">
              <el-input v-model="listValue.nation" v-if="flag"></el-input>
              <div v-else>{{listValue.nation || '-'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label=" 政治面貌：">
              <el-input v-model="listValue.polity" v-if="flag"></el-input>
              <div v-else>{{listValue.polity || '-'}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 学历：">
              <el-input v-model="listValue.education" v-if="flag"></el-input>
              <div v-else>{{listValue.education || '-'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label=" 入党日期：">
              <div class="el-input--small">
                <masked-input v-model="listValue.joinPartyAt" v-if="flag"
                              mask="1111-11-11" placeholder="yyyy - mm - dd"/>
                <div v-else>{{listValue.joinPartyAt || '-'}}</div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 毕业院校：">
              <el-input v-model="listValue.university" v-if="flag"></el-input>
              <div v-else>{{listValue.university || '-'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label=" 出生日期：">
              <div class="el-input--small">
                <masked-input v-model="listValue.birthday" v-if="flag"
                              mask="1111-11-11" placeholder="yyyy - mm - dd"/>
                <div v-else>{{listValue.birthday || '-'}}</div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 身份证号：">
              <el-input v-model="listValue.idNumber" v-if="flag"></el-input>
              <div v-else>{{listValue.idNumber || '-'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="婚姻状况：">
              <el-radio-group v-model="listValue.marryStatus" v-if="flag">
                <el-radio :label="0">未婚</el-radio>
                <el-radio :label="1">已婚</el-radio>
              </el-radio-group>
              <div v-else>{{!!listValue.marryStatus ? '已婚' : '未婚'}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="账号状态：">
              <el-switch
                v-if="flag"
                v-model="listValue.status"></el-switch>
              <span v-if="flag">{{listValue.status ? '启用' : '禁用'}}</span>
              <div v-else>{{listValue.status ? '启用' : '禁用'}}</div>
            </el-form-item>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="排序：">
              <el-input-number v-model="listValue.sort" v-if="flag"></el-input-number>
              <div v-else>{{listValue.sort || '-'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="oragn_addd_up">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :disabled="!flag"
          :on-success="handleAvatarSuccess">
          <img v-if="listValue.avatar" :src="listValue.avatar" class="avatar">
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>
        <br>
        <span>上传头像</span>
      </div>
    </title-card>
    <br>
    <br>
    <title-card title="职位信息">
      <el-form
        style="width: 85%"
        ref="form2"
        :rules="rules2"
        :model="listValue"
        label-width="120px"
        size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属单位：" prop="parid">
              <div v-if="flag">
                <el-popover
                  ref="popover4"
                  width="250"
                  trigger="click">
                  <el-input
                    v-model="filterText"
                    style="width: 250px"
                    clearable
                    placeholder="输入关键字进行过滤">
                  </el-input>
                  <comp-tree
                    ref="tree2"
                    :data="treeData"
                    @handleNodeClick="handleNodeClick">
                  </comp-tree>
                </el-popover>
                <el-input
                  v-model="parent"
                  style="width: 250px"
                  v-popover:popover4
                  clearable
                  placeholder="所属单位">
                </el-input>
              </div>
              <div v-else>{{listValue.parentId}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 在职状态：">
              <el-switch
                v-model="listValue.workType" v-if="flag"></el-switch>
              <span v-if="flag">{{listValue.workType ? '在职' : '离职'}}</span>
              <div v-else>{{listValue.workType ? '在职' : '离职'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label=" 职位：">
              <el-select
                v-model="listValue.positions"
                clearable
                v-if="flag"
                multiple
                placeholder="请选择职位">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <div v-else>{{listValue.positions}}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </title-card>
    <br>
    <br>
    <title-card title="联系方式">
      <el-form
        style="width: 85%"
        ref="form3"
        :model="listValue"
        label-width="120px"
        :rules="rules3"
        size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="家庭住址：">
              <el-input v-model="listValue.address" v-if="flag"></el-input>
              <div v-else>{{listValue.address || '-'}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 邮编：">
              <div class="el-input--small">
                <masked-input v-model="listValue.postCode" v-if="flag"
                              mask="111111" placeholder="请输入邮编"/>
                <div v-else>{{listValue.postCode || '-'}}</div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label=" 办公位置：">
              <el-input v-model="listValue.officeLocation" v-if="flag"></el-input>
              <div v-else>{{listValue.officeLocation || '-'}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 住宅电话：">
              <el-input v-model="listValue.homeTel" v-if="flag"></el-input>
              <div v-else>{{listValue.homeTel || '-'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label=" 办公室编号：">
              <el-input v-model="listValue.roomNo" v-if="flag"></el-input>
              <div v-else>{{listValue.roomNo || '-'}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 手机号码：" prop="phone">
              <div class="el-input--small">
                <masked-input v-model="listValue.phone" v-if="flag"
                              mask="111-1111-1111" placeholder="--- ---- ----"></masked-input>
                <div v-else>{{listValue.phone}}</div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label=" 办公电话：">
              <el-input v-model="listValue.officeTel" style="width: 200px" v-if="flag"></el-input>
              <el-input v-model="listValue.fjh" style="width: 80px" placeholder="分机号" v-if="flag"></el-input>
              <div v-else>{{listValue.officeTel || '-'}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" QQ：">
              <el-input v-model="listValue.qq" v-if="flag"></el-input>
              <div v-else>{{listValue.qq || '-'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label=" Email：">
              <el-input v-model="listValue.email" v-if="flag"></el-input>
              <div v-else>{{listValue.email || '-'}}</div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label=" 其他联系方式：">
              <el-input v-model="listValue.otherContact" v-if="flag"></el-input>
              <div v-else>{{listValue.otherContact || '-'}}</div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </title-card>
    <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel" v-if="flag">取 消</el-button>
        <el-button type="primary" @click="onOK" v-if="flag">确 定</el-button>
        <el-button @click="bigditor" v-else>编辑</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import TitleCard from '../../../packages/ui/title-card'
  import ViewCont from '../../../packages/components/view-cont'
  import MaskedInput from 'singularity-masked-input'
  import CompTree from '../../../packages/components/tree'

  export default {
    components: {
      TitleCard,
      ViewCont,
      MaskedInput,
      CompTree
    },
    data() {
      return {
        rules1: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
        },
        rules3: {
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
          ]
        },
        rules2: {},
        filterText: ''
      }
    },
    props: {
      parent: {
        type: String,
        default() {
          return ''
        }
      },
      dialogVisible: {
        type: Boolean,
        default() {
          return false
        }
      },
      flag: {
        type: Boolean,
        default() {
          return false
        }
      },
      diao_title: {
        type: String,
        default: ''
      },
      listValue: {
        type: Object,
        default() {
          return {}
        }
      },
      treeData: {
        type: Array,
        default() {
          return []
        }
      },
      options: {
        type: Array,
        default() {
          return []
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.$refs['tree'].filter(val)
      }
    },
    methods: {
      openDiago() {
        this.$emit('openDiago')
      },
      onCancel() {
        this.$emit('onCancel')
      },
      bigditor() {
        this.$emit('bigditor')
      },
      onOK() {
        let f1 = false
        this.$refs['form1'].validate(valid => {
          f1 = valid
        })
        let f2 = false
        this.$refs['form3'].validate(valid => {
          f2 = valid
        })
        if (f2 && f1) {
          this.$emit('onOK')
          this.$emit('parentid', null)
          this.filterText = ''
        }
      },
      handleAvatarSuccess(a, file) {
        this.$emit('handleAvatarSuccess', URL.createObjectURL(file.raw))
      },
      handleNodeClick(val) {
        this.$emit('parentid', val.name)
        this.$emit('formeTree', val)
      }
    }
  }
</script>
<style scoped lang="scss">
  .avatar-uploader {
    width: 128px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }

  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }

  .oragn_addd_up {
    display: inline-block;
    position: absolute;
    top: 40px;
    right: 40px;
    text-align: center;
  }
</style>
