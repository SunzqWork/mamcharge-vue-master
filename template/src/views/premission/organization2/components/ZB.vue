<template>
  <div id="zb">
    <el-tabs type="border-card">
      <el-tab-pane label="总部信息">
        <el-row class="mb10">
          <el-button class="btn-theme" icon="el-icon-plus" @click="addFB">新建分部</el-button>
          <el-button class="btn-default" icon="el-icon-edit" @click="editZB">编辑总部</el-button>
        </el-row>
        <zl-card isHeader icon="group" title="基本信息" style="margin: 0;">
          <zl-info label="简称" :info="info.name"></zl-info>
          <zl-info label="全称" :info="info.fullName"></zl-info>
        </zl-card>
      </el-tab-pane>
      <el-tab-pane label="下级分部">
        <!-- <zl-card>
          
        </zl-card> -->
        <el-row class="mb10">
            <el-button class="btn-theme" icon="el-icon-plus" @click="addFB">新建分部</el-button>
            <el-button class="btn-default" icon="el-icon-delete" @click="deleteAllOrgs">批量删除</el-button>
          </el-row>
          <el-table :data="subFBTableData" class="zl-table" @selection-change="selectIds" stripe>
            <el-table-column :selectable="checkSelection" type="selection" width="55" align="left" header-align="left"></el-table-column>
            <el-table-column label="分部简称" prop="name" align="left" header-align="left">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.name }}
                  <p class="zl-btn-stop" v-show="scope.row.status === 2">{{ scope.row.status === 2 ? '已停用' : ''}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="分部全称" prop="fullName" align="left" header-align="left"></el-table-column>
            <el-table-column label="分部编号" prop="code" align="left" header-align="left"></el-table-column>
            <el-table-column label="显示顺序" prop="seq" align="left" header-align="left"></el-table-column>
            <el-table-column label="操作" prop="" align="left" header-align="left">
              <template slot-scope="scope">
                <span class="icon-theme" @click="editFB(scope.row)">编辑</span>
                <i class="zl-icon-line"></i>
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
      </el-tab-pane>
    </el-tabs>

    <!-- 编辑总部 -->
    <el-dialog
      title="修改总部"
      :visible.sync="editVisible"
      width="450px"
      >
      <div class="container">
        <el-form label-width="100px" :model="zbModel" :rules="zbRules">
          <el-form-item label="简称" prop="name">
            <el-input class="zl-form-control zl-input-240px" v-model="zbModel.name"></el-input>
          </el-form-item>
          <el-form-item label="全称" prop="fullName">
            <el-input class="zl-form-control zl-input-240px" v-model="zbModel.fullName"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-default" @click="editVisible = false">取 消</el-button>
        <el-button class="btn-theme" @click="editSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新建分部 -->
    <FB-dialog title="新建分部" :isShow.sync="fbVisible" width="450px" @is-submit="isSubmit" :parentName="zbModel.name"></FB-dialog>
    <!-- 编辑分部 -->
    <FB-dialog title="编辑分部" :isShow.sync="fbVisibleEdit" width="450px" @is-submit="isSubmitEdit" :data="JSON.parse(JSON.stringify(fbInfo))"></FB-dialog>
  </div>
</template>
<script>
import FBDialog from './FB-dialog'

import { deleteAllOrgs } from '@/api/premission'
export default {
  name: 'zb',
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  components: { FBDialog },
  data() {
    return {
      subFBParams: { page: 1, size: 10 },
      currentPage: 1,
      total: 0,
      editVisible: false,
      zbModel: JSON.parse(JSON.stringify(this.info)),
      zbRules: {
        name: [{ required: true, message: '请输入总部简称', trigger: 'blur' }],
        fullName: [{ required: true, message: '请输入总部全称', trigger: 'blur' }]
      },
      fbVisible: false,
      fbVisibleEdit: false,
      fbInfo: {},
      subFBTableData: [],
      ids: []
    }
  },
  watch: {
    info() {
      this.zbModel = JSON.parse(JSON.stringify(this.info))
      this.GetSubOrgList()
    }
  },
  methods: {
    checkSelection(row, index) {
      return row.referenced ? false : true
    },
    handleSizeChange(size) {
      this.subFBParams.size = size
      this.GetSubOrgList()
    },
    handleCurrentChange(page) {
      this.subFBParams.page = page
      this.GetSubOrgList()
    },
    // 停用
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
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>确定要${str}吗?</span>
        </p>
      `

      this.$confirm(strHtml, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.$store.dispatch('EditOrgs', row).then(res => {
          if (res.code === 0) {
            this.$message.success(`${str}成功`)
            this.GetSubOrgList()
          } else {
            this.$message.error(res.message)
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });         
      })
    },
    addFB() {
      this.fbVisible = true
    },
    // 新建分部
    isSubmit(data) {
      data.pid = this.info.id
      data.type = 2
      this.$store.dispatch('AddOrgs', data).then(res => {
        if (res.code === 0) {
          this.$message.success('分部新建成功')
          this.fbVisible = false
          this.GetSubOrgList()
          this.$emit('get-tree')
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 编辑总部
    editZB() {
      this.fbVisible = false
      this.editVisible = true
    },
    editSubmit() {
      this.$store.dispatch('EditOrgs', this.zbModel).then(res => {
        if (res.code === 0) {
          this.$message.success('总部编辑成功')
          this.editVisible = false
          this.$emit('get-tree')
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    editFB(obj) {
      this.fbVisibleEdit = true
      this.fbInfo = obj
    },
    // 编辑分部
    isSubmitEdit(data) {
      this.$store.dispatch('EditOrgs', data).then(response => {
        if (response.code === 0) {
          this.$message.success('分部修改成功')
          this.GetSubOrgList()
          this.$emit('get-tree')
        } else {
          this.$message.error('分部修改失败，请联系管理员。')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取下级分部
    GetSubOrgList() {
      this.subFBParams.id = this.info.id
      this.$store.dispatch('GetSubOrgList', this.subFBParams).then(res => {
        if (res.code === 0) {
          this.subFBTableData = res.data.records
          this.total = res.data.total
        } else {
          this.$message.error('获取下级分部数据失败，请联系管理员。')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    selectIds(selection, row) {
      this.ids = selection.map(item => item.id)
    },
    // 批量删除
    deleteAllOrgs() {
      if (this.ids.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的数据'
        })
        return false
      }

      const strHtml = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除该分部, 是否继续</span>
        </p>
      `
      this.$confirm(strHtml, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        deleteAllOrgs(this.ids).then(res => {
          if (res.success) {
            this.$message.success('下级分部删除成功')
            this.GetSubOrgList()
            this.$emit('get-tree')
          } else {
            this.$message.error('下级分部删除失败，请联系管理员。')
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });        
      })
    }
  },
  mounted() {
    this.GetSubOrgList()
  }
}
</script>
<style lang="scss">
#zb{}
</style>

