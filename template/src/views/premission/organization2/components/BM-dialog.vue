
<template>
  <el-dialog :title="title" :visible="isShow" :width="width" @close="close">
    <el-form :model="params" :rules="rules" ref="params" label-width="120px" class="zl-form">
      <el-form-item label="简称" prop="name">
        <el-input :disabled="isDisabled" :maxlength="15" v-model.trim="params.name" class="zl-form-control zl-input-240px" placeholder="请输入简称"></el-input>
      </el-form-item>
      <el-form-item label="全称" prop="fullName">
        <el-input :disabled="isDisabled" :maxlength="30" v-model.trim="params.fullName" class="zl-form-control zl-input-240px" placeholder="请输入全称"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="seq">
        <el-input :disabled="isDisabled" v-model="params.seq" class="zl-form-control zl-input-240px" placeholder="请输入显示顺序"></el-input>
        <!-- <el-input-number :min="1" :max="999" :disabled="isDisabled" v-model="params.seq" controls-position="right" class="zl-form-control zl-input-240px"></el-input-number> -->
      </el-form-item>
      <el-form-item label="限制用户数" prop="staffLimit">
        <el-input :disabled="isDisabled" v-model="params.staffLimit" class="zl-form-control zl-input-240px" placeholder="请输入限制用户数">></el-input>
        <!-- <el-input-number :min="1" :max="100000" :disabled="isDisabled" v-model="params.staffLimit" controls-position="right" class="zl-form-control zl-input-240px"></el-input-number> -->
      </el-form-item>
      <el-form-item label="部门负责人" prop="principalId" v-if="isStatus">
      <el-select :disabled="isDisabled" v-model="params.principalId" filterable placeholder="请选择部门负责人" class="zl-form-control zl-input-240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>      
      </el-form-item>
      <el-form-item label="部门分管领导" prop="leaderId" v-if="isStatus || isNews">
        <el-input disabled class="zl-form-control zl-input-240px" v-model="params.leaderName" placeholder="请选择部门分管领导">
          <template slot="append"><i class="el-icon-more pointer" @click="BMLeaVisible = true"></i></template>
        </el-input>     
      </el-form-item>
      <el-form-item label="上级部门" prop="superior">
        <el-input disabled v-model="parentName" class="zl-form-control zl-input-240px"></el-input>
      </el-form-item>
      <el-form-item label="分部编号" prop="number" v-if="params.code != '' && params.code != undefined">
        <el-input disabled v-model="params.code" class="zl-form-control zl-input-240px"></el-input>
      </el-form-item> 
    </el-form>
    <div slot="footer" style="text-align: center;" v-if="!isDisabled">
      <el-button class="btn-theme" @click="submit">确定</el-button>
      <el-button class="btn-default" @click="cancel">取消</el-button>
    </div>


    <!-- 部门负责人帮助框 -->
    <zl-help 
      :isShow.sync="BMLeaVisible" 
      :typeCheck="false" 
      v-if="BMLeaVisible" 
      choice="radio"
      :positions="'user'" 
      :whereShows="[1,2,3]"
      @submit-call="submitCall"/>
  </el-dialog>
</template> 
<script>
import { getOrgInfo } from "@/api/premission"
import { queryUserList } from '@/api/user'
import { specialStrValidate, validateInterAndZero } from '@/utils/validate' 

export default {
  name: "bs",
  props: {
    isStatus: {
      type: Boolean,
      default: false
    },
    isNews:{
      type:Boolean,
      default :false
    },
    title:{
      default:"",
      type:String
    },
    width: {
      default: "850px",
      type: String
    },
    isShow: {
      default: false,
      type: Boolean
    },
    parentName: {
      type: String,
      default: ''
    },
    data: {
      default: () => {
        return {
          
        };
      },
      type: Object
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateSpecialStr = (rule, value, callback) => {
       var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        if (pattern.test(value)) {
          callback(new Error('不能输入特殊字符'))
        }else{
         if(value.length > 15 ){
            callback(new Error('简称输入不能超过15字符'))
            }else{
                if (value === '') {
                      callback(new Error('简称不能为空'))
                    } else {
                      if (specialStrValidate(value)) {
                        callback(new Error('简称输入不合法'))
                      } else {
                        callback()
                      }
                    }
                }
        }
      
    }

    const validateSpecialStr2 = (rule, value, callback) => {
       var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        if (pattern.test(value)) {
          callback(new Error('不能输入特殊字符'))
        }else{
          if(value.length > 30){
            callback(new Error('全称输入不能超过30字符'))
          }else{
            if (value === '') {
            callback(new Error('全称不能为空'))
            } else {
              if (specialStrValidate(value)) {
                callback(new Error('全称输入不合法'))
              } else {
                callback()
              }
            }
          }
        }
    }

    const validateSeq = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback()
      } else {
        if (!validateInterAndZero(value)) {
          callback(new Error('请输入100000以内正整数'))
        } else {
          if (value < 0 || value > 100000) {
            callback(new Error('限制用户数应限制小于等于100000'))
          } else {
            callback()
          }
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
      params: JSON.parse(JSON.stringify(this.data)),
      options: [],
      BMLeaVisible: false, // 部门分管领导
      rules: {
        name: [
          { required: true, message: '请输入总部简称', trigger: 'blur' },
          { validator: validateSpecialStr, trigger: 'blur' }
        ],
        fullName: [
          { required: true, message: '请输入总部全称', trigger: 'blur' },
          { validator: validateSpecialStr2, trigger: 'blur' }
        ],
        staffLimit: [
          { validator: validateSeq, trigger: 'blur' }
        ],
        seq: [
          { validator: validateSeq2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitCall(data) {
      this.params.leaderId = data[0].id
      this.params.leaderName = data[0].name
    },
    close(){
        this.$emit( "update:isShow", false );
    },
    cancel() {
      this.$emit( "update:isShow", false );
    },
    submit() {
      this.$refs['params'].validate(valid => {
        if (valid) {
          this.options.forEach(val => {
            if (val.value === this.params.principalId) {
              this.params.principalName = val.label
            }
          })

          this.params.seq = this.params.seq === '' ? null : this.params.seq
          this.params.staffLimit = this.params.staffLimit === '' ? null : this.params.staffLimit
          this.$emit("is-submit", this.params);
          // this.$emit( "update:isShow", false );
        } else {
        }
      })
    },
    // 查询部门用户
    queryUserList() {
      queryUserList({ orgId: this.params.id, page: 1, size: 50 }).then(res => {
        if (res.success) {
          this.options = res.data.records.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
        } else {
          this.$message.error('获取部门负责人失败，请联系管理员。')
        }
      }).catch(err => {
      })
    }
  },
  mounted() {
    this.params = JSON.parse(JSON.stringify(this.data))
    this.queryUserList()
  }
};
</script>
<style lang="scss">
.zl-width {
  width: 100%;
}
</style>


