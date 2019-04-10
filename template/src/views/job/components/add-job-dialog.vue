<template>
  <div class="add-Job-base">
    <el-dialog
      title="新增岗位"
      :visible.sync="dialogVisible"
      @close="$emit('basechange',false, '', 'call')"
      width="850px"
      >
      <el-tabs v-model="activeName" type="card" class="zl-height-450">
        <el-tab-pane label="基本信息" name="1">
          <addJobBase
            ref="add-job-base"
            v-if="baseshow"  
            v-model="activeName" 
            :jobid='jobid' 
            :btnSet.sync="btnSet"
            :btnType.sync="btnType"
            @is-load="loads"
            @changeTab="changeTabs"
            @CloseDialog='CloseDialog'>
          </addJobBase>
        </el-tab-pane>
        <el-tab-pane label="数据权限" name="2" v-if="jobid">
          <div v-if="activeName === '2'" style="margin-left: 10px;margin-right: 10px;">
            <el-row class="mb10" >
              <el-radio-group v-model="senior">
                <el-radio :label="1">基础设置</el-radio>
                <el-radio :label="2">高级设置</el-radio>
                <el-tooltip class="item" effect="dark" content="每个维度只能单独确定" placement="right">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </el-radio-group>
            </el-row>
            <jobData @emit-parent="CloseDialog" v-if="senior === 1"/>
            <advancedSet v-if="senior === 2" @emit-parent="CloseDialog" />
          </div>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer" style="text-align: center;">
        <el-button @click="save" class="btn-theme">确定</el-button>
        <div v-if="activeName == '1'" style="display:inline-block;margin-left: 5px;margin-right: 5px;">
          <el-button @click="saveAndClone" class="btn-default">确定并克隆权限</el-button>
          <el-button @click="savetoedit" class="btn-default">确定并设置权限</el-button>
        </div>
        <el-button @click="CloseDialog(true,'call')"  class="btn-default">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import addJobBase from './add-Job-Base'
import jobData from './job-data'
import advancedSet from './advanced-set'
import { getJobPermisson } from '@/api/job'

export default {
  props: {
    baseshow:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      activeName:"1",
      dialogVisible: this.baseshow,
      senior: 1, // 是否是高级
      flag: false,
      btnType: false,
      btnSet: false
    };
  },
  components: {
    addJobBase,
    jobData,
    advancedSet
  },
  computed: {
    jobid(){
      return this.$store.state.job.jobid
    }
  },
  methods: {
    changeTabs(s,boo){
      this.activeName = s
    },
    CloseDialog(fl = false,call){
      const flag = true
      this.dialogVisible = false
      this.$emit('basechange', false, flag, call)
    },
    loads(){
      this.$emit('is-load')
    },
    save() {
      if (this.activeName == 2) {
        // 说明是高级数据权限，此时直接管理弹框
        this.dialogVisible = false
      }
      this.$store.dispatch('action_set_job_status', this.activeName)
    },
    saveAndClone() {
      this.btnType = true
    },
    savetoedit() {
      this.btnSet = true
    }

  },
  mounted() {
    this.dialogVisible = this.baseshow
  }
};
</script>

