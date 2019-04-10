<template>
  <el-dialog :title="title" :visible="isShow" :width="width" @close="close" class="zl-user-help">
    <div style="overflow:hidden;">
      <div class="zl-left">
        <el-tabs @tab-click="changeTabs" v-model="activeName" type="border-card">
          <el-tab-pane label="按组织架构" v-if="whereShows.includes(1)" name="按组织架构">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                :insNow="1"
                @line-click="clicks"
              />
              <check-bm
                :personnel="person"
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
          <el-tab-pane label="按角色类型" v-if="whereShows.includes(2)" name="按角色类型">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                :insNow="2"
                @line-click="clicks"
              />
              <role-type
                ref="checkBm2"
                @check-tree="reloadTree"
                @next-click="wheresRole"
                v-if="show"
                :checkList="infos"
                style="margin-left: 17px;margin-top:12px;height: 300px;overflow:auto;"
                :types="['atom',3]"
                :check="choice"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="按岗位类型" v-if="whereShows.includes(3)" name="按岗位类型">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                :insNow="3"
                @line-click="clicks"
              />
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
          <el-tab-pane label="按当前所属部门" v-if="whereShows.includes(4) && nowId != '' " name="按当前所属部门">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                :insNow="4"
                @line-click="clicks"
              />
              <check-bm
                :personnel="person"
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
          <el-tab-pane label="按类型" v-if="whereShows.includes(5)" name="按类型">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                :insNow="5"
                @line-click="clicks"
              />
              <check-bm
                :personnel="person"
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
          <el-tab-pane label="按岗位类型cop" v-if="whereShows.includes(6)" name="按岗位类型cop">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                :insNow="6"
                @line-click="clicks"
              />
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
          <el-tab-pane label="按部门" v-if="whereShows.includes(7)" name="按部门">
            <div>
              <on-line
                v-if="shows"
                class="zl-line-hot"
                :index.sync="index"
                :data="datas"
                :insNow="7"
                @line-click="clicks"
              />
              <only-bm
                :personnel="person"
                ref="checkBm1"
                @check-tree="reloadTree"
                @next-click="whereOrg"
                v-if="show"
                :checkList="infos"
                style="margin-left: 17px;margin-top:12px;height: 300px;overflow:auto;"
                :types="[3]"
                :check="choice"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="zl-right" style="height: 404px;">
        <el-autocomplete
          class="zl-search-input"
          v-model="stateSea"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入查询名称"
          @select="handleSelect"
          popper-class="load-custom"
        >
        <template slot-scope="{ item }">
          <div v-if="positions == 'user'">
            <div class="header">
              <img :src="item.avatar">
            </div>
            <div class="detail">
              <span :class="`name${item.name}`" >{{ item.name | focus(`name${item.name}`) }}</span>
              <span :class="`phone${item.phone}`" >{{ item.phone | focus(`phone${item.phone}`) }}</span>
              <span :class="`org${item.org}`" >{{ item.orgFullName | focus(`org${item.org}`) }}</span>
            </div>
          </div>
          <div v-if="positions == 'role'">
            <div class="header">
              <img :src="`http://192.168.1.214:3312/test.png`" >
              <!-- item.avatar -->
            </div>
            <div class="details">
              <span :class="`name${item.name}`" >{{ item.name | focus(`name${item.name}`) }}</span>
              <span :class="`org${item.org}`" >{{ item.orgName | focus(`org${item.org}`) }}</span>
            </div>
          </div>
          <div v-if="positions == 'post'">
            <div class="header">
              <img :src="`http://192.168.1.214:3312/test.png`" >
            </div>
            <div class="detailsRole">
              <span :class="`name${item.name}`" >{{ item.name | focus(`name${item.name}`) }}</span>
            </div>
          </div>
        </template>
      </el-autocomplete>
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
      <el-button type="primary" @click="submit" class="btn-theme">确 定</el-button>
      <el-button @click="cancel" class="btn-default">取 消</el-button>
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
  getUserOrg,
  getRoTree,
  getGroupedHelper,
  getRoHelper,
  getGroupedHelperMsgUser,
  getGroupedHelperMsgOrg,
  getGroupedHelperMsgPosition,
  getGroupedHelperMsgRole,
  getExampleUser,
  getUserOrgId
} from "@/api/help";
import onLine from "@/components/app/zl-line";
import loadCustom from "./components/loadCustom";
import onlyBm from "./components/onlyBm";
import checkBm from "./components/checkBm";
import postType from "./components/postType";
import roleType from "./components/roleType";
import { orgsTrees,orgsTreesDep } from "@/api/premission";
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
    isBrn:{
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
    nowId: {
      type: String,
      default: ""
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
  components: { onLine, checkBm, postType, roleType, onlyBm, loadCustom },
  data() {
    return {
      person: true,
      orgId: "",
      // oldTree
      oldTree: {
        have: {},
        noHave: {}
      },
      userInfoSession: JSON.parse(sessionStorage.getItem("userInfo")),
      // search
      restaurants: [],
      stateSea: "",
      timeout: null,
      //
      activeName: "按组织架构",
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
  filters:{
    posts:function(val,className){
        if(new RegExp(window.Sea).test(val)){
            setTimeout(() => {
              document.getElementsByClassName('load-custom')[0].getElementsByClassName(className)[0].innerHTML = val.replace(window.Sea,`<b style="color:#2494e0;">${window.Sea}</b>`)
            }, 100);

          }else{
            return val
          }
    },
    focus:function (val,className){
      if(new RegExp(window.Sea).test(val)){
        setTimeout(() => {
          document.getElementsByClassName('load-custom')[0].getElementsByClassName(className)[0].innerHTML = val.replace(window.Sea,`<b style="color:#2494e0;">${window.Sea}</b>`)
        }, 100);

      }else{
        return val
      }
    }
  },
  mounted() {
    this.activeName = [
      "按组织架构",
      "按角色类型",
      "按岗位类型",
      "按当前所属部门",
      "按类型",
      "按岗位类型类型",
      "按部门"
    ][this.whereShows[0] - 1];
    this.changeTabs();
    this.positions == "user" ? (this.person = false) : (this.person = true);
  },
  watch: {
    stateSea() {
      window.Sea = this.stateSea
    },
    isShow() {
      this.changeTabs();
    }
  },
  methods: {
    // 按岗位类型
    loadGroupedHelper() {
      getGroupedHelper().then(req => {
        return;
        // 归类格式
        let s = {
          data: {
            name: JSON.parse(sessionStorage.getItem("userInfo")).orgName,
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
    // 按类型划分岗位加载
    loadGrouped() {
      getGrouped().then(req => {
        // 归类格式
        let s = {
          data: {
            name: JSON.parse(sessionStorage.getItem("userInfo")).orgName,
            sysPositionList: req.data
          }
        };
        this.arrayData = s.data.sysPositionList;
        this.dataInfo = s.data.sysPositionList;
        this.show = true;
        ``;
        // node.value false
        function getArray(data, index = 'err', bool, types, posi) {
          // 取反
          types++;
            data.index = index;
          if(types > 3){
				    data.type = 3
			    }else{
				    if(posi == "post" && types == 3 ){
            data.type = 'atom'
            }else{
            data.type = types
            }
			    }
          data.isIndeterminate = false;
          data.value = bool;
          if (data.sysPositionList == undefined) {
            return "";
          } else {
            for (let ins in data.sysPositionList) {
              getArray(
                data.sysPositionList[ins],
                index + "_" + ins,
                bool,
                types,
                posi
              );
            }
          }
        }
        // 正向赋值
        var types = 0;
        getArray(s.data, "root", true, types,this.positions);
        this.oldTree.have = JSON.parse(JSON.stringify(s.data));
        // 反向赋值
        var types = 0;
        getArray(s.data, "root", false, types,this.positions);
        this.oldTree.noHave = JSON.parse(JSON.stringify(s.data));
        // ------
        this.datas[0] = s.data;
        this.defId = s.data.id;
        this.infos = this.datas[this.datas.length - 1];
        this.shows = true;
      });
    },
    // 选部门
    loadOrgTreeOnly() {
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
    // 所属部门
    loadOrgDy() {
      if (this.userInfoSession == "" || this.userInfoSession == undefined) {
        this.$message.error("无法查询到当前用户信息");
      } else {
        orgsTrees(this.nowId).then(s => {
          if(s.data.children == undefined){
            this.wheres(s.data)
          }
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
      }
    },
    // 组织机构加载刷新
    loadOrgTree() {
      orgsTreesDep(this.isBrn).then(s => {
        if(s.data.children == undefined){
            this.wheres(s.data)
          }
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
    // 按角色类型
	loadRoleTree() {
      //       getRoTree
      // getRoHelper
      getRoTree().then(req => {
        let s = {
          data: {
            name: JSON.parse(sessionStorage.getItem("userInfo")).orgName,
            roleList: req.data
          }
        };
        this.arrayData = s.data.roleList;
        this.dataInfo = s.data.roleList;
        this.show = true;
        ``;
        // node.value false
        function getArray(data, index, bool, types, posi) {
          // 取反
          types++;
          data.index = index;
          if(types > 3){
				    data.type = 3
			    }else{
				    if(posi == "role" && types == 3 ){
            data.type = 'atom'
            }else{
            data.type = types
            }
			    }
          data.isIndeterminate = false;
          // .split("_")
          // .reverse()
          // .toString();
          data.value = bool;
          if (data.roleList == undefined) {
            return "";
          } else {
            for (let ins in data.roleList) {
              getArray(data.roleList[ins], index + "_" + ins, bool, types, posi);
            }
          }
        }
        // 正向赋值
        var types = 0;
        getArray(s.data, "root", true, types, this.positions);
        this.oldTree.have = JSON.parse(JSON.stringify(s.data));
        // 反向赋值
        var types = 0;
        getArray(s.data, "root", false, types, this.positions);
        this.oldTree.noHave = JSON.parse(JSON.stringify(s.data));
        // ------
        this.datas[0] = s.data;
        this.defId = s.data.id;
        this.infos = this.datas[this.datas.length - 1];
        this.shows = true;
      });
    },
    changeTabs() {
      this.shows = false;
      this.datas = [];
      this.index = 1;
      this.callData = [];
      switch (this.activeName) {
        case "按组织架构":
          this.loadOrgTree();
          break;
        case "按角色类型":
          this.loadRoleTree();
          break;
        case "按岗位类型":
          this.loadGrouped();
          break;
        case "按当前所属部门":
          this.loadOrgDy();
          break;
        case "按类型":
          break;
        case "按岗位类型cop":
          this.loadGrouped();
          break;
        case "按部门":
          this.loadOrgTreeOnly();
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
			if(this.infos.children){
				this.callData = this.infos.children.filter(s => s.id == node);
			}else{
				this.callData = this.infos.roleList.filter(s => s.id == node);
			}
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
    async submit() {
      try {
        this.callData[0]["orgBM"] = this.callData[0].org.name;
        this.callData[0]["orgFB"] = this.callData[0].branchOrg.name;
      } catch (error) {}
      // 按需访问内容
      let orgs = this.callData.filter(s => s.type == "atom");
	  
      switch (this.positions) {
        case "user":
          switch (this.activeName) {
            case "按组织架构":
              await getGroupedHelperMsgUser(
                this.callData.map(m => {
                  return m.id;
                })
              ).then(s => {
                orgs = [...orgs, ...s.data,...this.callData.filter( s => s.fetch)];
              });
              break;
            case "按角色类型":
              await getExampleUser({
                roleIdList: this.callData.map(m => {
                  return m.id;
                })
              }).then(s => {
                alert("xxx")
                orgs = [...orgs, ...s.data,...this.callData.filter( s => s.fetch)]
              });
              break;
            case "按岗位类型":
              await getExampleUser({
                postIds: this.callData.map(m => {
                  return m.id;
                })
              }).then(s => {
                orgs = [...orgs, ...s.data,...this.callData.filter( s => s.fetch)]
              });
              break;
            case "按当前所属部门":
              break;
            case "按类型":
              break;
            case "按岗位类型cop":
              break;
          }
          break;
        case "post":
          switch (this.activeName) {
            case "按组织架构":
				//fetch
              await getGroupedHelperMsgPosition(
                this.callData.map(m => {
                  return m.id;
                })
              ).then(s => {
                orgs = [...orgs, ...s.data,...this.callData.filter( s => s.fetch) ];
              });
              break;
            case "按岗位类型":
				    orgs = this.callData
              break;
            case "按当前所属部门":
              break;
            case "按类型":
              break;
            case "按岗位类型cop":
              break;
          }
          break;
        case "role":
          switch (this.activeName) {
            case "按组织架构":
              await getGroupedHelperMsgRole(
                this.callData.map(m => {
                  return m.id;
                })
              ).then(s => {
                orgs = [...orgs, ...s.data,...this.callData.filter( s => s.fetch)];
              });
              break;
            case "按角色类型":
              orgs = this.callData;
              break;
            case "按岗位类型":
              break;
            case "按当前所属部门":
              break;
            case "按类型":
              break;
            case "按岗位类型cop":
              break;
          }
          break;
      }

      this.$emit("submit-call", orgs);
      this.$emit("update:isShow", false);
      this.clean ? (this.callData = []) : "";
    },
    // 查询触发
    querySearchAsync(queryString, cb) {
      queryString = queryString.replace(/\s+/g, "");
      if (queryString == "") return;
      let par;
      switch (this.activeName) {
        case "按组织架构":
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
                    value: req.name,
					fetch:true
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
                    value: req.name,
					fetch:true
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
                    value: req.name,
					fetch:true
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
      recursion(this.datas[0])
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
      this.stateSea = "";
    },
    wheresRole(s, index) {
      // this.show = false;
      if (!s.roleList) {
        switch (this.positions) {
          case "user":
            // 人员
            getUserOrg(s.id).then(s => {
              if (s.data.length != 0) {
                if(s.type != 'atom'){
                   this.datas[this.index] = this.datas[this.index++ - 1].roleList[index];
                }
                this.infos = {
                  roleList: s.data.map(par => {
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
                this.$message({
                  showClose: true,
                  message: "下级无数据"
                });
              }
            });
            break;
          case "post":
            // 岗位
            positionsOrg(s.id).then(s => {
              if (s.data.length != 0) {
                if(s.type != 'atom'){
                  this.datas[this.index] = this.datas[this.index++ - 1].children[index];
                }
                this.infos = {
                  roleList: s.data.map(par => {
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
                this.$message({
                  showClose: true,
                  message: "下级无数据"
                });
              }
            });
            break;
          case "role":
		  if(this.positions == "role") return
             getRoHelper(s.id).then(s => {
              if (s.data.length != 0) {
                if(s.type != 'atom'){
                  this.datas[this.index] = this.datas[this.index++ - 1].children[index];
                }
                this.infos = {
                  roleList: s.data.map(par => {
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
                this.$message({
                  showClose: true,
                  message: "下级无数据"
                });
              }
            });
            break;
        }
        return;
      } else {
        this.datas[this.index] = this.datas[this.index++ - 1].roleList[index];
      }
      this.infos = this.datas[this.datas.length - 1];
      // setTimeout(() => {
      //   this.show = true;
      // }, 1000);
    },
    // seach-岗位类型
    wheresPost(s, index) {
      
      // this.show = false;
      // 原子级选中
      if (!s.sysPositionList) {
        switch (this.positions) {
          case "user":
            // 人员
            getExampleUser({ postIds: [s.id] }).then(s => {
              if (s.data.length != 0) {
                if(s.type != 'atom'){
                  this.datas[this.index] = this.datas[this.index++ - 1].sysPositionList[index];
                }
                this.infos = {
                  sysPositionList: s.data.map(par => {
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
                this.$message({
                  showClose: true,
                  message: "下级无数据"
                });
              }
            });
            break;
          case "post":
            // 岗位
            positionsOrg(s.id).then(s => {
              if (s.data.length != 0) {
                if(s.type != 'atom'){
          this.datas[this.index] = this.datas[this.index++ - 1].children[index];
        }
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
                this.$message({
                  showClose: true,
                  message: "下级无数据"
                });
              }
            });
            break;
          case "role":
            getRoHelper(s.id).then(s => {
              if (s.data.length != 0) {
                if(s.type != 'atom'){
          this.datas[this.index] = this.datas[this.index++ - 1].children[index];
        }
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
                this.$message({
                  showClose: true,
                  message: "下级无数据"
                });
              }
            });
            break;
        }
        return;
      } else {
        this.datas[this.index] = this.datas[this.index++ - 1].sysPositionList[
          index
        ];
      }

      this.infos = this.datas[this.datas.length - 1];
      // setTimeout(() => {
      //   this.show = true;
      // }, 1000);
    },
    // seach-按组织架构
    wheres(callInfo, index) {
      // 原子级选中
      if (!callInfo.children) {
        switch (this.positions) {
          case "user":
            // 人员
            getUserOrgId(callInfo.id).then(s => {
              if (s.data.length != 0) {
                if(callInfo.type != 'atom'){
                  if(this.activeName == '按当前所属部门' || this.activeName == '按组织架构'  && this.datas.length == 1){

                  }else{
                  this.datas[this.index] = this.datas[this.index++ - 1].children[index];
                  }
                }
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
                this.$message({
                  showClose: true,
                  message: "下级无数据"
                });
              }
            });
            break;
          case "post":
            // 岗位
            positionsOrg(callInfo.id).then(s => {
              if (s.data.length != 0) {
                if(callInfo.type != 'atom'){
                  if(this.activeName == '按当前所属部门' && this.datas.length == 1){

                  }else{
                  this.datas[this.index] = this.datas[this.index++ - 1].children[index];
                  }
                }
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
                this.$message({
                  showClose: true,
                  message: "下级无数据"
                });
              }
            });
            break;
          case "role":
            rolesOrg(callInfo.id).then(s => {
              if (s.data.length != 0) {
                if(callInfo.type != 'atom'){
                  if(this.activeName == '按当前所属部门' && this.datas.length == 1){

                  }else{
                  this.datas[this.index] = this.datas[this.index++ - 1].children[index];
                  }
                }
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
                this.$message({
                  showClose: true,
                  message: "下级无数据"
                });
              }
            });
            break;
        }
        return;
      } else {
        this.datas[this.index] = this.datas[this.index++ - 1].children[index];
      }
      // this.show = false;
      this.infos = this.datas[this.datas.length - 1];
      // setTimeout(() => {
      //   this.show = true;
      // }, 1000);
    },
    // search - 选组织
    whereOrg(s, index) {
      if(s.type != 'atom'){
          this.datas[this.index] = this.datas[this.index++ - 1].children[index];
        }
      this.datas[this.index] = this.datas[this.index++ - 1].children[index];
      this.infos = this.datas[this.datas.length - 1];
    },
    clicks(s,index) {
      // 验证最后一位
      if(index == 4 || index == 1){
        if(this.datas[s - 1].children == [] || this.datas[s - 1].children == undefined ) return
      }
      if(index == 2){
        if(this.datas[s - 1].roleList == [] || this.datas[s - 1].roleList == undefined ) return
      }
      if(index == 3){
        if(this.datas[s - 1].sysPositionList == [] || this.datas[s - 1].sysPositionList == undefined ) return
      }
      // roleList 2
      // children 1 4
      // sysPositionList 3
      this.datas = this.datas.slice(0, s);
      this.index = s;
      this.infos = this.datas[this.datas.length - 1];
    }
  }
};
</script>
<style lang="scss" >
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
      border: 0px !important;
      .el-input__inner {
        border: 0px !important;
      }
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
.load-custom{
  overflow:hidden;
  .header{
      padding:6px 0px;
      float: left;
    img{
      display:block;
      width: 60px;
      height: 60px;
      border: 1px solid #dcdcdc;
      border-radius: 500px;
    }
  }
  .detailsRole{
    padding: 6px 0px;
    margin-left: 12px;
    float: left;
    span{
      line-height: 60px;
      display:block;
      float: none;
      font-size: 12px;
    }
  }
  .details{
    padding: 6px 0px;
    margin-left: 12px;
    float: left;
    span{
      line-height: 30px;
      display:block;
      float: none;
      font-size: 12px;
    }
  }
  .detail{
    padding: 6px 0px;
    margin-left: 12px;
    float: left;
    span{
      line-height: 20px;
      display:block;
      float: none;
      font-size: 12px;
    }
  }
}
</style>


