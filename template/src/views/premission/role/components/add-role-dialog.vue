<template>
  <div class="add-role-dialog">
    <el-dialog :title="title" :visible="isShow" width="850px" @close="close">
      <div class="container zl-height-450">
        <el-tabs type="border-card" v-model="tabName" @tab-click="tabClick">
          <el-tab-pane label="基本信息" name="0">
            <el-form
              class="zl-form"
              :model="roleInfo"
              :rules="rules"
              label-width="120px"
              style="750px;"
              ref="form"
            >
              <el-form-item label="角色名称" prop="name">
                <el-input
                  v-model="roleInfo.name"
                  class="zl-form-control zl-input-240px"
                  placeholder="请输入角色名称"
                  :maxlength="20"
                  :disabled="isDisabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="所属分部" prop="orgName" class="required-class">
                <el-input
                  v-model="roleInfo.orgName"
                  disabled
                  placeholder="请选择角色所属分部"
                  class="zl-form-control zl-input-240px"
                >
                  <template slot="append" >
                    <div @click="tests">
                    <i class="el-icon-more pointer" @click="showTree"></i>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="类型名称" prop="category">
                <el-select :disabled="isDisabled" class="zl-form-control zl-input-240px" v-model="roleInfo.category" placeholder="请选择角色类型">
                  <el-option v-for="(item, index) in roleTypeList" :key="index" :label="item.name" :value="item.code"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="显示顺序" prop="seq">
                <el-input :disabled="isDisabled" class="zl-form-control zl-input-240px" v-model="roleInfo.seq"></el-input>
                <!-- <el-input-number :disabled="isDisabled" class="zl-form-control zl-input-240px" v-model="roleInfo.seq" controls-position="right" :min="1" :max="1000"></el-input-number> -->
              </el-form-item>
              <!-- <el-form-item>
                <el-checkbox v-model="roleInfo.sys">系统角色</el-checkbox>
              </el-form-item>-->
              <el-form-item label="角色说明" prop="remark">
                <el-input :maxlength="80" :disabled="isDisabled" style="width: 605px !important;" v-model="roleInfo.remark" class="zl-form-control" type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="功能权限" v-if="isShowTab" name="1">
            <div>
              <el-row class="mb10 fl">
                <el-button :disabled="isDisabled" class="btn-theme" @click="expandAll = true">全部展开</el-button>
                <el-button :disabled="isDisabled" class="btn-default" @click="expandAll = false">全部折叠</el-button>
              </el-row>
              <el-row class="mb10 fr">
                <el-input
                  class="zl-form-control zl-input-240px"
                  placeholder="模块，菜单，按钮"
                  :disabled="isDisabled"
                  @change="reapl"
                  v-model="sysParams.name"
                ></el-input>
                <el-button :disabled="isDisabled" class="btn-theme" @click="searchSystem" >查询</el-button>
              </el-row>
            </div>

            <el-scrollbar wrapClass="scrollbar-wrapper" class="zl-height-450">
              <tree-table
                :data="dataTree"
                :columns="columns"
                stripe
                :expand-all="expandAll"
                border
                @get-check-ids="getChcekIds"
              ></tree-table>
            </el-scrollbar>

            <!-- <el-row style="display: table; margin: 20px auto;">
              <el-button class="btn-theme" @click="setMenus">确定</el-button>
              <el-button class="btn-default" @click="cancel">取消</el-button>
            </el-row> -->
          </el-tab-pane>
          <el-tab-pane label="成员列表" v-if="isShowTab" name="2">
            <el-row class="mb10">
              <el-button :disabled="isDisabled" class="btn-theme"  @click="userVisible = true">添加成员</el-button>
              <el-button :disabled="isDisabled" class="btn-default"  @click="allDel">删除</el-button>
            </el-row>

            <el-table class="zl-table" :data="tableData" stripe @selection-change="userListChange">
              <el-table-column type="selection" align="center" header-align="center"></el-table-column>
              <el-table-column label="成员" prop="name" align="left" header-align="left"></el-table-column>
              <el-table-column label="安全级别" prop="securityLevel" align="left" header-align="left"></el-table-column>
              <el-table-column label="岗位" prop="spName" align="left" header-align="left"></el-table-column>
              <el-table-column label="所属部门" prop="orgFullName" align="left" header-align="left"></el-table-column>
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
            <!-- <el-row style="display: table; margin: 20px auto;">
              <el-button class="btn-theme" @click="updateRoleRealtionUser">确定</el-button>
              <el-button class="btn-default" @click="cancel">取消</el-button>
            </el-row> -->
          </el-tab-pane>
        </el-tabs>
      </div>

      <div slot="footer" style="text-align: center;" v-if="!isDisabled">
        <el-button class="btn-theme" @click="submit" v-if="tabName === '0' || tabName === '1'">确定</el-button>
        <el-button class="btn-default" @click="saveClone" v-if="tabName === '0'">确定并克隆权限</el-button>
        <el-button class="btn-default" @click="saveSet" v-if="tabName === '0'">确定并设置权限</el-button>
        <el-button class="btn-default" @click="cancelFunc" v-if="tabName === '0' || tabName === '1'">取消</el-button>
      </div>
    </el-dialog>
    <!-- 组织架构树 -->
    <orgTreeDialog :isShow.sync="treeVisible" @handleNodeClick="handleNodeClick" :count="0"></orgTreeDialog>
    <!-- 类别帮助 -->
    <el-dialog title="类别帮助" :visible.sync="categoryVisible" v-if="categoryVisible" width="450px">
      <zlDepartment v-if="categoryVisible" class="zl-block-center" @check-data="checkData"></zlDepartment>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-theme" @click="categoryVisible = false">确定</el-button>
        <el-button class="btn-default" @click="categoryVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <!-- 成员帮助框 -->
    <zl-help
      :isShow.sync="userVisible"
      :typeCheck="false"
      v-if="userVisible"
      positions="user"
      @submit-call="submitCall"
      :whereShows="[1,2,3]"
      :nowId="nowsId"
    />
    
    <!-- 克隆 -->
    <zl-user-help
      :isShow.sync="roles"
      :clean="true"
      :isBrn="false"
      :typeCheck="true"
      :positions="'role'"
      @submit-call="callRoles"
      :whereShows="[1,2]"
      choice="radio"
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
  delRoleUser,
  roleTypePageQuery
} from "@/api/premission";
import treeTable from "@/components/TreeTable/index";
import { validateInterAndZero, specialStrValidate } from '@/utils/validate'
export default {
  name: "add-role-dialog",
  components: { orgTreeDialog, zlDepartment, treeTable, zlUserHelp },
  props: {
    title: {
      type: String,
      default: ""
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
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateSeq2 = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback()
      } else {
        if (!validateInterAndZero(value)) {
          callback(new Error('只能输入0以及正整数'))
        } else {
          if (value < 0 || value > 9999) {
            callback(new Error('只能输入1-9999'))
          } else {
            callback()
          }
        }
      }
    }

    const validateSpecialStr = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入角色名称'))
      } else {
        if (specialStrValidate(value)) {
          callback(new Error('角色名称输入不合法'))
        } else {
          callback()
        }
      }
    }
    return {
      roles: false,
      roleInfo: this.data || {},
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }, { validator: validateSpecialStr, trigger: 'blur' }],
        category: [{ required: true, message: "请选择类型名称", trigger: "change" }],
        seq: [{ required: false },{ validator: validateSeq2, trigger: 'blur' }]
      },
      treeVisible: false,
      nowsId:"",
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
      sysParams: { name: "" },
      params: {
        page: 1,
        size: 100
      },
      roleTypeList: [],
      clone: false, // 用来标识是否点了 ”确定并克隆全选“ 这个按钮
      changeTreeFlag: false // 是否处罚过树形表格
    };
  },
  watch: {
    roles() {
      this.clone = this.roles
    },
    isShow() {
      if (this.isShow) {
        this.roleInfo = this.data;
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
    tests(){
    },
    reapl(){
      this.sysParams.name = this.sysParams.name.replace(/\s+/g,"")
    },
    cancelFunc() {
      // this.$emit("is-submit");
      this.$emit('update:isShow', false)
    },
    // 获取角色类别
    roleTypePageQuery() {
      roleTypePageQuery(this.params).then(res => {
        if (res.success) {
          this.roleTypeList = res.data.records.filter(item => {
            return item.status === 1
          })
        } else {
          this.$message.error('获取角色类别数据失败，请联系管理员。')
        }
      }).catch(err => {
      })
    },

    getChcekIds(checkList) {
      this.changeTreeFlag = true
      this.checkList = checkList;
    },

    userListChange(rows) {
      this.userIds = rows.map(val => val.id);
    },

    // 删除角色下面关联的成员
    allDel() {
      if (this.userIds.length === 0) {
        this.$message({
          type: "error",
          message: "请选择要删除的数据"
        });

        return false;
      }
      const strHtml = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除成员, 是否继续?</span>
        </p>
      `;
      this.$confirm(strHtml, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          delRoleUser(this.roleInfo.id, this.userIds)
            .then(res => {
              if (res.success) {
                this.$message.success("删除成功");
                this.getUserListByJS();
                // 
                this.$parent.reload()
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
            message: "已取消删除"
          });
        });
    },
    saveClone() {
      if (!this.roleInfo.orgId) {
        this.$message.error("请选择所属分部");
        return false;
      }
      this.clone = true
      // this.submit()
      this.baseInfo()
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
      this.updateRoleRealtionUser()
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
            this.$emit("change-role");
            this.getUserListByJS()
          } else {
            this.$message.error(res.errmsg);
          }
        })
        .catch(err => {});
    },
    // 应用查询
    searchSystem() {
      this.GroupBySys();
    },
    // 确定并设置权限
    saveSet() {
      // if (!this.roleInfo.orgId) {
      //   this.$message.error("请选择所属分部");
      //   return false;
      // }
      // if (!this.roleInfo.category) {
      //   this.$message.error("请选择类型名称");
      //   return false;
      // }
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.roleInfo.id) {
            getRoleInfoById(this.roleInfo.id).then(response => {
              if (response.success) {
                this.roleInfo = { ...response.data, ...this.roleInfo }
                updateRole(this.roleInfo.id, this.roleInfo).then(res => {
                  if (res.success) {
                    this.$message.success("角色信息修改成功");
                    // 设置完成跳转重新加载
                    this.tabName = '1';
                    this.GroupBySys();
                    this.roleInfo = res.data;
                  this.$emit("is-submit", this.roleInfo);
                  } else {
                    this.$message.error(res.errmsg);
                  }
                }).catch(err => {
                });
              } else {
                this.$message.error('获取角色信息失败，请联系管理员。')
              }
            }).catch(err => {
            })
          } else {
            addRole(this.roleInfo)
            .then(res => {
              if (res.success) {
                this.$message.success("角色新增成功");
                // 设置完成跳转重新加载
                this.tabName = '1';
                this.GroupBySys();
                this.isShowTab = true;
                this.roleInfo = res.data
                  this.$emit("is-submit", this.roleInfo);
              } else {
                this.$message.error(res.errmsg);
              }
            })
            .catch(err => {
            });
          }
        } else {
        }
      });
    },

    // 确定功能权限
    setMenus(flag) {
      let menuIds = [];
      if (this.checkList.length === 0 && !this.changeTreeFlag) {
        // 说明是没有选择功能权限，没有触发也就得不到菜单id,赋值之前的id
        this.checkList = (JSON.parse(this.roleInfo.extra) instanceof Array) ? JSON.parse(this.roleInfo.extra) : []
      }

      this.checkList.forEach(val => {
        if (!val.sys) {
          menuIds.push(val.menuId);
        }
      });
      this.roleInfo = {...this.roleInfo, ...{
        menuIds: Array.from(new Set([...menuIds])),
        extra: JSON.stringify(this.checkList)
      }}
      updateRole(this.roleInfo.id, this.roleInfo)
        .then(res => {
          this.clone = false
          if (res.success) {
            this.isShowTab = true
            if (flag) {
              this.$message.success("权限克隆成功");
            } else {
              this.$message.success("功能权限确定成功");
              // this.$emit('update:isShow', false)
                  this.$emit("is-submit", this.roleInfo);
            }
            this.roleInfo = res.data
            this.$emit("change-role");
          } else {
            if (flag) {
              this.$message.error("权限克隆失败，请联系管理员。");
            } else {
              this.$message.error("功能权限确定失败，请联系管理员。");
            }
          }
        })
        .catch(err => {});
    },
    // 获取菜单树
    GroupBySys() {
      GroupBySys(this.sysParams)
        .then(res => {
          if (res.success) {
            let menus = [];
            let ids = [];
            if (this.roleInfo.extra) {
              menus = JSON.parse(this.roleInfo.extra);
              ids = menus.map(val => val.menuId);
            }

            const loop = obj => {
              if (obj.children && obj.children.length > 0) {
                obj.children.forEach(val => {
                  if (ids.includes(val.id)) {
                    const m = menus[ids.indexOf(val.id)];
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

                  if (val.type === 1) {
                    if (val.children && val.children.length > 0) {
                      val.btns = val.children.map(item => {
                        if (ids.includes(item.id)) {
                          const m = menus[ids.indexOf(item.id)];
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
                  if (val.type !== 2) {
                    loop(val);
                  }
                });
              }
            };

            res.data.forEach(val => {
              if (ids.includes(val.id)) {
                const m = menus[ids.indexOf(val.id)];
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

    // 克隆 克隆之前需要先确定基本信息，基本信息验证通过之后在弹出帮助框
    callRoles(s) {
      if (s.length == 0) {
        this.$message({
          type: 'warning',
          message: '克隆角色的权限为空'
        })
        return false
      }
      const id = s[0].id
      getRoleInfoById(id).then(res => {
        if (res.success) {
          this.roleInfo = { ...res.data, ...this.roleInfo }
          if (!res.data.extra) {
            // this.$message.error('字段extra为null，请联系管理员查看')
			this.$message.success("权限克隆成功");
            return false
            // this.checkList = []
          }
            this.checkList = JSON.parse(res.data.extra)
          this.setMenus()
        } else {
          this.$message.error('查询角色信息失败，请联系管理员。')
        }
      }).catch(err => {

      })
    },

    submit() {
      switch(this.tabName) {
        case '0': 
          // 基本信息
          this.baseInfo()
          break
        case '1':
          // 功能权限
          this.setMenus()
          break
        case '2':
          // 成员列表
          this.isShow = false
          // this.updateRoleRealtionUser()
          break
        default: 
          break
      }
    },

    // 基本信息
    baseInfo() {
      if (!this.roleInfo.orgId) {
        this.$message.error("请选择所属分部");
        return false;
      }
      let flag = false
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.roleInfo.id) {
            // 编辑
            getRoleInfoById(this.roleInfo.id).then(response => {
              if (response.success) {
                this.roleInfo = { ...response.data, ...this.roleInfo }
                updateRole(this.roleInfo.id, this.roleInfo).then(res => {
                  if (res.success) {
                    flag = true
                    this.$message.success("角色信息修改成功");
                    this.$emit("is-submit", this.roleInfo);
                    this.isShowTab = true;
                    this.roleInfo = res.data
                    // 如果基本信息通过并且是点击了 ”确定并克隆权限“ 按钮
                    if (flag) {
                      if (this.clone) {
                        this.roles = true
                      } else {
                        this.$emit("update:isShow", false);
                      }
                    }
                  this.getUserListByJS()
                  } else {
                    this.$message.error(res.errmsg);
                  }
                }).catch(err => {
                });
              } else {
                this.$message.error('获取角色信息失败，请联系管理员。')
              }
            }).catch(err => {
            })
          } else {
            addRole(this.roleInfo)
              .then(res => {
                if (res.success) {
                  flag = true
                  this.$message.success("角色新增成功");
                  this.isShowTab = true;
                  this.$emit("is-submit", this.roleInfo);
                  this.roleInfo = res.data
                  if (flag) {
                    if (this.clone) {
                      this.roles = true
                    } else {
                      this.$emit("update:isShow", false);
                    }
                  }
                  this.getUserListByJS()
                } else {
                  this.$message.error(res.errmsg);
                }
              })
              .catch(err => {
              });
              
          }
        } else {
        }
      })
    },
    close() {
      // this.$emit("is-submit");
      this.$emit('update:isShow', false)
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
        // this.GroupBySys();
      } else if (this.tabName === "2") {
        this.getUserListByJS();
      } else {
        // TODO
      }
    }
  },
  mounted() {
    // 改为只请求一次
    this.GroupBySys();
    this.nowsId = this.roleInfo.orgId
    this.roleInfo.orgName = this.roleInfo.org_name || this.roleInfo.orgName
    this.roleTypePageQuery()
  }
};
</script>
<style lang="scss">
.add-role-dialog {
}
</style>


