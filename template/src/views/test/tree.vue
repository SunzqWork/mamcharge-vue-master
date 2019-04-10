<template>
  <div id="tree">
    <tree 
      :data="treeData" 
      @handleNodeClick="handleNodeClick"/>
  </div>
</template>
<script>
import tree from '@/components/app/org-tree/index'
export default {
  name: '',
  components: {
    tree
  },
  data() {
    return {
      treeData: []
    }
  },
  mounted() {
    this.$store.dispatch('GetOrgTree').then(data => {
      if (data.code === 0) {
        this.treeData = [data.data]
      }
    })
  },
  methods: {
    handleNodeClick(obj, data) {
    }
  }
}
</script>

