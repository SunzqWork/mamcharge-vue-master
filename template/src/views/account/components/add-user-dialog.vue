<template>
  <div class="add-user-dialog">
      <el-dialog title="重置密码" :visible.sync="pasCO" width="450px" :before-close="handleClose">
      <el-form
            label-width="100px"
            style="width: 100%;margin: 0;overflow: auto;height: 140px;"
            :model="passCode"
            :rules="rulesPas"
            ref="formPaw"
            v-if="trues"
          >
          <el-form-item label-width="100px" label="新密码" prop="one">
            <zl-password v-if="pasCO" :value="passCode.one" @input="changesInput"/>
					</el-form-item>
          <el-form-item label-width="100px" label="确认密码" prop="two">
					  <el-input
						class="zl-form-control zl-input-240px"
						v-model="passCode.two"
					  ></el-input>
					</el-form-item>
           <p style="color:#dcdcdc;font-size:12px;line-height: 25px;text-align: center;">
            {{['',`长度为${min}-27个字符支持数字、字母大小写组合`,`长度为${min}-27个字符支持字母大小写、数字、特殊字符组合`][pawInfo]}}
          </p>
          <!--<p style="color:#dcdcdc;font-size:12px;line-height: 25px;text-align: center;">
            2.
          </p> -->
          </el-form>
      <div style="overflow:hidden;margin:auto;width: 126px;margin-top:12px;">
        <el-button style="float:left;margin: 0px;" @click="pasChange" type="primary">确认</el-button>
        <el-button style="float:left;margin-left:10px;" @click="pasCall">取消</el-button>
      </div>
      </el-dialog>
      <!-- isShow -->
    <el-dialog  :title="title" :visible.sync="syncShow" width="850px" @close="close">
      <el-tabs v-model="activeName" type="card" style="height: 380px;overflow:hidden;">
        <el-tab-pane name="a" label="基本信息">
          <el-form
            label-width="100px"
            style="width: 810px;margin: 0;height: 350px;overflow: auto;"
            :model="userInfo"
            :rules="rules"
            ref="form"
          >
			  <zl-card isHeader title="个人信息" class="clearfix">
          <div class="fl" style="width: 50%;">
          <el-form-item label-width="100px" label="登录名" prop="username">
					  <el-input
						:disabled="edit || lock || nowEdits"
						class="zl-form-control zl-input-240px"
						placeholder="请输入登录名"
						v-model="userInfo.username"
            @change="callUserName"
					  ></el-input>
					</el-form-item>
          <el-form-item label-width="100px" label="姓名" prop="name">
					  <el-input
            :disabled="lock"
						class="zl-form-control zl-input-240px"
						placeholder="请输入姓名"
						v-model="userInfo.name"
            :maxlength="20"
					  ></el-input>
					</el-form-item>
          <el-form-item label="状态" prop="employStatus">
        <el-select :disabled="lock" class="zl-form-control zl-input-240px" v-model="userInfo.employStatus">
          <el-option
            v-for="(item, index) in employList"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
					<el-form-item label-width="100px" label="手机号" prop="phone">
					  <el-input
						class="zl-form-control zl-input-240px"
						placeholder="请输入手机号"
						:maxlength="11"
						v-model="userInfo.phone"
            :disabled="lock"
					  ></el-input>
					</el-form-item>
					<el-form-item  label-width="100px" label="邮箱" prop="email">
					  <el-input
            :disabled="lock"
						class="zl-form-control zl-input-240px"
						placeholder="请输入邮箱"
						v-model="userInfo.email"
            @change="testEmail"
					  ></el-input>
					</el-form-item>
			<!-- <el-form-item
              v-if="data.username == '' ||  data.username == undefined || isCheck || !nowEdits"
              label="密码"
              prop="password"
            >
              <el-input
              :disabled="lock"
                class="zl-form-control zl-input-240px"
                placeholder="请输入密码"
                :maxlength="18"
                v-model="userInfo.password"
              ></el-input>
            </el-form-item> -->
				</div>
				<div class="fl" style="width: 50%;">
					<el-upload
					  class="avatar-uploader"
					  :action="$store.state.vendor.photoUpload"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :headers="{ token: $store.state.user.token }"
					  :before-upload="beforeAvatarUpload"
						>
					  <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</div>
			</zl-card>
			<zl-card isHeader title="部门信息" class="clearfix">
			<div class="fl" style="width:50%;">
			 <el-form-item label="所属部门" prop="orgName">
			  <el-input :disabled="true" class="zl-form-control zl-input-240px" v-model="userInfo.orgName">
				<template slot="append">
				  <i class="el-icon-more pointer" @click="selectInfo"></i>
				</template>
			  </el-input>
			</el-form-item>
			
      <el-form-item label="显示顺序" prop="seq">
        <el-input
          :disabled="lock"
          class="zl-form-control zl-input-240px"
          v-model="userInfo.seq"
        ></el-input>
      </el-form-item>
			</div>
			<div class="fl"  style="width:50%;">
				<el-form-item label="直接上级" prop="superiorid">
				  <el-input :disabled="true" class="zl-form-control zl-input-240px" v-model="userInfo.superiorName">
					<template slot="append">
					  <i @click="superiorOpen" class="el-icon-more pointer"></i>
					</template>
				  </el-input>
				</el-form-item>
				<el-form-item label="安全级别" prop="securityLevel">
              <el-input
              :disabled="lock"
                class="zl-form-control zl-input-240px"
                placeholder="0-255之间"
                :maxlength="11"
                @change="limt"
                v-model="userInfo.securityLevel"
              ></el-input>
            </el-form-item>
			</div>
			</zl-card>
            <!-- <zl-card v-if="exData.length != 0" isHeader title="部门自定义"> -->
			        <!-- <el-form-item :prop="ins.colName"  v-for="ins in exData" :label="ins.colName" :key="Math.random() * 1000.233 / 122.88">
              <extra-columns @tick="testss" :dataInfo="userInfo.extraColumns" :typeInfo="ins"/>
            </el-form-item> -->
           <!-- </zl-card> -->
            </el-form>
          <div style="text-align: center;margin-top:12px;">
            
          </div>
          <div style="overflow: hidden;width: 100%;"></div>
        </el-tab-pane>
        <el-tab-pane label="岗位信息" name="gwxx" v-if="isShowTabFlag || edit || nowEdits">
         <div style="margin:10px;margin-bottom: 12px;">
            <el-form label-width="60px">
            <el-form-item label="主岗位">
              <div>
                <el-input
                :disabled="true"
                 
                  class="zl-form-control zl-input-240px"
                  style="width: 240px;"
                  v-model="userInfo.postIN"
                >
                  <template slot="append">
                    <i class="el-icon-more pointer" @click="test"></i>
                  </template>
                </el-input>
              </div>
            </el-form-item>

            <el-form-item label="副岗位">
              <el-button class="btn-theme"  @click="showsDob = true">添加副岗位</el-button>
              <el-button class="btn-default"  @click="deletePost">删除</el-button>
            </el-form-item>
          </el-form>
          <el-table
            :data="tableData"
            class="zl-table"
            border
            height="210px"
            tooltip-effect="dark"
            @selection-change="handleSelectionChangePost"
          >
            <el-table-column type="selection" header-align="center" align="center" prop="values" width="55"></el-table-column>
            <el-table-column label="副岗位名称" prop="fullName" align="left" header-align="center"></el-table-column>
            <el-table-column label="所属部门" prop="orgName" align="left" header-align="center"></el-table-column>
            <el-table-column label="所属分部" prop="branchOrgName" align="left" header-align="center"></el-table-column>
          </el-table>
          <!-- <el-pagination
              background
              class="zl-pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination> -->
         </div>
        </el-tab-pane>

        <el-tab-pane label="角色信息" v-if="isShowTabFlag || edit || nowEdits">
         <div style="margin:10px;margin-bottom: 12px;">

          <div class="zl-compt">
            <el-button class="btn-theme"  @click="users = true">添加角色</el-button>
            <el-button class="btn-default"  @click="deleteRole">删除</el-button>
          </div>
          <el-table
            :data="tableUser"
            height="270px"
            class="zl-table"
            border
            tooltip-effect="dark"
            @selection-change="handleSelectionChangeRole"
          >
		 
            <el-table-column type="selection" header-align="center" align="center" prop="values" width="55"></el-table-column>
            <el-table-column label="角色名称" prop="name" align="left" header-align="center"></el-table-column>
            <el-table-column label="所属分部" prop="orgName" align="left" header-align="center"></el-table-column>
          </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
	  <div slot="footer" style="text-align: center;" >
            <el-button class="btn-theme" @click="submit('Y')">确定</el-button>
            <el-button class="btn-default" v-if="activeName == 'a' && !lock" @click="copysPer">确定并克隆权限</el-button>
            <el-button class="btn-default" v-if="activeName == 'a' && !lock" @click="submitSet">确定并设置权限</el-button>
            <el-button
              class="btn-default"
              v-if="data.username != '' &&  data.username != undefined && activeName == 'a' && !lock"
              @click="resetPassword"
            >重置密码</el-button>
       <el-button class="btn-default" @click="offLog">取消</el-button>
      </div>
    </el-dialog>
    <!-- 用户 -->
    <zl-user-help
          v-if="ints"
      :nowId="nowsId"
      :isShow.sync="superior"
      :clean="true"
      :typeCheck="true"
      :positions="'user'"
      @submit-call="superCall"
      :whereShows="[1,2,3,4]"
      :choice="'radio'"
      
    />
          <!-- v-if="superiorIf"
      :nowId="nowsId" -->
    <!-- 用户 -->
    <zl-user-help
      v-if="ints"
      :isShow.sync="copy"
      :clean="true"
      :typeCheck="true"
      :positions="'user'"
      @submit-call="copyUser"
      :whereShows="[1,2,3,4]"
      :choice="'radio'"
      :nowId="nowsId"
    />
    <!-- 角色 -->
    <zl-user-help
      v-if="ints"
      :isShow.sync="users"
      :clean="true"
      :isBrn="false"
      :typeCheck="false"
      :positions="'role'"
      @submit-call="callUser"
      :whereShows="[1,2]"
      :choice="'checkbox'"
      :nowId="nowsId"
    />
    <!-- 岗位 -->
    <!-- 单个 -->
    <zl-user-help
      v-if="ints"
      :isShow.sync="shows"
      :typeCheck="true"
      :positions="'post'"
      :whereShows="[1,3,4]"
      @submit-call="calls"
      :choice="'radio'"
      :nowId="nowsId"
    />
    <!-- 多个 -->
    <zl-user-help
      v-if="ints"
      :isShow.sync="showsDob"
      :whereShows="[1,3,4]"
      :clean="true"
      :typeCheck="false"
      :positions="'post'"
      @submit-call="callsDob"
      :choice="'checkbox'"
      :nowId="nowsId"
    />
    <!-- 部门 -->
    <tree-orgs :isShow.sync="treeVisible" @handleNodeClick="handleNodeClick"/>
  </div>
