<template>
  <div class="tree">
    <tree-item-list :model="data"></tree-item-list>
  </div>
</template>
<script>
import treeItemList from './tree-item'
import { treeData } from './data'
import { treeToArray, buildTree } from './util'
export default {
  name: 'tree',
  components: { treeItemList },
  data() {
    return {
      data: treeData()
    }
  },
  mounted() {
    this.$store.dispatch('SAVEMODELDATA', this.data)
  }
}
</script>

