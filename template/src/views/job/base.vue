<template>
  <div id="job-base">
    <zl-card>
      <el-input class="zl-form-control zl-input-240px" placeholder="岗位类型名称" @change="reapl" v-model="params.name" @keyup.enter.native="queryData"></el-input>
      <el-button class="btn-theme"  @click="queryData">查询</el-button>
    </zl-card>

    <zl-card>
      <el-row class="mb10" style="overflow:hidden;">
        <el-button class="btn-theme" style="float:left;"  @click="addType">新增</el-button>
        <el-button class="btn-default" style="float:left;margin-left: 10px;"  @click="editType">编辑</el-button>
        <el-button class="btn-default" style="float:left;margin-left: 10px;"  @click="delAllJobType">删除</el-button>
      </el-row>
      <el-table 
        class="zl-table" 
        :data="tableData" 
        highlight-current-row
        @current-change="clickRow"
        border
        :height="tableHeight"
        stripe>
        <!-- <el-table 
        class="zl-table" 
        :data="tableData" 
        @selection-change="selectIds" 
        highlight-current-row
        @current-change="clickRow"
        border
        :height="tableHeight"
        stripe> -->
        <!-- <el-table-column type="selection" align="center" header-align="center" :selectable="checkSelection"></el-table-column> -->
        <el-table-column label="类型名称" prop="name" align="left" header-align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>
              {{ scope.row.name }}
              <p class="zl-btn-stop" v-show="scope.row.status === 2">{{ scope.row.status === 2 ? '已停用' : ''}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="显示顺序" prop="seq" align="right" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" align="center" header-align="center">
          <template slot-scope="scope">
            <span class="icon-theme" @click="stopFunc(scope.row)">{{ scope.row.status === 1 ? '停用' : '启用'}}</span>
            
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
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

    <!-- add type -->
    <add-type-dialog :isShow.sync="addVisible" v-if="addVisible" title="新增类型" @is-submit="isSubmit"></add-type-dialog>

    <!-- edit type -->
    <add-type-dialog :isShow.sync="editVisible" v-if="editVisible" title="编辑类别" @is-submit="isSubmitEdit" :data="jobTypeInfo"></add-type-dialog>
  </div>
</template>
<script>
import addTypeDialog from './components/add-type-dialog'
import { addJobType, queryJobType, updateJobType, delAllJobType } from '@/api/premission'

export default {
  name: 'job-base',
  components: { addTypeDialog },
  data() {
    return {
      tableData: [],
      addVisible: false,
      params: {
        page: 1,
        size: 10,
        name: ''
      },
      total: 0,
      currentPage: 1,
      editVisible: false,
      jobTypeInfo: null,
      ids: []
    }
  },
  computed: {
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
    editType() {
      if (this.jobTypeInfo) {
        const obj = JSON.parse(JSON.stringify(this.jobTypeInfo))
        this.editJobType(obj)
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要编辑的数据'
        })
      }
    },

    clickRow(currentRow) {
      this.ids = [currentRow.id]
      this.jobTypeInfo = currentRow
    },

    checkSelection(row, index) {
      return row.referenced ? false : true
    },
    handleSizeChange(size) {
      this.params.size = size
      this.queryJobType()
    },
    handleCurrentChange(page) {
      this.params.page = page
      this.queryJobType()
    },
    selectIds(row) {
      this.ids = row.map(item => item.id)
    },
    // 删除
    delAllJobType() {
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
          <span>此操作将永久删除岗位类型, 是否继续?</span>
        </p>
      `

      this.$confirm(strHtml, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        delAllJobType(this.ids).then(res => {
          if (res.success) {
            this.$message.success('岗位类型删除成功')
            this.queryJobType()
            this.ids = []
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
        updateJobType(row.id, row).then(res => {
          if (res.success) {
            this.$message.success(`${str}成功`)
            this.queryJobType()
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
    // 新增类别
    addType() {
      this.addVisible = true
    },
    isSubmit(data) {
      addJobType(data).then(res => {
        if (res.success) {
          this.$message.success('新增岗位类别成功')
          this.addVisible = false;
          this.queryJobType()
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      })
    },
    // 编辑岗位类别
    editJobType(obj) {
      this.editVisible = true
      this.jobTypeInfo = obj
    },
    isSubmitEdit(data) {
      updateJobType(data.id, data).then(res => {
        if (res.success) {
          this.$message.success('岗位类别修改成功')
          this.queryJobType()
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      })
    },
    queryData() {
      this.params.page = 1
      this.queryJobType()
    },
    queryJobType() {
      queryJobType(this.params).then(res => {
        if (res.success) {
          this.tableData = res.data.records
          this.total = res.data.total
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      })
    }
  },
  mounted() {
    this.queryJobType()
  }
}
</script>
<style lang="scss">
.zl-pagination{
  margin: 18px auto 8px;
}
</style>
