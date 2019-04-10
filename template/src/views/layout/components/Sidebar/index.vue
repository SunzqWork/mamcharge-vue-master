<template>
  <el-scrollbar class="mam-change" wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="theme"
      mode="vertical"
      text-color="#bfcbd9"
      active-text-color="#fff"
      :unique-opened="true"
      class="mam-menu"
    >
      <sidebar-item
        v-for="route in permission_routers"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
      
      
    </el-menu>
    <div class="mam-config">
      <template v-if="device!=='mobile' && !isCollapse">
        <error-log class="errLog-container right-menu-item"/>
        <el-tooltip content="设置" effect="dark" placement="bottom">
          <div class="mam-config-page">
            <svg-icon icon-class="set" class="mam-icons"/>
          </div>
        </el-tooltip>
        <el-tooltip content="锁屏" effect="dark" placement="bottom">
          <div class="mam-config-page">
            <svg-icon icon-class="lock1" class="mam-icons"/>
          </div>
        </el-tooltip>
        <el-tooltip content="中英文切换" effect="dark" placement="bottom">
          <div class="mam-config-page">
            <svg-icon icon-class="Aa" class="mam-icons"/>
          </div>
        </el-tooltip>
        <el-tooltip content="注销登录" effect="dark" placement="bottom">
          <div class="mam-config-page">
            <svg-icon icon-class="power" class="mam-icons"/>
          </div>
        </el-tooltip>
        <div style="clear:both;"/>
      </template>
      <template v-else>
        <el-tooltip class="item" placement="right-start">
          <div slot="content" style="overflow: hidden;">
            <svg-icon icon-class="set" class="mam-iconsSmallTips"/>
            <svg-icon icon-class="lock1" class="mam-iconsSmallTips"/>
            <svg-icon icon-class="Aa" class="mam-iconsSmallTips"/>
            <svg-icon icon-class="power" class="mam-iconsSmallTips"/>
          </div>
          <div class="mam-small">
            <svg-icon icon-class="set" class="mam-iconsSmall"/>
          </div>
        </el-tooltip>
      </template>
    </div>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import LangSelect from "@/components/LangSelect";
import ThemePicker from "@/components/ThemePicker";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    SidebarItem
  },

  computed: {
    ...mapGetters([
      "permission_routers",
      "sidebar",
      "sidebar",
      "name",
      "avatar",
      "device"
    ]),
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  data() {
    return {
      theme: "#2b2e33"
    };
  },
  methods: {
    themeColor(color) {
      // this.theme = color;
      
      document
        .getElementsByClassName("router-link-exact-active")[0]
        .children[0].setAttribute(
          "style",
          "background:" + color + "!important;"
        );
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>
<style scoped>
.mam-icons {
  display: block;
  float: none;
  margin: auto!important;
  color:  #696f6f;
  font-size: 20px;
  transition: all .3s;
}
.mam-change {
  position: relative;
}
.mam-iconsSmallTips {
  display: block;
  float: left;
  margin: 0px 8px;
  cursor: pointer;
  color: #dcdcdc;
  font-size: 20px;

}
.mam-iconsSmallTips:hover {
  color: white;
}
.mam-config {
  position: absolute;
  bottom: 50px;
  width: 100%;
  z-index: 9999999;
  left: 0px;
  height: 32px;
  background: #171717;
}

.mam-iconsSmall {
  color: rgb(191, 203, 217);
  display: block;
  margin: auto!important;
  margin-top: 8px!important;
  cursor: pointer;
  font-size: 20px;

}
.mam-config-page {
  float: left;
  width: 20%;
  margin: 0 2.5%;
  padding: 8px 0px;
  transition: all 0.3s;
  height: 100%;
  color: #606568;
  cursor: pointer;
  background: #171717;
  margin-bottom: 5px;
}
.mam-config-page:hover .mam-icons{
    color:#a9adb0;
}


.mam-config-page:hover {
  
  /* margin-top: -2px; */
  background: #2b2e33;
  box-shadow: 1px 1px 1px 1px #171717;
  color: #a5a8ab;
}
</style>

