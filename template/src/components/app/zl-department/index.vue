<template>
  <div class="department">
      <p v-for="item in departments" :key="item.id" class="item-check clearfix">
        <el-radio v-model="radio" :label="Number(item.code)" class="fl" @change="handlerCheckData(item)">{{ item.name }}</el-radio>
        <span class="icon-group fr">
          <i class="icon el-icon-edit" @click="edit(item)"></i>
          <i class="icon el-icon-delete" @click="del(item.id, item.code)"></i>
        </span>
      </p>
    <div class="department-bottom">
      <span class="add-btn" @click="addNewType"><i class="el-icon-circle-plus-outline"></i>添加新类别</span>
      <!-- 添加 -->
      <div class="department-input clearfix" v-show="addFlag">
        <el-input size="mini" placeholder="请输入新的类别名称（必填）" v-model.trim="addName" :maxlength="16"></el-input>
        <el-button size="mini" class="add-button btn-theme fr" @click="addType">确认添加</el-button>
      </div>
      <!-- 编辑 -->
      <div class="department-input clearfix" v-show="editFlag">
        <el-input size="mini" placeholder="请输入新的类别名称（必填）" v-model.trim="updateName" :maxlength="16"></el-input>
        <el-button size="mini" class="add-button btn-theme fr" @click="updateType">确定修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 部门 新增，修改，删除
 * @check-data  选中的类别对象
 */
import { addType, updateType, getTypeList, deleteType } from '@/api/premission'
export default {
  props: {
    category: {
      type: Number,
      default: null
    }
  },
  name: 'department',
  data() {
    return {
      departments: [],
      radio: null,
      addFlag: false,
      editFlag: false,
      addName: '',
      updateName: '',
      code: ''
    }
  },
  watch: {
    category() {
      this.radio = this.category
    }
  },
  methods: {
    // 获取类别
    getTypeList() {
      getTypeList().then(res => {
        if (res.success) {
          this.departments = res.data
        } else {
          this.$message({
            type: 'warning',
            message: res.errmsg
          })
        }
      }).catch(err => {
      })
    },
    addNewType() {
      this.addFlag = !this.addFlag
      this.editFlag = false
    },
    edit(obj) {
      this.editFlag = true
      this.addFlag = false
      this.updateName = obj.name
      this.code = obj.code
    },
    del(id, code) {
      if (Number(code) === Number(this.radio)) {
        this.$message({
          type: 'warning',
          message: '类别为选中状态，不允许删除。'
        })
        return false
      }
      this.dataInit()
      this.$confirm('确认要删除该类别吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteType(id).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getTypeList()
          } else {
            this.$message({
              type: 'warning',
              message: res.errmsg
            })
          }
        }).catch(err => {
        })
      }).catch(() => {})
    },
    // 确认添加
    addType() {
      if (this.addName === '') {
        this.$message({
          type: 'warning',
          message: '类别名称不能为空'
        })
        return false
      }
      addType(this.addName).then(res => {
        if (res.success) {
          this.$message.success('类别添加成功')
          this.addName = ''
          this.getTypeList()
        } else {
          this.$message({
            type: 'warning',
            message: res.errmsg
          })
        }
      }).catch(err => {
      })
    },
    updateType() {
      if (this.updateName === '') {
        this.$message({
          type: 'warning',
          message: '类别名称不能为空'
        })
        return false
      }
      updateType(this.code, this.updateName).then(res => {
        if (res.success) {
          this.$message.success('类别修改成功')
          this.dataInit()
          this.getTypeList()
        } else {
          this.$message({
            type: 'warning',
            message: res.errmsg
          })
        }
      }).catch(err => {
      })
    },
    // 数据初始化
    dataInit() {
      this.updateName = ''
      this.addFlag = !this.addFlag
      this.editFlag = false
    },
    // 选中的数据
    handlerCheckData(value) {
      this.$emit('check-data', value)
    }
  },
  mounted() {
    this.getTypeList()
  }
}
</script>
<style lang="scss">
@import '@/styles/theme.scss';
.department{
  width: 350px;
  border: 1px solid #e6e6e6;
  padding-top: 15px;
  .icon-group{
    margin-right: 12px;
    display: inline-block;
    line-height: 0;
  }
  .icon{
    font-size: 16px;
    color: #666;
    display: inline-block;
    margin-left: 12px;
    cursor: pointer;
  }
  .el-icon-edit:hover{
    color: $themeColor;
  }
  .el-icon-delete:hover{
    color: $themeColorWarning;
  }
  .item-check{
    margin: 0 0 0 15px;
    height: 36px;
    line-height: 36px;
  }
  .department-bottom{
    margin: 10px;
    padding: 0 15px;
    border-top: 1px solid #dcdcdc;
    .add-btn{
      display: inline-block;
      margin-top: 5px;;
      font-size: 14px;
      color: $themeColor;
      cursor: pointer;
    }
    .department-input{
      margin-top: 10px;
      .add-button{
        margin-top: 12px;
      }
    }
  }
}
</style>


