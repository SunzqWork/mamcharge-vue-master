<template>
  <div id="zl-textarea">
    <div class="textarea-box">
      <div class="textarea-title">
      <p>每一行输入手机号与备注，用英文逗号分隔，备注非必填</p>
      <p>举例: 13444444444,张三<br>13555555555,</p>
    </div>
    <el-scrollbar wrapClass="scrollbar-wrapper" class="textarea-content">
      <textarea v-model="value" class="textarea-value" @keyup.enter="validateTextarea(value)" @blur="validateTextarea(value)"></textarea>
    </el-scrollbar>
    </div>
    <p v-show="msgFlag" class="error">{{ msg }}</p>
  </div>
</template>
<script>
export default {
  name: 'zl-textarea',
  data() {
    return {
      value: '',
      msgFlag: false,
      msg: '输入的格式不规范'
    }
  },
  methods: {
    validateTextarea(value) {
      this.msgFlag = false
      const valueTrim = value.trim()
      const phoneReg = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/
      let validindex = 0
      if (valueTrim === '') {
        this.msg = '请输入内容'
        this.msgFlag = true
      } else {
        let data = valueTrim.split(/\s*\n/)
        data = data.filter(item => {
          return item !== ''
        })
        data.forEach(item => {
          if (item.indexOf(',') < 0) {
            this.msg = '输入的格式不规范'
            this.msgFlag = true
          } else {
            const phone = item.split(',')[0]
            if (!phoneReg.test(phone)) {
              this.msg = '输入的格式不规范'
              this.msgFlag = true
            } else {
              validindex = validindex + 1
            }
          }
        })
        if (validindex === data.length && this.msgFlag === false) {
          this.$emit('textAreaData', data.join('\n'))
          this.msgFlag = false
        } else {
          this.$emit('textAreaData', 'false')
          this.msgFlag = true
        }
      }
    }
  }
}
</script>
<style lang="scss">
#zl-textarea{
  margin-bottom: 15px;
  position: relative;
  .textarea-box{
    width: 320px;
    height: 400px;
    background: #FFFFFF;
    border: 1px solid #DCDCDC;
    border-radius: 4px;
  }
  .textarea-title{
    height: 120px;
    font-size: 14px;
    color: #999999;
    padding: 20px;
    border-bottom: 1px solid #eeeeee;
  }
  .textarea-content{
    width: 100%;
    height: 200px;
  }
  .textarea-value{
    font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
    width: 100%;
    height: 9999px;
    outline: none;
    border: none;
    font-size: 14px;
    color: #999999;
    padding-left: 20px;
  }
  .error{
    font-size: 14px;
    color: #E6A23C !important;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>


