<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" stripe class="zl-table">
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-circle-plus"/>
          <i v-else class="el-icon-remove"/>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <!-- Todo -->
        <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-circle-plus"/>
          <i v-else class="el-icon-remove"/>
        </span>
        <span v-if="!column.check">{{ scope.row[column.value] }}</span>
        <el-checkbox v-else v-model="scope.row.check" :indeterminate="scope.row.indeterminate" @change="handlerNodeCheck(scope.row)">
          {{ scope.row[column.value] }}
        </el-checkbox>
      </template>
    </el-table-column>
    <slot/>
  </el-table>
</template>

<script>

import treeToArray from './eval'
import { getParentObject, getParent } from './utils.js'

export default {
  name: 'TreeTable',
  props: {
    /* eslint-disable */
    data: {
      type: [Array, Object],
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: true
    },
    isCheckList: {
      type: Array,
      default: () => { return [] }
    }
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      let tmp
      if (!Array.isArray(this.data)) {
        tmp = [this.data]
      } else {
        tmp = this.data
      }
      const func = this.evalFunc || treeToArray
      const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
      return func.apply(null, args)
    }
  },
  watch: {
    isCheckList() {
      this.dataShow()
    }
  },
  methods: {
    dataShow() {
      
      if (this.isCheckList.length > 0) {
        // 说明有回显的数据
        let arr = []
        this.isCheckList.forEach(val => {
          this.formatData.forEach(item => {
            if (val === item.id) {
              arr.push(item)
            }
          })
        })

        arr.forEach(val => {
          val.check = true
           this.setParentProps(val.pid)
        })
      }
    },
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },

    // 关联父级
    setParentProps(pid) {
      const val = getParent(this.formatData, pid)
      if (val.children && val.children.length > 0) {
        let num1 = 0
        let num2 = 0
        val.children.forEach(item => {
          if (item.check) {
            num1++
          }

          if (item.indeterminate) {
            num2++
          }
        })

        if (num1 !== 0 && val.children.length === num1) {
          val.check = true
          val.indeterminate = false
        }

        if (num1 !== 0 && val.children.length > num1 || num2 > 0) {
          val.check = false
          val.indeterminate = true
        }

        if (num1 === 0) {
          if (num2 > 0) {
            val.check = false
            val.indeterminate = true
          } else {
            val.check = false
            val.indeterminate = false
          }
        }
      }
      if (val.pid) {
        this.setParentProps(val.pid)
      }
      
    },
    // 复选框状态发生变化
    handlerNodeCheck(row) {

      if (row.indeterminate) {
        row.indeterminate = false
        row.check = true
      }

      // 得到所有的级联子孙
      const loop = (obj) => {
        if (obj.children && obj.children.length > 0) {
          obj.children.forEach(val => {
            val.check = row.check
            val.indeterminate = row.indeterminate
            loop(val)
          })
        }
      }

      loop(row)
      
      // 关联父级
      this.setParentProps(row.pid)

      // 通知父级
      this.$emit('get-node', this.formatData)
    }
  },
  mounted() {
    this.dataShow()
  }
}
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
  @-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
  }
</style>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '@/styles/theme.scss';

  $space-width: 18px;
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
      content: ""
    }
  }
  .processContainer{
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }

  .tree-ctrl{
    position: relative;
    cursor: pointer;
    color: $themeColor;
    margin-left: -$space-width;
  }
</style>
