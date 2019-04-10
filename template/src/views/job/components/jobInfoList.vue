<template>
  <div id="jobInfo-list">
    <zl-card>
      <el-select v-model="params.refPostId" clearable placeholder="请选择岗位类型" class="zl-form-control zl-input-240px" >
        <el-option v-for="item in refPostIds" :key="item.id" :label="item.name" :value="item.id" v-show="item.status === 1"></el-option>
      </el-select>
      <el-input class="zl-form-control zl-input-240px" placeholder="岗位简称，岗位全称" @keyup.enter.native="search" v-model="params.keyword" @change="reapl"></el-input>
      <el-button class="btn-theme"  @click="search">查询</el-button>
    </zl-card>
    <zl-card>
      <el-row class="mb10">
        <el-button class="btn-theme"  @click="addJob" v-if="rogType===3" >新增</el-button>
        <el-button class="btn-default"  @click="getJobInfoById">编辑</el-button>
        <!-- <el-button class="btn-default"  @click="delAllJob">查看</el-button> -->
        <el-button class="btn-default"  @click="delAllJob">删除</el-button>
      </el-row>
      <el-table 
        class="zl-table" 
        :data="tableData" 
        highlight-current-row
        @row-click="handleCurrentChangeTable"
        stripe 
        :height="tableHeight"
        border>
        <!-- <el-table 
        class="zl-table" 
        :data="tableData" 
        @selection-change="selectionFunc" 
        highlight-current-row
        @current-change="handleCurrentChangeTable"
        stripe 
        :height="tableHeight"
        border> -->
        <!-- <el-table-column :selectable="checkSelection" type="selection" align="center" header-align="center"></el-table-column> -->
        <el-table-column label="岗位简称" prop="name" align="left" header-align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>
              {{ scope.row.name }}
              <p class="zl-btn-stop" v-show="scope.row.status === 2">{{ scope.row.status === 2 ? '已停用' : ''}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="岗位全称" prop="fullName" align="left" header-align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="岗位类型" align="left" header-align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.refPost ? scope.row.refPost.name : "暂无类型"}}
          </template>
        </el-table-column>
        <el-table-column label="所属部门" prop="orgName" align="left" header-align="center" >
        </el-table-column>
        <el-table-column label="操作" prop="" align="center" header-align="center">
          <template slot-scope="scope">
            <span class="icon-theme" @click="targetJob(scope.row)">{{ scope.row.status === 1 ? '停用' : '启用'}}</span>
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
    <add-job-dialog @is-load='readload' :baseshow="baseshow" @basechange='basechange' v-if="baseshow"></add-job-dialog>
  </div>
</template>
<script>
import { getJobListApi, targetJobApi,delALLJobApi } from "@/api/job";
import { getBzJobList } from "@/api/job";
import addJobDialog from "./add-job-dialog"
export default {
  name: "jobInfo-list",
  components: {
    addJobDialog
  },
  props: {
    orgId: {
      type: String,
      default: ""
    },
    rogType: {
      type: Number,
      default: 0
    },
  },
  watch: {
    orgId(val) {
      this.params.orgId =val
      this.getJobList();
    },
    tableData(data) {
      this.$store.dispatch('action_set_table_height', data.length)
    }
  },
  data() {
    return {
      baseshow:false,
      tableData: [],
      refPostIds: [],
      nowUser:"",
      params: {
        page: 1,
        size: 10,
        orgId: this.orgId,
        keyword: "",
        refPostId:""
      },
      total: 0,
      currentPage: 1,
      ids: []
    };
  },
  mounted() {
    this.searchGW()
  },
  computed: {
    tableHeight() {
      let now = this.$store.state.app.$th
      return now
    }
  },
  methods: {
    searchGW(){
      let params = {
        page: 1,
        size: 10000
      };
      getBzJobList(params).then(res => {
        this.refPostIds = res.data.records
      });
    },
    reapl(){
      this.params.keyword = this.params.keyword.replace(/\s+/g,"")
    },
    getJobInfoById(){
      if(this.nowUser && this.nowUser !=""){
        this.baseshow= true
        this.$store.commit('SET_JOBID',this.nowUser.id)
      }else{
        this.$message({
          message: "请先选择一个数据",
          type: "warning"
        });
      }
    },
    readload(){
      this.getJobList()
    },
    basechange(val, flg, call){
      this.baseshow = val
      if(call != 'call'){
        this.getJobList()
      }
    },
    handleSizeChange(size) {
      this.params.size = size;
      this.getJobList();
    },
    handleCurrentChange(page) {
      this.params.page = page;
      this.getJobList();
    },

    isSubmit() {},
    selectionFunc(selection, row) {
       this.ids = selection.map(item => item.id)
    },
    checkSelection(row, index) {
      return row.referenced ? false : true
    },
    // 新增岗位
    addJob() {
      this.$store.commit('SET_JOBID',null)
      this.baseshow= true
    },
    //启用 或者停用
    targetJob(row) {
      let str = "";
      if (row.status === 1) {
        str = "停用";
      } else {
        str = "启用";
      }

      const strHtml = `
        <p class="zl-confirm-html"">
          <i class="el-icon-warning"></i>
          <span>确定要${str}吗?</span>
        </p>
      `
      this.$confirm(strHtml, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          let postData = {
            id: row.id,
            status: row.status === 1 ? 2 : 1
          };
          targetJobApi(postData).then(res => {
            if (res.errcode === 0) {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.getJobList();
            } else {
              if (res.errcode === 4014) {
                this.$message.error("停用失败,有相关人员正使用此岗位");
              } else {
                this.$message.error("操作失败");
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    handleCurrentChangeTable(now){
      console
      this.ids = [now.id]
      this.nowUser = now
    },
    //岗位查询
    search() {
      this.getJobList();
    },
    // 获取岗位列表 选择部门后才会加载
    getJobList() {
      this.params.orgId = this.orgId
      getJobListApi(this.params).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    // 删除角色
    delAllJob() {
      if(this.ids.length===0){
        this.$message({
          message: '请选择要删除的数据',
          type: 'error'
        });
        return
      }

      const strHtml = `
        <p class="zl-confirm-html"">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除岗位, 是否继续?</span>
        </p>
      `

      this.$confirm(strHtml, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        dangerouslyUseHTMLString: true
      })
        .then(() => {
          delALLJobApi(this.ids)
            .then(res => {
              if (res.success) {
                this.$message.success("删除成功");
                this.getJobList();
                this.ids = []
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
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="scss">
#jobInfo-list {
}
</style>


