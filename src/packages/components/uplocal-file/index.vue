<template>
  <el-upload
    class="mh_upload_file"
    action=""
    :on-remove="handleRemove"
    :on-change="change"
    :file-list="fileList"
    :auto-upload="false">
    <el-button slot="trigger" size="mini" type="primary">
      <i class="el-icon-upload el-icon--right"></i>
      上传
    </el-button>
    <span slot="tip" class="el-upload__tip">{{this.label || '只能上传图片/文件，且不超过5M'}}</span>
  </el-upload>
</template>

<script>

  export default {
    name: 'sc-upload',
    data() {
      return {
        fileList: []
      };
    },
    props: {
      msg: null,
      label: null
    },
    methods: {
      submitUpload() {
        return new Promise((resolve, reject) => {
          let flag = false;
          this.fileList.forEach(file => {
            const isJPG = ['image/jpeg', 'image/png', 'application/zip']
              .indexOf(file.raw.type) >= 0 || /\.rar$/.test(file.raw.name);
            const isLt2M = file.size / 1024 / 1024 / 1024 / 1024 / 1024 < 5;
            if (!isLt2M || !isJPG) {
              this.$message.error(this.msg || '只能上传图片/文件，且不超过5M!');
              flag = true
            }
          });
          if (!flag) {
            const data = [];
            this.fileList.forEach(file => {
              data.push(file.raw)
            });
            resolve(data)
          } else {
            reject(flag)
          }
        });
      },
      resetUpload() {
        this.fileList = [];
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
      },
      change(file, fileList) {
        this.fileList = fileList
      }
    }
  }
</script>
<style lang="scss" scoped>
  .mh_upload_file {
    button {
      margin-right: 15px;
    }
    span {
      font-size: 14px;
      text-indent: 15px;
    }
  }
</style>
