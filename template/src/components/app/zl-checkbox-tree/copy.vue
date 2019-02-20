<template>
  <div class="tree-item-list  fl">
    <div class="tree-item fl">
      <!-- 当前维度 -->
      <div class="item-top clearfix">
        <el-checkbox :indeterminate="modelData.indeterminate" v-model="modelData.check" @change="modelDataAllCheck">全选</el-checkbox>
        <i class="el-icon-edit fr"></i>
      </div>
      <el-scrollbar wrapClass="scrollbar-wrapper" class="item-content">
        <el-checkbox-group v-model="modelData.checkArray" @change="modelDataGroupsChech">
          <div class="item-checkbox clearfix" v-for="(val, index) in modelData.children" :key="val.id">
            <el-checkbox :label="val.id" :key="val.label" @change="checkitem(val)" :indeterminate="val.indeterminate">{{ val.label }}</el-checkbox>
            <i class="el-icon-d-arrow-right fr" @click="enterChild(val.id, index)" v-show="val.children && val.children.length > 0"></i>
          </div>
        </el-checkbox-group>
      </el-scrollbar>
    </div>
    <!-- 下面的维度 -->
    <tree-item-list @checkData="checkData" v-for="(val, index) in modelData.children" :key="val.id" v-show="showIndex === index" v-if="val.children && val.children.length > 0" :model="val"></tree-item-list>
  </div>
</template>
<script>
import { treeToArray, buildTree } from './util'
export default {
  name: 'tree-item-list',
  props: {
    model: { // 当前维度的最大对象
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showIndex: null,
      modelData: this.model,
      dataList: [] // 树形结构转数组数据
    }
  },
  methods: {
    enterChild(id, index) {
      this.showIndex = index
    },
    checkData(obj) {
      this.$emit('checkData', obj)
    },
    // 全选
    modelDataAllCheck(val) {
      this.recursiveChildren(this.modelData, val)
      this.recursiveParent([this.$store.state.premissionCenter.modelData], this.modelData, val)
    },
    // 递归关联孩子节点 全选
    recursiveChildren(obj, val) {
      if(obj.children && obj.children.length > 0) {
        let ids = []
        obj.children.forEach(v => { ids.push(v.id) })
        obj.indeterminate = false
        obj.checkArray = val ? ids : []
        obj.check = val ? true : false
        obj.children.forEach(item => { this.recursiveChildren(item, val) })
      }
    },
    // 递归关联父节点 全选
    recursiveParent(modelData, obj, val) {
      for (let i in modelData) {
        if (String(modelData[i].id) === String(obj.parent)) {
          if (val) {
            modelData[i].checkArray.push(obj.id)
          } else {
            modelData[i].checkArray.splice(modelData[i].checkArray.indexOf(obj.id), 1)
          }
          this.modelDataGroupsChechOther(modelData[i].checkArray, modelData[i])
          if (modelData[i].parent !== 0) {
            this.recursiveParent([this.$store.state.premissionCenter.modelData], modelData[i], val)
          }
        } else if (modelData[i].children && modelData[i].children.length > 0) {
          this.recursiveParent(modelData[i].children, obj, val)
        }
      }
    },
    modelDataGroupsChech(value) {
      let checkedCount = value.length
      this.modelData.check = checkedCount === this.modelData.children.length
      this.modelData.indeterminate = checkedCount > 0 && checkedCount < this.modelData.children.length
    },
    modelDataGroupsChechOther(value, obj) {
      let checkedCount = value.length
      obj.check = checkedCount === obj.children.length
      obj.indeterminate = checkedCount > 0 && checkedCount < obj.children.length
    },
    checkitem(obj) {
      let flag = true
      if (this.modelData.checkArray.includes(obj.id)) {
        flag = true
      } else {
        flag = false
      }
      this.recursiveChildren(obj, flag)
    },
    // 递归关联父级节点 单选
    singleCheckParent(modelData, obj, flag) {
      for (let i in modelData) {
        if ((String(modelData[i].id) === String(obj.parent)) && (modelData[i].id !== 9999)) {
          //
        } else {
          if (modelData[i].children && modelData[i].children.length > 0) {
            this.singleCheckParent(modelData[i].children, obj, flag)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.tree-item{
  width: 180px;
  height: 350px;
  border: 1px solid #ececec;
  border-radius: 4px;
  margin-right: 1px;
  .item-top{
    height: 35px;
    border-bottom: 1px solid #ececec;
    padding: 5px 15px 5px 5px;
    i{
      cursor: pointer;
      color: #666;
    }
  }
  .item-content{
    padding: 5px 15px 5px 5px;
    height: 315px;
    .item-checkbox{
      margin-bottom: 5px;
    }
    .el-checkbox__label{
      color: #666 !important;
      font-weight: 400;
    }
    i{
      color: #666;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
