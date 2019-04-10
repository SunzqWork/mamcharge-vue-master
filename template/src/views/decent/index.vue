<template>
  <div id="decent">
    <!-- 重置密码 -->
    <el-dialog title="重置密码" :visible.sync="pasCO" width="450px" >
      <el-form
            label-width="100px"
            style="width: 100%;margin: 0;overflow: auto;height: 150px;"
            :model="passCode"
            :rules="rulesPas"
            ref="form"
            v-if="trues"
          >
          <el-form-item label-width="100px" label="新密码" prop="one">
            <zl-password v-if="trues" :value="passCode.one" @input="changesInput"/>
					</el-form-item>
          <el-form-item label-width="100px" label="确认密码" prop="two">
					  <el-input
						class="zl-form-control zl-input-240px"
						v-model="passCode.two"
					  ></el-input>
					</el-form-item>
          <p style="color:#dcdcdc;font-size:12px;line-height: 25px;text-align: center;">
            {{['','长度为6-14个字符支持数字、字母大小写组合','长度为6-14个字符支持字母大小写、数字、特殊字符组合'][this.pawInfo]}}
          </p>
          </el-form>
      <div style="overflow:hidden;margin:auto;width: 126px;margin-top:12px;">
        <el-button style="float:left;margin: 0px;" @click="pasChange" type="primary">确认</el-button>
        <el-button style="float:left;margin-left:10px;" @click="pasCall">取消</el-button>
      </div>
      </el-dialog>
      <zl-card>
      <el-input
        class="zl-form-control zl-input-240px"
        placeholder="管理员名称，管理员账号"
        @change="reapl"
        v-model="params.keyword"
        @keyup.enter.native="queryData"
      ></el-input>
      <el-button class="btn-theme"  @click="queryData">查询</el-button>
    </zl-card>
    <zl-card>
      <el-row class="mb10">
        <el-button class="btn-theme"  @click="addVisible = true; id = ''">新增</el-button>
        <el-button class="btn-default"  @click="edit">编辑</el-button>
        <el-button class="btn-default"  @click="delBtn">删除</el-button>
      </el-row>

      <el-table class="zl-table" :data="tableData" highlight-current-row @current-change="handleCurrentChangeTable" border stripe :height="tableHeight">
      <!-- <el-table class="zl-table" :data="tableData" highlight-current-row @current-change="handleCurrentChangeTable" @selection-change="getDelList" border stripe :height="tableHeight"> -->
        <!-- <el-table-column type="selection" align="center" header-align="center" :selectable="checkSelection"></el-table-column> -->
        <el-table-column label="管理员名称" prop="name" align="left" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="管理员账号" prop="username" align="left" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="所属机构" prop="orgName" align="left" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <!-- <el-table-column label="操作" prop="" align="center" header-align="center">
          <template slot-scope="scope">
            <div>
              <span class="icon-theme" @click="edit(scope.row)">编辑</span>
            </div>
          </template>
        </el-table-column> -->
      </el-table>

      <el-pagination
        background
        class="zl-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog
        :title="title"
        :visible.sync="addVisible"
        width="850px"
        @close="handleClose"
        >
        <el-form style="margin: 0 auto;overflow:hidden;" ref="addForm" :rules="rules" :model="addForm" label-width="110px" >
          <el-form-item style="float:left;width: 50%;height:36px;" label="管理员名称" prop="name">
            <el-input class="zl-form-control zl-input-240px" placeholder="请输入管理员名称" v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item style="float:left;width: 50%;height:36px;" label="管理员账号" prop="username">
            <el-input class="zl-form-control zl-input-240px" placeholder="请输入管理员账号" v-model="addForm.username"></el-input>
          </el-form-item>
          <!-- <el-form-item style="float:left;width: 50%;height:36px;" label="密码" prop="password" v-if="id ===''">
            <el-input class="zl-form-control zl-input-240px" placeholder="请输入密码" v-model="addForm.password"></el-input>
          </el-form-item> -->
          <el-form-item style="float:left;width: 50%;height:36px;" label="所属机构" prop="orgId">
            <el-input placeholder="请选择所属机构" disabled v-model="addForm.orgName" class="zl-form-control zl-input-240px">
              <template slot="append">
                <i class="el-icon-more pointer" @click="treeVisible = true"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item style="float:left;width: 50%;height:36px;" label="手机号" prop="phone">
            <el-input class="zl-form-control zl-input-240px" placeholder="请输入手机号" v-model="addForm.phone" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item style="float:left;width: 50%;height:36px;" label="邮箱" prop="email">
            <el-input class="zl-form-control zl-input-240px" placeholder="请输入邮箱" v-model="addForm.email" :maxlength="32"></el-input>
          </el-form-item>
          <el-form-item style="float:left;width: 50%;height:36px;" label="账号说明" prop="remark">
            <el-input class="zl-form-control zl-input-240px" placeholder="请输入账号说明" v-model="addForm.remark" :maxlength="20"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="zl-btn-center">
          <el-button class="btn-theme" @click="save">确 定</el-button>
          <el-button @click="addVisible = false" class="btn-default">取 消</el-button>
          <el-button  @click="resetPassword" v-if="addForm.id != '' && addForm.id != undefined" class="btn-default">重置密码</el-button>
        </div>
      </el-dialog>
    </zl-card>

    <orgTreeDialog :isShow.sync="treeVisible" @handleNodeClick="handleNodeClick" :count="0"></orgTreeDialog>
  </div>
