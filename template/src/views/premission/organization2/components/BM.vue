<template>
  <div id="bm">
    <BM-diallog
      :isShow.sync="zlShow"
      :isNews="isNews"
      v-if="zlShow"
      @is-submit="isSubmit"
      :data="JSON.parse(JSON.stringify(zlData))"
      :title="zlTitle"
      :parentName="pars"
    />
    <!-- {{info}} -->
    <BM-diallog
      :isShow.sync="zlEditShow"
      v-if="zlEditShow"
      @is-submit="isEdit"
      :isStatus="true"
      :data="JSON.parse(JSON.stringify(info))"
      :title="zlEditTitle"
      :parentName="info.parent.name"
    />
    <!-- 下级部门编辑 -->
    <BM-diallog
      :isShow.sync="zlEditSubBM"
      v-if="zlEditSubBM"
      @is-submit="isEditSubBM"
      :isStatus="true"
      :data="JSON.parse(JSON.stringify(zlEditSubData))"
      title="编辑下级部门"
      :isDisabled="isDisabled"
      :parentName="info.name"
    />
      <!-- :parentName="editsName" -->
    <el-tabs v-model="activeName" type="border-card" @tab-click="tabChange">
      <el-tab-pane label="部门信息" name="0">
        <el-row class="mb10" style="overflow:hidden;">
          <el-button
            class="btn-theme"
            style="float:left;"
            @click="zlChange('新增同级部门', 'parent')"
            v-if="hidden || has"
          >新增同级部门</el-button>
          <el-button
          style="float:left;margin-left: 10px;"
          class="btn-default"  @click="zlEditClick('编辑部门',1)">编辑部门</el-button>
          <el-button
            style="float:left;margin-left: 10px;"
            class="btn-default"
            @click="stopFunc(info, 'parent')"
          >{{ info.status === 1 ? '停用' : '启用' }}</el-button>
        </el-row>
        <zl-card isHeader icon="department" title="基本信息" style="margin: 0;">
          <zl-info label="简称" :info="info.name"></zl-info>
          <zl-info label="全称" :info="info.fullName"></zl-info>
          <zl-info :label="wheres" :info="info.parent.name"></zl-info>
          <!-- <zl-info label="上级部门" :info="info.superFB"></zl-info> -->
          <zl-info label="显示顺序" :info="info.seq"></zl-info>
          <zl-info label="部门编号" :info="info.code"></zl-info>
          <zl-info label="部门负责人" :info="info.principalName"></zl-info>
          <zl-info label="部门分管领导" :info="info.leaderName"></zl-info>
        </zl-card>
      </el-tab-pane>
      <el-tab-pane label="下级部门" name="1">

        <el-row class="mb10" style="overflow:hidden;">
          <!-- <el-button class="btn-theme"  @click="zlChange('新增同级部门')">新增同级部门</el-button> -->
          <el-button class="btn-theme" style="float:left;" @click="zlChange('新增部门')">新增部门</el-button>
          <el-button class="btn-default" style="float:left;margin-left: 10px;" @click="editBM(false, '编辑下级部门')">编辑</el-button>
          <!-- <el-button class="btn-default" style="float:left;margin-left: 10px;" @click="editBM(true, '查看下级部门')">查看</el-button> -->
          <el-button class="btn-default" style="float:left;margin-left: 10px;" @click="delAllSubBM">删除</el-button>
        </el-row>
        <el-table 
          :data="tableDataXJFB" 
          class="zl-table" 
          @selection-change="selectIds"
          @current-change="handChange"
          @row-click="clickRow"
          highlight-current-row 
          stripe 
          border>
          <!-- <el-table-column
            :selectable="checkSelection"
            type="selection"
            width="55"
            align="center"
            header-align="center"
          ></el-table-column> -->
          <el-table-column label="部门简称" prop="name" align="left" header-align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>
                {{ scope.row.name }}
                <p class="zl-btn-stop" v-show="scope.row.status === 2">{{ scope.row.status === 2 ? '已停用' : ''}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="部门全称" prop="fullName" align="left" header-align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="部门编号" prop="code" align="left" header-align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="显示顺序" prop="seq" align="right" header-align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" prop align="center" header-align="center">
            <template slot-scope="scope">
              <!-- <span class="icon-theme" @click="editFB(scope.row)">编辑</span>
              <i class="zl-icon-line"></i> -->
              <span class="icon-theme"@click="stopFunc(scope.row)">{{ scope.row.status === 1 ? '停用' : '启用'}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          style="margin-bottom: 2px;"
          class="zl-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="岗位" name="2">
        <el-row class="mb10" style="overflow: hidden;">
          <el-select v-model="postParams.refPostId" clearable placeholder="请选择岗位类型" class="zl-form-control zl-input-240px" style="float:left;">
        <el-option v-for="item in refPostIds" :key="item.id" :label="item.name" :value="item.id" v-show="item.status === 1"></el-option>
        </el-select>
          <el-input
            class="zl-form-control zl-input-220px"
            placeholder="岗位简称，岗位全称"
            v-model="postParams.keyword"
            @change="reap"
            style="float:left;"
          ></el-input>
          <!-- <el-input
            class="zl-form-control zl-input-220px"
            placeholder=""
            v-model="postParams.fullName"
            @change="reapl"
            style="float:left;margin-left:10px;"
          ></el-input> -->
          <el-button
          style="float:left;margin-left:10px;"
          class="btn-theme"  @click="queryPostData">查询</el-button>
        </el-row>
        <el-table :data="tableDataPost" class="zl-table" stripe border>
          <el-table-column label="岗位简称" prop="name" align="left" header-align="center"></el-table-column>
          <el-table-column label="岗位全称" prop="fullName" align="left" header-align="center"></el-table-column>
          <!-- <el-table-column label="所属职务" prop align="left" header-align="center"></el-table-column> -->
          <el-table-column label="岗位类型" align="left" header-align="center">
            <template slot-scope="scope">
              <div>
                {{ scope.row.refPost ? scope.row.refPost.name : '' }}
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          style="margin-bottom: 2px;"
          class="zl-pagination"
          @size-change="handleSizeChangePost"
          @current-change="handleCurrentChangePost"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="postTotal">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="用户列表" name="3">
        <!-- <zl-card>
          
        </zl-card>-->
        <el-row class="mb10" style="overflow:hidden;">
          <el-input
            class="zl-form-control zl-input-220px"
            placeholder="登录名，姓名，手机号"
            suffix-
            v-model="userParams.keyword"
            style="float:left;"
          ></el-input>
          <el-button class="btn-theme" style="float:left;margin-left:10px;" @click="queryUserList">查询</el-button>
        </el-row>
        <!-- <zl-card>
          
        </zl-card>-->
        <el-table :data="userList" class="zl-table" stripe border>
          <el-table-column label="登录名" prop="username" align="left" header-align="center"></el-table-column>
          <el-table-column label="姓名" prop="name" align="left" header-align="center"></el-table-column>
          <!-- <el-table-column label="编号" prop="id" align="left" header-align="center" width="180"></el-table-column> -->
          <el-table-column label="状态" align="center" header-align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.employStatus | employStatusFilter}}</div>
            </template>
          </el-table-column>
          <el-table-column label="直接上级" prop="shang" align="left" header-align="center"></el-table-column>
          <el-table-column label="岗位" prop="spName" align="left" header-align="center"></el-table-column>
          <el-table-column label="显示顺序" prop="seq" align="right" header-align="center"></el-table-column>
          <el-table-column label="安全级别" prop="securityLevel" align="right" header-align="center"></el-table-column>
        </el-table>

        <el-pagination
          style="margin-bottom: 2px;"
          background
          class="zl-pagination"
          @size-change="handleSizeChangeUser"
          @current-change="handleCurrentChangeUser"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userTotal"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getPost, deleteAllOrgs } from "@/api/premission";
