
<template>
  <el-dialog :title="title" :visible="isShow" :width="width" @close="close">
    <el-form :model="params" :rules="rules" label-width="100px" style="750px;" class="zl-form" ref="form">
      <el-form-item label="简称" prop="name">
        <el-input :disabled="isDisabled" :maxlength="15" v-model.trim="params.name" class="zl-form-control zl-input-240px"></el-input>
      </el-form-item>
      <el-form-item label="全称" prop="fullName">
        <el-input :disabled="isDisabled" :maxlength="30" v-model.trim="params.fullName" class="zl-form-control zl-input-240px"></el-input>
      </el-form-item>
      <el-form-item label="显示顺序" prop="seq">
        <el-input :disabled="isDisabled" v-model="params.seq" class="zl-form-control zl-input-240px"></el-input>
        <!-- <el-input-number :min="1" :max="999" :disabled="isDisabled" v-model="params.seq" controls-position="right" class="zl-form-control zl-input-240px"></el-input-number> -->
      </el-form-item>
      <el-form-item label="限制用户数" prop="staffLimit">
        <el-input :disabled="isDisabled" v-model="params.staffLimit" class="zl-form-control zl-input-240px"></el-input>
        <!-- <el-input-number :min="1" :max="100000" :disabled="isDisabled" v-model="params.staffLimit" controls-position="right" class="zl-form-control zl-input-240px"></el-input-number> -->
      </el-form-item>
      <el-form-item label="上级部门" prop="superior">
        <el-input :disabled="isDisabled" disabled v-model="parentName" class="zl-form-control zl-input-240px"></el-input>
      </el-form-item>
      <el-form-item label="分部编号" prop="number" v-if="params.code != '' && params.code != undefined">
        <el-input :disabled="isDisabled" disabled v-model="params.code" class="zl-form-control zl-input-240px"></el-input>
      </el-form-item> 
    </el-form>
    <div slot="footer" style="text-align: center;" v-if="!isDisabled">
      <el-button class="btn-theme" @click="submit">确定</el-button>
      <el-button class="btn-default" @click="cancel">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { specialStrValidate, validateInterAndZero } from '@/utils/validate' 
export default {
  name: "bs",
  props: {
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
          
        }
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

    const validateSpecialStr2 = (rule, value, callback) => {
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
      params: this.data,
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
  watch: {
    data() {
      this.params = this.data
    }
  },
  methods: {
    close(){
      this.$emit( "update:isShow", false );
    },
    cancel() {
      this.$emit( "update:isShow", false );
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (!this.params.staffLimit) {
            this.params.staffLimit = null
          }
          this.$emit("is-submit", this.data);
          // this.$emit( "update:isShow", false );
        } else {
        }
      })
    }
  }
};
</script>
<style lang="scss">
.zl-width {
  width: 100%;
}
</style>


