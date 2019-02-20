<template>
  <div class="add-role-dialog">
    <el-dialog :title="title" :visible="isShow" width="850px" @close="close">
      <div class="container">
        <el-tabs type="card" v-model="tabName" @tab-click="tabClick">
          <el-tab-pane label="基本信息" name="0">
            <el-form
              class="zl-form"
              :model="roleInfo"
              :rules="rules"
              label-width="120px"
              ref="form"
            >
              <el-form-item label="角色名称" prop="name">
                <el-input
                  v-model="roleInfo.name"
                  class="zl-form-control zl-input-240px"
                  placeholder="请输入角色名称"
                  :maxlength="20"
                ></el-input>
              </el-form-item>
              <el-form-item label="所属机构" prop="orgName" class="required-class">
                <el-input
                  v-model="roleInfo.orgName"
                  disabled
                  placeholder="请选择角色所属机构"
                  class="zl-form-control zl-input-240px"
                >
                  <template slot="append">
                    <i class="el-icon-more pointer" @click="showTree"></i>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="类别" prop="categoryName" class="required-class">
                <el-input
                  v-model="roleInfo.categoryName"
                  disabled
                  placeholder="请选择角色类别"
                  class="zl-form-control zl-input-240px"
                >
                  <template slot="append">
                    <i class="el-icon-more pointer" @click="showCategory"></i>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="roleInfo.sys">系统角色</el-checkbox>
              </el-form-item>
              <el-form-item label="角色说明" prop="remark">
                <el-input v-model="roleInfo.remark" class="zl-form-control" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="btn-theme" @click="submit">保存</el-button>
                <el-button class="btn-default" @click="saveClone">保存并克隆权限</el-button>
                <el-button class="btn-default" @click="saveSet">保存并设置权限</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="功能权限" v-if="isShowTab" name="1">
            <div>
              <el-row class="mb10 fl">
                <el-button class="btn-theme" @click="expandAll = true">全部展开</el-button>
                <el-button class="btn-default" @click="expandAll = false">全部折叠</el-button>
              </el-row>
              <el-row class="mb10 fr">
                <el-input
                  class="zl-form-control zl-input-240px"
                  placeholder="目录，菜单，页面，按钮"
                  v-model="sysParams.name"
                ></el-input>
                <el-button class="btn-theme" @click="searchSystem" icon="el-icon-search">搜索</el-button>
              </el-row>
            </div>

            <tree-table :data="dataTree" :columns="columns" stripe :expand-all="expandAll" border @get-check-ids="getChcekIds"></tree-table>
            <el-row style="display: table; margin: 20px auto;">
              <el-button class="btn-theme" @click="setMenus">保存</el-button>
              <el-button class="btn-default" @click="cancel">取消</el-button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="成员列表" v-if="isShowTab" name="2">
            <el-row class="mb10">
              <el-button class="btn-theme" icon="el-icon-plus" @click="userVisible = true">添加成员</el-button>
              <el-button class="btn-default" icon="el-icon-delete" @click="allDel">批量删除</el-button>
            </el-row>

            <el-table class="zl-table" :data="tableData" stripe @selection-change="userListChange">
              <el-table-column type="selection" align="left" header-align="left"></el-table-column>
              <el-table-column label="成员" prop="name" align="left" header-align="left"></el-table-column>
              <el-table-column label="安全级别" prop="securityLevel" align="left" header-align="left"></el-table-column>
              <el-table-column label="岗位" prop="spName" align="left" header-align="left"></el-table-column>
              <el-table-column label="分部" prop="orgFullName" align="left" header-align="left"></el-table-column>
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
            <el-row style="display: table; margin: 20px auto;">
              <el-button class="btn-theme" @click="updateRoleRealtionUser">保存</el-button>
              <el-button class="btn-default" @click="cancel">取消</el-button>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>

    <!-- 组织架构树 -->
    <orgTreeDialog :isShow.sync="treeVisible" @handleNodeClick="handleNodeClick" :count="0"></orgTreeDialog>
    <!-- 类别帮助 -->
    <el-dialog title="类别帮助" :visible.sync="categoryVisible" v-if="categoryVisible" width="450px">
      <zlDepartment v-if="categoryVisible" class="zl-block-center" @check-data="checkData"></zlDepartment>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-default" @click="categoryVisible = false">取 消</el-button>
        <el-button class="btn-theme" @click="categoryVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 成员帮助框 -->
    <zl-help
      :isShow.sync="userVisible"
      :typeCheck="false"
      v-if="userVisible"
      positions="user"
      @submit-call="submitCall"
      :whereShows="[2,5]"
    />
    <!-- 单个角色 -->
    <!-- 角色 -->
    <zl-user-help
      :isShow.sync="roles"
      :clean="true"
      :typeCheck="true"
      :positions="'role'"
      @submit-call="callRoles"
      :whereShows="[2,5]"
    />
  </div>
