<template>
  <div class="zl-password" style="width: 300px;">
    <el-input 
      placeholder="请输入密码"
      v-model="model" 
      size="medium" 
      :type="type" 
      @focus="hidePassword"
      @input="handlInput" 
      :maxlength="16">
      <template slot="append">
        <i class="el-icon-view" @click="showPassword"></i>
      </template>
    </el-input>
    <el-button type="text" class="password-status" :style="statusStyle">{{ status }}</el-button>
  </div>
</template>
<script>
export default {
  name: 'zl-password',
  props: ['value'],
  data() {
    return {
      model: this.value,
      type: 'password',
      status: '',
      statusStyle: {}
    }
  },
  methods: {
    showPassword() {
      this.type = 'text'
    },
    hidePassword() {
      this.type = 'password'
    },
    handlInput() {
      const num = this.checkStrong(this.model)
      if (num === 0 || num === 1 || num === 2) {
        this.status = '弱'
        this.statusStyle = { color: '#F4A460' }
      } else if (num === 3) {
        this.status = '中'
        this.statusStyle = { color: '#9B30FF' }
      } else if (num === 4) {
        this.status = '强'
        this.statusStyle = { color: '#00EE76' }
      } else {
        this.status = '弱'
      }
      this.$emit('input', this.model)
    },
    checkStrong(value) {
      let modees = 0
      if (value.length < 6) { return modees }
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
          return 3
        case 4:
          return value.length < 12 ? 3 : 4
        break
      }
    }
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