</template>
<script>
import {
  phoneValidate,
  emailValidate,
  validateInterAndZero
} from "@/utils/validate";
import { getDetail ,getDetailMore} from "@/api/decent";
import { getCustomUser } from "@/api/custom";
import extraColumns from "./extraColumns"
import { createUser } from "@/api/user";
import { updateDecent } from "@/api/decent";
import { PasswordVs,changePassword, notifyTypeUser,getValueIs } from "@/api/help";
import zlUserHelp from "@/components/app/zl-user-help";
import treeOrgs from "@/components/app/org-tree-dialog";
import zlPassword from "@/components/app/zl-password"
import { getSafetyData } from "@/api/safety"
const str = `
  <p style="text-align:center;">
    <i class="el-icon-warning" style="color:#299ee4;font-size:22px;vertical-align:middle;"></i>
    <span style="padding-left:10px;font-size:16px;vertical-align:middle;">此操作将永久删除, 是否继续?</span>
  </p>
`;
export default {
  name: "add-user-dialog",
  props: {
    title: {
      type: String,
      default: ""
    },
    isShow: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "800px"
    },
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    lock:{
      type:Boolean,
      default:false
    },
    userNow: {
      type: String,
      default: ""
    },
    edit: {
      type: Boolean,
      default: false
    },
    isShowTab: {
      type: Boolean,
      default: false
    }
  },
  components: {
    zlUserHelp,
    treeOrgs,
    extraColumns,
    zlPassword
  },
  mounted() {
    // setTimeout(() => {
    //   let temporary = {}
    //   for(let i of this.exData){
    //     temporary[i.colName] = [
    //       { required: i.required ? true : false , message: `${i.displayName}不能为空`, trigger: "blur"},
    //     ]
    //   }
    //   // this.dycRule
    // }, 2000);
  //获取自定义
   getCustomUser().then( res=> {
	if(res.success){
		this.exData = res.data;
		let ext = {}
		res.data.forEach( re => {
			ext[re.colName] = ""
		})
		//获取Id
		// this.nowsId = this.userNow;
		this.ints = true;
		this.data.id == ""
		  ? ""
		  : getDetail(this.data.id)
			  .then(
				s => {
				  if (s.success) {
		      this.nowsId = s.data.orgId;
				  const base = s.data.extraColumns
				  s.data.extraColumns = {
					...ext,
					...base
				  }  
					this.userInfo = s.data;
					this.tableUser = s.data.roleList
          this.userInfo.superior = s.data.superior || {
            name:""
          }
					this.userInfo.postIN =
					  s.data.positionList.filter(s => {
						return s.prime;
					  }).length == 0
						? ""
						: s.data.positionList.filter(s => s.prime)[0].fullName;
					this.tableData = s.data.positionList.filter(s => !s.prime);
				  }
				},
				err => {
				}
			  )
			  .catch(error => {
			  });
		this.nowUser = this.data.id;
		this.activeName = "a";
  }
  })
  },
  data() {
    return {
      syncShow:true,
      pawInfo:0,
      passCode:{
        one:"",
        two:""
      },
      total:0,
      nowIDInfo:"",
      nowEdits:false,
      currentPage:1,
      trues:true,
      dycRule:[],
	    disy:false,
	    exData:[],
      superior:false,
      imageUrl: "",
      min:"",
      isCheck: false,
      treeVisible: false,
      activeName: "a",
      copy: false,
      ints: false,
      select: {
        role: [],
        post: []
      },
      nowsId: "",
      nowUser: "",
      tableUser: [],
      tableData: [],
      users: false,
      showsDob: false,
      pasCO:false,
      shows: false,
      isShowTabFlag: this.isShowTab ? true : false,
      userInfo: {
        avatar: "",
        postIN: "",
		    extraColumns:this.data.extraColumns ? this.data.extraColumns : {},
        topName:
          this.data.superiorid == undefined
            ? "暂无上级"
            : this.data.superiorid.name,
        ...JSON.parse(JSON.stringify(this.data)),
        superior: this.data.superior == ""  ? this.data.superior : {
            name:""
          },
          seq:0
      },
      employList: [
        { label: "临时", value: 1 },
        { label: "试用", value: 2 },
        { label: "正式", value: 3 }
      ]
    };
  },
  watch: {
    userNow() {},
    isShow() {
      this.userInfo = {
        ...JSON.parse(JSON.stringify(this.data)),
        spName: ""
      };
    }
  },
  
  computed: {
    rules: function() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("手机号不能为空"));
        } else {
          if (isNaN(parseInt(value))) {
            return callback(new Error("手机号码输入不合法"));
          }else{
            if (!phoneValidate(value)) {
            return callback(new Error("手机号验证不通过"));
          }else{
            // let ids= ""
            // if(this.edit || this.nowEdits){
            //     ids = this.userInfo.id
            // }
            // getValueIs('phone',value,ids).then( s=> {
            //   s.errcode == 0 ?  callback() : callback(new Error(s.errmsg));
            // })
            callback()
          }
          }
          
        }
      };
      var checkNameUser = (rule, value, callback) => {
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        if (pattern.test(value)) {
          return callback(new Error("不能能输入特殊字符"));
        } else {
            if (value.length > 20) {
            callback(new Error("不能大于20个字符"));
          }else{
            callback();
          }
        }
      }


      var checkPass = (rule, value, callback) => {
        if (/[\u4e00-\u9fa5]/.test(value)) {
          return callback(new Error("密码输入不合法"));
        } else {
          if (value.length > 18) {
            callback(new Error("不能大于10个字符"));
          }else{
            callback();
          }
        }
      };


      var checkName = (rule, value, callback) => {
      const reg = /^(?!_)(?!.*?_$)[a-zA-Z0-9_]+$/
      if(value === '') {
        callback(new Error('请输入登录名'))
      } else if (!reg.test(value)) {
        callback(new Error('长度为6-18个字符，只能包含字母、数字、下划线'))
      } else if (value.length < 6 || value.length > 18) {
        callback(new Error('登录名长度应在6到18个字符之间'))
      } else {
        callback()
      }
    }


      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("邮箱不能为空"));
        } else {
          if (!emailValidate(value)) {
            callback(new Error("邮箱验证不通过"));
          }else{
             if (value.length > 32) {
            callback(new Error("不能大于32个字符"));
          }else{
            // let ids= ""
            // if(this.edit || this.nowEdits || this.nowUser ){
            //     ids = this.userInfo.id || this.nowUser
            // }
            //  getValueIs('email',value,ids).then( s=> {
            //   s.errcode == 0 ?  callback() : callback(new Error(s.errmsg));
            // })
            callback()
          }
          }
        }
      };
      var checkSeq = (rule, value, callback) => {
        if (/[^\d]/g.test(value)) {
          return callback(new Error("只能输入0以及正整数"));
        } else {
          if (value > 9999 || value < 0) {
            callback(new Error("只能输入0-9999"));
          }else{
            callback();
          }
        }
      };
      var checkSecurityLevel = (rule, value, callback) => {
        if (!value) {
          callback();
        } else {
          if (!validateInterAndZero(value)) {
            callback(new Error("安全级别验证不通过"));
          } else if (value > 255) {
            callback(new Error("数值不能大于255"));
          }
          callback();
        }
      };
      let rule = [];
      if (this.data == undefined) {
      } else {
        if (this.data.username == "" || this.data.username == undefined) {
          rule = {
            username: [
              { required: true, message: "登录名不能为空", trigger: "blur" },
              { validator: checkName, trigger: "blur" }
            ],
            
            name: [
              { required: true, message: "姓名不能为空", trigger: "blur" },
              { validator: checkNameUser, trigger: "blur" }
            ],
            orgName: [
              { required: true, message: "所属部门不能为空", trigger: "blur" }
            ],
            phone: [
              { required: true, message: "手机号不能为空", trigger: "blur" },
              { validator: checkPhone, trigger: "blur" }
            ],
            email: [
              { required: true, message: "邮箱不能为空", trigger: "blur" },
              { validator: checkEmail, trigger: "blur" }
            ],
            seq:[
              { required: false},
              { validator: checkSeq, trigger: "blur" }
            ],
          };
        } else {
          // 设置主岗位
          if (this.data.positionList != undefined) {
            if (this.data.positionList.filter(s => s.prime)[0]) {
              this.userInfo.spName = this.data.positionList.filter(
                s => s.prime
              )[0].fullName;
              this.userInfo.userInfo = this.data.positionList.filter(
                s => s.prime
              )[0];
            }
            this.tableData = this.data.positionList.filter(
              s => s.prime == false
            );
          }
          // 设置副岗位
          // 设置角色
          //this.tableUser = this.data.roleList;
          rule = {
            username: [
              { required: true, message: "登录名不能为空", trigger: "blur" }
            ],
            name: [
              { required: true, message: "姓名不能为空", trigger: "blur" }
            ],
            orgName: [
              { required: true, message: "所属部门不能为空", trigger: "blur" }
            ],
            phone: [
              { required: true, message: "手机号不能为空", trigger: "blur" },
              { validator: checkPhone, trigger: "blur" }
            ],
            email: [
              { required: true, message: "邮箱不能为空", trigger: "blur" },
              { validator: checkEmail, trigger: "blur" }
            ],
            seq:[
              { required: false },
              { validator: checkSeq, trigger: "blur" }
            ],
            ...this.dycRule
          };
        }
      }
      return rule;
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
  methods: {
    handleSizeChange(){

    },
    handleCurrentChange(){

    },
    getDeatilsInfo(){
      getDetailMore(s.data.id).then(call => {
          this.tableData = call.data.positionList.filter( s=> !s.prime);
          this.userInfo.positionList = call.data.positionList
        });
    },
    callUserName(){
      if(this.userInfo.username.length > 20){
        this.userInfo.username = this.userInfo.username.substr(0,20)
      }
    },
    changesInput(val){
      this.passCode.one = val
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
    changeNumber(){
      if(isNaN(parseInt(this.userInfo.seq)) || this.userInfo.seq > 9999 || this.userInfo.seq < 0){
        this.userInfo.seq = 0
      }
    },
    limt(){
      if(parseInt(this.userInfo.securityLevel)){
          if(parseInt(this.userInfo.securityLevel) > 255 || parseInt(this.userInfo.securityLevel) < 0){
            this.userInfo.securityLevel = 0;
             this.$message({
                  type: "error",
                  message: "安全级别输入值为0~255"
                })
          }
      }else{
        this.userInfo.securityLevel = 0;
         this.$message({
                  type: "error",
                  message: "安全级别输入值为0~255"
                })
      }
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
            changePassword({newPassword:this.passCode.one},this.data.id).then( rest => {
            if(rest.errcode == 0){
                this.$message({
                  type: "success",
                  message: "修改成功"
                })
                this.passCode = {
                  one:"",
                  two:""
                }
                this.pasCO = false;
               this.$confirm('为了避免用户无法正常登陆，请及时通知用户修改后的密码', '密码已修改完成', {
                confirmButtonText: '邮件',
                cancelButtonText: '短信',
                center: true
              }).then(() => {
                notifyTypeUser(1,this.data.id,this.$store.state.user.token).then( s=> {
                })
              }).catch(() => {
                notifyTypeUser(2,this.data.id,this.$store.state.user.token).then( s=> {
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
    testEmail(){
      this.userInfo.email = this.userInfo.email.replace(/\s+/g, "")
    },
    offLog(){
      // this.$parent.userVilible = false
      this.$parent.$refs.singleTable.setCurrentRow()
      this.$emit("update:isShow", false);
    },
    superCall(s){
      this.userInfo.superiorId = s[0].id
      this.userInfo.superiorName = s[0].name
      this.userInfo.superiorid = s[0].id
    },
	  testss(s,type){
		  this.userInfo.extraColumns[type] = s
	  },
    copysPer() {
      // if (this.userInfo.username == "" || this.userInfo.username == undefined) {
      //   this.$message.error("请填写登录名");
      // } else if (this.userInfo.name == "" || this.userInfo.name == undefined) {
      //   this.$message.error("请填写姓名");
      // } else if (
      //   this.userInfo.orgId == "" ||
      //   this.userInfo.orgId == undefined
      // ) {
      //   this.$message.error("请选择所属部门");
      // } else if (
      //   this.userInfo.phone == "" ||
      //   this.userInfo.phone == undefined
      // ) {
      //   this.$message.error("请填写手机号");
      // } else if (
      //   this.userInfo.email == "" ||
      //   this.userInfo.email == undefined
      // ) {
      //   this.$message.error("请填写邮箱");
      // } else {
        if(this.data.id == "" || this.data.id == undefined || this.nowEdits == true){
          this.submit(true)
        }else{
          this.submit(true)
        }
      // }
    },
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.userInfo.avatar = res.data;
      } else {
        this.$message.error(res.errmsg);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type ;
      const isLt2M = file.size / 1024 < 200;

      if (!["image/png", "image/jpeg", "image/jpeg", "image/gif"].includes(file.type)) {
        this.$message.error("只能上传图片!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 200KB!");
      }
      return isJPG && isLt2M;
    },
    selectInfo() {
      this.treeVisible = true;
    },
    handleNodeClick(s) {
      if (s.type == 3) {
        // 分部
        this.userInfo.orgName = s.name;
        this.userInfo.orgId = s.id;
        this.nowsId = s.id
      } else {
        // 其他
        this.$message({
          type: "warning",
          message: "用户只能挂在到部门下面"
        });
      }
    },
    copyUser(s) {
      if (s[0].positionList == undefined && s[0].roleList == undefined){
        this.$message({
          type: "warning",
          message: "该用户无角色与权限"
        })
      }else{
          updateDecent(this.data.id || this.nowIDInfo, {
             positionList: s[0].positionList,
             roleIdList: s[0].roleList.map( ss=> {
               return ss.id
             })
           }).then( reqs =>{
             if(reqs.success){
              this.$message({
                type: "success",
                message: "克隆权限成功"
              })
             }
           })
      }
    },
    superiorOpen() {
              this.ints = false
              this.superior = true
              this.ints = true
            },
    deleteRole() {
      if(this.select.role.length === 0) return this.$message({
            type: 'warning',
            message: '请先选中要删除的角色'
          });
      this.$confirm(str, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      }).then(
        s => {
          let arr = [];
          for (let ins of this.tableUser) {
            !this.select.role.includes(ins) ? arr.push(ins) : "";
          }
          // 角色修改
          this.roleIdList(arr, 1);
        },
        cal => {}
      );
    },
    deletePost() {
      if(this.select.post.length === 0) return this.$message({
            type: 'warning',
            message: '请先选中要删除的副岗位'
          });
      this.$confirm(str, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      }).then(
        s => {
          let arr = [];
          for (let ins of this.tableData) {
            !this.select.post.includes(ins) ? arr.push(ins) : "";
          }
         
          this.updataInfo(arr, 2);
        },
        cal => {}
      );

      // 副岗位修改
    },
    resetPassword() {
      getSafetyData().then( s => {
        this.pawInfo = s.data.records[0].pwdComplexity
        this.min = s.data.records[0].pwdLength
      })
      // let HTML = "<p>为了保证信息安全，请先输入管理员登录密码，方可重置用户密码</p>"
      //  this.$confirm(HTML, '重置密码', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     dangerouslyUseHTMLString: true
      //   }).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     });
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '已取消删除'
      //     });
      //   });
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
    // 123456789qwe!@
    handleSelectionChangePost(s) {
      this.select.post = s;
    },
    handleClose(){
      this.passCode.one = ""
      this.passCode.two = ""
      this.pasCO = false;
      this.$refs['formPaw'].resetFields();
      this.$emit("update:isShow", false);
    },
    handleSelectionChangeRole(s) {
      this.select.role = s;
    },
    updataInfo(ss, index) {
      let arr = JSON.parse(JSON.stringify(this.tableData));
      var _this = this;
      let positionList = [];
      let mains = [];
      let subPost = [];
      if(this.userInfo.positionList == undefined ){
        this.userInfo.positionList = []
      }
       if(index == 1){
        // 设置主岗位
        mains = [{
          ...ss[0],
          prime: true
        }]
        // 取副岗位
        subPost = this.userInfo.positionList.filter(s => !s.prime).map( resa => {
           return {
             ...resa,
            prime: false
           }
        }) || []
      }
      if (index == 3) {
        // 设置副岗位
        subPost = ss.map( resa => {
           return {
             ...resa,
            prime: false
           }
        })
        subPost = [...subPost,...this.userInfo.positionList.filter(s => !s.prime).map( resa => {
          return {
             ...resa,
            prime: false
           }
        })]
        // 取主岗位
        mains = this.userInfo.positionList.filter(s => s.prime).map( resa => {
          return {
             ...resa,
            prime: true
           }
        }) || []
      }
      if (index == 2) {
        mains = this.userInfo.positionList.filter(s => s.prime).map( resa => {
          return {
             ...resa,
            prime: true
           }
        }) || []
         // 设置副岗位
        subPost = ss.map( resa => {
           return {
             ...resa,
            prime: false
           }
        })
      }
      if(mains.length != 0){
        subPost.forEach(element => {
          if(mains[0].id != element.id){
            positionList.push(element)
          }
        });
      }else{
        positionList = subPost
      }
      
     
      // if (this.userInfo.positionList.filter(s => s.prime).length == 0) {
      //   // 没主岗位
         
      // } else {
      //   mains = this.userInfo.positionList.filter(s => s.prime)[0].id;
      //   positionList.push({
      //     id: this.userInfo.positionList.filter(s => s.prime)[0].id,
      //     prime: true
      //   });
      //   subPost.push({
      //     id: this.userInfo.positionList.filter(s => s.prime)[0].id,
      //     prime: true
      //   });
      // }
      // if (mains != "") {
      //   positionList = [
      //     ...positionList,
      //     ...this.tableData.filter(s => s.id != mains)
      //   ];
      // } else {
      //   positionList = [...positionList, ...this.tableData];
      // }
      // // 去重
      // positionList.forEach(s => {
      //   if (subPost.filter(info => info.id == s.id).length == 0) {
      //     subPost.push({
      //       ...s
      //     });
      //   }
      // });
      // positionList
      updateDecent(this.nowUser, {
        positionList: [
          ...positionList,
          ...mains
        ]
      })
        .then(
          s => {
            getDetail(s.data.id).then(call => {
              this.tableData = call.data.positionList.filter( s=> !s.prime);
              this.userInfo.positionList = call.data.positionList
            });
            if (s.errcode == 0) {
              if (index == 1) {
                // return
                this.userInfo.postIN = ss[0].fullName;
              }
              this.$message({
                type: "success",
                message: "岗位修改成功"
              });
            } else {
              if (index == 3) {
                this.tableData = arr;
              }
              if (index == 2) {
                this.tableData = arr;
              }
              this.$message({
                type: "error",
                message: s.errmsg
              });
            }
            this.$emit("reload-info");
          },
          err => {}
        )
        .catch(error => {});
    },
    roleIdList(ss, index) {
      let arr = JSON.parse(JSON.stringify(this.tableUser));
      if (index == 1) {
        this.tableUser = ss;
      } else {
        this.tableUser = [...this.tableUser, ...ss];
      }
      updateDecent(this.nowUser, {
        roleIdList: this.tableUser.map(s => {
          return s.id;
        })
      })
        .then(
          s => {
            if (s.errcode == 0) {
              this.$message({
                type: "success",
                message: "角色修改成功"
              });
              getDetail(s.data.id).then(call => {
              this.tableUser = call.data.roleList
              this.userInfo.roleIdList = call.data.roleIdList
              this.userInfo.roleList = call.data.roleList
            });
            } else {
              this.tableUser = arr;
              this.$message({
                type: "error",
                message: s.errmsg
              });
            }
            this.$emit("reload-info");
          },
          err => {}
        )
        .catch(error => {});
    },
    callUser(s) {
      // 角色新增
      this.roleIdList(s);
    },
    callsDob(s) {
      // 主岗位多选
      this.updataInfo(s, 3);
    },
    calls(s) {
      // 主岗位单选
      // this.userInfo.spName = 'ss[0].fullName';
      this.updataInfo(s, 1);
    },
    test() {
      this.shows = true;
    },
    cancel() {
      this.$emit("update:isShow", false);
    },
    close() {
      this.activeName = "a";
      this.isShowTabFlag = false;
      // this.$emit("reload-info");
      this.$emit("update:isShow", false);
    },
    // 确定并设置权限
    submitSet() {
      if (this.edit || this.nowEdits) {
        // 编辑
        if (this.userInfo.orgId === "" || this.userInfo.orgId === null) {
          this.$message({
            type: "warning",
            message: "请选择所属部门"
          });
          return false;
        }
        this.$refs["form"].validate(valid => {
          if (valid) {
			      let Ucopys =  JSON.parse(JSON.stringify(this.userInfo))
            Ucopys.superior = null
            updateDecent(this.userInfo.id, Ucopys)
              .then(res => {
                if (res.success) {
                  this.isShowTabFlag = true;
                  this.userInfo = res.data;
                  this.$message.success("用户修改信息成功");
                  this.nowUser = res.data.id;
                  this.$emit("is-submit", this.userInfo);
                this.activeName = "gwxx"
                  // this.activeName = "a"
                } else {
                  this.$message.error(res.errmsg);
                }
                this.$emit("reload-tree");
              })
              .catch(err => {});
          } else {
          }
        });
      } else {
        // 新增
        if (this.userInfo.orgId === "" || this.userInfo.orgId === null) {
          this.$message({
            type: "warning",
            message: "请选择所属部门"
          });
          return false;
        }
        this.$refs["form"].validate(valid => {
          if (valid) {
            createUser(this.userInfo)
              .then(res => {
                if (res.success) {
                  this.nowEdits = true;
                  this.userInfo = {
                    ...res.data
                  };
                  this.nowsId = res.data.orgId
                  this.$message.success("用户新增成功");
                  // this.activeName = "a";
                this.activeName = "gwxx"
                  this.nowUser = res.data.id;
                  this.$emit("is-submit", this.userInfo);
                  this.nowEdits = true;
                  // this.isShowTabFlag = true;
                } else {
                  this.$message.error(res.errmsg);
                }
                this.$emit("reload-tree");
              })
              .catch(err => {});
          } else {
          }
        });
      }
    },
    submit(clic) {
      if (this.edit || this.nowEdits) {
        // 编辑
        if (this.userInfo.orgId === "" || this.userInfo.orgId === null) {
          this.$message({
            type: "warning",
            message: "请选择所属部门"
          });
          return false;
        }
        this.$refs["form"].validate(valid => {
          if (valid) {
			    this.userInfo.superior = {};
          let baseCopy = this.userInfo;
          delete baseCopy.positionList
          delete baseCopy.roleIdList
          delete baseCopy.roleList
            updateDecent(this.userInfo.id, baseCopy)
              .then(res => {
                if (res.success) {
                  this.$message.success("用户修改信息成功");
                  if(clic == "Y"){
                    this.$emit("update:isShow", false);
                  }
                  if (typeof clic == 'boolean' ) {
                    this.copy = clic;
                  }else{
                    this.$emit("update:isShow", false);
                  }
                  this.$emit("is-submit", this.userInfo);
                } else {
                  this.$message.error(res.errmsg);
                }
                this.$emit("reload-tree");
              })
              .catch(err => {});
          } else {
          }
        });
      } else {
        // 新增
        if (this.userInfo.orgId === "" || this.userInfo.orgId === null) {
          this.$message({
            type: "warning",
            message: "请选择所属部门"
          });
          return false;
        }
        this.$refs["form"].validate(valid => {
          if (valid) {
            createUser(this.userInfo)
              .then(res => {
                if (res.success) {
                  this.userInfo = res.data
                  this.nowEdits = true;
                  this.nowsId = res.data.orgId
                  this.nowIDInfo = res.data.id;
                  this.$message.success("新增用户成功");
                    if(clic == "Y"){
                      this.$emit("update:isShow", false);
                    }
                  if (typeof clic == 'boolean' ) {
                    this.copy = clic;
                  } else{
                    this.$emit("update:isShow", false);
                  } 
                    this.$emit("is-submit", this.userInfo);
                } else {
                  this.$message.error(res.errmsg);
                }
                this.$emit("reload-tree");
              })
              .catch(err => {});
          } else {
          }
        });
      }
    }
  }
};
</script>
<style lang="scss">
.el-form-item{

line-height:19px; 
}

.avatar-uploader {
  width:220px;
  display: block;
  float: none;
  line-height: 0px;
  margin-left: 100px;
  margin-top: 10px;
} 
.avatar-uploader .el-upload {
  border: 1px dashed #409eff;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width:220px;
  height:220px;
  line-height:220px;
  text-align: center;
}
.avatar {
  width:220px;
  height:220px;
  display: block;
}
.add-user-dialog {
  .zl-input-240px {
  }
}
.add-user-dialog {
  .avatar {
    width:220px;
    height:220px;
    border-radius: 5px;
    display: table;
  }
}
.zl-compt {
  margin-bottom: 12px;
}
</style>

