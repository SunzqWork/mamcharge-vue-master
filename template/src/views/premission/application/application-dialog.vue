<template>
  <div id="application-dialog">
      <el-dialog
        :title="title"
        :visible="isShow"
        :width="width"
        @close="closeDialog"
        >
        <div class="box">
          <el-form :model="formModel" :rules="rules" label-width="100px" class="zl-form" ref="form">
            <el-form-item label="应用名称" prop="name">
              <el-input class="zl-form-control zl-input-240px" placeholder="请输入应用名称" v-model="formModel.name"></el-input>
            </el-form-item>
            <el-form-item label="站点URL">
              <el-input class="zl-form-control zl-input-240px" placeholder="请输入站点URL" v-model="formModel.url"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-input class="zl-form-control zl-input-240px" placeholder="请输入图标class" v-model="formModel.icon"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序">
              <el-input-number class="zl-form-control zl-input-240px" placeholder="请输入显示顺序" v-model="formModel.seq" controls-position="right" :min="1" :max="100"></el-input-number>
            </el-form-item>
            <el-form-item label="是否隐藏">
              <el-switch
                v-model="formModel.isFlag"
                :active-color="color"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="描述">
              <el-input 
                type="textarea" 
                class="zl-form-control zl-input-240px" 
                placeholder="请输入描述内容" 
                v-model="formModel.remark"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel" class="btn-default">取 消</el-button>
          <el-button @click="determine" class="btn-theme">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'application-dialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '450px'
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
          isFlag: ''
        }
      }
    }
  },
  data() {
    return {
      formModel: JSON.parse(JSON.stringify(this.data)),
      rules: {
        name: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
          // { validator: validatePass, trigger: 'blur' }
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
          this.$emit('update:isShow', false)
        } else {
          console.log('表单验证不通过')
        }
      })
    }
  }
}
</script>

<style lang="scss">
#application-dialog{}
</style>


