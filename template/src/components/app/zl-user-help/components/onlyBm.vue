<template>
  <div>
    <transition name="el-zoom-in-top">
      <div v-show="!dataList.children">
        <p class="zl-none">没有数据</p>
      </div>
    </transition>
    <!-- 多选 -->
    <div
      v-if="dataList.children && check == 'checkbox' && types.includes(checkList.children[0].type)"
      style="float: none;display: block;width: 100%;overflow:hidden;height: 26px;"
      v-for="(ins,index) in dataList.children"
      @change="changes(ins)"
      :key="ins.id"
    >
      <el-checkbox
        :indeterminate="dataList.children[index].isIndeterminate"
        :label="personnel ? `${ins.name}` : `${ins.name}(${ins.staffCount || 0}人)`"
        v-model="dataList.children[index].value"
      ></el-checkbox>
      <div
        v-if="!dataList.children[index].value && dataList.children[index].type != 'atom'"
        @click="next(ins,index)"
        style="float: right;overflow: hidden;"
      >
        <svg-icon style="float: left;" icon-class="fenzhi" class="zl-org-icon"/>
      </div>
      <div
        v-if="dataList.children[index].value && dataList.children[index].type != 'atom'"
        style="float: right;overflow: hidden;"
      >
        <svg-icon style="float: left;color:red;" icon-class="org" class="zl-org-icon"/>
      </div>
    </div>
    <!-- 单选 -->
    <div
      v-if="dataList.children && check == 'radio' && types.includes(checkList.children[0].type)"
      style="float: none;display: block;width: 100%;overflow:hidden;"
      v-for="(ins,index) in dataList.children"
      :key="ins.id"
    >
      <el-radio :label="ins.id" v-model="radio" @change="radioChange">{{ins.name}}</el-radio>
      <div @click="next(ins,index)" style="float: right;overflow: hidden;">
        <svg-icon style="float: left;" icon-class="fenzhi" class="zl-org-icon"/>
      </div>
    </div>

    <!-- 只点击 -->
    <div
      v-if="dataList.children && types.includes(checkList.children[0].type) == false "
      style="float: none;display: block;width: 100%;overflow:hidden;cursor: pointer;"
      v-for="(ins,index) in dataList.children"
      :key="ins.id"
      @click="next(ins,index)"
    >
      <div style="float: left;overflow: hidden;margin-right: 10px;">
        <i class="el-icon-caret-right"></i>
      </div>
      <p
        class="zl-msg"
      >{{personnel ? `${ins.name}` : `${ins.name}(${ins.staffCount || 0}人)`}}</p>
      <div style="float: right;overflow: hidden;">
        <svg-icon style="float: left;" icon-class="fenzhi" class="zl-org-icon"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "zl-checkBm",
  props: {
    checkList: {
      type: Object,
      default: {}
    },
    types: {
      type: Array,
      default: []
    },
    check: {
      type: String,
      default: "checkbox"
    },
    personnel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      data: [],
      radio: "",
      dataList: this.checkList,
      clicks: false
    };
  },
  watch: {
    checkList() {
      // 刷新绑定
      this.dataList = this.checkList;
      if (
        this.checkList.children == "" ||
        this.checkList.children == undefined
      ) {
        // 最后一级
      } else {
        this.clicks = this.check.includes(this.checkList.children[0].type);
      }
    }
  },
  mounted() {
    this.radio = this.checkList.radio;
    // types
    if (this.checkList.children == "" || this.checkList.children == undefined) {
      // 最后一级
    } else {
      this.clicks = this.types.includes(this.checkList.children[0].type);
    }
  },
  methods: {
    // 清空
    cleanRadio() {
      this.radio = "";
    },
    // 单选触发
    radioChange() {
      this.checkList.radio = this.radio;
      this.$emit("check-tree", this.radio);
    },
    //触发
    changes(info) {
      // 处理多选
      let index = this.dataList.children.indexOf(info);
      if (
        this.dataList.children[index].isIndeterminate == true &&
        this.dataList.children[index].value == false
      ) {
        this.dataList.children[index].isIndeterminate = false;
        this.dataList.children[index].value = true;
      }
      this.$emit(
        "check-tree",
        info,
        this.dataList.children.filter(s => s.value).length
      );
    },
    // 查询所有
    next(s, index) {
      this.$emit("next-click", s, index);
    },
    close() {}
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
.zl-none {
  color: #dcdcdc;
  text-align: center;
  line-height: 300px;
}
.zl-org-icon {
  font-size: 16px;
  float: right;
  margin-right: 35px;
  margin-top: 10px;
  cursor: pointer;
}
.zl-msg {
  float: left;
}
</style>


