<template>
  <div id="jobInfo">
    <zl-card class="left">
      <el-scrollbar wrapClass="scrollbar-wrapper" class="scroll">
        <zl-org-tree :isCount="false" :data="treeData" @handleNodeClick="handleNodeClick"></zl-org-tree>
      </el-scrollbar>
    </zl-card>
    <div class="right">
      <job-info-list :orgId='orgId' :rogType="rogType" ></job-info-list>
    </div>
  </div>
</template>
<script>
import jobInfoList from "./components/jobInfoList";
export default {
  name: "jobInfo",
  components: { jobInfoList },
  data() {
    return {
      treeData: [],
      orgId:'',
      rogType:0,
    };
  },
  methods: {
    handleNodeClick(obj, data) {
      this.orgId = obj.id
      this.rogType = obj.type
      this.$store.dispatch('action_set_job_info', obj)
    },
    getTree() {
      this.$store
        .dispatch("GetOrgTree")
        .then(data => {
          if (data.code === 0) {
            this.treeData = [data.data];
            this.orgId = this.treeData[0].id
          } else {
            this.$message({ type: "warning", message: data.message });
          }
        })
        .catch(err => {
        });
    },
    resize() {
      this.$nextTick(() => {
        document.getElementsByClassName("scroll")[0].style.height = 
        (document.getElementsByClassName("right")[0].offsetHeight) + "px";
      });
    }
  },
  mounted() {
    this.resize();
    this.getTree();
  }
};
</script>
<style lang="scss">
#jobInfo {
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
  .right {
    margin-left: 310px;
    height: 100%;
    position: relative;
    overflow: auto;
    // .right-card{
    //   position: absolute;
    //   top: 0;
    //   bottom: 0;
    //   left: 0;
    //   height: 100%;
    //   width: 100%
    // }
  }
}
</style>


