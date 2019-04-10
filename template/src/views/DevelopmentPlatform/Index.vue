<template>
  <div id="DevelopmentPlatform_index">
      <div class="page-block">
         <el-button type="primary" @click="handleSubmit">保存</el-button>
         <el-button  @click="back">返回</el-button>
     </div>
      <generate-form insite="true" :data="jsonData" :remote="remoteFuncs" :value="editData" ref="generateForm">

      </generate-form>
      <div class="page-block">
         <el-button type="primary" @click="handleSubmit">保存</el-button>
         <el-button  @click="back">返回</el-button>
     </div>
  </div>
</template>

<script>
import GenerateForm from './components/GenerateForm'
import {DevelopmentPlatform} from '@/api/DevelopmentPlatform'

export default {
  name: 'DevelopmentPlatform_index',
  data() {
    return{
      jsonData: {},
      editData: {},
      remoteFuncs: {

      }
    }
  },
  components: {
    GenerateForm
  },
  mounted(){
    if(window.location.href.indexOf('/#/card')>0){
      document.getElementsByClassName("sidebar-container")[0].style.display="none";
      document.getElementsByClassName("hamburger-container")[0].style.display="none";
      document.getElementsByClassName("main-container")[0].style.marginLeft="0px";
    }else{
      document.getElementsByClassName("sidebar-container")[0].style.display="";
      document.getElementsByClassName("main-container")[0].removeAttribute('style');
      document.getElementsByClassName("hamburger-container")[0].removeAttribute('style');
    }
    this.getDataJson();
  },
  methods: {
    handleSubmit () {
        var _this=this;
        var id=this.$route.query.id;
        this.$refs.generateForm.getData().then(data => {
          for(let key in data){
                if (window.sessionStorage.getItem(key)) {
                  data[key] = window.sessionStorage.getItem(key)
                }
          }
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
        DevelopmentPlatform(`${window.DPWebAPIUrl}/design/form/style`,{id:tableId})
        .then(response => {

          var jsonDatas = JSON.parse(response.data.designDetails.formStyleDetail);
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
      DevelopmentPlatform(`${window.DPWebAPIUrl}/web/form/common/data/addRecord`,{...data})
        .then(response => {
          if(response.errcode===0){
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.$router.go(-1);
          }else{
            this.$message({
                message: response.errmsg,
                type: "error"
              });
          }
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
        DevelopmentPlatform(`${window.DPWebAPIUrl}/web/form/common/data/updateRecord`,{...data})
        .then(response => {
           if(response.errcode===0){
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$router.go(-1);
           }else{
            this.$message({
                message: response.errmsg,
                type: "error"
              });
          }
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
        DevelopmentPlatform(`${window.DPWebAPIUrl}/web/form/common/data/getRecord`,{tableId:tableId,id:id})
        .then(response => {
          _this.editData=response.data;
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

<style lang="scss">
@import '@/styles/DevelopmentPlatform/cover.scss';
@import '@/styles/DevelopmentPlatform/index.scss';
.widget-empty{
  background-position: 50%;
}

#DevelopmentPlatform_index{
  margin: 30px 10px;
}
.el-input-number--medium{
  line-height: 32px !important;
}

</style>
