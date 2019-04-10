<template>
<div>
  <el-dialog
      title="首次登陆重置密码"
      :visible.sync="dialogVisible"
      width="450px"
      :before-close="handleClose">
      <el-form style="margin-top: 12px;" :model="passwordModel" :rules="passwordRules" label-width="100px" ref="passwordForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input class="zl-form-control zl-input-240px" placeholder="请输入旧密码" v-model="passwordModel.oldPassword" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <zl-password @input="getMode" ></zl-password>
        </el-form-item>
        <p style="color:#dcdcdc;font-size:12px;line-height: 25px;text-align: center;">{{['',`长度为${min}-27个字符支持数字、字母大小写组合`,`长度为${min}-27个字符支持字母大小写、数字、特殊字符组合`][nix]}}</p>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changPaw">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  <div class="login-container">
    <!-- 首次登陆重置密码 -->
    
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
        <!-- <lang-select class="set-language"/> -->
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          :placeholder="$t('login.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          :placeholder="$t('login.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon v-if="passwordType == 'password'" icon-class="eye" />
          <svg-icon v-else icon-class="viewEye" />
        </span>
      </el-form-item>
      
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">{{ $t('login.logIn') }}</el-button>
    </el-form>

    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>

  </div>
</div>
</template>

<script>
import { getSafetyDataList } from "@/api/safety"
import zlPassword from '@/components/app/zl-password/index'
import { updatePasswordByUser } from '@/api/premission'
import LangSelect from '@/components/LangSelect'
import SocialSign from './socialsignin'
import Cookies from 'js-cookie'
export default {
  name: 'Login',
  components: { LangSelect, SocialSign,zlPassword },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback()
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        // username: 'wangweijun123',
        // password: 'MAMwangweijun1232019'
        username: '',
        password: ''
        // username: '17663758962',
        // password: 'Wangweijun1@@'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入登录名' }],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码'},
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      formModel: {},
      dialogVisible:false,
      passwordType: 'password',
      loading: false,
      nix:0,
      min:"",
      showDialog: false,
      redirect: undefined,
      passwordModel: {
        oldPassword: '',
        username: '',
        newPassword: ''
      },
      passwordRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      },
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleClose(){
      sessionStorage.removeItem('ids')
      Cookies.remove('flag')
      this.dialogVisible = false
    },
    getMode(value, mode) {
      this.passwordModel.newPassword = value
      this.mode = mode
    },
    offPaw(){

    },
    changPaw(){
      this.$refs['passwordForm'].validate(valid => {
        if (valid) {
          if (this.mode < 3) {
            this.$message.warning('密码强度最低为中级的时候才能够进行修改')
            return false
          }

          this.passwordModel.username = this.formModel.username
          updatePasswordByUser(sessionStorage.getItem("ids"), this.passwordModel).then(res => {
            if(res.success){
              sessionStorage.removeItem('ids')
              Cookies.remove('flag')
              this.dialogVisible = false
              this.$message.success('修改密码成功'); 
            }else{
              this.$message.error(res.errmsg); 
            }
        })
        } else {
        }
      })
        
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(req => {
            // return
            if(req.success){
            this.loading = false
            this.$store.dispatch('GetUserInfo').then( s => {
              if(s.success){
                 this.$store.dispatch('GetSysMenus', window.sysId)
              }
            })
            // this.$router.push({ path: this.redirect || '' })
            this.$router.push('/')
            }else{
              this.$message.error(req.errmsg); 
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  },
  mounted() {
    if (Cookies.get('flag')) {
      if (Cookies.get('flag') == 1 && sessionStorage.getItem("ids")) {
        // 修改
        getSafetyDataList().then( s=> {
          this.nix = s.data[0].pwdComplexity
          this.min = s.data[0].pwdLength
        })
        this.dialogVisible = true;
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      // background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }

  .el-input__inner {
    border: none !important;
    font-size: 14px;
  }
}
</style>
