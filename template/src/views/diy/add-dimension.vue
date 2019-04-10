<template>
  <div id="add-dimension">
    <el-dialog
      title=""
      :visible="isShow"
      width="850px"
      @close="closeDialog"
      >
      <el-form inline label-position="right" label-width="80px" :model="params" :rules="rules" ref="form">
          <el-row>
            <div>
              <el-form-item label="维度名称" prop="name">
                <el-input class="zl-form-control zl-input-240px" placeholder="请输入维度名称" v-model="params.name"></el-input>
              </el-form-item>
            </div>

            <div>
              <el-form-item label="Code" prop="code">
                <el-input class="zl-form-control zl-input-240px" placeholder="请输入Code码" v-model="params.code"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="Api" prop="api">
                <el-input class="zl-form-control zl-input-240px" placeholder="请输入请求地址" v-model="params.api"></el-input>
                <el-tooltip class="item" effect="dark" content="前台请求后台的api" placement="right">
                  <i class="el-icon-info"></i>
                </el-tooltip>
                <p>{{ api }}{{ params.api }}</p>
              </el-form-item>

            </div>

            <div>
              <el-form-item label="TreeTable" prop="tree">
                <el-radio-group v-model="params.tree">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>

                <el-tooltip class="item" effect="dark" content="表格数据展示是否支持树形格式" placement="right">
                  <i class="el-icon-info"></i>
                </el-tooltip>
              </el-form-item>
            </div>

            <div v-if="params.tree">
              <div>
                <el-form-item label="PidKey" prop="pidKey">
                  <el-input class="zl-form-control zl-input-240px" disabled placeholder="pid" v-model="params.pidKey"></el-input>
                  <el-tooltip class="item" effect="dark" content="对象的父级id的key" placement="right">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </el-form-item>
              </div>
              
              <div>
                <el-form-item label="ChildKey" prop="childKey">
                  <el-input class="zl-form-control zl-input-240px" disabled placeholder="children" v-model="params.childKey"></el-input>
                  <el-tooltip class="item" effect="dark" content="元素下面自己元素对应的key" placement="right">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                </el-form-item>
              </div>
              
            </div>
          </el-row>
          
          <el-row>
            <ul>
              <li v-for="(item, index) in list" :key="index">
                <el-form :model="item" :rules="rulesColumn" :ref="'column' + index" inline label-position="right" label-width="80px">
                  <el-form-item label="Label" prop="label">
                    <el-input class="zl-form-control zl-input-240px" placeholder="请输入表头名称" v-model="item.label"></el-input>
                  </el-form-item>
                  <el-form-item label="Prop" prop="prop">
                    <el-input class="zl-form-control zl-input-240px" placeholder="请输入数据展示字段" v-model="item.prop"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button icon="el-icon-circle-plus" class="btn-theme" @click="add"></el-button>
                    <el-button v-show="index !== 0" icon="el-icon-remove" class="btn-danger" @click="del(index)"></el-button>
                    <el-tooltip v-show="index === 0" class="item" effect="dark" content="自定义表格展示字段,label即表头名称，prop即对象对应的字段，比如label: 姓名, prop: username" placement="right">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                  </el-form-item>
                </el-form>
              </li>
            </ul>
          </el-row>
        </el-form>
      <div slot="footer" style="text-align: center;">
        <el-button class="btn-theme" @click="commit">确 定</el-button>
        <el-button @click="cancel" class="btn-default">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'add-dimension',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {
          name: '',
          code: '',
          api: '',
          tree: true,
          pidKey: 'pid',
          childKey: 'children',
          extra: JSON.stringify([{ label: '', prop: '' }]),
          status: 1
        }
      }
    }
  },
  data() {
    return {
      isCheck: 1,
      isTreeTable: 1,
      list: [],
      api: process.env.PERMISSION_API,
      params: JSON.parse(JSON.stringify(this.data)),
      rules: {
        name: [
          { required: true, message: '请输入维度名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入code码', trigger: 'blur' }
        ],
        api: [
          { required: true, message: '请输入api', trigger: 'blur' }
        ],
        pidKey: [
          { required: true, message: '请输入pidKey', trigger: 'blur' }
        ],
        childKey: [
          { required: true, message: '请输入childKey', trigger: 'blur' }
        ],
        extra: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        tree: [
          { required: true, message: '请选择table类型', trigger: 'change' }
        ]
      },
      rulesColumn: {
        label: [
          { required: true, message: '请输入维度名称', trigger: 'blur' }
        ],
        prop: [
          { required: true, message: '请输入维度名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    data() {
      this.params = JSON.parse(JSON.stringify(this.data))
      this.list = JSON.parse(this.data.extra)
    }
  },
  methods: {
    add() {
      this.list.push({ label: '', prop: '' })
    },
    del(index) {
      this.list.splice(index, 1)
    },
    closeDialog() {
      this.$emit('update:isShow', false)
    },
    cancel() {
      this.$emit('update:isShow', false)
    },
    commit() {
      let isFlag = true
      let flag = true
      this.$refs['form'].validate(valid => {
        if (valid) {
          // TODO
        } else {
          flag = false
        }
      })

      
      this.list.forEach((val, index) => {
        this.$refs['column' + index][0].validate(v => {
          if (v) {
            // TODO
          } else {
            isFlag = false
          }
        })
      })

      if (isFlag && flag) {
        this.params.extra = JSON.stringify(this.list)
        this.$emit('is-submit', this.params)
      }
    }
  },
  mounted() {
    this.list = JSON.parse(this.data.extra)
  }
}
</script>
<style lang="scss">
  #add-dimension{
    .el-icon-info{
      cursor: pointer;
    }
  }
</style>

