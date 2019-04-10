<template>
  <div id="role-list">
      <el-dialog title="成功导入数据" :visible.sync="successInfo" width="60%" >
        <el-table
    :data="successFileInfo"
    height="250"
    border
    style="width: 100%">
    <el-table-column show-overflow-tooltip header-align="center" align="left" label="姓名" prop="name"></el-table-column>
    <el-table-column show-overflow-tooltip header-align="center" align="left" label="登录名" prop="username"></el-table-column>
    <el-table-column show-overflow-tooltip header-align="center" align="right" label="手机号" prop="phone"></el-table-column>
    <el-table-column show-overflow-tooltip header-align="center" align="left" label="邮箱" prop="email"></el-table-column>
    <el-table-column show-overflow-tooltip header-align="center" align="left" label="所属部门" prop="orgName"></el-table-column>
    <el-table-column show-overflow-tooltip header-align="center" align="right" label="显示顺序" prop="seq"></el-table-column>
    <el-table-column show-overflow-tooltip header-align="center" align="center" label="状态" prop>
      <template slot-scope="scope">
        <div>{{ scope.row.employStatus | employStatusFilter }}</div>
      </template>
    </el-table-column>
  </el-table>
        </el-dialog>
    <!-- 导入成功 -->
    
    <!-- 导入 -->
      <el-dialog title="查看导入数据" :visible.sync="successFileInf" width="60%" :before-close="handleClose">
        <el-table
        :data="uscTab"
        style="width: 100%">
        <el-table-column show-overflow-tooltip header-align="center"
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column show-overflow-tooltip header-align="center"
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column show-overflow-tooltip header-align="center"
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      </el-dialog>
    <el-dialog title="导入结果" :visible.sync="logFile" width="550px" :before-close="handleClose">
      <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2311629061,2898127055&fm=26&gp=0.jpg" style="width: 85px;display: block;margin: auto;"/>
      <h5 style="font-size: 19px;text-align: center;margin-top: 12px;">导入完成</h5>
      <p style="margin-top: 12px;text-align: center;display: block;font-size: 13px;">导入失败数据{{fileInfo.fail.length}}，导入成功{{fileInfo.success.length}}</p>
      <b style="margin-top: 12px;text-align: center;display: block;font-size: 17px;margin-bottom: 12px;">导入失败数据</b>
      <div style="position: relative;">
        <ul style="position: absolute;background: white;width: 100%;bakcground: white;z-index:99999;">
        <li style="overflow:hidden;">
          <div style="float:left;border: 1px solid black;line-height: 30px;padding: 0px 20px;width: 50%;white-space: nowrap; text-overflow:ellipsis;overflow:hidden;box-sizing:border-box;">序号</div>

          <div style="float:left;border: 1px solid black;line-height: 30px;padding: 0px 20px;width: 50%;white-space: nowrap; text-overflow:ellipsis;overflow:hidden;box-sizing:border-box;">错误信息</div>
        </li>
      </ul>
       <el-scrollbar class="mam-change" style="height: 200px;" wrap-class="scrollbar-wrapper">
      <ul style="margin-top: 30px;">
        <li v-for="(fa,index) in contextMsg" style="overflow:hidden;" :key="index">
          <div style="float:left;border: 1px solid black;line-height: 30px;padding: 0px 20px;width: 50%;white-space: nowrap; text-overflow:ellipsis;overflow:hidden;box-sizing:border-box;">{{index + 1}}</div>
        <div style="float:left;border: 1px solid black;line-height: 30px;padding: 0px 20px;width: 50%;white-space: nowrap; text-overflow:ellipsis;overflow:hidden;box-sizing:border-box;" :title="fa">{{fa}}</div>
        </li>
      </ul>
      </el-scrollbar>
      </div>
        <div style="overflow:hidden;width: 370px;margin: auto;margin-top:12px;">
          <el-button style="margin-left: 10px;float:left;" type="primary" @click="lookSuc">查看导入成功数据</el-button>
          <a v-if="fileInfo.fail.length != 0" style="margin-left: 6px;float:left;" :href="`${$store.state.vendor.failFile}?failListId=${failListId}&token=${$store.state.user.token }`">
          <el-button >导出失败数据</el-button>
        </a>
        <el-button style="margin-left: 10px;float:left;" @click="goTo">继续导入</el-button>
        </div>
      </el-dialog>
    <el-dialog title="导入" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div style="overflow:hidden;margin-bottom:12px;">
        <div style="float:left;width: 35px;">
          <svg-icon style="font-size: 30px;" class="icon" icon-class="uploads"/>
        </div>
        <div style="float:left;">
          <a :href="'static/用户信息导入模板.xlsx'">
            <el-button type="primary" style="margin-top: 6px;">下载模板</el-button>
          </a>
          <p style="margin-top: 4px;">为提高导入成功率，请先下载模板</p>
        </div>
      </div>
      <div style="overflow:hidden;margin-bottom:12px;">
        <div style="float:left;width: 35px;">
          <svg-icon style="font-size: 30px;" class="icon" icon-class="uploads"/>
        </div>
        <div style="float:left;">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="$store.state.vendor.userUpload"
            :headers="{ token: $store.state.user.token }"
            :accept="'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'"
            :file-list="fileList"
            :on-success="successFile"
            :on-change="handleChange"
            :on-remove="removes"
            :auto-upload="false"
            :before-upload="uploadBe"
            :limit="1"
			      :data="{orgId:nowId}"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传xlsx/xls文件，且不超过4M</div>
          </el-upload>
        </div>
      </div>

      <div style="overflow:hidden;">
        <el-button type="primary" style="margin-top: 12px;float: right;" @click="submitUpload">开始导入</el-button>
      </div>
    </el-dialog>
    <zl-card>
      <el-input
        class="zl-form-control zl-input-240px"
        placeholder="登录名，姓名，手机号"
        v-model="params.keyword"
        @change="reapl"
        @keyup.enter.native="queryData"
      ></el-input>
      <el-button class="btn-theme"  @click="queryData">查询</el-button>
    </zl-card>
    <zl-card>
      <el-row class="mb10">
        <el-button class="btn-theme"  @click="addUser">新增</el-button>
        <el-button @click="editInfo(false)">编辑</el-button>
        <!-- <el-button @click="editInfo(true)">查看</el-button> -->
        <el-button class="btn-default"  @click="delAllUser">删除</el-button>
        <el-button class="btn-default"  @click="dialogVisible = true">导入</el-button>
          <a style="margin-left: 6px;" :href="`${$store.state.vendor.exportFile}?token=${$store.state.user.token}&orgId=${isNowId}`">
        <el-button class="btn-default">导出</el-button>
		</a>
      </el-row>
      <el-table height="290px" class="zl-table" stripe :data="tableData"  ref="singleTable" border highlight-current-row @current-change="handChange">
      <!-- <el-table height="295px" class="zl-table" stripe :data="tableData" @selection-change="selectIds" ref="singleTable" border highlight-current-row @current-change="handChange"> -->
        <!-- <el-table-column show-overflow-tooltip header-align="center" align="center" type="selection" :selectable="checkSelection" width="55px"></el-table-column> -->
        <el-table-column show-overflow-tooltip header-align="center" align="left" label="登录名" prop="username">
          <template slot-scope="scope">
            <div>
              {{ scope.row.username }}
              <p
                class="zl-btn-stop"
                v-show="scope.row.status === 2"
              >{{ scope.row.status === 2 ? '已停用' : ''}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip header-align="center" align="left" label="姓名" prop="name"></el-table-column>
        <el-table-column show-overflow-tooltip header-align="center" align="left" label="角色">
          <template slot-scope="scope">{{ scope.row.roleList.map(item => item.name).join(',')}}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip header-align="center" align="left" label="主岗位" prop="spName"></el-table-column>
        <el-table-column show-overflow-tooltip header-align="center" align="left" label="所属部门" prop="orgName"></el-table-column>
        <el-table-column show-overflow-tooltip header-align="center" align="center" label="状态" prop>
          <template slot-scope="scope">
            <div>{{ scope.row.employStatus | employStatusFilter }}</div>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip header-align="center" label="显示顺序" prop="seq" align="right" ></el-table-column>
        <el-table-column show-overflow-tooltip header-align="center" align="center" label="操作" width="100px;">
          <template slot-scope="scope">
            <div>
              <span
                class="icon-theme"
                @click="stopFunc(scope.row)"
              >{{ scope.row.status === 1 ? '停用' : '启用'}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="zl-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="sizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </zl-card>
    <!-- 新增用户 -->
    <add-user-dialog
      :userNow="isNowId"
      :edit="edits"
      :title="titles"
      v-if="userVilible"
      :isShow.sync="userVilible"
      @is-submit="isSubmit"
      :data.sync="userInfo"
      @reload-tree="getTreeFunc"
      @reload-info="reload"
      :lock="lock"
    ></add-user-dialog>
    <!-- 编辑用户 -->
  </div>
</template>
<script>
import { getCustomUser } from "@/api/custom";
import extraColumns from "./extraColumns"
import { getRoleList } from "@/api/premission";
import { queryUserList, createUser, delAllUser, stopFunc, faillist } from "@/api/user";
import addUserDialog from "./add-user-dialog";
export default {
  name: "user-list",
  computed:{
    contextMsg(){
      var ins = []
      this.fileInfo.fail.map( fa => {
      let par = JSON.parse(fa.errorMsg);
      let msg = ""
      par.map( s => {
        msg += `${s.fieldName}-${s.msg}，`
      })
      ins.push(msg)
      })
return ins
    }
  },
  components: { addUserDialog,extraColumns },
  props: {
    orgId: {
      type: String,
      default: ""
    },
    orgName: {
      type: String,
      default: ""
    },
    nowId: {
      type: String,
      default: ""
    },
    type: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
    exData:[],
    uscTab:[],
    titles:"",
    successFileInf:false,
    pasCO:false,
      fileList: [],
      inst:0,
      sizes: 0,
      tableData: [],
      params: {
        page: 1,
        size: 10,
        orgId: this.orgId,
        keyword: ""
      },
      isNowId: "",
      failListId:"",
      successInfo:false,
      edits: false,
      total: 0,
      oldSetNow:"",
      currentPage: 1,
      userVilible: false,
      dialogVisible: false,
      successFileInfo:[],
      userInfo: {
        username: "",
        id: "",
        orgId: this.isType == 3 ? this.orgId : "",
        orgName: this.isType == 3 ? this.orgName : "",
        email: "",
        name: "",
        phone: "",
        superiorId: "",
        securityLevel: "",
        roleIdList: null,
        status: null,
        employStatus: null,
        positionList: null,
        seq: null,
        password: "",
        spName: ""
      },
      isShowTab: false,
      isType: this.type,
      ids: [],
      nowIndex:undefined,
      lock:true,
      logFile:false,
      fileInfo:{
        fail:[],
        success:[]
      }
    };
  },
  filters: {
    employStatusFilter(status) {
      let str = "";
      if (status === 1) {
        str = "临时";
      } else if (status === 2) {
        str = "试用";
      } else {
        str = "正式";
      }
      return str;
    }
  },
  watch: {
    tableData(){
    },
    // userVilible(){
    //   if(this.userVilible == false){
    //       this.nowIndex = undefined
    //   }
    // },
    nowId() {
      this.isNowId = this.nowId;
    },
    orgId() {
      this.params.page = 1;
      this.params.orgId = this.orgId;
      this.userInfo.orgId = this.orgId;
      this.userInfo.orgName = this.orgName;
      this.queryUserList();
    },
    type() {
      this.isType = this.type;
    }
  },
  methods: {
    handleChange(files,list){
        this.inst = 1
    },
    removes(s){
      this.inst = 0
    },
    reapl(){
      this.params.keyword = this.params.keyword.replace(/\s+/g,"")
    },
    lookSuc(){
      this.successInfo = true
    },
    loadFi(){
      faillist(this.fileInfo.fail).then( s=>{
      })
    },
    goTo(){
      this.fileList = []
      this.dialogVisible = true
      this.logFile = false
    },
    successFile(data){
      setTimeout( () => {
        this.inst = 0
      },500)
      this.fileList = []
      if(!data.data) return  this.$message.error(data.errmsg); 
      this.uscTab = data.data.fail
      this.failListId = data.data.failListId
      this.successFileInfo = data.data.success
      this.fileInfo = data.data
      this.dialogVisible = false;
      this.logFile = true;
      // 导入完成刷新
      this.queryUserList();
      this.getTreeFunc();
      // if()
    },
    look(){
    },
    testss(){
    },
    submitUpload() {
      if(this.inst == 0){
                this.$message.error('请先导入一个文件');
      }else{
          this.$refs.upload.submit();
      }
    },
    uploadBe(file) {
      const isLt2M = file.size / 1024 /1024 < 4;
      if (!isLt2M) {
        this.$message.error("文件大小应不超过4M");
      }
      return isLt2M;
    
    },
    handleClose() {
      this.pasCO = false
      this.logFile = false
	  this.dialogVisible = false
	  },
    getTreeFunc() {
      this.$emit("reload-tree");
    },
    editInfo(see) {
      if(see){
      this.titles = "用户详情"
      }else{
      this.titles = "编辑用户"
      }

      this.lock = see
      if(this.nowIndex == undefined || this.nowIndex < 0) return this.$message({
            type: "info",
            message: "请先选择需要编辑的内容"
          });
      let info = this.tableData[this.nowIndex]
      this.userInfo = {
        ...info,
        parentName: this.isType == 3 ? info.parentName : "",
        orgId: this.isType == 3 ? this.orgId : undefined || info.orgName,
        orgName: this.isType == 3 ? this.orgName : ""
      };
	  let base = {}
	this.exData.forEach( re => {
		base[re.colName] = ""
	})
	const def = this.userInfo.extraColumns
	this.userInfo.extraColumns ={
		...base,
		...def
	} 
      this.userVilible = true;
      this.edits = true;
    },
    stopFunc(obj) {
      // if(obj.referenced) return this.$message.error('该用户已被引用，不可以进行停用或删除操作');
      const row = JSON.parse(JSON.stringify(obj));
      let str = "";
      if (row.status === 1) {
        row.status = 2;
        str = "停用";
      } else {
        row.status = 1;
        str = "启用";
      }

      const strHtml = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>确定要${str}吗?</span>
        </p>
      `;

      this.$confirm(strHtml, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          stopFunc(row.id, row)
            .then(res => {
              if (res.success) {
                this.$message.success(`该用户${str}成功`)
                this.queryUserList();
                this.$parent.getTree();
              } else {
                this.$message.error(res.errmsg);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    checkSelection(row) {
      return row.referenced ? false : true;
    },
    selectIds(row) {
      if(row.length == 0){
       this.$refs.singleTable.setCurrentRow(4);
      }else{
       this.nowIndex = this.tableData.indexOf(row[row.length - 1])
       this.$refs.singleTable.setCurrentRow(this.tableData[this.nowIndex]);
      }
      this.ids = row.map(item => item.id);
    },
    delAllUser() {
      if (this.ids.length === 0) {
        this.$message({
          type: "error",
          message: "请选择要删除的数据"
        });
        return false;
      }

      const strHtml = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除, 是否继续?</span>
        </p>
      `;

      this.$confirm(strHtml, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          delAllUser(this.ids)
            .then(res => {
              if (res.success) {
                this.$message.success("删除成功");
                this.queryUserList();
              } else {
                this.$message.error(res.errmsg);
              }
              this.getTreeFunc();
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(size) {
      this.params.size = size;
      this.queryUserList();
    },
    handleCurrentChange(page) {
      this.params.page = page;
      this.queryUserList();
    },
    addUser() {
      this.titles = "新增用户"
	    this.lock = false
      this.userVilible = true;
      this.edits = false;
      this.userInfo = {
        username: "",
        id: "",
        orgId: this.isType == 3 ? this.orgId : "",
        orgName: this.isType == 3 ? this.orgName : "",
        email: "",
        name: "",
        phone: "",
        superiorId: "",
        securityLevel: "",
        roleIdList: null,
        status: null,
        employStatus: null,
        positionList: null,
        seq: null,
        password: ""
      };
    },
    isSubmit(data) {
      this.queryUserList();
    },
    queryData() {
      this.params.page = 1;
      this.queryUserList();
    },
    handChange(obj){
      if(obj == undefined){
        this.nowIndex = this.tableData.indexOf(this.oldSetNow)
        this.$refs.singleTable.setCurrentRow(this.tableData[this.nowIndex]);
        this.ids = [this.tableData[this.nowIndex].id]
      }else{
        this.oldSetNow = obj
        this.nowIndex = this.tableData.indexOf(obj)
        this.ids = [obj.id]
      }
    },
    // 获取用户列表
    queryUserList() {
        this.ids = []
      queryUserList(this.params)
        .then(res => {
          if (res.success) {
            this.sizes = res.data.size;
            this.total = res.data.total;
            this.tableData = res.data.records;
            // res.data.records.forEach( each => {
            // })
          } else {
            this.$message.error("获取用户列表数据失败，请联系管理员。");
          }
        })
        .catch(err => {});
    },
    reload() {
      this.queryUserList();
    }
  },
  mounted() {
  getCustomUser().then( s=> {
  if(s.success){
	this.exData = s.data
	
  }
  })
    this.queryUserList();
  }
};
</script>
<style lang="scss">
.zl-newUser {
  .zl-header {
    width: 75px;
    border-radius: 500px;
    height: 75px;
    margin: auto;
    display: block;
  }
  .zl-loadHeader {
    display: block;
    margin: auto;
    margin-top: 12px;
  }
  .zl-userTable {
    margin-top: 14px;
  }
}
</style>


