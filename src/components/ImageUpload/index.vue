<template>
  <div>
    <el-upload
      :on-preview="preview"
      :file-list="fileList"
      list-type="picture-card"
      action="#"
      :limit="1"
      :class="{ disabled: fileComputed }"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片">
      <img :src="imgUrl" alt="" style="width: 100%" />
    </el-dialog>
    <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDZ4KL6brrb5JI2ScWCdnhLjqjOq2ye4D6', //身份识别id
  SecretKey: 'g7LJ1TeZEdmhMlu3xb092f291e3E8mAK' //身份密钥
})
export default {
  data() {
    return {
      imgUrl: '',
      showDialog: false,
      fileList: [],
      currentFileUid: null,
      percent: 0,
      showPercent: false
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
    },
    handleRemove(file, fileList) {
      // 将原来的文件过滤排除掉，返回的新数组赋值给fileList
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
    },
    changeFile(file, fileList) {
      console.log(file)
      this.fileList = fileList.map((item) => item)
    },
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some((item) => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      return true
    },
    upload(params) {
      console.log(params.file)
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            Bucket: 'image-1313814665', // 存储桶
            Region: 'ap-nanjing', // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD' // 上传的模式类型 直接默认 标准模式即可
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
          },
          (err, data) => {
            // data返回数据之后 应该如何处理
            console.log(err || data)
            console.log(this.fileList)
            if (!err && data.statusCode === 200) {
              this.fileList = this.fileList.map((item) => {
                if (item.uid === this.currentFileUid) {
                  console.log(this.currentFileUid)
                  return { url: 'http://' + data.Location, upload: true }
                }
                return item
              })
              setTimeout(() => {
                this.showPercent = false
                this.percent = 0
              }, 2000)
            }
          }
        )
      }
    }
  }
}
</script>
<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
