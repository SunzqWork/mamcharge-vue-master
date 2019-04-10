<template>
   <div>
     <div style="padding-top: 20px;overflow: hidden;height: 465px;">
    <div class="ma-card" v-for="ins in info" :key="ins">
      <div class="ma-over">
        <div class="ma-left">
            <img onerror="this.src='https://mommoth-moto.oss-cn-beijing.aliyuncs.com/1552998376783_149881997658968.png'" :src=" ins.pictureUrl ?`http://47.99.138.2/rest${ins.pictureUrl}` : 'https://mommoth-moto.oss-cn-beijing.aliyuncs.com/1552998376783_149881997658968.png'"/>
            <div class="ma-title">
<<<<<<< HEAD
              <p>{{ins.name}}</p>
              <p :title="ins.factoryName" >生产厂商：{{ins.factoryName}}</p>
=======
              <p :title="ins.name" style="width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ins.name}}</p>
              <p :title="ins.factoryName" style="width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">生产厂商：{{ins.factoryName}}</p>
>>>>>>> ccc350a95c084ac5089eb9d83da47ffdacb5bcd6
            </div>
        </div>
        <div class="ma-right">
          <p>生产车辆总数</p>
          <!-- <p>{{ins.deviceCount}}辆</p> -->
          <p>{{0}}辆</p>
        </div>
    </div>
    <div class="ma-bottom">
      <div class="ma-time">
        创建日期：{{ins.createTime}}
    </div>
    <div class="ma-more" @click="views(ins.productCode,ins.id)">
      查看详情
    </div>
    </div>
    </div>
  </div>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[4]"
      :page-size="pages.rows"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-left: 35px;"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  data() {
    return {
      info:[],
      pages:{
        page:1,
        rows:4
      },
      total:0,
      base:window.DPWebAPIUrl,
      currentPage4:1
    }
  },
  created: {

  },
  mounted() {
    if(window.location.href.indexOf('/#/card')>0){
      document.getElementsByClassName("sidebar-container")[0].style.display="none";
      document.getElementsByClassName("hamburger-container")[0].style.display="none";
      document.getElementsByClassName("main-container")[0].style.marginLeft="0px";
    }else{
      document.getElementsByClassName("sidebar-container")[0].style.display="";
      document.getElementsByClassName("main-container")[0].removeAttribute('style');
      document.getElementsByClassName("hamburger-container")[0].removeAttribute('style');
    }
    this.loadMsg()
  },
  methods: {
    views(productCode,productId){
      this.$store.dispatch("setCallPar",productCode);
      window.sessionStorage.setItem("productCode",productCode)
      window.sessionStorage.setItem("productId",productId)
      this.$router.push({ path: '/testTableCom', query: { name:'测试结果',id: 'ad64d98414364d359e431ae77f0af4f7'}})
    },
    handleSizeChange(rows){
      this.pages.rows = rows;
      this.loadMsg();
    },
    handleCurrentChange(page){
      this.pages.page = page;
      this.loadMsg();
    },

    loadMsg(){
      this.$axios({
        method: "POST",
        url: `http://test-api.mambike.com/dmp/api/product/getPagedProductList`,
        data: this.pages,
        headers: {
            'token': '2c4c0f06ee934b048172e635bcc799d2'
        }
        }).then( s => {
          this.total = s.data.data.total
      this.info = s.data.data.rows
    // })
  })
}
}
}
</script>

<style lang="scss" scoped>
.ma-card{
  overflow:hidden;
  border: 1px solid #dcdcdc;
  box-shadow: 1px 1px 1px 1px #dcdcdc;
  margin: 20px;
  width: 500px;
  float: left;
  .ma-over{
    overflow: hidden;
    padding-top: 15px;
    padding-bottom: 15px;
    .ma-left{
      float:left;
      width:70%;
      overflow: hidden;
      img{
        display: block;
        width: 100px;
        height: 100px;
        // border: 1px solid  #dcdcdc;
        margin-left: 15px;
        float: left;
      }
      .ma-title{
        max-width: 180px;
        float: left;
        margin-left: 16px;
        border-right: 1px solid #dcdcdc;
        padding-right: 16px;
        p{
          line-height: 50px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .ma-right{
      float:left;
      width:30%;
      p{
          line-height: 50px;

      }
    }
  }
  .ma-bottom{
    border-top: 1px solid #dcdcdc;
    margin: 12px 0px 0px;
    overflow:hidden;
    .ma-time{
      float:left;
      margin-left: 12px;
      line-height: 35px;
    }
    .ma-more{
      float:right;
      background:orange;
      border-radius: 5px;
      line-height: 25px;
      font-size: 14px;
      padding: 0px 12px;
      margin-top: 5px;
      margin-right:12px;
      color:white;
      cursor:pointer;
    }
  }
  .main-container{
  margin-left: 0px !important;
}
}
</style>
