<template>
  <div id="application">
    <zl-card style="overflow:hidden;">
      <el-input style="float:left;" class="zl-input-240px zl-form-control" placeholder="应用名称" v-model="name" @change="reapl" @keyup.enter.native="search(1)"></el-input>
      <el-button style="float:left;margin-left: 5px;" class="btn-theme" @click="search(1)" >查询</el-button>
    </zl-card>
    <zl-card>
      <el-row class="mb10">
        <el-button  class="btn-theme" @click="addApplicaition" v-if="btnPermission('addApp')">新增</el-button>
        <el-button  class="btn-default" @click="editApp(false, '编辑应用')">编辑</el-button>
        <!-- <el-button  class="btn-default" @click="editApp(true, '查看应用')">查看</el-button> -->
        <el-button  class="btn-default" @click="deleteApp">删除</el-button>
      </el-row>
      <el-table 
        :data="tableData" 
        class="zl-table" 
        stripe 
        border
        :height="tableHeight" 
        highlight-current-row 
        @current-change="handleCurrentChange">
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <el-table-column align="left" prop="id" label="id" width="300" :show-overflow-tooltip="true" header-align="center"></el-table-column>
        <el-table-column align="left" prop="name" label="名称" :show-overflow-tooltip="true" header-align="center"></el-table-column>
        <el-table-column align="left" prop="url" label="站点URL" :show-overflow-tooltip="true" header-align="center"></el-table-column>
        <el-table-column align="left" prop="createUser" label="创建人" width="100px" header-align="center"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间" :show-overflow-tooltip="true" header-align="center"></el-table-column>
        <!-- <el-table-column align="left" prop="updateUser" label="修改人" width="100px" header-align="center"></el-table-column> -->
        <el-table-column align="center" prop="updateTime" label="修改时间" :show-overflow-tooltip="true" header-align="center"></el-table-column>
      </el-table>
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
    </zl-card>

    <applicaitionDialog :isShow.sync="isShow" title="新增应用" @is-submit="addFunction" v-if="isShow"/>

    <applicaitionDialog 
      :isShow.sync="isShowEdit" 
      :title="title" 
      @is-submit="editFunction" 
      v-if="isShowEdit"
      :isDisabled="isDisabled" 
      :data="appInfo"/>
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
        size: 10
      },
      name: '',
      id: '',
      tableData: [],
      total: 0,
      isShow: false,
      isShowEdit: false,
      appInfo: {},
      isDisabled: false,
      title: '编辑应用'
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
      this.name = this.name.replace(/\s+/g,"")
    },
    // 行被点击
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.appInfo = currentRow
    },

    editApp(flag, title) {
     if(this.appInfo == null){
        return this.$message.warning('请先选择应用')
     }else{
      if(this.appInfo.id == undefined){
        return this.$message.warning('请先选择应用')
      }
     }
       
      this.title = title
      if (this.appInfo.id) {
        this.isShowEdit = true
        this.isDisabled = flag
      } else {
        if (flag) {
          this.$message({
            type: 'warning',
            message: '请选择要查看的应用'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请选择要编辑的应用'
          })
        }
      }
    },

    deleteApp() {
      if (this.appInfo) {
        this.delBtn(this.appInfo.id)
      } else {
        this.$message({
          type: 'warning',
          message: '请选择要删除的应用'
        })
      }
    },

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
      })
    },
    // 添加应用
    addFunction(data) {
      if (data.hidden) {
        data.hidden = 1
      } else {
        data.hidden = 0
      }
      addFunction(data).then(res => {
        if (res.success) {
          this.$message.success('新增应用成功')
          this.isShow = false
          this.getData()
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      })
    },

    editApplication(id) {
      this.searcchEdit(id)
    },

    // 编辑应用
    editFunction(data) {
      if (data.hidden) {
        data.hidden = 1
      } else {
        data.hidden = 0
      }
      editFunction(data.id, data).then(res => {
        if (res.success) {
          this.$message.success('应用编辑成功')
          this.isShowEdit = false
          this.getData()
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
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
      if(this.appInfo == null){
        return this.$message.warning('请先选择应用')
     }else{
      if(this.appInfo.id == undefined){
        return this.$message.warning('请先选择应用')
      }
     }
      // if(this.appInfo)
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
          if (res.success) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.delDialog = false;
            this.getData();
          } else {
            this.$message.error(res.errmsg)
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