</template>
<script>
import zlUserHelp from "@/components/app/zl-user-help";
import orgTreeDialog from "@/components/app/org-tree-dialog/index";
import zlDepartment from "@/components/app/zl-department/index";
import {
  getTypeList,
  addRole,
  GroupBySys,
  updateRole,
  searchSystem,
  getUserListByJS,
  updateRoleRealtionUser,
  getRoleInfoById,
  delRoleUser
} from "@/api/premission";
import treeTable from "@/components/TreeTable/index";

export default {
  name: "add-role-dialog",
  components: { orgTreeDialog, zlDepartment, treeTable, zlUserHelp },
  props: {
    title: {
      type: String,
      default: "新建角色"
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isShowTabFlag: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      roles: false,
      roleInfo: JSON.parse(JSON.stringify(this.data)),
      rules: {
        name: [{ required: true, message: "角色名称必填", trigger: "blur" }]
      },
      treeVisible: false,
      roleGroupList: [],
      categoryVisible: false,
      columns: [
        {
          text: "菜单权限",
          level: true,
          value: "noButton"
        },
        {
          text: "按钮权限",
          level: false,
          value: "button",
          width: "480px"
        }
      ],
      dataTree: [],
      expandAll: true,
      isShowTab: this.isShowTabFlag,
      keyword: "",
      tableData: [],
      userparams: {
        page: 1,
        size: 10
      },
      currentPage: 1,
      total: 0,
      userVisible: false,
      tabName: "0",
      userIds: [],
      checkList: [],
      sysParams: { name: '' }
    };
  },
  watch: {
    data() {
      this.roleInfo = JSON.parse(JSON.stringify(this.data));
    },
    isShow() {
      if (this.isShow) {
        this.roleInfo = JSON.parse(JSON.stringify(this.data));
        this.getTypeList();
      }
    },
    isShowTab() {
      if (this.isShowTab) {
        this.getUserListByJS();
      }
    },
    isShowTabFlag() {
      // 如果值为true说明是编辑
      this.isShowTab = this.isShowTabFlag;
    }
  },
  methods: {

    getChcekIds(checkList) {
      this.checkList = checkList
    },

    userListChange(rows) {
      this.userIds = rows.map(val => val.id)
    },

    // 删除角色下面关联的成员
    allDel() {
      if (this.userIds.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据'
        })

        return false
      }
      const strHtml = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除成员, 是否继续?</span>
        </p>
      `
      this.$confirm(strHtml, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        delRoleUser(this.roleInfo.id, this.userIds).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.getUserListByJS()
          } else {
            this.$message.error('删除失败，请联系管理员。')
          }
        }).catch(err => {
          console.log(err)
        }) 
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });        
      })
    },
    saveClone() {
      if (!this.roleInfo.orgId) {
        this.$message.error("请选择所属机构");
        return false;
      }
      if (!this.roleInfo.category) {
        this.$message.error("请选择类别");
        return false;
      }
      this.roles = true;
    },
    handleSizeChange(size) {
      this.userparams.size = size;
      this.getUserListByJS();
    },
    handleCurrentChange(page) {
      this.userparams.page = page;
      this.getUserListByJS();
    },
    // 添加成员
    submitCall(data) {
      let arr = [];
      data.forEach((val, index) => {
        this.tableData.forEach((item, idx) => {
          if (val.id === item.id) {
            data.splice(index, 1);
          }
        });
      });

      this.tableData = [...this.tableData, ...data];
    },
    // 成员列表
    getUserListByJS() {
      getUserListByJS(this.roleInfo.id, this.userparams)
        .then(res => {
          if (res.success) {
            this.tableData = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message.error("获取成员列表数据失败，请联系管理员。");
          }
        })
        .catch(err => {});
    },
    // 修改成员列表
    updateRoleRealtionUser() {
      const roleIds = this.tableData.map(item => item.id);
      updateRoleRealtionUser(this.roleInfo.id, roleIds)
        .then(res => {
          if (res.success) {
            this.$message.success("角色设置成员成功");
            this.$emit('change-role');
            this.$emit("update:isShow", false);
          } else {
            this.$message.error("角色设置成员失败，请联系管理员。");
          }
        })
        .catch(err => {});
    },
    // 应用搜索
    searchSystem() {
      this.GroupBySys()
    },
    // 保存并设置权限
    saveSet() {
      if (!this.roleInfo.orgId) {
        this.$message.error("请选择所属机构");
        return false;
      }
      if (!this.roleInfo.category) {
        this.$message.error("请选择类别");
        return false;
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          addRole(this.roleInfo)
            .then(res => {
              if (res.success) {
                this.$message.success("角色新增成功");
                this.isShowTab = true;
                this.roleInfo = res.data;
                this.$emit("is-submit", this.roleInfo);
              } else {
                this.$message.error("角色新增失败，请联系管理员。");
              }
            })
            .catch(err => {});
        } else {
        }
      });
    },

    // 保存功能权限
    setMenus() {
      
      let menuIds = []
      this.checkList.forEach(val => {
        if (!val.sys) {
          menuIds.push(val.menuId)
        }
      })

      updateRole(this.roleInfo.id, { menuIds: Array.from(new Set([...menuIds])), extra: JSON.stringify(this.checkList) })
        .then(res => {
          if (res.success) {
            this.$message.success("功能权限保存成功");
            this.$emit('change-role');
          } else {
            this.$message.error("功能权限保存失败，请联系管理员。");
          }
        })
        .catch(err => {});
    },
    // 获取菜单树
    GroupBySys() {
      GroupBySys(this.sysParams)
        .then(res => {
          if (res.success) {
            
            let menus = []
            let ids = []
            if (this.roleInfo.extra) {
              menus = JSON.parse(this.roleInfo.extra)
              ids = menus.map(val => val.menuId)
            }

            const loop = obj => {
              if (obj.children && obj.children.length > 0) {
                obj.children.forEach(val => {
                  if (ids.includes(val.id)) {
                    const m = menus[ids.indexOf(val.id)]
                    val.noButton = val.name;
                    val.isCheck = true;
                    val.isIndeterminate = m.isIndeterminate;
                    val.checkAll = m.checkAll;
                  } else {
                    val.noButton = val.name;
                    val.isCheck = true;
                    val.isIndeterminate = false;
                    val.checkAll = false;
                  }
                  
                  if (val.type === 2) {
                    if (val.children && val.children.length > 0) {
                      val.btns = val.children.map(item => {
                        if (ids.includes(item.id)) {
                          const m = menus[ids.indexOf(item.id)]
                          item.button = item.name;
                          item.isCheck = true;
                          item.isIndeterminate = m.isIndeterminate;
                          item.checkAll = m.checkAll;
                        } else {
                          item.button = item.name;
                          item.isCheck = true;
                          item.isIndeterminate = false;
                          item.checkAll = false;
                        }
                        return item;
                      });
                      val.children = [];
                    } else {
                      val.btns = [];
                    }
                  }
                  if (val.type !== 3) {
                    loop(val);
                  }
                });
              }
            };

            res.data.forEach(val => {

              if (ids.includes(val.id)) {
                const m = menus[ids.indexOf(val.id)]
                val.children = val.menus;
                val.noButton = val.name;
                val.isCheck = true;
                val.isIndeterminate = m.isIndeterminate;
                val.checkAll = m.checkAll;
              } else {
                val.children = val.menus;
                val.noButton = val.name;
                val.isCheck = true;
                val.isIndeterminate = false;
                val.checkAll = false;
              }
              
              loop(val);
            });

          } else {
            this.$message.error("获取功能权限菜单树失败，请联系管理员。");
          }

          this.dataTree = res.data;
        })
        .catch(err => {
          console.log(err)
        });
    },
    getAuth(data) {
      let opt = [];
      data.forEach(val => {
        opt.push(val.id);
        if (val.children) {
          val.children.forEach(el => {
            if (el.selectchecked.length) {
              opt.push(el.id);
              opt.push(el.selectchecked);
            }
          });
        }
      });
      opt = opt
        .join()
        .split(",")
        .filter(n => {
          return n;
        });
    },
    cancel() {
      this.$emit("update:isShow", false);
    },
    callRoles(s) {
      if (this.isShowTab) {
        /**
         * 编辑
         */
        getRoleInfoById(s[0].id)
          .then(
            req => {
              updateRole(this.roleInfo.id, {
                ...this.roleInfo,
                menuIds: req.data.menuIds
              }).then(s => {
                console.log(s);
                s.errcode == 0 ? (this.roleInfo.menuIds = s.data.menuIds) : "";
              });
            },
            err => {}
          )
          .catch(error => {
            console.log(error)
          });
      } else {
        /**
         * 新增
         */
        this.submit(function(s, clone) {
          getRoleInfoById(clone[0].id)
            .then(
              req => {
                updateRole(s.id, {
                  ...s,
                  menuIds: req.data.menuIds
                });
              },
              err => {}
            )
            .catch(error => {});
        }, s);
      }
    },
    submit(call, menuId) {
      if (!this.roleInfo.orgId) {
        this.$message.error("请选择所属机构");
        return false;
      }
      if (!this.roleInfo.category) {
        this.$message.error("请选择类别");
        return false;
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.isShowTab) {
            // 编辑
            updateRole(this.roleInfo.id, this.roleInfo)
              .then(res => {
                if (res.success) {
                  this.$message.success("角色修改成功");
                  this.$emit("is-submit", this.roleInfo);
                  this.$emit("update:isShow", false);
                } else {
                  this.$message.error("角色修改失败，请联系管理员。");
                }
              })
              .catch(err => {});
          } else {
            addRole(this.roleInfo)
              .then(res => {
                if (res.success) {
                  this.$message.success("角色新增成功");
                  this.$emit("is-submit", this.roleInfo);
                  if (typeof call == "function") {
                    this.$emit("update:isShowTabFlag", true);
                    this.isShowTab = true;
                    this.roleInfo = res.data
                    return call(res.data, menuId);
                  }
                  this.$emit("update:isShow", false);
                } else {
                  this.$message.error("角色新增失败，请联系管理员。");
                }
              })
              .catch(err => {});
          }
        } else {
        }
      });
    },
    close() {
      this.$emit("update:isShow", false);
    },
    handleNodeClick(obj) {
      this.roleInfo.orgId = obj.id;
      this.roleInfo.orgName = obj.name;
    },
    // 显示组织架构树
    showTree() {
      this.treeVisible = true;
    },
    // 获取类别数据
    getTypeList() {
      getTypeList()
        .then(res => {
          if (res.success) {
            this.roleGroupList = res.data;
          } else {
            this.$message.error("获取角色类别数据失败，请联系管理员。");
          }
        })
        .catch(err => {});
    },
    showCategory() {
      this.categoryVisible = true;
    },
    // 类别选中的数据
    checkData(value) {
      this.roleInfo.categoryName = value.name;
      this.roleInfo.category = value.code;
    },
    tabClick(name) {
      if (this.tabName === "0") {
      } else if (this.tabName === "1") {
        this.GroupBySys();
      } else if (this.tabName === "2") {
        this.getUserListByJS();
      } else {
        // TODO
      }
    }
  }
};
</script>
<style lang="scss">
.add-role-dialog {
}
</style>


