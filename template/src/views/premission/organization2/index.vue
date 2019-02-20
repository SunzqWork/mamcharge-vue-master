<template>
  <div id="organization2">
    <zl-card class="left">
      <zl-org-tree :isCount="false" :data="treeData" @handleNodeClick="handleNodeClick"></zl-org-tree>
    </zl-card>
    <div class="right">
      <zl-card class="right-card">
        <el-scrollbar wrapClass="scrollbar-wrapper" class="scroll2">
          <ZB :info="ZBInfo" v-if="type === 1" @get-tree="getTreeFunc"></ZB>
          <FB :info="FMInfo" v-if="type === 2" @get-tree="getTreeFunc"></FB>
          <BM :info="BMInfo" v-if="type === 3" @get-tree="getTreeFunc"></BM>
        </el-scrollbar>
      </zl-card>
    </div>
  </div>
</template>
<script>
import ZB from './components/ZB'
import FB from './components/FB'
import BM from './components/BM'
export default {
  name: 'organization2',
  components: { ZB, FB, BM },
  data() {
    return {
      treeData: [],
      ZBInfo: {},
      FMInfo: {},
      BMInfo: {},
      type: 1 // 默认是总部
    }
  },
  methods: {
    handleNodeClick(obj, data) {
      this.type = obj.type
      if (this.type === 1) {
        this.ZBInfo = obj
      } else if (this.type === 2) {
        this.FMInfo = obj
      } else if (this.type === 3) {
        let name
        if (obj.ancestors instanceof Array) {
          const s1 = obj.ancestors.reverse()
          for (let i = 0; i < s1.length; i++) {
            if (s1[i].type === 2) {
              obj.superFB = s1[i].name
              break
            }
          }
        } else {
          this.$message.error('数据格式不正确，无法正确识别，请联系管理员。')
        }
        
        this.BMInfo = obj
      } else {
        // TODO
      }
    },
    getTree() {
      this.$store.dispatch('GetOrgTree').then(data => {
        if (data.code === 0) {
          this.treeData = [data.data]
          this.ZBInfo = this.treeData[0]
        } else {
          this.$message({ type: 'warning', message: data.message })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getTreeFunc() {
      this.getTree()
    },
    resize() {
      this.$nextTick(() => {
        // document.getElementsByClassName('scroll')[0].style.height = (document.getElementsByClassName('left')[0].offsetHeight * 0.90) + 'px'
        document.getElementsByClassName('scroll2')[0].style.height = (document.getElementsByClassName('right')[0].offsetHeight * 0.95) + 'px'
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
#organization2{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 98%;
  width: 99%;
  .left{
    margin-left: 0.5%;
    width: 300px !important;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    .scroll{
      padding-right: 5px;
    }
  }
  .right{
    margin-left: 300px;
    height: 100%;
    position: relative;
    .right-card{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%
    }
  }
}
</style>


