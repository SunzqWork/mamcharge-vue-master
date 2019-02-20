<template>
  <div id="bm">
    <BM-diallog
      :isShow.sync="zlShow"
      :isNews="isNews"
      v-if="zlShow"
      @is-submit="isSubmit"
      :data="JSON.parse(JSON.stringify(zlData))"
      :title="zlTitle"
      :parentName="info.parent.name"
    />
    <BM-diallog
      :isShow.sync="zlEditShow"
      v-if="zlEditShow"
      @is-submit="isEdit"
      :isStatus="true"
      :data="JSON.parse(JSON.stringify(zlEditData))"
      :title="zlEditTitle"
      :parentName="info.parent.name"
    />
    <el-tabs v-model="activeName" type="border-card" @tab-click="tabChange">
      <el-tab-pane label="部门信息" name="0">
        <el-row class="mb10">
          <el-button
            class="btn-theme"
            icon="el-icon-plus"
            @click="zlChange('新建同级部门', 'parent')"
          >新建同级部门</el-button>
          <el-button class="btn-default" icon="el-icon-edit" @click="zlEditClick('编辑部门',1)">编辑部门</el-button>
          <el-button
            class="btn-default"
            icon="el-icon-warning"
            @click="stopFunc(info, 'parent')"
          >{{ info.status === 1 ? '停用' : '启用' }}</el-button>
        </el-row>
        <zl-card isHeader icon="department" title="基本信息" style="margin: 0;">
          <zl-info label="简称" :info="info.name"></zl-info>
          <zl-info label="全称" :info="info.fullName"></zl-info>
          <zl-info label="上级分部" :info="info.parent.name"></zl-info>
          <zl-info label="上级部门" :info="info.superFB"></zl-info>
          <zl-info label="显示顺序" :info="info.seq"></zl-info>
          <zl-info label="部门编号" :info="info.code"></zl-info>
          <zl-info label="部门负责人" :info="info.principalName"></zl-info>
          <zl-info label="部门分管领导" :info="info.leaderName"></zl-info>
        </zl-card>
      </el-tab-pane>
      <el-tab-pane label="下级部门" name="1">

        <el-row class="mb10">
          <el-button class="btn-theme" icon="el-icon-plus" @click="zlChange('新建同级部门')">新建同级部门</el-button>
          <el-button class="btn-theme" icon="el-icon-plus" @click="zlChange('新建下级部门')">新建下级部门</el-button>
          <el-button class="btn-default" icon="el-icon-delete" @click="delAllSubBM">批量删除</el-button>
        </el-row>
        <el-table :data="tableDataXJFB" class="zl-table" @selection-change="selectIds" stripe>
          <el-table-column
            :selectable="checkSelection"
            type="selection"
            width="55"
            align="left"
            header-align="left"
          ></el-table-column>
          <el-table-column label="分部简称" prop="name" align="left" header-align="left">
            <template slot-scope="scope">
              <div>
                {{ scope.row.name }}
                <p class="zl-btn-stop" v-show="scope.row.status === 2">{{ scope.row.status === 2 ? '已停用' : ''}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="分部全称" prop="fullName" align="left" header-align="left"></el-table-column>
          <el-table-column label="分部编号" prop="code" align="left" header-align="left"></el-table-column>
          <el-table-column label="显示顺序" prop="seq" align="left" header-align="left"></el-table-column>
          <el-table-column label="操作" prop align="left" header-align="left">
            <template slot-scope="scope">
              <span class="icon-theme" @click="editFB(scope.row)">编辑</span>
              <i class="zl-icon-line"></i>
              <span class="icon-theme"@click="stopFunc(scope.row)">{{ scope.row.status === 1 ? '停用' : '启用'}}</span>
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
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="岗位" name="2">

        <el-row class="mb10">
          <el-input
            class="zl-form-control zl-input-220px"
            placeholder="岗位名称"
            v-model="postParams.name"
          ></el-input>
          <el-input
            class="zl-form-control zl-input-220px"
            placeholder="岗位全称"
            v-model="postParams.fullName"
          ></el-input>
          <el-button class="btn-theme" icon="el-icon-search" @click="queryPostData">查询</el-button>
        </el-row>

        <el-table :data="tableDataPost" class="zl-table" stripe>
          <el-table-column label="岗位简称" prop="name" align="left" header-align="left"></el-table-column>
          <el-table-column label="岗位全称" prop="fullName" align="left" header-align="left"></el-table-column>
          <!-- <el-table-column label="所属职务" prop align="left" header-align="left"></el-table-column> -->
          <el-table-column label="岗位类别" align="left" header-align="left">
            <template slot-scope="scope">
              <div>
                {{ scope.row.refPost.name }}
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
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
        <el-row class="mb10">
          <el-input
            class="zl-form-control zl-input-220px"
            placeholder="关键字搜索"
            suffix-icon="el-icon-search"
            v-model="userParams.keyword"
          ></el-input>
          <el-button class="btn-theme" icon="el-icon-search" @click="queryUserList">查询</el-button>
        </el-row>
        <!-- <zl-card>
          
        </zl-card>-->
        <el-table :data="userList" class="zl-table" stripe>
          <el-table-column label="用户名" prop="username" align="left" header-align="left"></el-table-column>
          <el-table-column label="姓名" prop="name" align="left" header-align="left"></el-table-column>
          <el-table-column label="编号" prop="id" align="left" header-align="left" width="180"></el-table-column>
          <el-table-column label="性别" prop="gender" align="left" header-align="left"></el-table-column>
          <el-table-column label="状态" align="left" header-align="left">
            <template slot-scope="scope">
              <div>{{ scope.row.employStatus | employStatusFilter}}</div>
            </template>
          </el-table-column>
          <el-table-column label="直接上级" prop="superior" align="left" header-align="left"></el-table-column>
          <el-table-column label="岗位" prop align="left" header-align="left"></el-table-column>
          <el-table-column label="显示顺序" prop="seq" align="left" header-align="left"></el-table-column>
          <el-table-column label="安全级别" prop="securityLevel" align="left" header-align="left"></el-table-column>
        </el-table>

        <el-pagination
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

export default {
  name: "bm",
  components: { BMDiallog },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isNews: false,
      zlShow: false,
      currentPage: 1,
      total: 0,
      zlTitle: "",
      tableDataPost: [],
      zlData: {},
      tableData: [],
      activeName: "",
      tableDataXJFB: [],
      subBMParams: { page: 1, size: 10 },
      zlEditShow: false,
      zlEditData: JSON.parse(JSON.stringify(this.info)),
      zlEditTitle: "",
      parent: "",
      ids: [],
      userParams: {
        page: 1,
        size: 10,
        orgId: this.info.id,
        keyword: ""
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
      postTotal: 0
    };
  },
  watch: {
    info: {
      handler() {
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
    // 根据id获取组织信息
    getOrgInfo() {
      this.$store.dispatch('GetOrgInfo', this.info.id).then(res => {
        if (res.code === 0) {
          this.zlEditData = res.data.info
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        console.log(err)
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
              } else {
                this.$message.error(res.message);
              }
              this.$emit("get-tree");
            })
            .catch(err => {
              console.log(err);
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
    // 批量删除下级部门
    delAllSubBM() {
      if (this.ids.length === 0) {
        this.$message({
          type: "warning",
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
              } else {
                this.$message.error("部门删除失败，请联系管理员。");
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editFB(s) {
      this.zlEditData = s;
      this.zlEditTitle = "部门编辑";
      this.zlEditShow = true;
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
          } else {
            this.$message.error(response.message)
          }
        })
        .catch(err => {
          console.log(err);
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
            this.$message.success("部门新建成功");
            if (this.parent === 'parent') {
              this.$emit('get-tree')
            } else {
              this.GetSubDeptList();
            }
          } else {
            this.$message.error(res.message);
          }
          this.$emit("get-tree");
        })
        .catch(err => {
          console.log(err);
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
      getPost(this.postParams).then(s => {
        if (s.success) {
          this.tableDataPost = s.data.records;
          console.log()
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
          console.log(err);
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
      queryUserList(this.userParams)
        .then(res => {
          if (res.success) {
            this.userList = res.data.records;
            this.userTotal = res.data.total;
          } else {
            this.$message.error("获取部门下面的用户数据失败，请联系管理员。");
          }
        })
        .catch(err => {
          console.log(err);
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
  mounted() {}
};
</script>
<style lang="scss">
#bm {
}
</style>

