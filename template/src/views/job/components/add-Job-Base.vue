<template>
  <div class="add-Job-Base">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width='100px' style="width: 750px;" class="zl-form">
      <el-form-item label="岗位类型" prop="refPostId">
        <el-select v-model="ruleForm.refPostId" placeholder="请选择岗位类型" class="zl-form-control zl-input-240px">
          <el-option v-for="item in refPostIds" :key="item.id" :label="item.name" :value="item.id" v-show="item.status === 1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="岗位全称" prop="fullName">
        <el-input :maxlength="30" v-model="ruleForm.fullName" placeholder="请选择岗位名称"  class="zl-form-control zl-input-240px"></el-input>
      </el-form-item>
      <el-form-item label="岗位简称" prop="name">
        <el-input :maxlength="15" v-model="ruleForm.name" placeholder="请选择岗位简称"  class="zl-form-control zl-input-240px"></el-input>
      </el-form-item>
      <el-form-item label="所属部门" prop="orgName">
        <el-input :disabled="true" class="zl-form-control zl-input-240px" v-model="ruleForm.orgName">
          <template slot="append"><i  @click="showTree" style="cursor: pointer" class="el-icon-more"></i></template>
        </el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="seq">
        <el-input class="zl-form-control zl-input-240px" v-model="ruleForm.seq" controls-position="right" ></el-input>
      </el-form-item>
      <el-form-item label="岗位说明" prop="remark">
        <el-input style="width: 605px !important;" type="textarea" v-model="ruleForm.remark" :maxlength="80"></el-input>
      </el-form-item>
    </el-form>
    <!-- <div slot="footer">
      <el-button type="primary" @click.native="save"  class="btn-theme">保 存</el-button>
      <el-button type="primary" @click="saveAndClone" class="btn-default">确定并克隆权限</el-button>
      <el-button type="primary" class="btn-default"  @click.native="savetoedit">确定并设置权限</el-button>
    </div> -->
   <tree-orgs :isShow.sync="treeVisible" @handleNodeClick="handleNodeClick"/>
   <!-- 单个 -->
    <zl-user-help 
      :isShow.sync="shows" 
      v-if="shows" 
      :whereShows="[1,3,4]" 
      :typeCheck="false"
      choice="radio" 
      :positions="'post'"
       @submit-call="calls"
      :nowId="ruleForm.orgId"
       />
  </div>
</template>
<script>
import zlUserHelp from "@/components/app/zl-user-help";
import { getBzJobList, addJobBase, getJobInfo, editJob, getJobPermisson, getJobPermissonBase, addJobApi } from "@/api/job";
import { specialStrValidate, validateInterAndZero } from '@/utils/validate'

