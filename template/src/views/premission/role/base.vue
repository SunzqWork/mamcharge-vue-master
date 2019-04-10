<template>
  <div id="role-base">
    <zl-card>
      <el-input class="zl-form-control zl-input-240px" @change="reapl" v-model="params.name" placeholder="角色名称" @keyup.enter.native="queryData"></el-input>
      <el-button class="btn-theme"  @click="queryData">查询</el-button>
    </zl-card>
    <zl-card>
      <el-row class="mb10" style="overflow:hidden;">
        <el-button class="btn-theme" style="float:left;"  @click="add">新增</el-button>
        <el-button class="btn-default" style="float:left;margin-left: 10px;"  @click="editType(false)">编辑</el-button>
        <!-- <el-button class="btn-default"  @click="editType(true)">查看</el-button> -->
        <el-button class="btn-default" style="float:left;margin-left: 10px;"  @click="roltTypeAllDelete">删除</el-button>
      </el-row>

      <el-table 
        border 
        stripe 
        :data="tableData" 
        class="zl-table"
        highlight-current-row
          @current-change="clickRowins"  
        @row-click="clickRow"
        :height="tableHeight">
        <!-- <el-table 
        border 
        stripe 
        :data="tableData" 
        class="zl-table"
        highlight-current-row
        @row-click="clickRow"
        :height="tableHeight"
        @selection-change="selectIds"> -->
        <!-- <el-table-column type="selection" header-align="center" align="center" :selectable="checkSelection" :show-overflow-tooltip="true"></el-table-column> -->
        <el-table-column header-align="center" align="left" label="类型名称" prop="name" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>
              {{ scope.row.name }}
              <p class="zl-btn-stop" v-show="scope.row.status === 2">{{ scope.row.status === 2 ? '已停用' : ''}}</p>
            </div>
          </template>
         </el-table-column>
        <el-table-column header-align="center" align="right" label="显示顺序" prop="seq" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column header-align="center" align="center" label="创建时间" prop="createTime" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column header-align="center" align="center" label="修改时间" prop="updateTime" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作">
          <template slot-scope="scope">
            <div>
              <!-- <span class="icon-theme" @click="edit(scope.row)">编辑</span> -->
              <!-- <i class="zl-icon-line"></i> -->
              <span class="icon-theme" @click="stopFunc(scope.row)">{{ scope.row.status === 1 ? '停用' : '启用'}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination
      class="zl-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </zl-card>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="450px"
      @close="closeDialog">
      <el-form :model="formModel" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="类型名称" prop="name">
          <el-input class="zl-form-control zl-input-240px" v-model="formModel.name" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="seq">
          <el-input class="zl-form-control zl-input-240px" v-model="formModel.seq" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="zl-btn-center">
        <el-button type="primary" @click="save" class="btn-theme">确定</el-button>
        <el-button @click="dialogVisible = false" class="btn-default">取消</el-button>
      </div>
    </el-dialog>

   
  </div>
</template>

<script>
import { addType, updateType, roleTypePageQuery, deleteType, roltTypeAllDelete } from '@/api/premission'

export default {
  name: 'role-base',
  data() {
   var checkSeq = (rule, value, callback) => {
        if (/[^\d]/g.test(value)) {
          return callback(new Error("只能输入0以及正整数"));
        } else {
          if (value > 9999 || value < 0) {
            callback(new Error("只能输入0-9999"));
          }else{
            callback();
          }
        }
      };
    return {
      tableData: [],
      title: '新增类型',
      dialogVisible: false,
      formModel: { 
        name: '',
        seq:"" 
      },
      
      code: null,
      total: 0,
      currentPage: 1,
      params: {
        name: '',
        page: 1,
        size: 10
      },
      ids: []
    }
  },
  computed: {
    rules (){
       var checkSeq = (rule, value, callback) => {
        if (/[^\d]/g.test(value)) {
          return callback(new Error("只能输入0以及正整数"));
        } else {
          if (value > 9999 || value < 0) {
            callback(new Error("只能输入0-9999"));
          }else{
            callback();
          }
        }
      };
      let rules = {
        name: [
          { required: true, message: '角色类型名称不能为空', trigger: 'blur' }
        ],
       seq:[
          { required: false },
          { validator: checkSeq, trigger: "blur" }
       ]
      }
      return rules
    },
    tableHeight() {
      return this.$store.state.app.$th
    }
  },
  watch: {
    tableData(data) {
      this.$store.dispatch('action_set_table_height', data.length)
    }
  },
  methods: {
    reapl(){
      this.params.name = this.params.name.replace(/\s+/g,"")
    },
    add() {
      this.formModel = { name: '',seq:"" };
      this.dialogVisible = true
    },
    editType(flag) {
      if (this.formModel.name !== '') {
        this.edit(this.formModel)
        this.dialogVisible = true
        this.title = '编辑类型'
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要编辑的数据'
        })
      }
    },
    clickRow(currentRow) {
      this.formModel = JSON.parse(JSON.stringify(currentRow))
    },
    queryData() {
      this.params.page = 1
      this.roleTypePageQuery()
    },

    handleSizeChange(size) {
      this.params.size = size
      this.roleTypePageQuery()
    },

    handleCurrentChange(page) {
      this.params.page = page
      this.roleTypePageQuery()
    },
    selectIds(rows) {
      this.ids = rows.map(item => item.id)
    },
    clickRowins(row){
      console.log(row,this.ids ,'rrrr')
        this.ids = [row.id]
    },
    // 删除
    roltTypeAllDelete() {
      if (this.ids.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据'
        })
        return false
      }

      const strHtml = `
        <p class="zl-confirm-html"">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除角色类型, 是否继续?</span>
        </p>
      `

      this.$confirm(strHtml, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        roltTypeAllDelete(this.ids).then(res => {
          if (res.success) {
            this.$message.success('角色类型删除成功')
            this.ids = []
            this.roleTypePageQuery()
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(err => {
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });        
      })
    },
    stopFunc(obj) {
      const row = JSON.parse(JSON.stringify(obj))
      let str = ''
      if (row.status === 1) {
        row.status = 2
        str = '停用'
      } else {
        row.status = 1
        str = '启用'
      }

      const strHtml = `
        <p class="zl-confirm-html"">
          <i class="el-icon-warning"></i>
          <span>确定要${str}吗?</span>
        </p>
      `
      this.$confirm(strHtml, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        updateType(row.code, row.name,  row.status).then(res => {
          if (res.success) {
            this.$message.success(`${str}成功`)
            this.roleTypePageQuery()
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(err => {
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });         
      })
    },

    checkSelection(row, index) {
      return row.referenced ? false : true
    },
    edit(row) {
      this.dialogVisible = true
      this.code = row.code
      this.formModel.name = row.name
      this.formModel.seq = row.seq || ""
    },
    closeDialog() {
      this.formModel.name = ''
    },
    roleTypePageQuery() {
      this.ids = []
      roleTypePageQuery(this.params).then(res => {
        if (res.success) {
          this.tableData = res.data.records
          this.total = res.data.total
        } else {
          this.$message.error('查询角色类型数据失败，请联系管理员。')
        }
      }).catch(err => {
      })
    },
    save() {
      // if(this.formModel.seq == "" || isNaN(parseInt(this.formModel.seq)) || this.formModel.seq > 9999 || this.formModel.seq < 0) return this.$message.error('只能输入0-9999之间的整数')
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.code) {
            updateType(this.code, this.formModel.name, this.formModel.status, this.formModel.seq).then(res => {
              if (res.success) {
                this.$message.success('角色类型修改成功')
                this.dialogVisible = false
                this.roleTypePageQuery()
              } else {
                this.$message.error(res.errmsg)
              }
            }).catch(err => {
            })
          } else {
            addType(this.formModel.name,this.formModel.seq).then(res => {
              if (res.success) {
                this.$message.success('角色类型新增成功')
                this.dialogVisible = false
                this.roleTypePageQuery()
              } else {
                this.$message.error(res.errmsg)
              }
            }).catch(err => {
            })
          }
        } else {
        }
      })
    }
  },
  mounted() {
    this.roleTypePageQuery()
  }
}
</script>

<style lang="scss">
#role-base{}
</style>


