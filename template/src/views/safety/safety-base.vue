<template>
  <div id="safetyBase">
    <el-form ref="addForm" :model="addForm" label-width="200px" label-position="left">
      <el-collapse :value="collapseArr">
        <el-collapse-item name="密码策略">
          <template slot="title">
            密码策略
          </template>
          <el-row>
            <el-col :span="6" class="width-450px">
              <el-form-item label="密码最小长度" prop="pwdLength">
                <el-input class="zl-form-control zl-input-240px" v-model="addForm.pwdLength" @change="rules"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="width-450px">
              <el-form-item label="密码复杂程度" prop="pwdComplexity">
                <el-select class="zl-form-control zl-input-240px" @change="changs" placeholder="请选择" v-model="addForm.pwdComplexity">
                  <el-option label="不限制" :value="0"></el-option>
                  <el-option label="字母大小写、数字组合" :value="1"></el-option>
                  <el-option label="字母大小写、数字、特殊字符组合" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" class="width-450px">
              <el-form-item label="密码变更提醒" prop="pwdRemind">
                <el-switch
                  v-model="addForm.pwdRemind"
                  :active-color="color"
                  >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="width-450px">
              <el-form-item label="强制修改密码" prop="pwdChange">
                <el-switch
                  v-model="addForm.pwdChange"
                  :active-color="color"
                  >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" class="width-450px">
              <el-form-item label="首次登录必须修改密码" prop="pwdFirstModify">
                <el-switch
                  v-model="addForm.pwdFirstModify"
                  :active-color="color"
                  >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="width-450px">
              <el-form-item label="密码锁定" prop="pwdLock">
                <el-switch
                  v-model="addForm.pwdLock"
                  :active-color="color"
                  >
                </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
        <!-- <el-collapse-item name="登录设置">
          <template slot="title">
            登录设置
          </template>

          <el-row>
            <el-col :span="6" class="width-450px">
              <el-form-item label="允许同一用户重复登录" prop="repeatLogin">
                <el-switch
                  v-model="addForm.repeatLogin"
                  :active-color="color"
                  >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="width-450px">
              <el-form-item label="禁止在网段外登录" prop="externalAccess">
                <el-switch
                  v-model="addForm.externalAccess"
                  :active-color="color"
                  >
                </el-switch>
                <span style="padding-left: 20px; color: red">启用此功能必须先设置网段策略</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6" class="width-450px">
              <el-form-item label="验证码" prop="validateCode">
                <el-switch
                  v-model="addForm.validateCode"
                  :active-color="color"
                  >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6" class="width-450px"></el-col>
          </el-row>

        </el-collapse-item> -->
        <el-collapse-item name="移动电话隐私设置">
          <template slot="title">
            移动电话隐私设置
          </template>

          <el-row>
            <el-col :span="6" class="width-450px">
              <el-form-item label="是否允许个人设置" prop="personalSettings">
                <el-switch
                  v-model="addForm.personalSettings"
                  :active-color="color"
                  >
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="width: 650px;">
              <el-form-item label="默认设置" prop="defaultSettings">
                <el-select class="zl-form-control zl-input-240px" v-model="addForm.defaultSettings">
                  <el-option label="公开" :value="0"></el-option>
                  <el-option label="对所有人保密" :value="1"></el-option>
                  <el-option label="对低于自身安全级别者保密" :value="2"></el-option>
                </el-select>
                <el-tag>同步默认方式到所有人</el-tag>
              </el-form-item>
            </el-col>
          </el-row>

        </el-collapse-item>
        <el-collapse-item name="其他设置">
          <template slot="title">
            其他设置
          </template>

          <el-row>
            <el-col :span="6" class="width-450px">
              <el-form-item label="外部用户接口校验码" prop="outUserValidateCode">
                <el-input class="zl-form-control zl-input-240px" v-model="addForm.outUserValidateCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>
