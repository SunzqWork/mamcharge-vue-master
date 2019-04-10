<template>
  <div id="safety" style="position:relative;">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本设置" name="first">
        <zl-card>
          <el-button class="btn-theme" style="margin-bottom: 15px;" @click="save">
            <svg-icon icon-class="pre-save"></svg-icon>
            <span style="padding-left: 8px">确定</span>
          </el-button>
          <safety-base @getData="getData"></safety-base>
        </zl-card>
      </el-tab-pane>
      <el-tab-pane label="网段策略" name="second">
        <safety-celue></safety-celue>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import safetyBase from './safety-base'
import safetyCelue from './safety-celue'
import { updateSafetyData } from '@/api/safety'
export default {
  name: 'safety',
  components: { safetyBase, safetyCelue },
  data() {
    return {
      activeName: 'first',
      params: {}
    }
  },
  methods: {
    getData(val) {
      this.params = val
    },
    save() {
      if(this.params.isYS || this.params.isYS == undefined ){
        updateSafetyData(this.params).then(res => {
          if(res.errcode === 0) {
            this.$message.success('修改成功')
          } else {
            this.$message.error(res.errmsg)
          }
        })
      }
      
    }
  }
}
</script>
<style>
#safety {
  margin: 20px;
}
</style>
