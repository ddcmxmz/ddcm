<template>
  <el-card class="box-card">
    <div class="query-row">
      <el-form :inline="true"
               ref="search"
               :model="search"
               class="demo-form-inline">
        <el-form-item label="" prop="status">
          <el-select v-model="search.status" clearable placeholder="选择状态" style="width: 120px">
            <el-option
              v-for="item in selectStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="to_organization_id">
          <el-select v-model="search.to_organization_id" clearable placeholder="选择提交到单位" style="width: 160px">
            <el-option
              v-for="item in selectOrganization"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="" prop="handle_organization_id">
          <el-select v-model="search.handle_organization_id" clearable placeholder="选择处理单位" style="width: 160px">
            <el-option
              v-for="item in selectOrganization"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="" prop="keyWordAddresser">
          <el-input
            placeholder="提交人姓名 或 手机号码"
            v-model="search.keyWordAddresser"
            style="width: 180px"
            clearable>
          </el-input>
        </el-form-item>

        <el-form-item label="" prop="keyWord">
          <el-input
            placeholder="标题 或 内容"
            v-model="search.keyWord"
            style="width: 235px"
            clearable>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width: 83px" @click="loadData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p style="margin-top: 10px; margin-bottom: 10px">
      共<span style="color: red"> {{totalCount}} </span>条记录，其中
      <span style="color: red"> {{unfinishedCount}} </span>条 未办理
    </p>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :stripe="true">
        <el-table-column
          fixed
          prop="id"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <p v-if="scope.row.status === 0" style="color: red">未办理</p>
            <p v-else style="color: green">已办理</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="to_organization"
          label="提交到单位">
        </el-table-column>
        <el-table-column
          prop="handle_organization"
          label="处理单位">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="open"
          label="是否公开"
          width="110">
          <template slot-scope="scope">
            <p v-if="scope.row.open === null">-</p>
            <p v-else-if="scope.row.open === 1" style="color: blue">公开</p>
            <p v-else style="color: orange">不公开</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="提交时间"
          width="190">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button size="mini" type="text"
                       @click="handleEmail(scope.row.id)"
                       v-if="scope.row.status === 0">办理
            </el-button>
            <el-button size="mini" type="text"
                       @click="handleEmail(scope.row.id)"
                       v-else-if="scope.row.status === 1">查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
  import '../mh0201/index.scss'

  import { MH0207Api } from './api'

  export default {
    data () {
      return {
        search: {
          key: '',
          to_organization_id: '',
          handle_organization_id: '',
          keyWordAddresser: '',
          keyWord: '',
        },
        page: 1,
        pageSize: 20,
        totalCount: 0,
        unfinishedCount: 0,
        tableData: [],
        // 选择器数据
        selectStatus: [
          {
            value: '0',
            label: '未办理'
          },
          {
            value: '1',
            label: '已办理'
          }
        ],
        selectOrganization: [],
      }
    },
    mounted () {
      this.loadData()
      this.getToOrganization()
    },
    methods: {
      loadData () {
        const params = {
          ...this.search
        }
        MH0207Api.GetAllMail(params).then(res => {
          this.page = res.page
          this.pageSize = res.pageSize
          this.totalCount = res.totalCount
          this.unfinishedCount = res.data.unfinishedCount
          this.tableData = res.data.petitionLetter
        }).catch(err => {
          // todo
        })
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.loadData()
      },
      handleCurrentChange (val) {
        this.page = val
        this.loadData()
      },
      // 处理或查看信件
      handleEmail (id) {
        this.$router.push(`/admin/mh0207/${id}`)
      },
      // 提交单位的获取
      getToOrganization () {
        MH0207Api.GetToOrganizationApi().then(res => {
          res.data.data.forEach((e) => {
            this.selectOrganization.push({value: e.id, label: e.name})
          })
        })
      }
    }
  }
</script>

<style scoped>
  .el-table thead {
    color: black;
    font-weight: 500;
  }

  .block {
    text-align: right;
    margin: 30px 0;
  }
</style>
