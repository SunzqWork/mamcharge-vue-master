<template>
  <div id="auAccount">
    <el-form class="page-margin" :model="formModel" ref="form" :rules="rules" label-width="120px" style="width: 100%">
      <zlTitle title="基本信息"></zlTitle>
      <el-form-item label="姓名" prop="name">
        <el-input class="zl-input-300px" placeholder="请输入真实姓名" v-model="formModel.name" :maxlength="12"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input :maxlength="11" class="zl-input-300px" placeholder="请输入手机号，手机号可用来登录" v-model="formModel.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input class="zl-input-300px" placeholder="请输入邮箱，邮箱可用来登录" v-model="formModel.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="$route.name !== 'updateAccount'">
        <zl-password :value="formModel.password" @input="changePassword"></zl-password>
        <!-- <el-input class="zl-input-300px" placeholder="请输入密码" v-model="formModel.password" :minlength="6" :maxlength="18"></el-input> -->
      </el-form-item>
      <el-form-item label="主岗位" prop="mainPost">
        <el-select class="zl-input-300px" placeholder="主岗位"  v-model="formModel.mainPost" @change="changeMainPost">
          <el-option v-for="val in postList" :key="val + Math.random() * 10000 / 89.8" :label="val.label" :value="val.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="副岗位" prop="">
        <el-select style="width: 300px;" placeholder="副岗位" multiple v-model="formModel.deputyPost">
          <el-option
            v-for="val in postList"
            :key="val + Math.random() * 10000 / 89.8"
            :label="val.label"
            :value="val.value"
            :disabled="formModel.mainPost === val.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色" class="required-class">
        <zlCheckSelect @getCheckData="getCheckData" :roleList="formModel.roleIdList"></zlCheckSelect>
      </el-form-item>
      <el-form-item label="数据权限范围" class="required-class">
        <div class="data-type">
          <p><el-radio v-model="dataType" :label="0">所有数据</el-radio></p>
          <p><el-radio v-model="dataType" :label="1">部分数据</el-radio></p>
          <el-tabs v-model="activeName" v-if="dataType === 1" style="width: 300px;">
            <el-tab-pane
              v-for="(val, index) in allDimensionList"
              :key="index"
              :label="val.name"
              :name="val.code"
              >
              <template v-if="val.code === '1001'">
                <p><el-radio v-model="merchant" :label="0">全部商户</el-radio></p>
                <p><el-radio v-model="merchant" :label="1">部分商户</el-radio></p>
                <zl-merchant
                  v-if="merchant === 1"
                  :showCheckList="merchantList"
                  @check-value="getMerchant">
                </zl-merchant>
              </template>
              <template v-if="val.code === '1003'">
                <p><el-radio v-model="lineStatus" :label="0">全部业务线</el-radio></p>
                <p><el-radio v-model="lineStatus" :label="1">部分业务线</el-radio></p>
                <el-checkbox-group v-model="checkedLine" @change="handleCheckedCitiesChange" v-if="lineStatus === 1">
                  <p v-for="(val, index) in lineList" :key="index">
                    <el-checkbox :label="val.value">{{ val.label }}</el-checkbox>
                  </p>
                </el-checkbox-group>
              </template>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-button class="btn-theme" @click="addUser" v-if="!$route.params.id">确定</el-button>
        <el-button class="btn-theme" @click="updateUser" v-else>确定</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Tree from '@/components/app/Tree/tree'
