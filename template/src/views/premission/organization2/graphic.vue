<template>
  <div id="graphic" style="position:absolute;top: 0;right: 0;left: 0;bottom: 0;overflow:hidden;overflow-x:auto;margin-top: 60px;">
    <!-- style="position:absolute;top: 0;right: 0;left: 0;bottom: 0;overflow:auto;" -->
    <!-- <zl-card style="overflow:auto">
      <org-tree-show 
        :data="treeData"
        :horizontal="true"
        @on-expand="collapsableFunc"
        :collapsable="false" />
        
    </zl-card> -->
    <!-- <zl-card>
      <TreeChart :json="treeData" />
    </zl-card> -->
    <TreeChart :json="treeData" />
  </div>
</template>
<script>
import orgTreeShow from '@/components/app/org-tree-show/org-tree'
import TreeChart from "@/components/app/zl-org-flow/index"
import bm_bg from '@/assets/bm.png'
import fb_bg from '@/assets/fb.png'
import zb_bg from '@/assets/zb.png'

export default {
  name: 'graphic',
  components: { orgTreeShow, TreeChart },
  data() {
    return {
      treeData: {}
    }
  },
  methods: {
    getTree() {
      this.$store.dispatch('GetOrgTree').then(res => {
        if (res.code === 0) {
          this.treeData = res.data
          // this.treeData.expand = true
          // this.treeData.label = this.treeData.name + '-(总部)'
          // const loop = (obj) => {
          //   if (obj.children && obj.children.length > 0) {
          //     obj.children.forEach(val => {
          //       val.label = val.type === 2 ? val.name + '-(分部)' : val.name + '-(部门)'
          //       val.expand = true
          //       loop(val)
          //     })
          //   }
          // }

          // loop(this.treeData)

          const loop = (tree) => {
            if (tree.children && tree.children.length > 0) {
              tree.children.forEach(val => {
                if (val.type === 2) {
                  val.image_url = fb_bg
                }

                if (val.type === 3) {
                  val.image_url = bm_bg
                }

                loop(val)
              })
            }
          }

          this.treeData.image_url = zb_bg
          loop(this.treeData)
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
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
