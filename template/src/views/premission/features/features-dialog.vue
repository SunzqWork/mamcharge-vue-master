<template>
  <div id="features-dialog">
    <el-dialog
      :title="title"
      :visible="isShow"
      :width="width"
      @close="closeDialog"
      >
      <div class="box">
        <el-form :model="formModel" :rules="rules" label-width="100px" ref="form" style="width: 690px;" class="zl-form">
          <el-form-item label="类型" prop="type">
            <el-select class="zl-form-control zl-input-240px" :disabled="isDisabled" v-model="formModel.type" @change="changeType" placeholder="请选择类型">
              <el-option v-for="(type, index) in typeList" :key="index" :label="type.label" :value="type.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input :maxlength="20" placeholder="请输入类型名称" :disabled="isDisabled" v-model="formModel.name" class="zl-form-control zl-input-240px"></el-input>
          </el-form-item>
          <el-form-item label="所属上级" prop="pids">
            <el-cascader
                clearable
                :disabled="isDisabled"
                :props="props"
                expand-trigger="hover"
                placeholder="请选择所属上级"
                :options="appList"
                v-model="formModel.pids" 
                change-on-select
                class="zl-form-control zl-input-240px"
                filterable
              >
            </el-cascader>
          </el-form-item>
          <el-form-item label="URL" prop="url">
            <el-input placeholder="请输入URL" :disabled="isDisabled" v-model="formModel.url" class="zl-form-control zl-input-240px"></el-input>
          </el-form-item>
          <el-form-item label="额外URL" prop="">
            <el-input placeholder="请输入额外URL" :disabled="isDisabled" v-model="formModel.extra" class="zl-form-control zl-input-240px"></el-input>
          </el-form-item>
          <el-form-item label="显示顺序" prop="seq">
            <el-input :disabled="isDisabled" v-model.number="formModel.seq" class="zl-form-control zl-input-240px"></el-input>
            <!-- <el-input-number :disabled="isDisabled" v-model="formModel.seq" class="zl-form-control zl-input-240px" controls-position="right" :min="1" :max="99999"></el-input-number> -->
          </el-form-item>
          <el-form-item label="权限标识" prop="">
            <el-input placeholder="请输入权限标识" :maxlength="20" :disabled="isDisabled" v-model="formModel.perm" class="zl-form-control zl-input-240px"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="">
            <el-input placeholder="请输入图标class" :disabled="isDisabled" v-model="formModel.icon" class="zl-form-control zl-input-240px"></el-input>
          </el-form-item>
          <el-form-item label="是否隐藏" prop="">
            <el-switch
              v-model="formModel.hidden"
              :disabled="isDisabled"
              :active-color="color"
              >
            </el-switch>
          </el-form-item>
          <el-form-item label="描述" prop="">
            <el-input :maxlength="80" type="textarea" style="width: 590px !important;" placeholder="请输入描述内容" :disabled="isDisabled" v-model="formModel.tips" class="zl-form-control zl-input-240px"></el-input>
          </el-form-item>
        </el-form>

        <el-row style="text-align: center;" v-show="!isDisabled">
          <el-button class="btn-theme" @click="commit">确 定</el-button>
          <el-button class="btn-theme" @click="copy" v-show="formModel.id">创建副本</el-button>
          <el-button class="btn-default" @click="cancel">取 消</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { GroupBySys, functionList } from '@/api/premission'
import { specialStrValidate, validateInterAndZero } from '@/utils/validate' 

export default {
  name: 'features-dialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '750px'
    },
    data: {
      type: Object,
      default: () => {
        return {
          seq: null,
          pids: [],
          perm: '',
          name: '',
          icon: '',
          url: '',
          extra: '',
          tips: '',
          type: null,
          hidden: false,
          status: 1
        }
      }
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isType: {
      type: Number,
      default: null // 0 模块 1 菜单 2 页面 3 按钮
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
          callback(new Error('名称输入不合法'))
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
      typeList: [
        { label: '模块', value: 0 },
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
        // { label: '按钮', value: 3 }
      ],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { validator: validateSpecialStr, trigger: 'blur' }
        ],
        pids: [
          { type: 'array', required: true, message: '请选择所属上级', trigger: 'change' }
        ],
        url: [
          { required: true, message: '请输入URL', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        seq: [
          { validator: validateSeq, trigger: 'blur' }
        ]
      },
      color: '#2494e0',
      appList: [],
      props: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      isCopy: false
    }
  },
  methods: {
    changeType(type) {
      if (type === 0) {
        this.functionList()
      } else {
        this.GroupBySys(type)
      }

      // this.GroupBySys(type)
    },
    cancel() {
      this.$emit('update:isShow', false)
    },
    commit() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          // this.formModel.type = this.isType
          this.$emit('is-submit', this.formModel, this.isCopy)
        } else {
        }
      })
    },
    copy() {
      this.isCopy = true
      this.formModel.id = null
      this.formModel.name = this.formModel.name + '--副本'
      this.formModel.url = this.formModel.url + '--副本'
    },
    closeDialog() {
      this.$emit('update:isShow', false)
    },
    functionList() {
      functionList(1, 50).then(res => {
        if (res.success) {
          this.appList = res.data.records
        } else {
          this.$message.error('获取子系统数据失败，请联系管理员。')
        }
      }).catch(err => {
      })
    },
    GroupBySys(type) {
      GroupBySys().then(res => {
        if (res.success) {
          this.appList = res.data.map(item => {
            item.children = item.menus
            const loop = (tree) => {
              if (tree.children && tree.children.length > 0) {
                tree.children.forEach((val, index) => {
                  if (val.type < type) {
                    if ((val.type - type > 1) && !val.children || (val.children && val.children.length < 0)) {
                      tree.children.splice(index, 1)
                    }
                  }

                  if ((type - 1) === val.type) {
                    val.children = null
                  }
                  loop(val)
                })
              }
            }

            loop(item)
            return item
          })
        } else {
          this.$message.error('获取应用数据失败，请联系管理员。')
        }
      }).catch(err => {
      })
    }
  },
  mounted() {
    if (this.formModel.type === 0 || this.formModel.type === null) {
      this.functionList()
    } else {
      this.GroupBySys(this.formModel.type)
    }
  }
}
</script>

<style lang="scss">
#features-dialog{}
</style>


