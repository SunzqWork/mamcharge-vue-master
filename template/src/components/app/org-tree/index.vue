<template style="height: 100%;">
    <div class="org-tree">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
      class="zl-input-240px zl-form-control"
      suffix-icon="el-icon-search"
      style="display:table;margin: 0 auto;margin-bottom: 20px;"/>
      <el-scrollbar class="mam-change" style="height: 100%;" wrap-class="scrollbar-wrapper">
      <div >
        <el-tree
      ref="tree"
      :data="data"
      :filter-node-method="filterNode"
      :props="defaultProps"
      :highlight-current="true"
      :default-expand-all="openAll"
      :show-checkbox="isCheck"
      @check-change="handleCheckChange"
      :indent="8"
      @node-click="handleNodeClick">
      <span 
        slot-scope="{ node, data }" 
        class="custom-tree-node">
        <svg-icon 
          v-show="data.type === 1"
          class="icon"
          icon-class="group" />
        <svg-icon 
          v-show="data.type === 2"
          class="icon"
          icon-class="subsidiary" />
        <svg-icon 
          v-show="data.type === 3"
          class="icon"
          icon-class="department" />

          <!-- 
            如果staffLimit为null 那边只显示isCount
            如果staffLimit有值就显示 xx/xx
           -->
        <span :title="node.label" style="font-size: 14px;">
          <span>{{ node.label }}</span>
          <span v-if="isCount">
            <span v-if="data.staffLimit">
              {{ `(${data.staffCount}/${data.staffLimit})` }}
            </span>
            <span v-else>
              {{ data.staffCount ? `(${data.staffCount})` : '' }}
            </span>
          </span>
          
          <!-- <span v-if="isCount">({{ data.staffCount | peopleFilter }}<span v-show="!isNaN(Number(data.staffCount)) && Number(data.staffLimit) !== 0">/</span>{{ data.staffLimit | staffCountFilter }})</span></span> -->
        </span>
      </span>
    </el-tree>
      </div>
  </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: 'OrgTree',
  props: {
    data: {
      type: Array,
      default: []
    },
    isCheck: {
      type: Boolean,
      default: false
    },
    openAll:{
      type:Boolean,
      default:true
    },
    isCount: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  filters: {
    peopleFilter(num) {
      if (isNaN(Number(num)) || Number(num) === 0) {
        return 0
      } else {
        return num
      }
    },
    staffCountFilter(num) {
      if (isNaN(Number(num)) || Number(num) === 0) {
        return null
      } else {
        return num
      }
    }
  },
  methods: {
    handleNodeClick(obj) {
      const id = obj.id
      this.$store.dispatch('GetOrgInfo', id).then(data => {
        if (data.code === 0) {
          data.data['info']['parent'] = obj.parent
          this.$emit('handleNodeClick', data.data.info, data.data)
        } else {
          this.$message({ type: 'warning', message: data.message })
        }
      }).catch(err => {
      })
    },
    handleCheckChange(obj, check, indeterminate) {
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/theme.scss';

.el-tree-node__content{
  height: 28px !important;
}

.org-tree{
  height: 100%;
  width: 100%;
  .icon{
    color: $themeColor;
  }
}
</style>

