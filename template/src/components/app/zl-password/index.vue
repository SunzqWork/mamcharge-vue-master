<template>
  <div class="zl-password" style="width: 300px;">
    <el-input 
      placeholder="请输入密码"
      v-model="model" 
      size="medium" 
      :type="type" 
      class="zl-form-control zl-input-240px"
      @focus="hidePassword"
      @input="handlInput"
      :minlength="4" 
      >
      <!-- :maxlength="50" -->

      <template slot="append">
        <i class="el-icon-view" @click="showPassword"></i>
      </template>
    </el-input>
    <el-button type="text" class="password-status" :style="statusStyle">{{ status }}</el-button>
  </div>
</template>
<script>
import { getSafetyData } from "@/api/safety"

export default {
  name: 'zl-password',
  props: ['value'],
  data() {
    return {
      model: this.value,
      type: 'password',
      status: '',
      statusStyle: {},
      // pwdLength 密码长度
      pawInfo:""
    }
  },
  methods: {
    showPassword() {
      if(this.type == 'text'){
        this.type = 'password'
      }else{
        this.type = 'text'
      }
    },
    // hidePassword() {
      // this.type = 'password'
    // },
    handlInput() {
      console.log(this.model,'this.modelthis.modelthis.model')
      // switch(){
      //   case 0:
                
      //           break;
      //       case 1:
                

      //           if(!password.matches(regex)){
      //               return Rez.error(2,String.format("密码应包含大小写字母及数字"));
      //           }

      //           break;
      //       case 2:
      //           if (password.length() < 8 ){
      //               return Rez.error(1,String.format("密码长度应大于等于%d",8));
      //           }
      //           if(!password.matches(regex)){
      //               return Rez.error(2,String.format("密码应包含大小写字母,数字及特殊字符"));
      //           }
      //           break;

      // }
      if(this.model.length < this.pawInfo.pwdLength){
        this.status = '弱'
        this.statusStyle = { color: '#F4A460' }
      }else{
        if(/(?=.*[0-9])(?=.*[A-Z].*)(?=.*[a-z])(?=.*[^a-zA-Z0-9])/.test(this.model)){
              this.status = '强'
              this.statusStyle = { color: '#00EE76' }
          }else{
            if (/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*)/.test(this.model)){
              this.status = '中'
              this.statusStyle = { color: '#9B30FF' }
            }else{
                this.status = '弱'
                this.statusStyle = { color: '#F4A460' }
            }
          }
      }
      const num = this.checkStrong(this.model)
      // if (num === 0 || num === 1) {
      //   this.status = '弱'
      //   this.statusStyle = { color: '#F4A460' }
      // } else if (num === 2) {
      // } else if (num === 4 || num === 3) {
      //   this.status = '强'
      //   this.statusStyle = { color: '#00EE76' }
      // } else {
      //   this.status = '弱'
      // }
      this.$emit('input', this.model, num)
    },
    checkStrong(value) {
      let modees = 0
      if (value.length < 8) { return modees }
      if (/[0-9]/.test(value)) { modees++ }
      if (/[a-z]/.test(value)) { modees++ }
      if (/[A-Z]/.test(value)) { modees++ }
      if (/\W/.test(value)) { modees++ }
      switch (modees) {
        case 1:
          return 1
        case 2:
          return 2
        case 3:
          return value.length < 12 ? 2 : 3
        case 4:
          return value.length < 12 ? 2 : 4
        break
      }
    }
  },
  mounted(){
    getSafetyData().then( s => {
        this.pawInfo = s.data.records[0]
      })
  }
}
</script>
<style lang="scss">
.zl-password{
  position: relative;
  display: flex;
  justify-content: flex-start;
  input{
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 25px 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .el-icon-view{
    cursor: pointer;
  }
  .show-password{
    position: absolute;
    top: 150px;
    left: 0;
    z-index: 2;
  }
  .password-status{
    margin-left: 10px;
    font-size: 16px;
  }
}
</style>