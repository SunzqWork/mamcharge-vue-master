<template>
  <div class="clearfix">
    <!-- 当期纬度 -->
    <div class="tree-node fl">
      <div class="all-checkbox" >
        <el-checkbox v-model="check" style="margin-left: 12px;"> 不关联父级</el-checkbox>
      </div>
      <el-scrollbar wrapClass="scrollbar-wrapper" style="height: 300px; padding-left: 12px;">
        <p v-for="(ele, index) in Model.children" :key="ele.id">
          <el-checkbox
            v-model="ele.checkStatus"
            :indeterminate="ele.indeterminate"
            @change="getCurrentEle(ele)"
            >
            {{ ele.name }}
          </el-checkbox>
          <i class="el-icon-d-arrow-right fr icon" :style="showChildIndex === index ? 'color: #3296FA' : ''" v-show="ele.children && ele.children.length > 0" @click="showChild(ele, index)"></i>
        </p>
      </el-scrollbar>
    </div>
    <!-- 孩子纬度 -->
    <div v-for="(item, index) in Model.children" :key="item.id">
      <tree-node 
        :Model="item" 
        v-if="item.children && item.children.length > 0 && showChildIndex === index"
        >
      </tree-node>
    </div>
  </div>
</template>
<script>
export default {
  name: "tree-node",
  props: {
    Model: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tree: null,
      showChildIndex: 9999,
      check: false
    };
  },
  computed: {
    treeData() {
      return this.$store.state.tree.treeData
    }
  },
  methods: {
    // 控制孩子纬度显示隐藏
    showChild(val, index) {
      this.showChildIndex = index;
    },
    handlerAll(Model) {
      if (Model.children && Model.children.length > 0) {
        Model.children.forEach(val => {
          val.indeterminate = false
          val.checkStatus = Model.checkStatus ? true : false
          this.handlerAll(val)
        })
      }
    },
    getCurrentEle(ele) {
      if (ele.indeterminate) {
        ele.indeterminate = false
      }
      // 判断父级是否选中
      if (this.check && !this.Model.checkStatus && !this.Model.indeterminate) {
        this.$message({
          type: 'warning',
          message: '此操作不合规范，请选中父级'
        })
        ele.indeterminate = false
        ele.checkStatus = false
        return false
      }
      this.selectChild(ele, ele.checkStatus)
      if (!this.check) {
        this.selectParent(this.Model)
        this.selectParents(this)
      }
    },
    selectParent(ele) {
      if (ele.pid !== '') {
        if (ele.children && ele.children.length > 0) {
          let ids = []
          let isFlag = true
          ele.children.forEach(val => {
            if (val.checkStatus) {
              ids.push(val.id)
            }
            if (val.indeterminate) {
              isFlag = false
            }
          })
          if (!isFlag) {
            ele.indeterminate = true
            ele.checkStatus = false
          } else {

            ele.indeterminate = ids.length > 0 && ids.length < ele.children.length
            ele.checkStatus = ids.length === ele.children.length
          }
        }
      } else {
      }
    },
    selectParents(ele) {
      const Model = ele.$parent
      if (ele.$parent && ele.$parent.Model) {
        this.selectParent(Model.Model)
        this.selectParents(Model)
      }
    },
    /**
     * ele 当前操作的元素
     * checkStatus 控制下面元素选中还是取消
     */
    selectChild(ele, checkStatus) {
      if (ele.children) {
        if (ele.children.length > 0) {
          ele.children.forEach(val => {
            val.indeterminate = false
            val.checkStatus = checkStatus ? true : false
            this.selectChild(val, checkStatus)
          })
        }
      } else {
      }
    }
  }
};
</script>
<style lang="scss" scope>
.tree-node {
  border: 1px solid #e6e6e6;
  width: 200px;
  height: 350px;
  .icon {
    cursor: pointer;
    padding-right: 15px;
    line-height: 40px;
  }
  .all-checkbox{
    border-bottom: 1px solid #e6e6e6;
  }
}
</style>

