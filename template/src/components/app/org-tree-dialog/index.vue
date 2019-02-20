<template>
  <div class="org-tree-dialog">
    <el-dialog
      title="机构树"
      :visible="isShow"
      width="450px"
      @close="close">
      <div class="container">
        <el-scrollbar wrapClass="scrollbar-wrapper" class="scroll" style="height: 480px;">
          <org-tree :data="treeData" @handleNodeClick="handleNodeClick"></org-tree>
        </el-scrollbar>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-default" @click="cancel">取 消</el-button>
        <el-button class="btn-theme" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import orgTree from '@/components/app/org-tree/index'

export default {
  name: 'org-tree-dialog',
  components: { orgTree },
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    count: { // 0 只获取到分部  1 获取到部门
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      treeData: [],
      obj: null
    }
  },
  watch: {
    isShow() {
      if (this.isShow) { this.getTree() }
    }
  },
  methods: {
    cancel() {
      this.$emit('update:isShow', false)
    },
    submit() {
      if (this.obj === null || this.obj === undefined || this.obj === {}) {
        this.$message.error('请选择一个机构')
        return false
      }
      this.$emit('handleNodeClick', this.obj)
      this.$emit('update:isShow', false)
    },
    close() {
      this.$emit('update:isShow', false)
    },
    handleNodeClick(obj, data) {
      this.obj = obj
    },
    getTree() {
      this.$store.dispatch('GetOrgTree', this.count).then(data => {
        if (data.code === 0) {
          this.treeData = [data.data]
        } else {
          this.$message.error('获取组织架构树失败，请联系管理员。')
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss">
.org-tree-dialog{
  .container{
    min-height: 500px;
  }
}
</style>
