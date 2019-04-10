<template>
  <div class="Upload">
    <el-upload
      class="upload-demo"
      :action="URL"
      :headers="{ token }"
      :on-change="handleChange"
      :name="file"
      :before-upload="fileUploadBefore"
      :on-remove="fileRemove"
      :on-success="fileUploadSuccess"
      :on-error="fileUploadError"
      :on-preview="handlePreview"
      :multiple="false"
      :file-list="fileList"
      >
      <el-button size="small" type="primary" :disabled="disabled">{{ label }}</el-button>
      <div slot="tip" class="el-upload__tip">{{ `可以上传${fileType}文件，且不超过${size}M` }}</div>
    </el-upload>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'UploadTest',
  props: {
    action: {
      type: String,
      required: true,
      default: ''
    },

    token: {
      type: String,
      default: Cookies.get('test-token')
    },

    file: {
      type: String,
      default: 'file'
    },

    label: {
      type: String,
      default: '点击上传'
    },

    size: {
      type: [String, Number],
      default: 10
    },

    type: {
      type: Array,
      default: () => []
    },

    disabled: {
      type: Boolean,
      default: true
    },

    params: {
      type: Object,
      default: () => []
    },
    fileListprops:{
      type: Object,
      default: () => []
    }

  },

  data() {
    return {
          fileList: []
    };
  },

  computed: {
    fileType() {
      return this.type.length === 0 ? '任意' : this.type.join(',')
    },

    URL() {
      return this.action.includes('http') ? this.action : `${process.env.BASE_API}/${this.action}`
    }
  },

  methods: {
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
      handlePreview(file) {
        var  strRemoteURL="";
        var strRemotename="";
       if(file.response){
         strRemoteURL=file.response.data.url;
         strRemotename=file.response.data.name;
       }else{
           strRemoteURL=file.url;
           strRemotename=file.name;
       }
        var eleLink = document.createElement('a');
        eleLink.download = strRemotename;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var blob = new Blob([strRemoteURL]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);

      },

    // 文件上传之前
    fileUploadBefore(file) {
      if (this.fileList.length === 1) {
        this.$message({
          type: 'warning',
          message: '只能上传一份文件，请先删除上传的文件重新上传。'
        })
        return false
      }
      let isType = this.type.includes(file.type) ? true : false
      const isLt2M = (file.size / 1024) < (Number(this.size) * 1024)

      if (this.type.length > 0 && !isType) {
        this.$message.error(`只能上传${this.type.join(',')}类型的文件！`)
      } else {
        isType = true
      }
      if (!isLt2M) {
        this.$message.error(`文件大小不能超过${this.size}M!`)
      }
      console.log(isType && isLt2M)
      return isType && isLt2M
    },

    // 文件上传成功
    fileUploadSuccess(response, file, fileList) {
      if (response.errcode === 0) {
        if(typeof(this.fileListprops)=="string"){
          this.fileListprops=JSON.parse(this.fileListprops);
        }
        this.fileListprops.push(response.data);
        this.$message.success('文件上传成功')
        const obj = {}

        this.params.forEach(val => {
          Object.keys(response.data).forEach(key => {
            if (key === val.label) {
              obj[val.value] = response.data[key]
            }
          })
        })
        this.$emit("update:fileListprops",this.fileListprops);
        this.$emit('on-success', obj)

      } else{
        this.$message.error(response.errmsg)
      }
    },

    // 文件被删除
    fileRemove(file, fileList) {
      const url = file.url
      this.fileList.splice(this.fileList.indexOf(url), 1)
       if(typeof(this.fileListprops)=="string"){
          this.fileListprops=JSON.parse(this.fileListprops);
        }
      this.fileListprops.splice(this.fileList.indexOf(url), 1)
    },

    // 文件上传失败
    fileUploadError(err, file, fileList) {
      console.log(err)
      this.$message.error('文件上传失败，请联系管理员。')
    }
  },
  watch: {
    fileListprops (val) {
      try{
        this.fileList = JSON.parse(val)
      }catch(e){
        this.fileList = val
      }
    }
  }
}
</script>
