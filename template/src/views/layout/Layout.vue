<template>
  <div :class="classObj" class="app-wrapper">
    <div class="mam-header">
      <div class="mam-h2">
        <img src="@/assets/h.png" alt style="width: 30px;height: 30px;margin-top: 10px;margin-left: 10px;">
        <h4>权限中心</h4>
      </div>
      <div class="mam-self">
        <div class="mam-search">
          <i class="el-icon-search"/>
          <input type="text">
        </div>
        <div class="mam-self-set">
          <div @click="setList">
            <svg-icon class="mam-icons" icon-class="apply"/>
          </div>
          <div v-if="list" class="mam-user-msg-list">
            <div class="mam-title">子系统列表</div>
            <div class="mam-contentList">
              <i class="el-icon-caret-top"/>
              <ul>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
                <li>
                  <icon class="mam-iconApp" name="chart-area"/>
                  <p>系统标题</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mam-self-set"  @click="clicsk">
          <!-- <el-badge :value="12" class="item"> -->
          <svg-icon class="mam-icons" icon-class="full"/>
          <!-- </el-badge> -->
        </div>

        <div class="mam-self-set">
          <div @click="setOpen">
            <svg-icon class="mam-icons" icon-class="msg" style="font-size: 35px;margin-top: 6px;"/>
          </div>
          <div v-if="msgSelf" class="mam-user-msg">
            <div class="mam-title">您有11条消息未读</div>
            <div class="mam-content">
              <i class="el-icon-caret-top"/>
              <ul>
                <li>
                  <svg-icon icon-class="inter" class="mam-iconsList"/>
                  <div>
                    <p>这是一则新闻新的消息</p>
                    <b>2019-01-01</b>
                  </div>
                </li>
                <li>
                  <svg-icon icon-class="inter" class="mam-iconsList"/>
                  <div>
                    <p>这是一则新闻新的消息</p>
                    <b>2019-01-01</b>
                  </div>
                </li>
                <li>
                  <svg-icon icon-class="inter" class="mam-iconsList"/>
                  <div>
                    <p>这是一则新闻新的消息</p>
                    <b>2019-01-01</b>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mam-more">查看全部消息</div>
          </div>
        </div>
        <div class="mam-self-msg">
          <div style="float:left;position: relative;">
            <img src="@/assets/header.png" alt @click="opens">
            <div v-if="setting" class="mam-settingSelf">
              <i class="el-icon-caret-top"/>
              <ul>
                <li>
                  <icon class="mam-ic" name="user-alt"/>
                  <b>个人中心</b>
                </li>
                <!-- <li>
                  <icon class="mam-ic" name="cogs"/>
                  <b>设置</b>
                </li>
                <li>
                  <icon class="mam-ic" name="tasks"/>
                  <b>更多</b>
                </li> -->
                <li @click="LogOut">
                  <icon class="mam-ic" name="power-off"/>
                  <b>注销</b>
                </li>
              </ul>
            </div>
          </div>
          <div class="mam-msg">
            <p>用户名</p>
            <p>职务名称</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <!-- <navbar/> -->
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import screenfull from "screenfull";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      isFullscreen: false,
      setting: false,
      msgSelf: false,
      list: false,
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
 
  methods: {
     handleSelect() {},
    querySearchAsync() {},
    clicsk() {
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
    },
    setList() {
      (this.setting = false), (this.msgSelf = false), (this.list = !this.list);
    },
    setOpen() {
      (this.setting = false), (this.list = false);
      this.msgSelf = !this.msgSelf;
    },
    opens() {
      (this.msgSelf = false), (this.list = false);
      this.setting = !this.setting;
    },
    handleClickOutside() {
      this.$store.dispatch("closeSideBar", { withoutAnimation: false });
    },
    // 退出登录
    LogOut() {
      this.$store.dispatch('LogOut').then(() => {
        window.location.reload()
      })
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.mam-iconApp {
  width: 17px;
  display: block;
  margin: auto;
  margin-top: 14px;
  -webkit-transform: scale(2.5);
  transform: scale(2);
  margin-bottom: 7px;
}
.mam-iconsList {
  width: 16px;
  float: left;
  margin: 7px 10px;
  font-size: 26px;
}
.mam-icons {
  margin-top: 7px;
  font-size: 30px;
}
.mam-settingSelf {
  background: #2b2e33;
  width: 130px;
  position: absolute;
  top: 130%;
  left: -45px;
  // overflow: hidden;
  li {
    overflow: hidden;
    .mam-ic {
      margin: 6px;
      margin-right: 2px;
      margin-left: 10px;
      float: left;
      display: block;
    }
    b {
      float: left;
      display: block;
      text-align: left;
      font-weight: normal;
    }
  }
  .el-icon-caret-top {
    position: absolute;
    top: -18px;
    left: 55px;
    font-size: 27px;
    color: #2b2e33;
  }
  ul {
    li {
      color: #8d8f8e;
      font-size: 14px;
      line-height: 29px;
      border-bottom: 1px solid #393c44;
      list-style: none;
      text-indent: 6px;
      cursor: pointer;
      transition: all 0.3s;
      &:last-of-type {
        border-bottom: 0px;
      }
      &:hover {
        background: #3f444a;
        color: white;
      }
    }
  }
}
.mam-header {
  height: 50px;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  background: #2b2e33;
  z-index: 999;
  .mam-h2 {
    overflow: hidden;
    height: 100%;
    float: left;
    img {
      height: 100%;
      width: auto;
      float: left;
    }
    h4 {
      float: left;
      color: white;
      line-height: 50px;
      margin-left: 6px;
      letter-spacing: 1px;
    }
  }
  .mam-self {
    float: right;
    margin-top: 3px;
    // overflow: hidden;
    .mam-search {
      position: relative;
      float: left;
      margin-right: 4px;
      border: 1px solid #58595a;
      border-radius: 50px;
      margin-top: 3px;
      padding-right: 38px;
      background: #40434a;
      i {
        position: absolute;
        top: 4px;
        color: #58595a;
        font-size: 24px;
        right: 12px;
      }
      input {
        height: 36px;
        width: 290px;
        border: 0px;
        box-shadow: none;
        border-radius: 30px;
        outline: none;
        color: rgb(235, 235, 235);
        text-indent: 1em;
        background: none;
      }
    }
    .mam-self-msg {
      float: left;
      // overflow: hidden;
      margin-right: 8px;
      margin-left: 12px;
      img {
        float: left;
        width: 36px;
        height: 36px;
        display: block;
        margin: 4.5px 0px;
        border-radius: 1000px;
        margin-right: 12px;
        cursor: pointer;
      }
      .mam-msg {
        float: left;
        p {
          line-height: 18px;
          margin-top: 3px;
          color: #b5b5b7;
          font-size: 12px;
        }
      }
    }
    .mam-self-set {
      float: left;
      position: relative;
      color: #787878;
      line-height: 30px;
      margin: 0px 7px;
      cursor: pointer;

      .mam-user-msg-list {
        width: 270px;
        position: absolute;
        left: -200px;
        top: 150%;
        box-shadow: 1px 1px 10px 1px #777777;
        .mam-title {
          background: #2b2e33;
          color: white;
          text-indent: 1em;
          font-size: 14px;
        }
        .mam-contentList {
          background: white;
          .el-icon-caret-top {
            position: absolute;
            top: -18px;
            font-size: 27px;
            left: 197px;
            color: #2b2e33;
          }
          ul {
            overflow: hidden;
            li {
              float: left;
              width: 67.5px;
              height: 67.5px;
              border: 1px solid white;
              background: #f0f0f0;
              background: linear-gradient(to bottom right, #f0f0f0, #f0f0f0);
              box-sizing: border-box;
              transition: all 0.3s;
              &:hover {
                // background: -webkit-linear-gradient(
                //   left top,
                //   red,
                //   blue
                // ); /* Safari 5.1 - 6.0 */
                // background: -o-linear-gradient(
                //   bottom right,
                //   red,
                //   blue
                // ); /* Opera 11.1 - 12.0 */
                // background: -moz-linear-gradient(bottom right, red, blue);
                /* Firefox 3.6 - 15 */
                background: linear-gradient(
                  to bottom right,
                  #c3e8fd,
                  #3b97cc
                ); /* 标准的语法 */
              }
              .mam-icons {
                display: block;
                margin: auto;
                text-align: center;
                font-size: 30px;
                margin-top: 20px;
                // transition: all .3s;
              }
              p {
                display: block;
                line-height: 22px;
                font-size: 12px;
                text-align: center;
                // transition: all .3s;
              }
              &:hover .mam-icons {
                color: white;
              }
              &:hover p {
                color: white;
              }
            }
          }
          .mam-icons {
            font-size: 40px;
          }
        }
      }
      .mam-user-msg {
        width: 250px;
        position: absolute;
        left: -160px;
        top: 150%;
        box-shadow: 1px 1px 10px 1px #777777;
        .mam-title {
          background: #2b2e33;
          color: white;
          text-indent: 1em;
          font-size: 14px;
        }
        .mam-contentList {
          background: white;
          .el-icon-caret-top {
            position: absolute;
            top: -18px;
            font-size: 27px;
            left: 152px;
            color: #2b2e33;
          }
          ul {
            overflow: hidden;
            li {
              float: left;
              width: 62.5px;
              height: 62.5px;
              .mam-icons {
                display: block;
                margin: auto;
                text-align: center;
                font-size: 30px;
              }
              p {
                display: block;
                line-height: 22px;
                font-size: 12px;
                text-align: center;
              }
            }
          }
          .mam-icons {
            font-size: 40px;
          }
        }
        .mam-content {
          .mam-icons {
            float: left;
            display: block;
            line-height: 50px;
          }
          .el-icon-caret-top {
            position: absolute;
            top: -18px;
            font-size: 27px;
            left: 152px;
            color: #2b2e33;
          }
          ul {
            background: white;
            overflow: hidden;
            li {
              list-style: none;
              overflow: hidden;
              width: 100%;
              padding: 3px 0px;
              transition: all 0.3s;
              &:hover {
                background: #e6e6e6;
              }
              img {
                float: left;
                width: 30px;
                height: 30px;
                margin: 8px;
              }
              div {
                float: left;
                p {
                  line-height: 18px;
                  font-size: 14px;
                  display: block;
                  font-weight: normal;
                  margin-top: 4px;
                }
                b {
                  line-height: 18px;
                  font-size: 14px;
                  display: block;
                  font-weight: normal;
                  color: #d8d8d8;
                }
              }
            }
          }
        }
        .mam-more {
          background: #f5f5f5;
          text-align: center;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
  img {
    height: 100%;
  }
}
.main-container {
  margin-top: 94px;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
