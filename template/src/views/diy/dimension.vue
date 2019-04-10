<template>
  <div id="dimension">
    <zl-card>
      <el-row>
        <el-input placeholder="请输入关键字" @change="reapl" class="zl-form-control zl-input-240px"></el-input>
        <el-button  class="btn-theme">查询</el-button>
      </el-row>
    </zl-card>

    <zl-card>
      <el-row class="mb10">
        <el-button  class="btn-theme" @click="isShow = true">新增</el-button>
        <el-button  class="btn-default" @click="deleteDimensionByIds">删除</el-button>
      </el-row>

      <el-table border stripe class="zl-table" :data="tableData" @selection-change="selectIds">
        <el-table-column type="selection" header-align="center" align="center"></el-table-column>
        <el-table-column label="维度名称" prop="name"></el-table-column>
        <el-table-column label="Code" prop="code"></el-table-column>
        <el-table-column label="Api" prop="api"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">
            <div>
              {{ scope.row.tree ? '树形表格' : '普通表格'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="pidKey" prop="pidKey"></el-table-column>
        <el-table-column label="childKey" prop="childKey"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <span class="icon-theme" @click="edit(scope.row.id)">编辑</span>
              <i class="zl-icon-line"></i>
              <span class="icon-theme" @click="stopFunc(scope.row)">{{ scope.row.status === 1 ? '停用' : '启用'}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </zl-card>

    <dimensionDialog :isShow.sync="isShow" @is-submit="addDimension" v-if="isShow"/>

    <dimensionDialog :isShow.sync="isShowEdit" @is-submit="updateDimension" :data="info" v-if="isShowEdit"/>
  </div>
</template>
<script>
import dimensionDialog from './add-dimension'
import { addDimension, getDimensionList, getDimensionById, updateDimension, deleteDimensionByIds } from '@/api/dimension'

export default {
  name: 'dimension',
  components: { dimensionDialog },
  data() {
    return {
      isShow: false,
      isShowEdit: false,
      tableData: [],
      info: {},
      ids: []
    }
  },
  methods: {
    reapl(){

    },
    addDimension(data) {
      addDimension(data).then(res => {
        if (res.success) {
          this.$message.success('新增维度成功')
          this.getDimensionList()
          this.isShow = false
        } else {
          this.$message.error('新增维度失败，请联系管理员。')
        }
      }).catch(err => {
      })
    },
    getDimensionList() {
      getDimensionList().then(res => {
        if (res.success) {
          this.tableData = res.data
        } else {
          this.$message.error('获取维度数据失败，请联系管理员。')
        }
      }).catch(err => {
      })
    },
    edit(id) {
      getDimensionById(id).then(res => {
        if (res.success) {
          this.info = res.data
          this.isShowEdit = true
        } else {
          this.$message.error('获取维度信息失败，请联系管理员。')
        }
      }).catch(err => {
      })
    },

    updateDimension(data) {
      updateDimension(data).then(res => {
        if (res.success) {
          this.$message.success('编辑维度成功')
          this.getDimensionList()
          this.isShowEdit = false
        } else {
          this.$message.error('编辑维度失败，请联系管理员。')
        }
      }).catch(err => {
      })
    },
    stopFunc(obj) {
      const row = JSON.parse(JSON.stringify(obj));
      let str = "";
      if (row.status === 1) {
        row.status = 2;
        str = "停用";
      } else {
        row.status = 1;
        str = "启用";
      }

      const strHtml = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>确定要${str}吗?</span>
        </p>
      `;
      this.$confirm(strHtml, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          updateDimension(row)
            .then(res => {
              if (res.success) {
                this.$message.success(`${str}成功`);
                this.getDimensionList()
              } else {
                this.$message.error(res.errmsg);
              }
            })
            .catch(err => {
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    selectIds(selection, row) {
      this.ids = selection.map(item => item.id)
    },
    deleteDimensionByIds() {
      if (this.ids.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据'
        })
        return false
      }

      const strHtml = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除维度数据, 是否继续</span>
        </p>
      `
      this.$confirm(strHtml, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        deleteDimensionByIds(this.ids).then(res => {
          if (res.success) {
            this.$message.success('维度删除成功')
            this.getDimensionList()
          } else {
            this.$message.error('维度删除失败，请联系管理员。')
          }
        }).catch(err => {
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
    this.getDimensionList()
  }
}
</script>
<style lang="scss">
#dimension{}
</style>


