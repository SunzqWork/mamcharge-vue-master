<template>
  <div id="graphic">
    <zl-card>
      <org-tree-show 
        :data="treeData"
        :horizontal="true"
        @on-expand="collapsableFunc"
        :collapsable="false" />
    </zl-card>
  </div>
</template>
<script>
import orgTreeShow from '@/components/app/org-tree-show/org-tree'
export default {
  name: 'graphic',
  components: { orgTreeShow },
  data() {
    return {
      treeData: {},
    }
  },
  methods: {
    getTree() {
      this.$store.dispatch('GetOrgTree').then(res => {
        if (res.code === 0) {
          this.treeData = res.data
          this.treeData.expand = true
          this.treeData.label = this.treeData.name + '-(总部)'
          const loop = (obj) => {
            if (obj.children && obj.children.length > 0) {
              obj.children.forEach(val => {
                val.label = val.type === 2 ? val.name + '-(分部)' : val.name + '-(部门)'
                val.expand = true
                loop(val)
              })
            }
          }

          loop(this.treeData)
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    collapsableFunc(props) {
      this.$nextTick(() => {
        if (this.treeData.id === props.id) {
          this.treeData.expand = false
          return false
        }
        const loop = (obj) => {
          if (obj.children && obj.children.length > 0) {
            obj.children.forEach(val => {
              if (val.id === props.id) {
                val.expand = false
              }

              loop(val)
            })
          }
        }

        loop(this.treeData)
      })
    }
  },
  mounted() {
    this.getTree()
  }
}
</script>
