<template>
  <div>
    <el-dialog
  title="添加"
  :visible.sync="dialogVisible"
  width="30%">
 <el-form ref="form" :model="form" label-width="140px">
  <el-form-item label="orgCode">
    <el-input v-model="form.orgCode"></el-input>
  </el-form-item>
  <el-form-item label="businessLineId">
    <el-input v-model="form.businessLineId"></el-input>
  </el-form-item>
  <el-form-item label="data">
    <el-input v-model="form.data"></el-input>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </span>
</el-dialog>

    <zl-card class="left">
      <el-button type="primary" @click="dialogVisible = true">添加</el-button>
      </zl-card>
      <el-tabs style="margin:10px;height: 430px;overflow:auto;" v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane :label="po.name" :name="po.id" v-for="po in positionList" :key="'' + (Math.random() * 19997878 / 229392.712717)">
          <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="orgCode"
        label="组织Code">
      </el-table-column>
      <el-table-column
        prop="businessLineId"
        label="业务线ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="orgFullName"
        label="全称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="orgName"
        label="简称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="data"
        label="data"
        width="180">
      </el-table-column>
       <el-table-column
        prop="edit"
        label="edit"
        width="180">
        <template slot-scope="scope">
      <el-button type="error" @click="deletes(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
        </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
import { notifyTypeUser,adds,deletesa } from "@/api/est.js"
export default {
  name: 'test',
  // mixins: [FixiOSBug],
  
  data() {
    return {
      positionList:[],
      activeName:"",
      tableData:[],
      dialogVisible:false,
      form:{
        orgCode:"",
        businessLineId:"",
        data:"",
      }
    }
  },
  mounted() {
    this.positionList = (JSON.parse(sessionStorage.getItem('userInfo'))).positionList
    this.activeName = (JSON.parse(sessionStorage.getItem('userInfo'))).positionList[0].id
  },
  methods: {
    deletes(s){
      deletesa(s.row.id).then( res => {
      })
    },
    add(){
      adds(this.form).then( s=> {
        if(s.success){
          this.dialogVisible= false
         this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      })
    },
    handleClick(){
      notifyTypeUser(this.activeName).then( s=> {
        this.tableData = s.data
      })
    }
  }
}
</script>
