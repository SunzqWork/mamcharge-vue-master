<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" class="zl-table" border stripe>
    <!-- 配置了columns属性 -->
    <el-table-column v-for="(column, index) in columns" :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <!-- Todo -->
        <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-circle-plus"/>
          <i v-else class="el-icon-remove"/>
        </span>
        <el-checkbox 
          v-if="scope.row.isCheck && column.level && scope.row.type !== 3" 
          :indeterminate="scope.row.isIndeterminate" 
          v-model="scope.row.checkAll" 
          @change="handleCheckAllChange(scope.row)">
          {{ scope.row[column.value] }}
        </el-checkbox>
        <div v-if="scope.row.type === 1 && index === 1 && scope.row.btns && scope.row.btns.length > 0">
          <el-checkbox v-for="(val, idx) in scope.row.btns" v-model="val.checkAll" :key="idx" @change="handleCheckBtn(val)">
            {{ val[column.value] }}
          </el-checkbox>
        </div>
      </template>
    </el-table-column>
    <slot/>
  </el-table>
</template>

<script>
/**
  Auth: Lei.j1ang
  Created: 2018/1/19-13:59
*/
import treeToArray from './eval'
import { getParentObject, getObjectId, getParent } from './utils'
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
    }
  },
  data() {
    return {
      ids: []
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
  methods: {
    selectChange(row) {
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

    setParentProps(id) {
      const pids = getParentObject(this.formatData, id)
      pids.forEach(s1 => {
        this.formatData.forEach(s2 => {
          if (s1 === s2.id) {
            let num = 0
            let num1 = 0
            s2.children.forEach(s3 => {
              if (s3.checkAll) {
                num++
              }

              if (s3.isIndeterminate) {
                num1++
              }
            })
            if (s2.children.length !== 0 && s2.children.length === num) {
              // 对勾
              s2.isIndeterminate = false
              s2.checkAll = true
            } 

            if (num !== 0 && s2.children.length > num || num1 > 0) {
              // 横杠
              s2.isIndeterminate = true
              s2.checkAll = false
            } 

            if (num === 0) {
              if (num1 > 0) {
                s2.isIndeterminate = true
                s2.checkAll = false
              } else {
                // 取消
                s2.isIndeterminate = false
                s2.checkAll = false
              }
            }
          }
        })
      })
    },

    handleCheckAllChange(row) {
      if (row.isIndeterminate) {
        row.isIndeterminate = false
        row.checkAll = true
      }
      if (row.type === 1) {
        const loop = (obj) => {
          if (obj.btns && obj.btns.length > 0) {
            obj.btns.forEach(val => {
              val.checkAll = row.checkAll
              val.isIndeterminate = row.isIndeterminate
            })
          }

          this.setParentProps(row.id)
        }
        loop(row)
      } else {
        const loop = (obj) => {
          if (obj.children && obj.children.length > 0) {
            obj.children.forEach(val => {
              val.checkAll = row.checkAll
              val.isIndeterminate = row.isIndeterminate
              if (val.type === 1 && val.btns && val.btns.length > 0) {
                val.btns.forEach(item => {
                  item.checkAll = row.checkAll
                })
              }
              loop(val)
            })
          }
          this.setParentProps(row.id)
        }
        loop(row)
      }

      this.$emit('get-check-ids', getObjectId(this.data))
    },

    // 按钮change
    handleCheckBtn(row) {
      const obj = getParent(this.data, row.pid)

      if (!obj.isIndeterminate && !obj.checkAll) {
        this.$message({
          type: 'warning',
          message: '请先选择页面权限，在操作按钮权限。'
        })

        row.checkAll = false
      }

      this.$emit('get-check-ids', getObjectId(this.data))
    }
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
