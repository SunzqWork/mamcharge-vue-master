<template>
  <div id="role">
    <zl-card class="left">
      <el-scrollbar wrapClass="scrollbar-wrapper" class="scroll">
        <zl-org-tree :data="treeData" @handleNodeClick="handleNodeClick" :isCount="false"></zl-org-tree>
      </el-scrollbar>
    </zl-card>
    <div class="right">
      <role-list :orgId="orgId" :orgName="orgName"></role-list>
    </div>
  </div>
</template>
<script>
import roleList from './components/list'
export default {
  name: 'role',
  components: { roleList },
  data() {
    return {
     treeData: [],
     orgId: '',
     orgName: ''
    }
  },
  methods: {
    handleNodeClick(obj, data) {
      this.orgId = obj.id
      this.orgName = obj.name
    },
    getTree() {
      this.$store.dispatch('GetOrgTree', 0).then(data => {
        // if (data.code === 0) {
          this.treeData = [data.data]
          this.orgId = this.treeData[0].id
          this.orgName = this.treeData[0].name
        // } else {
          // this.$message({ type: 'warning', message: data.message })
        // }
      }).catch(err => {
      })
    },
    getTreeFunc() {
      this.getTree()
    },
    resize() {
      this.$nextTick(() => {
        document.getElementsByClassName('scroll')[0].style.height = (document.getElementsByClassName('left')[0].offsetHeight - 10) + 'px'
      })
    }
  },
  mounted() {
    this.resize()
    this.getTree()
  }
}
</script>
<style lang="scss">
#role{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 98%;
  width: 100%;
  .left {
    margin-left: 10px;
    width: 300px !important;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
  }
  .right{
    margin-left: 310px;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
}
</style>


