<template>
  <div class="add-job-type-dialog">
    <el-dialog
      :title="title"
      :visible="isShow"
      :width="width"
      @close="close">
      <div class="container">
        <el-form class="zl-form" :model="info" :rules="rules" label-width="100px" ref="form">
          <el-form-item label="类型名称" prop="name">
            <el-input class="zl-form-control zl-input-240px" placeholder="请输入岗位类型名称" v-model="info.name" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="显示顺序" prop="seq">
            <el-input controls-position="right" class="zl-form-control zl-input-240px" v-model="info.seq" ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="zl-btn-center">
        <el-button class="btn-theme" @click="submit">确定</el-button>
        <el-button class="btn-default" @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { specialStrValidate } from '@/utils/validate'

export default {
  name: 'add-job-type-dialog',
  props: {
    title: {
      type: String,
      default: '新增类别'
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    isShow: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '450px'
    }
  },
  data() {
    const number  = (rule, value, callback) => {
      if (value === '' || value === null || value === undefined) {
        callback()
      } else {
        if (/[^\d]/g.test(value)) {
          return callback(new Error("只能输入0以及正整数"));
        } else {
          if (value > 9999 || value < 0) {
            callback(new Error("只能输入0-9999"));
          }else{
            callback();
          }
        }
      }
    }
    const validateSpecialStr = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('类别名称不能为空'))
      } else {
        if (specialStrValidate(value)) {
          callback(new Error('类别名称输入不合法'))
        } else {
          callback()
        }
      }
    }
    return {
      info: JSON.parse(JSON.stringify(this.data)),
      rules: {
        name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
          { validator: validateSpecialStr, trigger: 'blur' }
        ],
        seq: [
          { required: false },
          { validator: number, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('update:isShow', false)
    },
    close() {
      this.$emit('update:isShow', false)
    },
    submit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // this.$emit('update:isShow', false)
          this.$emit('is-submit', this.info)
        } else {
        }
      })
    }
  }
}
</script>
<style lang="scss">
.add-job-type-dialog{

}
</style>