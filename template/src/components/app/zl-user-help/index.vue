<template>
  <el-dialog :title="title" :visible="isShow" :width="width" @close="close" class="zl-user-help">
    <div style="overflow:hidden;">
      <div class="zl-left">
        <el-tabs @tab-click="changeTabs" v-model="activeName" type="border-card">
          <el-tab-pane label="组织架构" v-if="whereShows.includes(1)" name="组织架构">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                @line-click="clicks"
              />
              <check-bm
                ref="checkBm1"
                @check-tree="reloadTree"
                @next-click="wheres"
                v-if="show"
                :checkList="infos"
                style="margin-left: 17px;margin-top:12px;height: 300px;overflow:auto;"
                :types="['atom',3]"
                :check="choice"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="按角色" v-if="whereShows.includes(2)" name="按角色">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                @line-click="clicks"
              />
              <check-bm
                ref="checkBm2"
                @check-tree="reloadTree"
                @next-click="wheres"
                v-if="show"
                :checkList="infos"
                style="margin-left: 17px;margin-top:12px;height: 300px;overflow:auto;"
                :types="['atom',1,3,2]"
                :check="choice"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="按岗位" v-if="whereShows.includes(3)" name="按岗位">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                @line-click="clicks"
              />
              <check-bm
                ref="checkBm3"
                @check-tree="reloadTree"
                @next-click="wheres"
                v-if="show"
                :checkList="infos"
                style="margin-left: 17px;margin-top:12px;height: 300px;overflow:auto;"
                :types="['atom',1,3,2]"
                :check="choice"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="当前所属部门" v-if="whereShows.includes(4)" name="当前所属部门">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                @line-click="clicks"
              />
              <check-bm
                ref="checkBm4"
                @check-tree="reloadTree"
                @next-click="wheres"
                v-if="show"
                :checkList="infos"
                style="margin-left: 17px;margin-top:12px;height: 300px;overflow:auto;"
                :types="['atom',1,3,2]"
                :check="choice"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="按类别" v-if="whereShows.includes(5)" name="按类别">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                @line-click="clicks"
              />
              <check-bm
                ref="checkBm5"
                @check-tree="reloadTree"
                @next-click="wheres"
                v-if="show"
                :checkList="infos"
                style="margin-left: 17px;margin-top:12px;height: 300px;overflow:auto;"
                :types="['atom',1,3,2]"
                :check="choice"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="按岗位类别" v-if="whereShows.includes(6)" name="按岗位类别">
            <div>
              <!-- <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                @line-click="clicks"
              />-->
              <post-type
                ref="checkBm6"
                @check-tree="reloadPost"
                @next-click="wheresPost"
                v-if="show"
                :checkList="infos"
                style="margin-left: 17px;margin-top:12px;height: 300px;overflow:auto;"
                :types="['atom',3]"
                :check="choice"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="zl-right" style="height: 404px;">
        <el-autocomplete
          class="zl-search-input"
          v-model="state4"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入搜索名称"
          @select="handleSelect"
        ></el-autocomplete>
        <el-tag
          v-for="tag in callData"
          :key="tag.name"
          closable
          class="zl-tag"
          color="white"
          @close="handleClose(tag)"
        >{{tag.name}}</el-tag>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {
  helpUser,
  positions,
  positionsOrg,
  roles,
  rolesOrg,
  getUserInfos,
  getGrouped,
  getUserOrg
} from "@/api/help";
import onLine from "@/components/app/zl-line";
import checkBm from "./components/checkBm";
import postType from "./components/postType";
import { orgsTrees } from "@/api/premission";
export default {
  name: "zl-user-help",
  props: {
    title: {
      type: String,
      default: ""
    },
    // orgId: {
    //   type: String,
    //   default: ""
    // },
    choice: {
      type: String,
      default: "checkbox"
    },
    width: {
      type: String,
      default: "1100px"
    },
    // true 多 false 单
    typeCheck: {
      type: Boolean,
      default: true
    },
    isShow: {
      type: Boolean,
      default: false
    },
    whereShows: {
      type: Array,
      default: () => {
        return [1, 2, 3, 4, 5, 6];
      }
    },
    clean: {
      type: Boolean,
      default: false
    },
    positions: {
      type: String,
      default: "user"
    }
  },
  components: { onLine, checkBm, postType },
  data() {
    return {
      orgId: "",
      // oldTree
      oldTree: {
        have: {},
        noHave: {}
      },
      // search
      restaurants: [],
      state4: "",
      timeout: null,
      //
      activeName: "组织架构",
      defId: "",
      datas: [],
      shows: false,
      index: 1,
      checkList: [],
      arrayData: [],
      show: false,
      dataInfo: [],
      infos: {},
      callData: []
    };
  },
  mounted() {
    this.activeName = [
      "组织架构",
      "按角色",
      "按岗位",
      "当前所属部门",
      "按类别",
      "按岗位类型"
    ][this.whereShows[0] - 1];
    this.loadOrgTree();
    this.loadGrouped();
  },
  methods: {
    // 按类型划分岗位加载
    loadGrouped() {
      getGrouped().then(req => {
        // 归类格式
        let s = {
          data: {
            name: "深圳智联",
            sysPositionList: req.data
          }
        };
        this.arrayData = s.data.sysPositionList;
        this.dataInfo = s.data.sysPositionList;
        this.show = true;
        ``;
        // node.value false
        function getArray(data, index, bool, types) {
          // 取反
          types++;
          data.index = index;
          data.type = types > 3 ? 3 : types;
          data.isIndeterminate = false;
          // .split("_")
          // .reverse()
          // .toString();
          data.value = bool;
          if (data.sysPositionList == undefined) {
            return "";
          } else {
            for (let ins in data.sysPositionList) {
              getArray(
                data.sysPositionList[ins],
                index + "_" + ins,
                bool,
                types
              );
            }
          }
        }
        // 正向赋值
        var types = 0;
        getArray(s.data, "root", true, types);
        this.oldTree.have = JSON.parse(JSON.stringify(s.data));
        // 反向赋值
        var types = 0;
        getArray(s.data, "root", false, types);
        this.oldTree.noHave = JSON.parse(JSON.stringify(s.data));
        // ------
        this.datas[0] = s.data;
        this.defId = s.data.id;
        this.infos = this.datas[this.datas.length - 1];
        this.shows = true;
      });
    },
    // 组织机构加载刷新
    loadOrgTree() {
      orgsTrees().then(s => {
        this.arrayData = s.data.children;
        this.dataInfo = s.data.children;
        this.show = true;
        ``;
        // node.value false
        function getArray(data, index, bool) {
          // 取反
          data.index = index;
          data.isIndeterminate = false;
          // .split("_")
          // .reverse()
          // .toString();
          data.value = bool;
          if (data.children == undefined) {
            return "";
          } else {
            for (let ins in data.children) {
              getArray(data.children[ins], index + "_" + ins, bool);
            }
          }
        }
        // 正向赋值
        getArray(s.data, "root", true);
        this.oldTree.have = JSON.parse(JSON.stringify(s.data));
        // 反向赋值
        getArray(s.data, "root", false);
        this.oldTree.noHave = JSON.parse(JSON.stringify(s.data));
        // ------
        this.datas[0] = s.data;
        this.defId = s.data.id;
        this.infos = this.datas[this.datas.length - 1];
        this.shows = true;
      });
    },
    changeTabs() {
      this.datas = [];
      this.index = 1;
      this.callData = [];
      switch (this.activeName) {
        case "组织架构":
          this.loadOrgTree();
          break;
        case "按角色":
          break;
        case "按岗位":
          break;
        case "当前所属部门":
          break;
        case "按类别":
          break;
        case "按岗位类别":
          this.loadGrouped();
          break;
      }
    },
    reloadPost(node, checkLength) {
      if (typeof node == "string") {
        this.callData = [];
        setTimeout(() => {
          this.callData = this.infos.sysPositionList.filter(s => s.id == node);
        }, 300);
        return;
      }
      // 单选
      if (node.value) {
        this.callData.filter(s => s.id == node.id).length == 0
          ? this.callData.push(node)
          : alert("有了不能重复");
      } else {
        for (let ins in this.callData) {
          if (this.callData[ins].id == node.id) {
            this.callData.splice(ins, 1);
            break;
          }
        }
      }
      let now = node.index.split("_");
      // 常量数组
      let CAN_NOT_CHANGE = [];
      now.shift();
      // depth
      for (var item in now) CAN_NOT_CHANGE[item] = now[item];
      // assignment
      function recursion(copys, index, _this, have, noHave) {
        let subscript = now.shift();
        if (copys.fullName == node.fullName) {
          copys.sysPositionList = node.isIndeterminate
            ? JSON.parse(JSON.stringify(have.sysPositionList))
            : node.value
            ? // 正向赋值
              JSON.parse(JSON.stringify(have.sysPositionList))
            : // 反向赋值
              JSON.parse(JSON.stringify(noHave.sysPositionList));
          // 上级变更选中状态
          // checkLength == _this.infos.sysPositionList.length
          //   ? // 全选
          //     CAN_NOT_CHANGE.map((s, key) => {
          //       _this.datas[key].value = true;
          //       _this.datas[key].isIndeterminate = false;
          //     })
          //   : // 非全选 下断定选还是不选
          //   checkLength == 0
          //   ? CAN_NOT_CHANGE.map((s, key) => {
          //       _this.datas[key].value = false;
          //       _this.datas[key].isIndeterminate = false;
          //     })
          //   : // 选中多个
          //     CAN_NOT_CHANGE.map((s, key) => {
          //       _this.datas[key].value = true;
          //       _this.datas[key].isIndeterminate = true;
          //     });
          // 变更选择中框非全选设置
          if (node.isIndeterminate) {
            copys.value = true;
            copys.isIndeterminate = false;
          } else {
            copys.value = node.value;
            copys.isIndeterminate = false;
          }
          return;
        } else {
          return recursion(
            copys.sysPositionList[subscript],
            ++index,
            _this,
            have.sysPositionList[subscript],
            noHave.sysPositionList[subscript]
          );
        }
      }
      recursion(this.datas[0], 1, this, this.oldTree.have, this.oldTree.noHave);
    },
    // reload tree
    reloadTree(node, checkLength) {
      if (node.type == "atom") {
        if (node.value) {
          this.callData.filter(s => s.id == node.id).length == 0
            ? this.callData.push(node)
            : alert("有了不能重复");
        } else {
          for (let ins in this.callData) {
            if (this.callData[ins].id == node.id) {
              this.callData.splice(ins, 1);
              break;
            }
          }
        }
        return;
      }
      if (typeof node == "string") {
        this.callData = [];
        setTimeout(() => {
          this.callData = this.infos.children.filter(s => s.id == node);
        }, 300);
        return;
      }
      // 单选
      if (node.value) {
        this.callData.filter(s => s.id == node.id).length == 0
          ? this.callData.push(node)
          : alert("有了不能重复");
      } else {
        for (let ins in this.callData) {
          if (this.callData[ins].id == node.id) {
            this.callData.splice(ins, 1);
            break;
          }
        }
      }
      let now = node.index.split("_");
      // 常量数组
      let CAN_NOT_CHANGE = [];
      now.shift();
      // depth
      for (var item in now) CAN_NOT_CHANGE[item] = now[item];
      // assignment
      function recursion(copys, index, _this, have, noHave) {
        let subscript = now.shift();
        if (copys.fullName == node.fullName) {
          copys.children = node.isIndeterminate
            ? JSON.parse(JSON.stringify(have.children))
            : node.value
            ? // 正向赋值
              JSON.parse(JSON.stringify(have.children))
            : // 反向赋值
              JSON.parse(JSON.stringify(noHave.children));
          // 上级变更选中状态
          // checkLength == _this.infos.children.length
          //   ? // 全选
          //     CAN_NOT_CHANGE.map((s, key) => {
          //       _this.datas[key].value = true;
          //       _this.datas[key].isIndeterminate = false;
          //     })
          //   : // 非全选 下断定选还是不选
          //   checkLength == 0
          //   ? CAN_NOT_CHANGE.map((s, key) => {
          //       _this.datas[key].value = false;
          //       _this.datas[key].isIndeterminate = false;
          //     })
          //   : // 选中多个
          //     CAN_NOT_CHANGE.map((s, key) => {
          //       _this.datas[key].value = true;
          //       _this.datas[key].isIndeterminate = true;
          //     });
          // 变更选择中框非全选设置
          if (node.isIndeterminate) {
            copys.value = true;
            copys.isIndeterminate = false;
          } else {
            copys.value = node.value;
            copys.isIndeterminate = false;
          }
          return;
        } else {
          return recursion(
            copys.children[subscript],
            ++index,
            _this,
            have.children[subscript],
            noHave.children[subscript]
          );
        }
      }
      recursion(this.datas[0], 1, this, this.oldTree.have, this.oldTree.noHave);
    },
    submit() {
      try {
        this.callData[0]["orgBM"] = this.callData[0].org.name;
        this.callData[0]["orgFB"] = this.callData[0].branchOrg.name;
      } catch (error) {}
      this.$emit("submit-call", this.callData);
      this.$emit("update:isShow", false);
      this.clean ? (this.callData = []) : "";
    },
    // 搜索触发
    querySearchAsync(queryString, cb) {
      queryString = queryString.replace(/\s+/g, "");
      if (queryString == "") return;
      let par;
      switch (this.activeName) {
        case "组织架构":
          let par = { orgId: this.defId };
          break;
      }
      // positions
      if (this.positions == "post") {
        positions({
          name: queryString,
          orgId: this.datas[this.datas.length - 1].id
        })
          .then(
            s => {
              cb(
                s.data.map(req => {
                  return {
                    ...req,
                    value: req.name
                  };
                })
              );
            },
            err => {}
          )
          .catch(error => {});
      }
      // helpUser
      if (this.positions == "user") {
        helpUser({ name: queryString })
          .then(
            s => {
              cb(
                s.data.map(req => {
                  return {
                    ...req,
                    value: req.name
                  };
                })
              );
            },
            err => {}
          )
          .catch(error => {});
      }
      if (this.positions == "role") {
        roles({ name: queryString })
          .then(
            s => {
              cb(
                s.data.map(req => {
                  return {
                    ...req,
                    value: req.name
                  };
                })
              );
            },
            err => {}
          )
          .catch(error => {});
      }
    },
    cancel() {
      this.$emit("update:isShow", false);
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    close() {
      this.$emit("update:isShow", false);
    },
    handleClose(tag) {
      // 重置
      // this.show = false;
      function recursion(target) {
        if (target.id != tag.id) {
          if (target.children == undefined) return;
          for (let i = 0; i < target.children.length; i++) {
            recursion(target.children[i]);
          }
        } else {
          target.value = false;
          target.radio = "";
        }
      }
      recursion(this.datas[0]);
      // 检查当前视图
      let copys = JSON.parse(JSON.stringify(this.infos));
      for (let i in copys.children) {
        if (copys.children[i].id == tag.id) {
          copys.children[i].value = false;
          break;
        }
      }
      this.infos = copys;
      // setTimeout( () => {
      // this.show = true;
      // },1000)
      this.callData.splice(this.callData.indexOf(tag), 1);
      for (let key in this.$refs) {
        this.$refs[key].cleanRadio();
      }
    },
    handleSelect(item) {
      if (this.typeCheck) {
        // 单个
        if (this.callData.length == 0) {
          this.callData.push(item);
        } else {
          this.$message.error("只能存在一个");
        }
      } else {
        // 多个
        if (this.callData.filter(s => s.id == item.id).length != 0) {
          this.$message.error("不能重复选择");
        } else {
          this.callData.push(item);
        }
      }
      this.state4 = "";
    },
    // seach-岗位类别
    wheresPost(s, index) {
      // this.show = false;
      this.datas[this.index] = this.datas[this.index++ - 1].sysPositionList[
        index
      ];
      this.infos = this.datas[this.datas.length - 1];
      // setTimeout(() => {
      //   this.show = true;
      // }, 1000);
    },
    // seach-组织架构
    wheres(s, index) {
      this.datas[this.index] = this.datas[this.index++ - 1].children[index];
      // 原子级选中
      if (!s.children) {
        switch (this.positions) {
          case "user":
            // 人员
            getUserOrg(s.id).then(s => {
              if (s.data.length != 0) {
                this.infos = {
                  children: s.data.map(par => {
                    return {
                      ...par,
                      fullName: par.name,
                      type: "atom",
                      value:
                        this.callData.filter(s => s.id == par.id).length == 0
                          ? false
                          : true
                    };
                  })
                };
              } else {
                // 无数据
              }
            });
            break;
          case "post":
            // 岗位
            positionsOrg(s.id).then(s => {
              if (s.data.length != 0) {
                this.infos = {
                  children: s.data.map(par => {
                    return {
                      ...par,
                      fullName: par.name,
                      type: "atom",
                      value:
                        this.callData.filter(s => s.id == par.id).length == 0
                          ? false
                          : true
                    };
                  })
                };
              } else {
                // 无数据
              }
            });
            break;
          case "role":
            rolesOrg(s.id).then(s => {
              if (s.data.length != 0) {
                this.infos = {
                  children: s.data.map(par => {
                    return {
                      ...par,
                      fullName: par.name,
                      type: "atom",
                      value:
                        this.callData.filter(s => s.id == par.id).length == 0
                          ? false
                          : true
                    };
                  })
                };
              } else {
                // 无数据
              }
            });
            break;
        }
        return;
      }
      // this.show = false;
      this.infos = this.datas[this.datas.length - 1];
      // setTimeout(() => {
      //   this.show = true;
      // }, 1000);
    },
    clicks(s) {
      this.datas = this.datas.slice(0, s);
      this.index = s;
      this.infos = this.datas[this.datas.length - 1];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/theme.scss";
.zl-user-help {
  overflow: hidden;
  min-width: 660px;
  .el-tabs--border-card {
    box-shadow: none;
    -webkit-box-shadow: none;
  }
  .zl-left {
    float: left;
    margin-left: 20px;
    width: 500px;
    .zl-check {
      margin-top: 22px;
      .zl-checkbox {
        overflow: hidden;
        float: none;
        display: block;
        margin-left: 17px;
        margin-top: 6px;
        .zl-org-icon {
          font-size: 15px;
          margin-top: 2px;
          float: right;
          color: black;
          margin-right: 90px;
          cursor: pointer;
        }
      }
    }
  }
  .zl-right {
    float: right;
    margin-right: 20px;
    width: 500px;
    border: 1px solid #dcdcdc;
    padding: 10px;
    padding-right: 0px;
    padding-top: 0px;
    .zl-search-input {
      width: 100%;
      margin-top: 12px;
    }
    .zl-tag {
      margin-right: 10px;
      margin-top: 10px;
      border: 1px solid #dcdcdc;
      color: #4e4e4e;
      .el-icon-close {
        color: #4e4e4e;
      }
    }
  }
}
.zl-line-hot {
  margin-left: 17px;
}
</style>


