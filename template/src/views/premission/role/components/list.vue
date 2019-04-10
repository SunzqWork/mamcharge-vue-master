<template>
  <div id="role-list">
    <zl-card>
      <el-select class="zl-form-control zl-input-240px" v-model="params.category" clearable placeholder="请选择角色类型">
        <el-option v-for="(item, index) in roleTypeList" :key="index" :label="item.name" :value="item.code"></el-option>
      </el-select>
      <el-input class="zl-form-control zl-input-240px" placeholder="角色名称" @change="reapl" v-model="params.keyword" @keyup.enter.native="search"></el-input>
      <el-button class="btn-theme"  @click="search">查询</el-button>
    </zl-card>
    <zl-card>
      <el-row class="mb10">
        <el-button class="btn-theme"  @click="addRole" >新增</el-button>
        <el-button class="btn-default"  @click="edit(false)">编辑</el-button>
        <!-- <el-button class="btn-default"  @click="edit(true)">查看</el-button> -->
        <el-button class="btn-default"  @click="delAllRole">删除</el-button>
      </el-row>
      <el-table 
        class="zl-table" 
        :data="tableData" 
        stripe 
        border
        highlight-current-row 
        @current-change="clickRow" 
          align="center"
        header-align="center"
        :height="tableHeight">
        <!-- <el-table 
        class="zl-table" 
        :data="tableData" 
        @selection-change="selectionFunc" 
        stripe 
        border
        highlight-current-row 
        @current-change="clickRow" 
          align="center"
        header-align="center"
        :height="tableHeight"> -->
        <!-- <el-table-column
          :selectable="checkSelection"
          type="selection"
          align="center"
          header-align="center"
          style="width: 40px;"
        ></el-table-column> -->
        <el-table-column label="角色名称"  prop="name" align="left" header-align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>
              {{ scope.row.name }}
              <p
                class="zl-btn-stop"
                v-show="scope.row.status === 2"
              >{{ scope.row.status === 2 ? '已停用' : ''}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色类型"  prop align="left" header-align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>{{ typeFilter(scope.row.category) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="所属分部" prop="orgName"  align="left" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="成员数量" prop="userCount"  align="right" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="功能权限数量" prop="menuCount"  align="right" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" prop align="center" header-align="center" >
          <template slot-scope="scope">
            <!-- <span class="icon-theme" @click="getRoleInfoById(scope.row, scope.row.id)">编辑</span>
            <i class="zl-icon-line"></i> -->
            <span
              class="icon-theme"
              @click="stopRole(scope.row)"
            >{{ scope.row.status === 1 ? '停用' : '启用'}}</span>
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
    </zl-card>
    <!-- 新增角色 -->
    <add-role-dialog
      :isShow.sync="roleVilible"
      :title="'新增角色'"
      v-if="roleVilible"
      :data="data"
      @is-submit="isSubmit"
    ></add-role-dialog>
    <!-- 修改角色 -->
    <add-role-dialog
      :isShow.sync="roleVilibleEdit"
      v-if="roleVilibleEdit"
      @is-submit="isSubmit"
      :title="titles"
      :isDisabled="isDisabled"
      :data="roleInfo"
      @change-role="changeRole"
      :isShowTabFlag.sync="editIsShowTabFlag"
    ></add-role-dialog>
  </div>
</template>
<script>
import {
  getRoleList,
  delAllRole,
  getTypeList,
  updateRole,
  getRoleInfoById
} from "@/api/premission";
import addRoleDialog from "./add-role-dialog";
import { roleTypePageQuery } from "@/api/premission";
export default {
  name: "role-list",
  components: { addRoleDialog },
  props: {
    orgId: {
      type: String,
      default: ""
    },
    orgName: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tableData: [],
      params: {
        page: 1,
        size: 10,
        orgId: this.orgId,
        keyword: "",
        category: ""
      },
      total: 0,
      currentPage: 1,
      titles:"",
      roleVilible: false,
      data: {
        orgId: this.orgId,
        org_name: this.orgName,
        sys: false
      },
      ids: [],
      typeList: [],
      roleTypeList:[],
      roleInfo: {},
      roleVilibleEdit: false,
      editIsShowTabFlag: false,
      keyword: "",
      height: 350,
      isDisabled: false
    }
  },
  computed: {
    tableHeight() {
      return this.$store.state.app.$th
    }
  },
  watch: {
    orgId() {
      this.params.orgId = this.orgId;
      this.data.orgId = this.orgId;
      this.data.orgName = this.orgName;
      this.getRoleList();
    },
    tableData(data) {
      this.$store.dispatch('action_set_table_height', data.length)
    }
  },
  methods: {
    roleTypePageQuery() {
      let params = {
        page: 1,
        size: 100
      }
      roleTypePageQuery(params).then(res => {
        if (res.success) {
          this.roleTypeList = res.data.records.filter(item => {
            return item.status === 1
          })
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      })
    },
    reapl(){
      this.params.keyword = this.params.keyword.replace(/\s+/g,"")
    },
    reload(){
      this.getRoleList();
    this.getTypeList();
    },
    clickRow(row) {
      this.ids = [row.id]
      this.roleInfo = row
    },
    edit(flag) {
      if(flag){
        // 查看
        this.titles = '查看角色';
      }else{
        // 编辑
        this.titles = '编辑角色';
      }
      this.isDisabled = flag
      if (!this.roleInfo.id) {
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
        this.getRoleInfoById(JSON.parse(JSON.stringify(this.roleInfo)), this.roleInfo.id)
      }
    },
    // 当角色数据发生变化
    changeRole() {
      this.getRoleList();
    },
    handleSizeChange(size) {
      this.params.size = size;
      this.getRoleList();
    },
    handleCurrentChange(page) {
      this.params.page = page;
      this.getRoleList();
    },
    typeFilter(category) {
      let str = "";
      this.typeList.forEach(item => {
        if (Number(item.code) === Number(category)) {
          str = item.name;
        }
      });
      return str;
    },
    addRole() {
      this.data =  {
        orgId: this.orgId,
        org_name: this.orgName,
        sys: false
      }
      this.roleVilible = true;
    },
    isSubmit() {
      this.getRoleList();
    },
    search() {
      this.params.page = 1;
      this.getRoleList();
    },
    // 查询角色
    getRoleInfoById(row) {
      getRoleInfoById(row.id)
        .then(res => {
          if (res.success) {
            this.editIsShowTabFlag = true;
            this.roleVilibleEdit = true;
            this.roleInfo = res.data;
            this.roleInfo.categoryName = row.categoryName;
          } else {
            this.$message.error("获取角色信息失败，请联系管理员。");
          }
        })
        .catch(err => {
        });
    },
    // 停用角色
    stopRole(obj) {
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
          updateRole(row.id, row)
            .then(res => {
              if (res.success) {
                this.$message.success(`${str}成功`);
                this.getRoleList();
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
    // 类别
    getTypeList() {
      getTypeList()
        .then(res => {
          if (res.success) {
            this.typeList = res.data;
          } else {
            this.$message.error("获取类别数据失败，请联系管理员。");
          }
        })
        .catch(err => {
        });
    },
    getRoleList() {
      getRoleList(this.params)
        .then(res => {
          if (res.success) {
            this.tableData = res.data.records.map(item => {
              // item.orgName = this.orgName;
              return item;
            });
            this.total = res.data.total;
          } else {
            this.$message.error("获取角色列表数据失败，请联系管理员。");
          }
        })
        .catch(err => {
        });
    },
    selectionFunc(selection, row) {
      this.ids = selection.map(item => item.id);
    },
    checkSelection(row, index) {
      return row.referenced ? false : true;
    },
    // 删除角色
    delAllRole() {
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
          <span>此操作将永久删除角色, 是否继续?</span>
        </p>
      `;
      this.$confirm(strHtml, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          delAllRole(this.ids)
            .then(res => {
              if (res.success) {
                this.$message.success("删除成功");
                this.getRoleList();
                this.ids = [];
              } else {
                if (res.errcode === 4014) {
                  this.$message.error(res.errmsg)
                } else {
                  this.$message.error("删除失败，请联系管理员。");
                }
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
    }
  },
  mounted() {
    this.getRoleList();
    this.getTypeList();
    this.roleTypePageQuery();
  }
};
</script>
<style lang="scss">
#role-list {
}
</style>