</template>
<script>
import { PasswordVs,changePassword, notifyTypeUser,getValueIs } from "@/api/help";
import { getSafetyData } from "@/api/safety"
import zlPassword from "@/components/app/zl-password"
import { getDecentList, addDecent, delDecent, getDetail, updateDecent } from '@/api/decent'
import zlTitle from '@/components/app/zl-title'
import Cookies from 'js-cookie'
import orgTreeDialog from '@/components/app/org-tree-dialog/index'

export default {
  name: 'decent',
  components: { zlTitle, orgTreeDialog,zlPassword },
  data() {
    const validateUsername = (rule, value, callback) => {
      const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/
      if(value === '') {
        callback(new Error('请输入管理员账号'))
      } else if (!reg.test(value)) {
        callback(new Error('长度为6-18个字符，只能包含字母、数字、下划线'))
      } else if (value.length < 6 || value.length > 18) {
        callback(new Error('账号长度应在6到20个字符之间'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if(value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!reg.test(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      const reg = /^[1][3-9][0-9]{9}$/
      if(value === '') {
        callback(new Error('请输入手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      title: '新增管理员',
      id: '',
      addVisible: false,
      passCode:{
        one:"",
        two:""
      },
      tableData: [],
      pawInfo:0,
      total: 0,
      shows: false,
      nowsTable:"",
      params: {
        page: 1,
        size: 10,
        keyword: '',
        sys: true
      },
      pasCO:false,
      trues:true,
      isFlag: true,
      delVisible: false,
      treeVisible: false,
      delList: [],
      addForm: {
        name: '',
        username: '',
        password: '',
        remark: '',
        orgId: '',
        email: '',
        phone: '',
        orgName: '',
        sys: true
      },
      rules: {
        name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入管理员账号', trigger: 'blur' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        // password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' }
        // ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择所属机构', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    tableHeight() {
      return this.$store.state.app.$th
    },
    rulesPas:function() {
      var newPas = (rule, value, callback) => {
        if (value == "" || /^\s+|\s+$/g.test(value)) {
          callback(new Error("密码不能为空且不能输入空格"));
        } else {
          callback();
        }
      };
      var callPas = (rule, value, callback) => {
        if (this.passCode.one != value) {
          callback(new Error("确认密码与新密码不一致"));
        } else {
          callback();
        }
      };
         let rules = {
            one: [
              { required: true, message: "新密码不能为空", trigger: "blur" },
              { validator: newPas, trigger: "blur" }
            ],
            two:[
              { required: true, message: "确认密码不能为空", trigger: "blur" },
              { validator: callPas, trigger: "blur" }
            ],
         }
      return rules
    }
  },
  watch: {
    tableData(data) {
      this.$store.dispatch('action_set_table_height', data.length)
    }
  },
  methods: {
    reapl(){
      this.params.keyword = this.params.keyword.replace(/\s+/g,"")
    },
    handleCurrentChangeTable(nowsTable){
      this.delList = [nowsTable.id]
      this.nowsTable = nowsTable
    },
    queryData(){
      this.params.page = 1;
      this.getData();
    },
    resetPassword() {
      getSafetyData().then( s => {
        this.pawInfo = s.data.records[0].pwdComplexity
      })
      this.$prompt(
        "为了保证信息安全，请先输入管理员登录密码，方可重置用户密码",
        "重置密码",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      ).then(({ value }) => {
          PasswordVs({password:value}).then( rest => {
            rest.code == 200 ? this.pasCO = true : this.$message({
            type: "error",
            message: "密码错误"
            })
          }).catch(() => {
          this.$message({
            type: "info",
            message: "取消重置"
          });
        });
        })
    },
    checkSelection(row, index) {
      return row.referenced ? false : true
    },
    calls(data) {
      this.addForm.orgId = data[0].id
      this.addForm.orgName = data[0].name
    },

    handleNodeClick(obj) {
      this.addForm.orgId = obj.id
      this.addForm.orgName = obj.name
    },

    edit() {
      var row = ""
      if(this.nowsTable == "" || this.nowsTable == null){
        return this.$message({
          type: "warning",
          message: "请先选择一条数据"
        })
      }else{
        row = this.nowsTable
      }
      this.title = '编辑管理员'
      getDetail(row.id).then(res => {
        if(res.errcode === 0) {
          this.addForm.id = res.data.id
          this.addForm.name = res.data.name
          this.addForm.username = res.data.username
          this.addForm.email = res.data.email
          this.addForm.phone = res.data.phone
          this.addForm.remark = res.data.remark
          this.addForm.orgId = res.data.orgId
          this.addForm.orgName = row.orgName
          this.addForm.sys = true
          this.id = row.id
          this.addVisible = true
        } else {
          this.$message.error(res.errmsg)
        }
      })
    },
    changesInput(val){
      this.passCode.one = val
    },
    pasChange(){
      if(this.passCode.one == "") return this.$message({
                  type: "error",
                  message: "请输入新密码"
                })
            if(this.passCode.one != this.passCode.two) return this.$message({
                  type: "error",
                  message: "两次密码不一致"
                })
            changePassword({newPassword:this.passCode.one},this.addForm.id).then( rest => {
            if(rest.errcode == 0){
                this.$message({
                  type: "success",
                  message: "分权管理员密码重置成功"
                })
                this.pasCO = false;
               this.$confirm('为了避免用户无法正常登陆，请及时通知用户修改后的密码', '密码已修改完成', {
                confirmButtonText: '邮件',
                cancelButtonText: '短信',
                center: true
              }).then(() => {
                notifyTypeUser(1,this.addForm.id,this.$store.state.user.token).then( s=> {
                })
              }).catch(() => {
                notifyTypeUser(2,this.addForm.id,this.$store.state.user.token).then( s=> {
                })
              });
            }else{
               this.$message({
              type: "error",
              message: rest.errmsg
            });
            }
              
          })
    },
    pasCall(){
      this.pasCO = false
      this.trues = false
      this.passCode = {
        one:"",
        two:""
      }
      this.trues = true
    },
    getDelList(val) {
      this.delList = []
      val.forEach(item => {
        this.delList.push(item.id)
      })
    },
    delBtn() {
      if(this.delList.length === 0) {
        this.$message.error('请选择要删除的数据')
      } else {
        this.del()
      }
    },
    del() {
      const strHtml = `
        <p class="zl-confirm-html"">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除管理员, 是否继续</span>
        </p>
      `
      this.$confirm(strHtml, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        delDecent(this.delList).then(res => {
        if(res.errcode === 0) {
          this.$message.success('删除成功')
          this.delVisible = false
          this.delList = []
          this.getData()
        } else {
          this.$message.error(res.errmsg)
        }
      })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    save() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          if(this.id === '') {
            addDecent(this.addForm).then(res => {
              if(res.errcode === 0) {
                this.$message.success('分权管理员新增成功')
                this.addVisible = false
                this.getData()
              } else {
                this.$message.error(res.errmsg)
              }
            })
          } else {
            updateDecent(this.id, this.addForm).then(res => {
              if(res.errcode === 0) {
                this.$message.success('分权管理员信息修改成功')
                this.addVisible = false
                this.getData()
              } else {
                this.$message.error(res.errmsg)
              }
            })
          }
        } else {
          return false;
        }
      })
    },
    getData() {
      getDecentList(this.params.page, this.params.size, this.params.keyword, this.params.sys).then(res => {
        if(res.errcode === 0) {
          this.tableData = res.data.records
          this.total = res.data.total
        } else {
          this.$message.error(res.errmsg)
        }
      })
    },
    handleSizeChange(size) {
      this.params.size = size
      this.getData()
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.getData()
    },
    handleClose() {
      this.title = '新增管理员'
      this.addForm = {
        name: '',
        username: '',
        remark: '',
        orgId: '',
        email: '',
        phone: '',
        orgName: '',
        sys: true
      }
      this.$refs.addForm.resetFields();
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
