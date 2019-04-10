<template>
  <div class="user-dialog">
    <el-dialog
      title="个人中心"
      :visible="isShow"
      width="450px"
      @close="closeDialog">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本信息" name="1">
          <el-form :model="formModel" :rules="rules" ref="form" label-width="100px">
            <el-upload
              class="avatar-uploader"
              :action="$store.state.vendor.photoUpload"
              :show-file-list="false"
              :headers="{ token: $store.state.user.token }"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-form-item label="登录名" prop="username">
              <el-input class="zl-form-control zl-input-240px" v-model="formModel.username" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input class="zl-form-control zl-input-240px" v-model="formModel.name" :maxlength="12"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input class="zl-form-control zl-input-240px" v-model="formModel.phone" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input class="zl-form-control zl-input-240px" v-model="formModel.email" :maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="主岗位">
              {{posiY.toString()}}
            </el-form-item>
            <el-form-item label="副岗位" prop="">
              <el-tooltip class="item" effect="dark" :content="posiN.toString()" placement="top">
                <p style="white-space: nowrap; text-overflow:ellipsis;overflow:hidden;margin-right: 10px;">{{posiN.toString()}}</p>
              </el-tooltip>
            </el-form-item>
            <el-form-item label="角色">
              {{ formModel.roleList | roleFilter | showFilter }}
            </el-form-item>
          </el-form>

          <div class="zl-block-center" style="padding-bottom: 16px;">
            <el-button type="primary" @click="save" class="btn-theme">确 定</el-button>
            <el-button @click="$emit('update:isShow', false)" class="btn-default">取 消</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="账户安全" name="2">
          <el-form style="margin-top: 12px;" :model="passwordModel" :rules="passwordRules" label-width="100px" ref="passwordForm">
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input class="zl-form-control zl-input-240px" placeholder="请输入旧密码" v-model="passwordModel.oldPassword" :maxlength="18"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <zl-password @input="getMode" ></zl-password>
              <!-- <el-input class="zl-form-control zl-input-240px" placeholder="请输入新密码" :maxlength="18"></el-input> -->
            </el-form-item>
          </el-form>

          <div class="zl-block-center" style="padding-bottom: 16px;">
            <el-button type="primary" @click="savePassword" class="btn-theme">确 定</el-button>
            <el-button @click="$emit('update:isShow', false)" class="btn-default">取 消</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      
      
    </el-dialog>
  </div>
</template>
<script>
import { getStorage, setStorage } from '@/utils/storage'
import { updateDecent } from '@/api/decent'
import { updatePasswordByUser } from '@/api/premission'
import { emailValidate, phoneValidate } from '@/utils/validate'
import zlPassword from '@/components/app/zl-password/index'

export default {
  name: 'user-dialog',
  components: { zlPassword },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (!emailValidate(value)) {
          callback(new Error('输入的邮箱格式不正确'))
        }
        callback()
      }
    }

    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (!phoneValidate(value)) {
          callback(new Error('请输入正确的手机号'))
        }
        callback()
      }
    }
    return {
      posiY:"",
      posiN:[],
      formModel: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ]
      },
      imageUrl: '',
      activeName: '1',
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
      mode: 0
    }
  },
  filters: {
    roleFilter(list) {
      let str = []
      if (list instanceof Array) {
        str = list.map(val => val.name)
        return str.join(',')
      } else {
        return null
      }
    }
  },
  methods: {
    getMode(value, mode) {
      this.passwordModel.newPassword = value
      this.mode = mode
    },

    closeDialog() {
      this.$emit('update:isShow', false)      
    },
    beforeAvatarUpload(file) {
      const typeArr = ["image/png", "image/jpeg", "image/jpeg", "image/gif"]
      const isJPG = typeArr.indexOf(file.type) !== -1 ? true : false
      const isLt2M = file.size / 1024 <= 2048;
      if (!isJPG) {
        this.$message.warning("只能上传PNG,JPG,GIF格式的图片!")
      }
      if (!isLt2M) {
        this.$message.warning("图片大小不能超过2M!")
      }
      
      return isJPG && isLt2M
    },

    handleAvatarSuccess(response, file, fileList) {
      if (response.success) {
        this.$message.success('头像上传成功')
        this.imageUrl = response.data
      }
    },

    handleAvatarError(err) {
      this.$message.error('头像上传失败，请联系管理员。')
    },

    save() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.formModel.avatar = this.imageUrl
          updateDecent(this.formModel.id, this.formModel).then(res => {
            if (res.success) {
              this.$message.success('基本信息修改成功')
              setStorage('userInfo', JSON.stringify(res.data))
              this.$emit('update:isShow', false)
              this.$emit('is-submit', res)
            } else {
              this.$message.error(res.errmsg)
            }
          }).catch(err => {
          })
        } else {
        }
      })
    },
    savePassword() {
      this.$refs['passwordForm'].validate(valid => {
        if (valid) {
          // if (this.mode < 3) {
          //   this.$message.warning('密码强度最低为中级的时候才能够进行修改')
          //   return false
          // }
          this.passwordModel.username = this.formModel.username
          updatePasswordByUser(this.formModel.id, this.passwordModel).then(res => {
            if (res.success) {
              this.$message.success('修改密码成功')
              this.$emit('update:isShow', false)
            } else {
              this.$message.error(res.errmsg)
            }
          }).catch(err => {
          })
        } else {
        }
      })
    }
  },
  mounted() {
    this.formModel = JSON.parse(getStorage('userInfo')) || {}
    if(this.formModel.positionList.filter( s=> s.prime).length != 0){
      // 有主岗位
          this.posiY = this.formModel.positionList.filter( s=> s.prime)[0].name
    }else{
      this.posiY = "暂无主岗位"
    }
    if(this.formModel.positionList.filter( s=> !s.prime).length != 0){
      // 有副岗位
          this.posiN = this.formModel.positionList.filter( s=> !s.prime).map( ma => {
            return ma.name
          })
    }else{
          this.posiN = "暂无副岗位"
    }
    this.imageUrl = this.formModel.avatar
  }
}
</script>
<style lang="scss">
.user-dialog{
  .avatar-uploader{
    width: 88px !important;
    height: 88px;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
  }
  .avatar {
    width: 88px;
    height: 88px;
    display: block;
  }
}
</style>

