<template>
  <div id="addRole">
    <el-form :model="formModel" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="类别" class="required-class">
        <zlDepartment @check-data="typeData" :category="Number(formModel.category)"></zlDepartment>
      </el-form-item>
      <el-form-item prop="name" label="角色">
        <el-input style="width: 350px" placeholder="请输入角色名称" v-model="formModel.name" :maxlength="12" :disabled="$route.query.flag === 'false'"></el-input>
      </el-form-item>
      <el-form-item label="权限" class="required-class">
        <div class="premission-check">
          <p><el-radio v-model="formModel.svaha" :label="true">全部权限</el-radio></p>
          <p><el-radio v-model="formModel.svaha" :label="false">部分权限</el-radio></p>
        </div>
        <el-tabs
          v-if="!formModel.svaha"
          v-model="activeName" 
          @tab-click="handleClick" 
          class="tabs">
          <el-tab-pane v-if="apps.length > 0" v-for="(app, index) in apps" :key="app.id" :label="app.name" :name="'app' + index">
            <Tree :data="app" @changNode="changNode"></Tree>
          </el-tab-pane>
        </el-tabs>
        <!-- <zlAppMenus></zlAppMenus> -->
      </el-form-item>
      <el-form-item label="">
        <el-button class="btn-theme" @click="addRole" v-if="!this.$route.params.id">保存</el-button>
        <el-button class="btn-theme" @click="updateRole" v-else>保存</el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import zlDepartment from '@/components/app/zl-department'
import Tree from '@/components/app/Tree/tree'
import { GroupBySys, addRole, updateRole, getRoleInfoById } from '@/api/premission'
import zlAppMenus from '@/components/app/zl-app-menus/index.vue'
export default {
  name: 'addRole',
  components: { zlDepartment, Tree, zlAppMenus },
  data() {
    return {
      formModel: {
        category: '',
        name: '',
        menuIds: null,
        tips: '',
        svaha: true // 默认是全部权限
      },
      rules: {
        name: [{ required: true, message: '请填写角色名称', trigger: 'blur' }],
      },
      activeName: 'app0',
      preRadio: '2',
      apps: [],
      treeData: [],
      model: null,
      formatDataList: [] // 用做数据回显的数据
    }
  },
  methods: {
    handleClick() {},
    changNode(data) {
      console.log(data)
      this.model = JSON.parse(JSON.stringify(data))
    },
    loopData(data) {
      if (data.children && data.children !== null && data.children.length > 0) {
        data.children.forEach(val => {
          if (val.checkStatus || val.indeterminate) {
            if (!this.treeData.includes(val.id)) {
              this.treeData.push(val.id)
              // check: true表示部分选中 false表示全选
              const obj = val.indeterminate ? { id: val.id, check: true } : { id: val.id, checl: false }
              this.formatDataList.push(obj)
            }
          }
          this.loopData(val)
        })
      }
    },
    // 选中的类别
    typeData(value) {
      this.formModel.category = value.code
    },
    // 根据id查询角色
    getRoleInfoById(callback) {
      getRoleInfoById(this.$route.params.id).then(res => {
        if (res.success) {
          this.formModel = res.data
          callback && callback(res.data.tips)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    GroupBySys() {
      return new Promise((resolve, reject) => {
        GroupBySys().then(res => {
          if (res.success) {
            this.apps = res.data.map(item => {
              item.children = item.menus
              this.formatData(item)
              return item
            })
            return resolve(this.apps)
          } else {
            this.$message({
              type: 'warning',
              message: res.errmsg
            })
            return reject(res.errmsg)
          }
        }).catch(err => {
          console.log(err)
          return reject(err)
        })
      })
    },
    // 创建角色
    addRole() {
      // 类型
      if (this.formModel.category === '') {
        this.$message({
          type: 'warning',
          message: '角色类别不能为空'
        })
        return false
      }
      this.apps.forEach(item => {
        this.loopData(item)
      })
      this.formModel.menuIds = this.treeData
      if (!this.formModel.svaha) {
        if (this.formModel.menuIds.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择权限'
          })
          return false
        }
      }
      this.formModel.tips = JSON.stringify(this.formatDataList)
      this.$refs['form'].validate(valid => {
        if (valid) {
          addRole(this.formModel).then(res => {
            if (res.success) {
              this.$message.success('角色创建成功')
              this.$router.go(-1)
            } else {
              if (res.errcode === 4010) {
                this.$message({
                  type: 'warning',
                  message: '该角色已经存在，请重新填写。'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: '角色创建失败，请联系管理员！'
                })
              }
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          //
        }
      })
    },
    // 编辑角色
    updateRole() {
      // 类型
      if (this.formModel.category === '') {
        this.$message({
          type: 'warning',
          message: '角色类别不能为空'
        })
        return false
      }
      this.apps.forEach(item => {
        this.loopData(item)
      })
      this.formModel.menuIds = this.treeData
      if (!this.formModel.svaha) {
        if (this.formModel.menuIds.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择权限'
          })
          return false
        }
      }
      this.formModel.tips = JSON.stringify(this.formatDataList)
      this.$refs['form'].validate(valid => {
        if (valid) {
          updateRole(this.$route.params.id, this.formModel).then(res => {
            if (res.success) {
              this.$message.success('编辑角色成功')
              this.$router.go(-1)
            } else {
              if (res.errcode === 4010) {
                this.$message({
                  type: 'warning',
                  message: '该角色已经存在，请重新填写。'
                })
              } else {
                this.$message({
                  type: 'warning',
                  message: '编辑角色失败，请联系管理员！'
                })
              }
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          //
        }
      })
    },
    formatData(tree) {
      if (tree.children && tree.children.length > 0) {
        tree.children.forEach(val => {
          val.indeterminate = false
          val.checkStatus = false
          this.formatData(val)
        })
      }
    }
  },
  mounted() {
    this.GroupBySys().then(res => {
      if (this.$route.params.id) {
        this.getRoleInfoById((data) => {
          const treeData = JSON.parse(data)
          res.forEach(item => {
            const loopTreeFunc = (obj) => {
              if (obj.children && obj.children.length > 0) {
                obj.children.forEach(val => {
                  treeData.forEach(treeVal => {
                    if (Number(val.id) === Number(treeVal.id)) {
                      val.checkStatus = treeVal.check ? false : true
                      val.indeterminate = treeVal.check ? true : false
                    }
                  })
                  loopTreeFunc(val)
                })
              }
            }
            loopTreeFunc(item)
          })
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style lang="scss">
#addRole{
  padding: 20px;
  .el-form-item__content{
    // line-height: 0;
  }
  .tabs{
    width: 1000px;
  }
}
</style>

