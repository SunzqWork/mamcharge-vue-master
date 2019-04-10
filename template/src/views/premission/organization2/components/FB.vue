<template>
  <div id="fb">
    <el-tabs type="border-card">
      <el-tab-pane label="分部信息">
        <el-row class="mb10" style="overflow:hidden;">
          <el-button class="btn-theme" style="float:left;" @click="addFB" v-if="hidden">新增同级分部</el-button>
          <el-button class="btn-default" style="float:left;margin-left: 10px;" @click="editFB">编辑分部</el-button>
          <el-button
            class="btn-default"
            @click="stopFB(fbInfo)"
            style="float:left;margin-left: 10px;"
          >{{ fbInfo.status === 1 ? '停用' : '启用'}}</el-button>
        </el-row>
        <zl-card isHeader icon="subsidiary" title="基本信息" style="margin: 0;">
          <!-- {{fbInfo}} -->
          <zl-info label="简称" :info="fbInfo.name"></zl-info>
          <zl-info label="全称" :info="fbInfo.fullName"></zl-info>
          <zl-info label="上级分部" :info="parentName"></zl-info>
          <zl-info label="显示顺序" :info="fbInfo.seq"></zl-info>
          <zl-info label="分部编号" :info="fbInfo.code"></zl-info>
          <zl-info label="限制用户数" :info="fbInfo.staffLimit"></zl-info>
        </zl-card>
      </el-tab-pane>
      <el-tab-pane label="下级分部">
        <el-row class="mb10" style="overflow:hidden;">
          <!-- <el-button class="btn-theme"  @click="addFB">新增同级分部</el-button> -->
          <el-button class="btn-theme" style="float:left;" @click="addSubFB">新增分部</el-button>
          <el-button class="btn-default" style="float:left;margin-left: 10px;" @click="new_edit(false, '编辑下级分部')">编辑</el-button>
          <!-- <el-button class="btn-default" style="float:left;margin-left: 10px;" @click="new_edit(true, '查看下级分部')">查看</el-button> -->
          <el-button class="btn-default" style="float:left;margin-left: 10px;" @click="deleteAllOrgs('分部')">删除</el-button>
        </el-row>
        <el-table 
          :data="subFBTableData" 
          class="zl-table" 
          highlight-current-row 
          @current-change="clickRow"  
          stripe 
          border>
          <!-- <el-table 
          :data="subFBTableData" 
          class="zl-table" 
          @selection-change="selectIds"
          highlight-current-row 
          @current-change="clickRow"  
          stripe 
          border> -->
          <!-- <el-table-column
            :selectable="checkSelection"
            type="selection"
            width="55"
            align="center"
            header-align="center"
          ></el-table-column> -->
          <el-table-column label="分部简称" prop="name" align="left" header-align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>
                {{ scope.row.name }}
                <p class="zl-btn-stop" v-show="scope.row.status === 2">{{ scope.row.status === 2 ? '已停用' : ''}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="分部全称" prop="fullName" align="left" header-align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="分部编号" prop="code" align="left" header-align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="显示顺序" prop="seq" align="right" header-align="center"></el-table-column>
          <el-table-column label="操作" prop align="center" header-align="center">
            <template slot-scope="scope">
              <!-- <span class="icon-theme" @click="editSubFB(scope.row)">编辑</span>
              <i class="zl-icon-line"></i> -->
              <span class="icon-theme" @click="stopFunc(scope.row,1)">{{ scope.row.status === 1 ? '停用' : '启用'}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="zl-pagination"
          style="margin-bottom: 2px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="下级部门">

        <el-row class="mb10" style="overflow:hidden;">
          <el-button class="btn-theme" style="float:left;" @click="addBM">新增部门</el-button>
          <el-button class="btn-default" style="float:left;margin-left:10px;" @click="edit(false, '编辑下级部门')">编辑</el-button>
           <!-- <el-button class="btn-default" style="float:left;margin-left:10px;" @click="edit(true, '查看下级部门')">查看</el-button> -->
          <el-button class="btn-default" style="float:left;margin-left:10px;" @click="deleteAllOrgs('部门')">删除</el-button>
        </el-row>
        <el-table 
          :data="bmTableData" 
          class="zl-table" 
          highlight-current-row 
          @current-change="clickRowMB"
          stripe 
          border>
          <!-- <el-table 
          :data="bmTableData" 
          class="zl-table" 
          @selection-change="selectIds2" 
          highlight-current-row 
          @current-change="clickRowMB"
          stripe 
          border> -->
          <!-- <el-table-column
            :selectable="checkSelection"
            type="selection"
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
          <el-table-column label="当前用户数" prop="staffCount" align="right" header-align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="显示顺序" prop="seq" align="right" header-align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" prop align="center" header-align="center">
            <template slot-scope="scope">
              <!-- <span class="icon-theme" @click="subBMEdit(scope.row)">编辑</span>
              <i class="zl-icon-line"></i> -->
              <span class="icon-theme" @click="stopFunc(scope.row)">{{ scope.row.status === 1 ? '停用' : '启用'}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="zl-pagination"
          style="margin-bottom: 2px;"
          @size-change="handleSizeChangeBM"
          @current-change="handleCurrentChangeBM"
          :current-page="currentPageBM"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalBM"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增分部 -->
    <FB-dialog
      title="新增分部"
      :isShow.sync="fbVisible"
      v-if="fbVisible"
      width="850px"
      @is-submit="isSubmit"
      :parentName="parentName"
    ></FB-dialog>
    <!-- 编辑分部 -->
    <FB-dialog
      title="编辑分部"
      :isShow.sync="fbVisibleEdit"
      v-if="fbVisibleEdit"
      :parentName="parentName"
      :data="JSON.parse(JSON.stringify(fbInfo))"
      width="850px"
      :isDisabled="isDisabled"
      @is-submit="isSubmitEdit"
    ></FB-dialog>
    <!-- 新增分部 -->
    <FB-dialog
      title="新增分部"
      :isShow.sync="fbVisibleSub"
      v-if="fbVisibleSub"
      width="850px"
      @is-submit="isSubmitSub"
      :parentName="fbInfo.name"
    ></FB-dialog>
    <!-- 新增部门 -->
    <BM-dialog
      title="新增部门"
      :isShow.sync="bmVisible"
      v-if="bmVisible"
      :parentName="fbInfo.name"
      width="850px"
      @is-submit="isSubmitBM"
    ></BM-dialog>
    <!-- 编辑下级部门 -->
    <BM-dialog
      :title="bmTitle"
      :isShow.sync="subBmVisible"
      v-if="subBmVisible"
      :parentName="fbInfo.name"
      width="850px"
      @is-submit="isSubmitBMEdit"
      :isDisabled="isDisabled"
      :data="JSON.parse(JSON.stringify(subBMInfo))"
    ></BM-dialog>
    <!-- 编辑下级分部 -->
    <FB-dialog
      :title="fbTitle"
      :isShow.sync="editSubFBVisible"
      v-if="editSubFBVisible"
      :parentName="fbInfo.name"
      width="850px"
      :data="JSON.parse(JSON.stringify(subFBInfo))"
      :isDisabled="isDisabled"
      @is-submit="isSubmitSubEdit"
    ></FB-dialog>
  </div>
</template>
<script>
import FBDialog from "./FB-dialog";
import BMDialog from "./BM-dialog";
import { deleteAllOrgs, stopFunc } from "@/api/premission";
export default {
  name: "fb",
  components: { FBDialog, BMDialog },
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    hidden: {
      type:Boolean,
      default: false
    }
  },
  data() {
    return {
      fbInfo: this.info,
      subFBTableData: [],
      bmTableData: [],
      fbVisible: false,
      fbVisibleEdit: false,
      fbVisibleSub: false,
      subFBParams: { page: 1, size: 10 },
      subBMParams: { page: 1, size: 10 },
      currentPage: 1,
      total: 0,
      bmVisible: false,
      bmInfo: {},
      totalBM: 0,
      currentPageBM: 1,
      editSubFBVisible: false,
      subFBInfo: {},
      subBMInfo: {},
      subBmVisible: false,
      ids: [],
      isDisabled: false,
      fbTitle: '编辑下级分部',
      bmTitle: '编辑下级部门'
    };
  },
  watch: {
    info() {
      this.fbInfo = this.info;
      if(!this.info.parent){
        this.parentName = this.info.fullName
      }else{
        this.parentName = this.info.parent.name
      }
      this.GetSubOrgList();
      this.GetSubDeptList();
    }
  },
  methods: {
    clickRow(row) {
      this.ids = [row.id]
      this.subFBInfo = row
    },
    new_edit(flag, title) {
      this.isDisabled = flag
      if (!this.subFBInfo.id) {
        if (flag) {
          this.$message({
            type: 'warning',
            message: '请选择要查看的数据'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请选择要编辑的数据'
          })
        }
      } else {
        this.editSubFB(JSON.parse(JSON.stringify(this.subFBInfo)), title)
      }
    },

    clickRowMB(row) {
      this.ids = [row.id]
      this.subBMInfo = row
    },

    edit(flag, title) {
      this.isDisabled = flag
      if (!this.subBMInfo.id) {
        if (flag) {
          this.$message({
            type: 'warning',
            message: '请选择要查看的数据'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请选择要编辑的数据'
          })
        }
      } else {
        this.subBMEdit(JSON.parse(JSON.stringify(this.subBMInfo)), title)
      }
    },
    // 根据id获取组织信息
    getOrgInfo() {
      this.$store.dispatch('GetOrgInfo', this.fbInfo.id).then(res => {
        if (res.code === 0) {
          this.fbInfo = res.data.info
          this.parentName = res.data.info.parent.name
          
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
      })
    },
    // 停用分部
    stopFB(obj) {
      // 下级部门停用启用
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
                this.$message.success(`该部门${str}成功`);
                this.getOrgInfo();
              } else {
                this.$message.error(res.message);
              }
                this.$emit("get-tree");
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
    handleSizeChange(size) {
      this.subFBParams.size = size;
      this.GetSubOrgList();
    },
    handleCurrentChange(page) {
      this.subFBParams.page = page;
      this.GetSubOrgList();
    },
    handleSizeChangeBM(size) {
      this.subBMParams.size = size;
      this.GetSubDeptList();
    },
    handleCurrentChangeBM(page) {
      this.subBMParams.page = page;
      this.GetSubDeptList();
    },
    // 停用
    stopFunc(obj,ins) {
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
                this.$message.success(`${ins == 1 ? '该分部' : '该部门'}${str}成功`);
                if (row.type === 3) {
                  this.GetSubDeptList();
                } else {
                  this.GetSubOrgList();
                }
              } else {
                this.$message.error(res.message);
              }
          this.$emit("get-tree");
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
    editSubFB(obj, title) {
      this.editSubFBVisible = true;
      this.fbTitle = title
      this.subFBInfo = obj;
    },
    selectIds(selection, row) {
      this.ids = [];
      this.ids = selection.map(item => item.id);
    },
    selectIds2(selection, row) {
      this.ids = [];
      this.ids = selection.map(item => item.id);
    },
    // 删除
    deleteAllOrgs(tip) {
      if (this.ids.length === 0) {
        this.$message({
          type: "warning",
          message: `请选择要删除的${tip}`
        });
        return false;
      }
      const str = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除, 是否继续?</span>
        </p>
      `;
      this.$confirm(str, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          deleteAllOrgs(this.ids)
            .then(res => {
              if (res.success) {
                this.$message.success("删除成功");
                this.GetSubOrgList();
                this.ids = []
                this.GetSubDeptList();
                this.$emit("get-tree");
              } else {
                this.$message.error(res.message)
              }
            })
            .catch(err => {
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑下级分部
    isSubmitSubEdit(data) {
      this.$store
        .dispatch("EditOrgs", data)
        .then(response => {
          if (response.code === 0) {
            this.$message.success("下级分部编辑成功");
            this.GetSubOrgList();
            this.editSubFBVisible = false
            this.$emit("get-tree");
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
        });
    },
    addBM() {
      this.bmVisible = true;
    },
    // 新增部门
    isSubmitBM(data) {
      data.pid = this.info.id;
      data.type = 3;
      this.$store
        .dispatch("AddOrgs", data)
        .then(res => {
          if (res.code === 0) {
            this.$message.success("部门新增成功");
            this.bmVisible = false;
            this.GetSubDeptList();
            this.$emit("get-tree");
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
        });
    },
    // 编辑部门
    subBMEdit(obj, title) {
      this.subBmVisible = true;
      this.bmTitle = title
      this.subBMInfo = obj;
    },
    isSubmitBMEdit(data) {
      this.$store
        .dispatch("EditOrgs", data)
        .then(response => {
          if (response.code === 0) {
            this.$message.success("下级部门编辑成功");
            this.GetSubDeptList();
            this.subBmVisible = false
            this.$emit("get-tree");
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(err => {
        });
    },
    addFB() {
      this.fbVisible = true;
      this.fbVisibleEdit = false;
    },
    // 新增分部
    isSubmit(data) {
      data.pid = this.info.pid;
      data.type = 2;
      this.$store
        .dispatch("AddOrgs", data)
        .then(res => {
          if (res.code === 0) {
            this.$message.success("分部新增成功");
            this.fbVisible = false;
            this.fbVisibleSub = false;
            this.$emit("get-tree");
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
        });
    },
    editFB() {
      this.fbVisibleEdit = true;
      this.fbVisible = false;
    },
    // 编辑分部
    isSubmitEdit(data) {
      this.$store
        .dispatch("EditOrgs", data)
        .then(response => {
          if (response.code === 0) {
            this.$message.success("分部编辑成功");
            this.getOrgInfo()
            this.fbVisibleEdit = false
            this.$emit("get-tree");
          } else {
            this.$message.error(response.message)
          }
        })
        .catch(err => {
        });
    },
    addSubFB() {
      this.fbVisibleSub = true;
    },
    // 新增分部
    isSubmitSub(data) {
      data.pid = this.info.id;
      data.type = 2;
      this.$store
        .dispatch("AddOrgs", data)
        .then(res => {
          console.log(res,'300300')
          if (res.code === 0) {
            this.$message.success("下级分部新增成功");
            this.fbVisible = false;
            this.fbVisibleSub = false;
            this.GetSubOrgList();
            this.$emit("get-tree");
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
        });
    },
    // 获取下级分部
    GetSubOrgList() {
      this.subFBParams.id = this.fbInfo.id;
      this.$store
        .dispatch("GetSubOrgList", this.subFBParams)
        .then(res => {
          if (res.code === 0) {
            this.subFBTableData = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message.error("获取下级分部数据失败，请联系管理员。");
          }
        })
        .catch(err => {
        });
    },

    // 获取下级部门
    GetSubDeptList() {
      this.subBMParams.id = this.info.id;
      this.$store
        .dispatch("GetSubDeptList", this.subBMParams)
        .then(res => {
          if (res.code === 0) {
            this.bmTableData = res.data.records;
            this.totalBM = res.data.total;
          } else {
            this.$message.error("获取下级部门数据失败，请联系管理员。");
          }
        })
        .catch(err => {
        });
    }
  },
  mounted() {
    this.fbInfo = this.info;
      if(!this.info.parent){
        this.parentName = this.info.fullName
      }else{
        this.parentName = this.info.parent.name
      }
    this.GetSubOrgList();
    this.GetSubDeptList();
  }
};
</script>
<style lang="scss">
#fb {
}
</style>

