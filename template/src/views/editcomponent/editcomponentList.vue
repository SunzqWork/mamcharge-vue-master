<template>
   <div class="main-page">
     <div class="page-block">
        <div class="page-search">
            <el-input placeholder="请输入查询内容" style=“width:250px;” prefix-icon="el-icon-search" v-model="keyword" clearable></el-input>
        </div>
        <el-button type="primary" icon="el-icon-search">查询</el-button>
     </div>
       <div class="page-block">
        <div class="page-button">
            <el-button type="primary" icon="el-icon-plus" @click="add">新增</el-button>
            <el-button icon="el-icon-edit" @click="update">编辑</el-button>
            <el-button icon="el-icon-setting" @click="setting">列表设计</el-button>
            <el-button icon="el-icon-view" @click="view">列表预览</el-button>
        </div>
        <el-table class="zl-table" :data="tableData" @selection-change="selectionFunc" border stripe="true">
            <el-table-column type="selection" align="center" header-align="center"></el-table-column>
            <el-table-column label="应用名称" prop="appId" align="left" header-align="center"></el-table-column>
            <el-table-column label="表名称" prop="tableName" align="left" header-align="center"></el-table-column>
            <el-table-column label="描述" prop="remark" align="left" header-align="center"></el-table-column>
      </el-table>
       </div>
   </div>
</template>

<script>
export default {
  name: 'EditcomponentList',
  data() {
    return {
        tableData:[],
        keyword:"",
        muitSelectAttr:[]
    }
  },
  computed: {

  },
  mounted(){
    this.getTableAttr();
  },
  methods:{
     getTableAttr(){
        //var appid=this.$route.query.appid;
        var appid=window.sysAlias;
        if(!appid){
          appid="default";
        }
        this.listLoading = true;
        this.$axios.post(`${window.DPWebAPIUrl}/design/allTable/${appid}`,
        ""
        )
        .then(response => {
          this.listLoading = false;
          this.tableData = response.data.data;
        })
        .catch(error => {
          this.$message({
            message: "查询失败",
            type: "error"
          });
        });
     },
     add(){
        this.$router.push({path:'/editcomponentAdd',query:{}});
     },
     update(){
           if(this.muitSelectAttr.length==0){
          this.$message({
            message: "请选择一条数据！",
            type: "warning"
          });
          return false
        }
         this.$router.push({path:'/editcomponentAdd',query:{id:this.muitSelectAttr[0].id}});
     },
     setting(){
           if(this.muitSelectAttr.length==0){
          this.$message({
            message: "请选择一条数据！",
            type: "warning"
          });
          return false
        }
         this.$router.push({path:'/list',query:{id:this.muitSelectAttr[0].id,name:this.muitSelectAttr[0].tableName}});
     },
     view(){
           if(this.muitSelectAttr.length==0){
          this.$message({
            message: "请选择一条数据！",
            type: "warning"
          });
          return false
        }
         this.$router.push({path:'/testTableCom',query:{id:this.muitSelectAttr[0].id,name:this.muitSelectAttr[0].tableName}});
     },
     selectionFunc(val){
        if(val.length>1){
          this.$message({
            message: "数据只能选中一条！",
            type: "warning"
          });
        }else{
        this.muitSelectAttr=val;
        }
     }
  }
}
</script>

<style lang="scss">
@import '@/styles/DevelopmentPlatform/cover.scss';
@import '@/styles/DevelopmentPlatform/index.scss';
.widget-empty{
  background-position: 50%;
}

</style>

