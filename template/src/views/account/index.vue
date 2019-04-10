<template>
  <div id="user">
    <!-- <div style="position: fixed;top: 200px;left:600px;background:white;z-index: 999;">
      <div @click="clUser">用户</div>
      <div @click="clRole">角色</div>
      <div @click="clPost">岗位</div>
      <div @click="clBM">部门</div>
    </div> -->
    <zl-card class="left">
      <el-scrollbar wrapClass="scrollbar-wrapper" class="scroll">
        <zl-org-tree
          :openAll="true"
          v-if="reload"
          :data="treeData"
          @handleNodeClick="handleNodeClick"
        ></zl-org-tree>
      </el-scrollbar>
    </zl-card>
    <div class="right">
      <account-list
        :nowId="NOWID"
        :orgId="orgId"
        :orgName="orgName"
        @reload-tree="getTreeFunc"
        :type="type"
      ></account-list>
    </div>
    <!-- <zl-user-help
      :isShow.sync="users"
      :clean="true"
      :typeCheck="true"
      :positions="'user'"
      @submit-call="copyUser"
      :whereShows="[1,2,3,4]"
      :choice="'radio'"
    />
    <zl-user-help
      :isShow.sync="roles"
      :clean="true"
      :typeCheck="true"
      :positions="'role'"
      @submit-call="copyUser"
      :whereShows="[1,2]"
      :choice="'radio'"
    />
    <zl-user-help
      :isShow.sync="posts"
      :clean="true"
      :typeCheck="true"
      :positions="'post'"
      @submit-call="copyUser"
      :whereShows="[1,3,4]"
      :choice="'radio'"
    />
    <zl-user-help
      :isShow.sync="bms"
      :clean="true"
      :typeCheck="true"
      @submit-call="copyUser"
      :whereShows="[7]"
      :nowId="'0d63df21a92440aa8a02e5a69a48bfa0'"
      :choice="'checkbox'"
    /> -->
  </div>
</template>
<script>
import zlUserHelp from "@/components/app/zl-user-help";
import accountList from "./components/list";
export default {
  name: "user",
  components: { accountList, zlUserHelp },
  data() {
    return {
      // users: false,
      // roles: false,
      // posts: false,
      // bms: false,
      reload: true,
      treeData: [],
      orgId: "",
      orgName: "",
      type: null,
      NOWID: ""
    };
  },
  methods: {
    // copyUser() {
    // },
    // clUser() {
    //   this.users = true;
    // },
    // clRole() {
    //   this.roles = true;
    // },
    // clPost() {
    //   this.posts = true;
    // },
    // clBM() {
    //   this.bms = true;
    // },
    handleNodeClick(obj, data) {
      this.NOWID = obj.id;
      // if (obj.type === 3) {
      //   this.orgId = obj.id
      //   this.orgName = obj.name
      // }
      this.orgId = obj.id;
      this.orgName = obj.name;
      this.type = obj.type;
    },
    getTree() {
      this.$store
        .dispatch("GetOrgTree")
        .then(data => {
          if (data.code === 0) {
            this.treeData = [data.data];
          } else {
            this.$message({ type: "warning", message: data.message });
          }
          // this.reload = true;
        })
        .catch(err => {
        });
    },
    getTreeFunc() {
      this.getTree();
    },
    resize() {
      this.$nextTick(() => {
        document.getElementsByClassName("scroll")[0].style.height =
          document.getElementsByClassName("left")[0].offsetHeight * 0.9 + "px";
      });
    }
  },
  mounted() {
    this.resize();
    this.getTree();
  }
};
</script>
<style lang="scss">
#user {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 98%;
  width: 100%;
  .left {
    margin-left: 10px;
    width: 300px !important;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }
  .right {
    margin-left: 310px;
    height: 100%;
    position: relative;
    overflow: auto;
  }
}
</style>


