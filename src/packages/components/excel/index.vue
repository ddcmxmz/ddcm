<template>
  <div ref="excel"></div>
</template>

<script>
  import HotTable from 'handsontable';
  import 'handsontable/dist/handsontable.css'
  import {isFormula, unescapeFormula, toUpperCase} from './math-trig'
  import {Math} from './math'
  import moke from '../../../mock/excel'

  export default {
    data: function () {
      return {
        hot: null,
        data: [],
        columns: [],

        mergeCells: [],
        cell: [],
        rowHeights: [],
        colWidths: [],
        math: []
      };
    },
    mounted() {
      setTimeout(() => {
        // this.data = moke.data;
        // this.columns = moke.columns;
        this.createExcel();
      }, 500)
    },
    methods: {
      createExcel() {
        this.hot = new HotTable(this.$refs['excel'], {
          data: this.data.length ? this.data : null,
          columns: this.columns,
          startRows: 20,
          startCols: 10,
          rowHeaders: true, // 行头 序号
          colHeaders: true, // 列头 A/B/C/D/E
          contextMenu: true,
          manualColumnResize: true, // 编辑宽度
          manualRowResize: true, // 编辑高度
          mergeCells: this.mergeCells,
          afterMergeCells: this.afterMergeCells, // 合并单元格后触发
          cell: this.cell,
          afterSetCellMeta: this.afterSetCellMeta, // 对齐单元格后属性后触发
          rowHeights: this.rowHeights.length ? this.rowHeights : null,
          afterRowResize: this.afterRowResize, // 改变行高之后触发
          colWidths: this.colWidths.length ? this.colWidths : 120,
          afterColumnResize: this.afterColumnResize, // 改变列宽之后触发
          afterSelectionEnd: this.afterSelectionEnd, // 范围选择后执行

          beforeChange: this.beforeChange, // 值改变
          cells: this.rendeRcells,
        })
      },
      /**
       * 值发生变化后执行
       * @param a
       * @param b
       */
      beforeChange(a, b) {
        if (b === 'edit') {
          const data = a[0];
          if (isFormula(data[3])) {
            // 确认是表达式
            data[3] = Math.expression(toUpperCase(unescapeFormula(data[3])), this.hot.getDataAtCell, (a) => {
              this.math.push({index: a, target: data, formula: data[3]})
            });
          } else {
            // 不是公式 那么需要去判断是否关联了某个表达式的值
            const {math} = this;
            for (let k = 0; k < math.length; k++) {
              if (math[k].index[0] === data[0] && math[k].index[1] === data[1]) {
                setTimeout(() => {
                  this.hot.setDataAtCell(math[k].target[0], math[k].target[1],
                    Math.expression(toUpperCase(unescapeFormula(math[k].formula)), this.hot.getDataAtCell))
                })
              }
            }
          }
        }
      },
      /**
       * 合并单元格后触发
       * @param a
       * @param b
       */
      afterMergeCells(a, b) {
        this.mergeCells.push(b)
      },
      /**
       * 属性发生变化时触发
       * @param a
       * @param b
       * @param c
       * @param d
       */
      afterSetCellMeta(a, b, c, d) {
        this.cell.push({row: a, col: b, [c]: d});
      },
      /**
       * 改变行高之后触发
       * @param a
       * @param b
       */
      afterRowResize(a, b) {
        this.rowHeights[a] = b
      },
      /**
       * 改变列宽之后触发
       * @param a
       * @param b
       */
      afterColumnResize(a, b) {
        this.colWidths[a] = b
      },
      /**
       * 范围选择后
       */
      afterSelectionEnd() {
        // console.log(this.hot.getSelected());
      },
      /**
       * 自定义渲染器
       * @param row
       */
      rendeRcells(row) {
        const cellProperties = {};
        if (row <= 2) {
          cellProperties.renderer = this.firstRowRenderer; // uses function directly
        } else {
          cellProperties.renderer = this.negativeValueRenderer; // uses lookup map
        }
        return cellProperties;
      },
      firstRowRenderer(instance, td) {
        HotTable.renderers.TextRenderer.apply(this, arguments);
        td.style.fontWeight = 'bold';
        td.style.background = '#EEE';
      },
      negativeValueRenderer(instance, td) {
        HotTable.renderers.TextRenderer.apply(this, arguments);
        td.style.background = '#fff';
      }
    }
  }
</script>