import treeOrgs from "@/components/app/org-tree-dialog";
export default {
  components: {
    treeOrgs,
    zlUserHelp
  },
  props: {
    jobid: {
      type: String,
      default: ""
    },
    btnType: {
      type: Boolean,
      default: false
    },
    btnSet: {
      type: Boolean,
      default: false  
    }
  },
  data() {
    const validateSpecialStr = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('岗位全称不能为空'))
      } else {
        if (specialStrValidate(value)) {
          callback(new Error('岗位全称输入不合法'))
        } else {
          callback()
        }
      }
    }

    const validateSpecialStr2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入岗位简称'))
      } else {
        if (specialStrValidate(value)) {
          callback(new Error('岗位简称输入不合法'))
        } else {
          callback()
        }
      }
    }
    var remarkVal = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback()
      } else {
        if (value.length > 80 ) {
          callback(new Error('岗位说明不能超过80个字符'))
        } else {
          callback()
        }
      }
    }
    const validateSeq2 = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback()
      } else {
        if (!validateInterAndZero(value)) {
          callback(new Error('只能输入0以及正整数'))
        } else {
          if (value < 0 || value > 9999) {
            callback(new Error('只能输入0-9999'))
          } else {
            callback()
          }
        }
      }
    }
    return {
      ints:false,
      shows: false,
      treeVisible: false,
      refPostIds: [],
      ruleForm: { fullName: '', orgName: '' },
      rules: {
        refPostId: [
          { required: true, message: "请选择标准岗位", trigger: "change" }
        ],
        fullName: [
          { required: true, message: "请输入岗位全称", trigger: "change" },
          { validator: validateSpecialStr, trigger: 'blur' }
        ],
        name: [
          { required: true, message: "请输入岗位简称", trigger: "change" },
          { validator: validateSpecialStr2, trigger: 'blur' }
        ],
        orgName: [
          { required: true, message: "请选择所属部门", trigger: "change" }
        ],
        remark: [
          { required: false, trigger: "blur" },
          { validator: remarkVal, trigger: 'blur' }
        ],
        seq: [
          { validator: validateSeq2, trigger: 'blur' }
        ]
      },
      clone: false
    };
  },
  computed: {
    jobInfo() {
      return this.$store.state.job.jobInfo
    },
    jobStatus() {
      return this.$store.state.job.jobStatus
    }
  },
  watch: {
    jobStatus() {
      if (this.jobStatus === '1') {
        this.$store.dispatch('action_set_job_status', '')
        this.save()
      }
    },
    btnType() {
      if (this.btnType) {
        this.$emit('update:btnType', false)
        this.saveAndClone()
      }
    },
    btnSet() {
      if (this.btnSet) {
        this.$emit('update:btnSet', false)
        this.savetoedit()
      }
    },
    shows() {
      this.clone = this.shows
    }
  },
  methods: {

    // 点击确定并克隆权限按钮
    saveAndClone() {
      this.clone = true
      this.save()
    },

    calls(s) {
      this.clone = false
      // if (s.length === 0) {
      //   this.$message.error('所选的克隆权限数据为空，请联系管理员进行查看。')
      //   return false
      // }
      const id = s[0].id
      // 根据取消的id获取该岗位的数据权限数据
      getJobPermisson(id).then(res => {
        if (res.success) {
          // if (res.data && res.data.length > 0) {
            func(res.data)
          // } else {
          //   this.$message({
          //     type: 'warning',
          //     message: '所选择的岗位没有关联数据权限'
          //   })
          // }
          this.list = res.data
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      }) 
      
      const func = (list) => {
        // if(list)
        
        if(list.length == 0){
          var obj = {
            postId: this.jobid,
            sysPostFields: []
          }
        }else{
          var obj = {
            senior: list[0].senior,
            postId: this.jobid,
            sysPostFields: []
          }
          list.forEach(val => {
            obj.sysPostFields.push({
              menuId: val.menuId,
              fieldType: val.fieldType,
              fieldValue: val.fieldValue,
              allMenu: val.allMenusave
            })
          })
        }
        

        addJobApi(obj).then(res => {
          if (res.success) {
            this.$message.success('克隆岗位数据权限成功')
            this.$emit('basechange', true, true)
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(err => {
        })
      }
    },
    // 获取标准岗位ID
    getrefPostId() {
      let params = {
        page: 1,
        size: 10000
      };
      getBzJobList(params).then(res => {
        this.refPostIds = res.data.records
      });
    },
    handleNodeClick(val) {
      if (val.type == 3) {
        // 分部
        this.$set(this.ruleForm, "orgId", val.id);
        this.$set(this.ruleForm, "orgName", val.name);
      } else {
        // 其他
        this.$message({
          type: "warning",
          message: "只能选择分部，不可选其他"
        });
      }
    },
    showTree() {
      this.treeVisible = true;
    },
    // 确定
    save() {
      let flag = false
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.jobid) {
             getJobInfo(this.jobid).then(res => {
              this.ruleForm = { ...res.data, ...this.ruleForm }
              editJob(this.ruleForm).then(res => {
                if (res.success) {
                  this.$message.success('岗位信息修改成功')
                  flag = true
                  if (flag) {
                    if (this.clone) {
                      this.shows = true
                    } else {
                      this.$emit("CloseDialog", true)
                    }
                  }
                } else {
                  this.$message.error(res.errmsg)
                }
              });
            })
          } else {
            addJobBase(this.ruleForm).then(res => {
              if (res.success) {
                // this.jobid = res.data.id
                this.$store.dispatch('action_set_jobid', res.data.id)
                this.$message.success('岗位新增成功')
                this.$emit('is-load')
                flag = true
                if (flag) {
                  if (this.clone) {
                    this.shows = true
                  } else {
                    this.$emit("CloseDialog", true)
                  }
                }
              } else {
                this.$message.error(res.errmsg)
              }
            })
          }
        } else {
        }
      });
    },
    // 确定并设置权限
    savetoedit() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.jobid) {
            getJobInfo(this.jobid).then(res => {
              this.ruleForm = { ...res.data, ...this.ruleForm }
              editJob(this.ruleForm).then(res => {
                // this.$parent.activeName = "2"
                this.$emit('changeTab','2', true)
                if (res.success) {
                  this.$message.success('岗位信息修改成功')
                } else {
                  this.$message.error(res.errmsg)
                }
              });
            })
          } else {
            addJobBase(this.ruleForm).then(res => {
              // this.jobid = res.data.id
              // if()
              if(res.success){
                // this.$parent.activeName = "2"
                this.$emit('changeTab','2', true)
                this.$message({
                  message: "岗位新增成功",
                  type: "success"
                });
                this.$emit('is-load')
                this.$store.commit("SET_JOBID", res.data.id);
                this.$emit("input", "2");
              }else{
                this.$message({
                  message: res.errmsg,
                  type: "error"
                });
              }
              
              
            });
          }
          
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.getrefPostId();
    if (this.jobid) {
      getJobInfo(this.jobid).then(res => {
        this.ruleForm = Object.assign(res.data, { orgName: res.data.org.name });
      });
    } else {
      this.ruleForm.orgName = this.jobInfo.name
      this.ruleForm.orgId = this.jobInfo.id
    }
  }
}
</script>

<style lang="scss">
.add-Job-Base {
  .foot_btns {
    text-align: center;
  }
  .el-dialog {
    min-width: 500px;
  }
}
</style>

