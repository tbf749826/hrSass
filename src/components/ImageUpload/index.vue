<template>
  <div>
    <el-upload :on-preview="preview" :file-list="fileList" list-type="picture-card" action="#" :limit="1" :class="{ disabled: fileComputed }">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片">
      <img :src="imgUrl" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgUrl: '',
      showDialog: false,
      fileList: [{ url: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.1-wFaNNsH_OCBFvGCfloWgHaJ4&w=216&h=288&c=8&rs=1&qlt=90&o=6&dpr=1.25&pid=3.1&rm=2' }]
    }
  },
  computed: {
    fileComputed() {
      // 设定一个计算属性 判断是否已经上传完了一张
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    }
  }
}
</script>
<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
