<template>
  <div class="set_organ_body">
    <div class="bg-purple">
      <div class="form_title">{{model.modelName}} / {{model.modelEnglishName}}</div>
      <div
        v-for="element in modelItem" :key="element.id"
        class="dragg_item"
        draggable='true'
        @dragenter="dragenter"
        @dragstart='drag'>
        {{element.cfModelDataType.descName}}
      </div>
    </div>
    <div class="bg-purple-light">
      <div>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
      <div>
        <div
          @dragenter="ondragover"
        >
          <div ref="excel"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HotTable from 'handsontable';
  import 'handsontable/dist/handsontable.css'
  import {Loading} from 'element-ui';
  import draggable from 'vuedraggable'
  import {Table} from '../api'

  export default {
    components: {
      draggable
    },
    mounted() {
      this.createExcel();
    },
    data() {
      return {
        data: {}, // 保存模板数据
        model: {}, // 保存表单模型
        modelItem: [], // 保存表单项

        hot: null,
        columns: [],
        mergeCells: [],
        cell: [],
        rowHeights: [],
        colWidths: [],
        math: []
      }
    },
    created() {
      const loading = Loading.service({
        lock: true,
        text: '加载中。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const prm = this.$route.params;
      Table.CFDynamicFormShowDataById({id: prm.id}).then(res => {
        const d = res.data.data;
        this.data = d;
        Table.CFModelShowTableById({id: d.modelId}).then(res => {
          this.model = res.data.data;
          Table.CFModelItemShowAllTableItemByModelId({modelId: res.data.data.id}).then(res => {
            this.modelItem = res.data.data;
            loading.close();
          }).catch(e => {
            loading.close();
          })
        }).catch(e => {
          loading.close();
        })
      }).catch(e => {
        loading.close();
      })
    },
    methods: {
      createExcel() {
        this.hot = new HotTable(this.$refs['excel'], {
          startRows: 10,
          startCols: 10,
          rowHeights: 35,
          colWidths: 120,
          rowHeaders: true, // 行头 序号
          colHeaders: true, // 列头 A/B/C/D/E
          contextMenu: true,
          manualColumnResize: true, // 编辑宽度
          manualRowResize: true, // 编辑高度
          mergeCells: this.mergeCells,
          cell: true,
        })
      },
      drag(e) {
        // todo
      },
      dragenter(e) {
        console.log(e);
      },
      ondragover(e) {
        console.log(e.target);
      },
      submit() {
        // todo 赋值你的模板数据
        Table.CFDynamicFormAddData(this.data).then(res => {
          this.$router.push(`/cf/design`)
        }).cache(e => {
          // todo 错误处理
        })
      }
    }
  }
</script>
<style scoped lang="scss">
  .set_organ_body {
    min-height: calc(100vh - 115px);
    display: flex;
  }

  .bg-purple {
    border-right: 1px solid #ebeef5;
    min-width: 180px;
    padding: 10px 0;
  }

  .bg-purple-light {
    padding: 25px 15px;
    width: calc(100% - 270px);
  }

  .form_title {
    padding: 10px;
  }

  .dragg_item {
    /*box-shadow: 1px 1px 1px #CCCCCC;*/
    /*border-sha: 1px solid #CCCCCC;*/
    padding: 5px 0 5px 10px;
    background-color: #ebeef5;
    box-sizing: border-box;
  }
</style>
