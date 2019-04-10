<template>
  <div id="application-dialog">
      <el-dialog
        :title="title"
        :visible="isShow"
        :width="width"
        @close="closeDialog"
        >
        <div class="box">
          <el-form :model="formModel" style="width: 690px;margin: 0 auto;" :rules="rules" label-width="100px" class="zl-form" ref="form">
            <el-form-item label="应用名称" prop="name">
              <el-input class="zl-form-control zl-input-240px" :disabled="isDisabled" placeholder="请输入应用名称" v-model="formModel.name" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="站点URL" prop="url">
              <el-input class="zl-form-control zl-input-240px"  :disabled="isDisabled" placeholder="请输入站点URL" v-model="formModel.url"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-input class="zl-form-control zl-input-240px"  :disabled="isDisabled" placeholder="请输入图标class" v-model="formModel.icon"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序" prop="seq">
              <el-input class="zl-form-control zl-input-240px" :disabled="isDisabled" placeholder="请输入显示顺序" v-model="formModel.seq"></el-input>
              <!-- <el-input-number class="zl-form-control zl-input-240px" :disabled="isDisabled" placeholder="请输入显示顺序" v-model="formModel.seq" controls-position="right" :min="1" :max="99999"></el-input-number> -->
            </el-form-item>
            <el-form-item label="是否隐藏">
              <el-switch
                v-model="formModel.hidden"
                :active-color="color"
                 :disabled="isDisabled"
                inactive-color="#E8E8E8">
              </el-switch>
            </el-form-item>
            <el-form-item label="描述" style="width: 690px;">
              <el-input 
                type="textarea" 
                :maxlength="40"
                :disabled="isDisabled"
                class="zl-form-control zl-input-240px" 
                style="width: 590px !important;"
                placeholder="请输入描述内容" 
                v-model="formModel.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" style="text-align: center;" v-if="!isDisabled">
           <el-button @click="determine" class="btn-theme">确 定</el-button>
          <el-button @click="cancel" class="btn-default">取 消</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { specialStrValidate, validateInterAndZero } from '@/utils/validate' 

export default {
  name: 'application-dialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '750px'
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {
        return {
          id: '',
          name: '',
          url: '',
          icon: '',
          seq: null,
          remark: '',
          hidden: false
        }
      }
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
          callback(new Error('应用名称输入不合法'))
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
          callback(new Error('只能输入0以及正整数'))
        } else {
          if (value < 0 || value > 9999) {
            callback(new Error('只能输入0-9999之间的数字'))
          } else {
            callback()
          }
        }
      }
    }
    return {
      formModel: JSON.parse(JSON.stringify(this.data)),
      rules: {
        name: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
          { validator: validateSpecialStr, trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入站点URL', trigger: 'blur' }
        ],
        seq: [
          { validator: validateSeq, trigger: 'blur' }
        ]
      },
      color: '#299ee4'
    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:isShow', false)
    },
    cancel() {
      this.$emit('update:isShow', false)
    },
    determine() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$emit('is-submit', this.formModel)
          // this.$emit('update:isShow', false)
        } else {
        }
      })
    }
  }
}
</script>

<style lang="scss">
#application-dialog{}
</style>


