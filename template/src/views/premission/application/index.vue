<template>
  <div id="application">
    <zl-card>
      <el-input class="zl-input-220px zl-form-control" placeholder="搜索名称" v-model="name"></el-input>
      <el-button class="btn-theme" @click="search(1)" icon="el-icon-search">查询</el-button>
    </zl-card>
    <zl-card>
      <el-row class="mb10">
        <el-button icon="el-icon-plus" class="btn-theme" @click="addApplicaition">新增应用</el-button>
      </el-row>
      <el-table
        :data="tableData"
        class="zl-table"
        stripe
        >
        <el-table-column align="left" prop="id" label="id" width="300"></el-table-column>
        <el-table-column align="left" prop="name" label="名称"></el-table-column>
        <el-table-column align="left" prop="url" label="站点URL"></el-table-column>
        <el-table-column align="left" prop="createUser" label="创建人" width="100px"></el-table-column>
        <el-table-column align="left" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="left" prop="updateUser" label="修改人" width="100px"></el-table-column>
        <el-table-column align="left" prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column align="left" label="操作" fixed="right" width="180px">
          <template slot-scope="scope">
            <span class="icon-theme" @click="editApplication(scope.row.id)">编辑</span>
            <i class="zl-icon-line"></i>
            <span class="icon-theme" @click="delBtn(scope.row.id)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </zl-card>
    <el-pagination
      background
      class="zl-pagination"
      :page-size="listParams.size"
      :current-page="listParams.page"
      @size-change="changeSize"
      @current-change="changeCurrent"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <applicaitionDialog :isShow.sync="isShow" title="新增应用" @is-submit="addFunction" v-if="isShow"/>

    <applicaitionDialog :isShow.sync="isShowEdit" title="编辑应用" @is-submit="editFunction" v-if="isShowEdit" :data="appInfo"/>
  </div>
</template>
<script>
import { functionList,searchFunction,delFunction, addFunction, searcchEdit, editFunction } from "@/api/premission";
import { getTimeS } from "@/utils/date"
import applicaitionDialog from './application-dialog'

export default {
  name: 'application',
  components: { applicaitionDialog },
  data() {
    return {
      listParams: {
        page: 1,
        size: 30
      },
      name: '',
      id: '',
      tableData: [],
      total: 0,
      isShow: false,
      isShowEdit: false,
      appInfo: {}
    }
  },
  methods: {
    addApplicaition() {
      this.isShow = true
    },
    // 查询子系统
    searcchEdit(id) {
      searcchEdit(id).then(res => {
        if (res.success) {
          this.appInfo = res.data
          this.isShowEdit = true
        } else {
          this.$message.error('获取子系统信息失败，请联系管理员。')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加应用
    addFunction(data) {
      addFunction(data).then(res => {
        if (res.success) {
          this.$message.success('新建应用成功')
          this.isShow = false
          this.getData()
        } else {
          this.$message.error('新建应用失败，请联系管理员。')
        }
      }).catch(err => {
        console.log(err)
      })
    },

    editApplication(id) {
      this.searcchEdit(id)
    },

    // 编辑应用
    editFunction(data) {
      editFunction(data.id, data).then(res => {
        if (res.success) {
          this.$message.success('应用编辑成功')
          this.isShowEdit = false
          this.getData()
        } else {
          this.$message.error('应用编辑失败，请联系管理员。')
        }
      }).catch(err => {
        console.log(err)
      })
    },

    search(current) {
      searchFunction(this.name, current, this.listParams.size).then(res => {
        this.setData(res.data);
      })
    },
    getData() {
      functionList(this.listParams.page, this.listParams.size).then(res => {
        this.setData(res.data);
      })
    },
    changeSize(size) {
      this.listParams.size = size;
      if (!this.name) {
        this.getData();
      } else {
        this.search(1);
      }
    },
    changeCurrent(page) {
      this.listParams.page = page;
      if (!this.name) {
        this.getData();
      } else {
        this.search(page);
      }
    },
    delBtn(id) {
      this.id = id
      this.del()
    },
    del() {
      const str = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除应用, 是否继续?</span>
        </p>
      `
      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
      }).then(() => {
        delFunction(this.id).then(res => {
          if (res.errmsg == 'success') {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.delDialog = false;
            this.getData();
          } else {
            this.$message.error('删除失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });        
      })
    },
    setData(data) {
      for (let obj of data.records) {
          const createTime = new Date(obj.createTime) + "";
          obj.createTime = getTimeS(createTime);
          if (obj.updateTime) {
            const updateTime = new Date(obj.updateTime) + "";
            obj.updateTime = getTimeS(updateTime);
          }
        }
        this.total = data.total;
        this.tableData = data.records
    }
  },
  mounted() {
    this.getData();
  }
}
</script>

