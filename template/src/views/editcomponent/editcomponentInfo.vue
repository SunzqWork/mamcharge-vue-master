<template>
    <div class="main-page">
      <div class="page-block">
         <el-button type="primary" @click="handleSubmit">保存</el-button>
         <el-button  @click="back">返回</el-button>
     </div>
      <fm-generate-form :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm">

      </fm-generate-form>
     <div class="page-block">
         <el-button type="primary" @click="handleSubmit">保存</el-button>
         <el-button  @click="back">返回</el-button>
     </div>
    </div>
</template>

<script>
export default {
  name: 'Editcomponentinfo',
  data() {
    return {
        jsonData: {},

        editData: {},
        remoteFuncs: {

        }
    }
  },
  computed: {

  },
  mounted(){
      this.getDataJson();
  },
  methods: {
   handleSubmit () {
        var _this=this;
        var id=this.$route.query.id;
        this.$refs.generateForm.getData().then(data => {
            // debugger;
            if(!id){
               _this.saveDataJson(data);
            }else{
              _this.editDataJson(data,id);
            }
            // 数据校验成功w
            // data 为获取的表单数据
        }).catch(e => {
            // 数据校验失败
        })
    },
    getDataJson(){
        var tableId=this.$route.query.tableId;
        var id=this.$route.query.id;
        var _this=this;
        this.listLoading = true;
        this.$axios.post(`${window.DPWebAPIUrl}/design/form/style`,{id:tableId})
        .then(response => {
          var jsonDatas = JSON.parse(response.data.data.designDetails.formStyleDetail);
          _this.$set(_this.jsonData,"config",jsonDatas.config);
          _this.$set(_this.jsonData,"list",jsonDatas.list);
          if(id){
              _this.getDataInfoJson(tableId,id);
          }
        })
        .catch(error => {
          this.$message({
            message: "查询失败",
            type: "error"
          });
        });
    },
     saveDataJson(data){

        var tableId=this.$route.query.tableId;
         var _this=this;
        _this.$set(data,'tableId',tableId);

        this.listLoading = true;
        this.$axios.post(`${window.DPWebAPIUrl}/web/form/common/data/addRecord`,{...data})
        .then(response => {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.$router.go(-1);
        })
        .catch(error => {
          this.$message({
            message: "新增失败",
            type: "error"
          });
        });
    },
     editDataJson(data,id){

        var tableId=this.$route.query.tableId;
        var _this=this;
        _this.$set(data,'tableId',tableId);
        _this.$set(data,'id',id);
        this.listLoading = true;
        this.$axios.post(`${window.DPWebAPIUrl}/web/form/common/data/updateRecord`,{...data})
        .then(response => {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$router.go(-1);
        })
        .catch(error => {
          this.$message({
            message: "修改失败",
            type: "error"
          });
        });
    },
     getDataInfoJson(tableId,id){
        var _this=this;
        this.listLoading = true;
        this.$axios.post(`${window.DPWebAPIUrl}/web/form/common/data/getRecord`,{tableId:tableId,id:id})
        .then(response => {
          _this.editData=response.data.data;
        })
        .catch(error => {
          this.$message({
            message: "新增失败",
            type: "error"
          });
        });
    },
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