<script>
import { getSafetyData } from '@/api/safety'
export default {
  name: 'safetyBase',
  data() {
    return {
      collapseArr: ['密码策略', '登录设置', '移动电话隐私设置', '其他设置'],
      color: '#299ee4',
      addForm: {
        id: '',
        pwdLength: '',
        pwdComplexity: 0,
        pwdRemind: false,
        pwdChange: false,
        pwdFirstModify: false,
        pwdLock: false,
        repeatLogin: false,
        externalAccess: false,
        validateCode: false,
        personalSettings: false,
        defaultSettings: 0,
        outUserValidateCode: '',
        isYS:true
      }
    }
  },
  methods: {
    rules(){
      if(this.addForm.pwdComplexity == 0){
        if(/^\d{1,}$/.test(this.addForm.pwdLength)){
          if( this.addForm.pwdLength < 4){
          // this.addForm.pwdLength = 4
          this.addForm.isYS = false;
          return this.$message({
            type: 'warning',
            message: '密码最小长度不能小于4'
          })
        }else{
          this.addForm.isYS = true;
        }
      }else{
          this.addForm.isYS = false;
        return this.$message({
          type: 'warning',
          message: '密码最小长度只能输入数字'
        })
      }
      // if(this.addForm.pwdComplexity == 0 && this.addForm.pwdLength < 4){
      //    this.$message({
      //     type: 'warning',
      //     message: '密码最小长度不能小于4'
      //   })
      // }
      }
      if(this.addForm.pwdComplexity == 1){
        if(/^\d{1,}$/.test(this.addForm.pwdLength)){
          if( this.addForm.pwdLength < 8){
          this.addForm.isYS = false;
          // this.addForm.pwdLength = 8
          return this.$message({
            type: 'warning',
            message: '密码最小长度不能小于8'
          })
        }else{
          this.addForm.isYS = true;
        }
      }else{
          this.addForm.isYS = false;
        return this.$message({
          type: 'warning',
          message: '密码最小长度只能输入数字'
        })
      }
      // if(this.addForm.pwdComplexity == 0 && this.addForm.pwdLength < 8){
      //    this.$message({
      //     type: 'warning',
      //     message: '密码最小长度不能小于8'
      //   })
      // }
      }
      if(this.addForm.pwdComplexity == 2){
        if(/^\d{1,}$/.test(this.addForm.pwdLength)){
          if( this.addForm.pwdLength < 8){
          this.addForm.isYS = false;
          // this.addForm.pwdLength = 8
          return this.$message({
            type: 'warning',
            message: '密码最小长度不能小于8'
          })
        }else{
          this.addForm.isYS = true;
        }
      }else{
          this.addForm.isYS = false;
        return this.$message({
          type: 'warning',
          message: '密码最小长度只能输入数字'
        })
      }
      // if(this.addForm.pwdComplexity == 0 && this.addForm.pwdLength < 8){
      //    this.$message({
      //     type: 'warning',
      //     message: '密码最小长度不能小于8'
      //   })
      // }
      }
    },
    changs(){
      if(this.addForm.pwdComplexity == 0){
        this.addForm.pwdLength = 4
      }
      if(this.addForm.pwdComplexity == 1){
        this.addForm.pwdLength = 8
      }
      if(this.addForm.pwdComplexity == 2){
        this.addForm.pwdLength = 8
      }
    }
  },
  watch: {
    addForm: {
      handler() {
        this.$emit('getData', this.addForm)
      },
      deep: true
    }
  },
  mounted() {
    getSafetyData().then(res => {
      if(res.errcode === 0) {
        this.addForm = res.data.records[0]
      } else {
        this.$message.error(res.errmsg)
      }
    })
  }
}
</script>
<style lang="scss">
#safetyBase {
  .el-form {
    .el-form-item {
      padding: 3px 0;
      .el-form-item__label {
        margin-left: 20px;
      }
      .el-form-item__content {
        margin-left: 205px !important
      }
    }
  }

  .width-450px{
    width: 500px;
  }
}
</style>
