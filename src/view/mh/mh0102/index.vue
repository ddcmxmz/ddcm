<template>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item
      v-for="item in articleClassifyListData"
      :key="item.id" :label="item.name"
      :value="item.id" :command="item.name.substring(1)">{{item.name}}
    </el-dropdown-item>
  </el-dropdown-menu>
</template>
<script>
  import { Mh0102Api } from './api'
  import { Msg } from '../../../tools/message'

  export default {
    data () {
      return {
        articleClassifyListData: []
      }
    },

    methods: {
      getArticleClassifyListData: function () {
        Mh0102Api.GetArticleClassifyListApi().then(res => {
          this.articleClassifyListData = this.handleGetDataToList(res.data.data)
        }).catch(err => {
          Msg.error('发生了一些错误..')
        })
      }
    },

    handleGetDataToTable (data) {
      data.sort(this.$options.methods.compare('sort'))
      var newData = []
      data.map((v, i) => {
        var item = {name: v.name, id: v.id}
        newData.push(item)
        if (v.children != null) {
          v.children.sort(this.$options.methods.compare('sort'))
          v.children.map((value, index) => {
            var childrenItem = {name: '-' + value.name, id: value.id}
            newData.push(childrenItem)
          })
        }
      })
      return newData
    },

    compare (property) {
      return function (a, b) {
        return a[property] - b[property]
      }
    },

    mounted () {
      this.getArticleClassifyListData()
    }
  }
</script>
<style lang="scss" scoped>

</style>