import zlTitle from '@/components/app/zl-title'
import zlCheckSelect from '@/components/app/zl-check-select'
import zlMerchant from '@/components/app/zl-merchant/index'
import zlPassword from '@/components/app/zl-password/index.vue'
import { addUser, updateUser, getUserInfoById, getPost, userDimension, userAuth, getUserData } from '@/api/premission'
import { phoneValidate, emailValidate, passwordValidate } from '@/utils/validate'
export default {
  name: 'auAccount',
  components: { Tree, zlTitle, zlCheckSelect, zlMerchant, zlPassword },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不能为空'))
      } else {
        if (!phoneValidate(value)) {
          callback(new Error('请输入合法的手机号'))
        }
        callback()
      }
    }
    var validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        if (!emailValidate(value)) {
          callback(new Error('请输入合法的邮箱'))
        }
        callback()
      }
    }
    var validatePassWord = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else {
        if (value.length < 6) {
          callback(new Error('密码长度不能够小于6位'))
        }
        callback()
      }
    }
    return {
      formModel: {
        name: '',
        password: '',
        email: '',
        phone: '',
        roleIdList: [],
        mainPost: null, // 主岗位
        deputyPost: [] // 副岗位
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePassWord, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        mainPost: [
           { required: true, message: '请选择主岗位', trigger: 'change' }
        ]
      },
      data: [],
      postList: [], // 主岗位数据
      roleList: [],
      ROUTE_NAME: 'accountList',
      lineList: [
        { label: '运营商升级', value: 'yyssj' },
        { label: '车棚升级', value: 'cpsj' },
        { label: '物业之推', value: 'wyzt' },
        { label: '代理商销售', value: 'dlsxs' }
      ],
      dataType: 0, // 0表示全部数据 1表示部分数据
      allDimensionList: [],
      activeName: '1001',
      checkedLine: [],
      isIndeterminate: false,
      merchant: 0, // 0 全部商户 1 部分商户
      lineStatus: 0,
      merchantList: [],
      data_params:  {
        op: 'and',
        rules: []
      }
    }
  },
  methods: {
    test(){
      alert('xxx')
    },
    changePassword(value) {
      this.formModel.password = value
    },
    // 获取与用户关联的维度
    userDimension() {
      userDimension().then(res => {
        if (res.success) {
          this.allDimensionList = res.data
        }
      }).catch(err => {
      })
    },
    // 获取商户管理数据
    getMerchant(data) {
      this.merchantList = data
    },
    // 新增数据权限
    addDataPremission(userId) {
      const NUM = 999999999
      if (this.merchant === 0) {
        this.merchantList = [NUM]
      } else {
        if (this.merchantList.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择商户'
          })
          return false
        }
        this.merchantList.forEach((val, index) => {
          if (Number(val) === NUM) {
            this.merchantList.splice(index, 1)
          }
        })
      }

      if (this.lineStatus === 0) {
        this.checkedLine = [NUM]
      } else {
        if (this.checkedLine.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择业务线'
          })
          return false
        }
        this.checkedLine.forEach((val, index) => {
          if (Number(val) === NUM) {
            this.checkedLine.splice(index, 1)
          }
        })
      }

      const rules = [
        {
          op: 'in',
          field: '1',
          value: this.merchantList
        },
        {
          op: 'in',
          field: '3',
          value: this.checkedLine
        }
      ]
      this.data_params.rules = rules
      userAuth(userId, this.data_params).then(res => {
        if (res.success) {
          this.$router.go(-1)
        } else {
          this.$message({
            type: 'warning',
            message: '账号关联数据权限失败，请联系管理员。'
          })
        }
      }).catch(err => {
      })
    },
    changeMainPost(id) {
      this.formModel.deputyPost.forEach((val, index) => {
        if (val === id) {
          this.formModel.deputyPost.splice(index, 1)
        }
      })
    },
    // 获取岗位
    getPost() {
      getPost().then(res => {
        if (res.success) {
          res.data.records.forEach(item => {
            let orgName = ''
            let templateName = ''
            item.orgUnit.ancestors.forEach(val => {
              orgName = orgName + '-' + val.name
            })
            item.templatePosition.ancestors.forEach(val => {
              templateName = templateName + '-' + val.name
            })
            orgName = orgName.trim('-')
            templateName = templateName.trim('-')
            this.postList.push({ label: `${orgName}-${templateName}`.trim('-'), value: Number(item.id) })
          })
        }
      }).catch(err => {
      })
    },
    // 根据ID获取用户信息
    getUserInfoById() {
      getUserInfoById(this.$route.params.id).then(res => {
        if (res.success) {
          this.formModel.deputyPost = []
          res.data.positionList.forEach(val => {
            if (val.prime) {
              this.formModel.mainPost = val.id
            } else {
              this.formModel.deputyPost.push(val.id)
            }
          })
          Object.keys(res.data).forEach(key => {
            if (key !== 'positionList') {
              this.formModel[key] = res.data[key]
            }
          })
        }
      }).catch(err => {
      })
    },
    // 根据id获取数据权限数据
    getUserData() {
      getUserData(this.$route.params.id).then(res => {
        if (res.success) {
          const NUM = 999999999
          res.data.forEach(item => {
            if (Number(item.field) === 1) {
              this.merchantList = item.value.map(val => Number(val))
            } else if (Number(item.field) === 3) {
              this.checkedLine = item.value
            } else {
              // TODO
            }
            // 判断所有数据还是部分数据
            if (this.merchantList.includes(NUM) && this.checkedLine.includes(NUM)) {
              this.dataType = 0
            } else if (this.merchantList.includes(NUM)) {
              this.dataType = 1
              this.merchant = 0
            } else if (this.checkedLine.includes(String(NUM))) {
              this.dataType = 1
              this.lineStatus = 0
            } else {
              this.dataType = 1
              this.merchant = 1
              this.lineStatus = 1
            }
          })
        } else {
          this.$message({
            type: 'warning',
            message: '获取用户数据权限信息失败'
          })
        }
      }).catch(err => {
      })
    },
    // 新增用户
    addUser() {
      if (this.formModel.roleIdList.length === 0) {
        this.$message({
          type: 'warning',
          message: '角色不能为空'
        })
        return false
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.formModel.positionList = []
          this.formModel.positionList.push({ id: this.formModel.mainPost, prime: true })
          this.formModel.deputyPost.forEach(val => {
            this.formModel.positionList.push({ id: val })
          })
          addUser(this.formModel).then(res => {
            if (res.success) {
              this.$message.success('账号新增成功')
              // 账号新增成功之后获取到账号id进行数据权限的分配
              this.addDataPremission(res.data.id)
            } else {
              if (res.errcode === 4010) {
                this.$message({
                  type: 'warning',
                  message: '手机号或邮箱已存在，请重新填写。'
                })
              } else if (res.errcode === 4001) {
                this.$message({
                  type: 'warning',
                  message: '手机号已存在，请重新填写。'
                })
              }
            }
          }).catch(err => {
          })
        } else {
          this.$message({
            type: 'warning',
            message: '表单验证不通过'
          })
        }
      })
    },
    // 编辑用户
    updateUser() {
      let arrIds = []
      this.roleList.forEach(item => {
        item.roleList.forEach(val => {
          this.formModel.roleIdList.forEach(v => {
            if (v === val.id) {
              arrIds.push(v)
            }
          })
        })
      })
      this.formModel.roleIdList = arrIds
      if (this.formModel.roleIdList.length === 0) {
        this.$message({
          type: 'warning',
          message: '角色不能为空'
        })
        return false
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.formModel.positionList = []
          this.formModel.positionList.push({ id: this.formModel.mainPost, prime: true })
          this.formModel.deputyPost.forEach(val => {
            this.formModel.positionList.push({ id: val })
          })
          updateUser(this.$route.params.id, this.formModel).then(res => {
            if (res.success) {
              this.$message.success('账号修改成功')
              this.addDataPremission(this.$route.params.id)
            } else {
              if (res.errcode === 4010) {
                this.$message({
                  type: 'warning',
                  message: '手机号或邮箱已存在，请重新填写。'
                })
              } else if (res.errcode === 4001) {
                this.$message({
                  type: 'warning',
                  message: '手机号已存在，请重新填写。'
                })
              }
            }
          }).catch(err => {
          })
        }
      })
    },
    // 获得选中的角色
    getCheckData(data, list) {
      this.roleList = list
      this.formModel.roleIdList = data
    },
    handleCheckAllChange(val) {
      this.checkedLine = val ? this.lineList.map(item => item.value) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.lineList.length
    }
  },
  mounted() {
    this.userDimension()
    this.getPost()
    if (this.$route.name === 'updateAccount') {
      this.getUserInfoById()
      this.getUserData()
    }
  }
}
</script>