import { queryUserList } from "@/api/user";
import BMDiallog from "./BM-dialog";
import { getBzJobList } from "@/api/job";

export default {
  name: "bm",
  components: { BMDiallog },
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    hidden: {
      type:Boolean,
      default: false
    },
    has:{
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      isNews: false,
      zlShow: false,
      editsName:"",
      currentPage: 1,
      total: 0,
      hav:JSON.parse(sessionStorage.getItem("userInfo")).sys,
      zlTitle: "",
      pars:"",
      tableDataPost: [],
      parentName:"",
      zlData: {},
      tableData: [],
      activeName: "",
      tableDataXJFB: [],
      subBMParams: { page: 1, size: 10 },
      zlEditShow: false,
      zlEditData: JSON.parse(JSON.stringify(this.info)),
      zlEditTitle: "",
      refPostIds:[],
      parent: "",
      ids: [],
      userParams: {
        page: 1,
        size: 10,
        orgId: this.info.id,
        keyword: "",
        status: 1
      },
      userList: [],
      userTotal: 0,
      userIds: [],
      postParams: {
        size: 10,
        page: 1,
        orgId: this.info.id,
        name: null,
        fullName: null
      },
      postTotal: 0,
      zlEditSubBM: false,
      isDisabled: false,
      zlEditSubData: {} // 下级部门对象
    };
  },
  watch: {
    tableDataPost (){
      console.log(this.tableDataPost,'tableDataPosttableDataPost')
    },
    info: {
      handler() {
        this.wheres = this.info.parent.type == 3 ? "上级部门" : "所属分部"
        this.activeName = "0";
      },
      deep: true
    }
  },
  filters: {
    employStatusFilter(type) {
      let str = "";
      if (type === 1) {
        str = "临时";
      } else if (type === 2) {
        str = "试用";
      } else if (type === 3) {
        str = "正式";
      } else {
        str = "未知";
      }
      return str;
    }
  },
  methods: {
    searchGW(){
      let params = {
        page: 1,
        size: 10000
      };
      getBzJobList(params).then(res => {
        this.refPostIds = res.data.records
      });
    },
    reapl(){
      this.postParams.fullName = this.postParams.fullName.replace(/\s+/g,"")
    },
    reap(){
      this.postParams.name = this.postParams.name.replace(/\s+/g,"")
    },
    isEditSubBM(data) {
      this.$store
        .dispatch("EditOrgs", data)
        .then(response => {
          if (response.code === 0) {
            this.$message.success('下级部门编辑成功')
            this.zlEditSubData = response.data
            this.GetSubDeptList()
            this.$emit('get-tree')
            this.zlEditSubBM = false
          } else {
            this.$message.error(response.message)
          }
        })
        .catch(err => {
        });
    },
    clickRow(row) {
      if (row.id) {
        this.$store.dispatch('GetOrgInfo', row.id).then(res => {
          if (res.code === 0) {
            this.zlEditSubData = res.data.info
          } else {
            this.$message({
              type: 'warning',
              message: res.errmsg
            })
          }
        }).catch(err => {
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择部门'
        })
      }
    },
    editBM(flag, title) {
      this.isDisabled = flag
      if (!this.zlEditSubData.id) {
        if (flag) {
          this.$message({
            type: 'warning',
            message: '请选择要查看的数据'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请选择要修改的数据'
          })
        }
      } else {
        this.editFB(JSON.parse(JSON.stringify(this.zlEditSubData)), title)
      }
    },
    // 根据id获取组织信息
    getOrgInfo() {
      this.$store.dispatch('GetOrgInfo', this.info.id).then(res => {
        if (res.code === 0) {
          this.zlEditData = res.data.info
          this.parentName = res.data.info.parent.name
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      })
    },
    // 根据关键字查询用户
    queryUserList() {
      this.userParams.page = 1;
      this.queryUserList();
    },
    // 下级部门停用启用
    stopFunc(obj, parent = null) {
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
          this.$store
            .dispatch("EditOrgs", row)
            .then(res => {
              if (res.code === 0) {
                this.$message.success(`${str}成功`);
                if (parent === 'parent') {
                  this.getOrgInfo();
                } else {
                  this.GetSubDeptList();
                }

                this.$emit("get-tree");

              } else {
                this.$message.error(res.errmsg);
              }
            })
            .catch(err => {
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    checkSelection(row, index) {
      return row.referenced ? false : true;
    },
    selectIds(row) {
      this.ids = row.map(item => item.id);
    },
    handChange(obj){
this.ids = [obj.id]
    },
    // 删除下级部门
    delAllSubBM() {
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
          <span>此操作将永久删除部门, 是否继续?</span>
        </p>
      `;

      this.$confirm(strHtml, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          deleteAllOrgs(this.ids)
            .then(res => {
              if (res.success) {
                this.$message.success("部门删除成功");
                this.GetSubDeptList();
                this.$emit("get-tree");
                this.ids=[]
              } else {
                this.$message.error(res.errmsg)
              }
            })
            .catch(err => {
                this.$message.error(res.errmsg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editFB(s, title) {
      this.zlEditData = s;
      this.zlEditTitle = title;
      this.zlEditSubBM = true;
    },
    handleSizeChange(size) {
      this.subBMParams.size = size;
      this.GetSubDeptList();
    },
    handleCurrentChange(page) {
      this.subBMParams.page = page;
      this.GetSubDeptList();
    },
    zlChange(s, ins) {
      if(ins == "parent"){
this.pars = this.info.parent.name
      }else{
this.pars = this.info.name
      }
      this.parent = ins;
      ins == 1 ? (this.zlData = this.info) : (this.zlData = {});
      this.zlTitle = s;
      this.zlShow = true;
      this.isNews = true;
    },
    zlEditClick(s, ins) {
      ins == 1 ? (this.zlEditData) : (this.zlEditData = {});
      this.zlEditTitle = s;
      this.zlEditShow = true;
    },
    isEdit(data) {
      this.$store
        .dispatch("EditOrgs", data)
        .then(response => {
          if (response.code === 0) {
            this.$message.success('部门编辑成功')
            this.zlEditData = response.data
            this.$emit('get-tree')
            this.zlEditShow = false
          } else {
            this.$message.error(response.message)
          }
        })
        .catch(err => {
        });
    },
    isSubmit(data) {
      if (this.parent === "parent") {
        data.pid = this.info.pid;
      } else {
        data.pid = this.info.id;
      }
      data.type = 3;
      this.$store
        .dispatch("AddOrgs", data)
        .then(res => {
          if (res.code === 0) {
            this.$message.success("部门新增成功");
            this.zlShow = false;
            if (this.parent === 'parent') {
              this.$emit('get-tree')
            } else {
              this.GetSubDeptList();
            }
            this.zlShow = false
          } else {
            this.$message.error(res.errmsg);
          }
          this.$emit("get-tree");
        })
        .catch(err => {
        });
    },
    handleSizeChangePost(size) {
      this.postParams.size = size
      this.getPostDef()
    },
    handleCurrentChangePost(page) {
      this.postParams.page = page
      this.getPostDef()
    },
    getPostDef() {
      this.postParams.orgId = this.info.id
      this.postParams.status = 1
      getPost(this.postParams).then(s => {
        if (s.success) {
          this.tableDataPost = s.data.records;
          this.postTotal = s.data.total
        } else {
          this.$message.error(s.errmsg)
        }
      });
    },
    queryPostData() {
      this.postParams.page = 1
      this.getPostDef()
    },
    // 获取下级部门
    GetSubDeptList() {
      this.subBMParams.id = this.info.id;
      this.$store
        .dispatch("GetSubDeptList", this.subBMParams)
        .then(res => {
          if (res.code === 0) {
            this.tableDataXJFB = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message.error("获取下级部门数据失败，请联系管理员。");
          }
        })
        .catch(err => {
        });
    },
    handleSizeChangeUser(size) {
      this.userParams.size = size;
      this.queryUserList();
    },
    handleCurrentChangeUser(page) {
      this.userParams.page = page;
      this.queryUserList();
    },
    // 根据部门id查询部门下面的用户
    queryUserList() {
      this.userParams.orgId = this.info.id
      queryUserList(this.userParams)
        .then(res => {
          if (res.success) {
            this.userList = res.data.records.map( res => {
              if(res.superior){
                  res.shang = res.superior.name
                }else{
                  res.shang = "暂无上级"
                }
                return res
              }
            )
            this.userTotal = res.data.total;
          } else {
            this.$message.error("获取部门下面的用户数据失败，请联系管理员。");
          }
        })
        .catch(err => {
        });
    },
    tabChange() {
      switch (parseInt(this.activeName)) {
        case 0:
          break;
        case 1:
          this.GetSubDeptList();
          break;
        case 2:
          this.getPostDef();
          break;
        case 3:
          this.queryUserList();
          break;
      }
    }
  },
  mounted() {
    this.searchGW()
    this.wheres = this.info.parent.type == 3 ? "上级部门" : "所属分部"
  }
};
</script>
<style lang="scss">
#bm {
}
</style>

