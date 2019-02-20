<template>
  <div class="tree-component">
    <treeNode :Model="treeData"></treeNode>
  </div>
</template>
<script>
import treeNode from './tree-node'
export default {
  name: 'tree-component',
  props: {
    // 原始数据
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: { treeNode },
  data() {
    return { 
      treeData: this.data
    }
  },
  watch: {
    treeData: {
      handler(newData) {
        this.$emit('changNode', this.treeData)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
#tree-component{

}
</style>
