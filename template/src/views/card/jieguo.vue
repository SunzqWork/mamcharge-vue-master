<template>
   <div>
     <div class="mam-header">
       <div class="mam-status">
         <p style="color:#dcdcdc">状态</p>
         <div style="align-items: center;display: flex;overflow:hidden;">
          <div :style="{height:'6px',width:' 6px',background: err ? 'red' : 'green',borderRadius:' 1000px',float:'left',}"></div>
           <p v-if="err" style="line-height: 50px;font-size: 32px;margin-left:12px;">异常</p>
           <p v-else style="line-height: 50px;font-size: 32px;margin-left:12px;">通过</p>
         </div>
       </div>
       <p class="mam-title">硬件ID：{{msg.sncode || '暂无数据'}}</p>
       <div class="mam-msg">
        <p>生产订单：{{msg.order_code || '暂无数据'}}</p>
        <p>产品编码：{{msg.product_code || '暂无数据'}}</p>
        <p>软件版本：{{msg.firmware_version || '暂无数据'}}</p>

       </div>
       <div class="mam-msg">
        <p>测试时间：{{msg.test_time || '暂无数据'}}</p>
        <p>创建时间：{{msg.create_time || '暂无数据'}}</p>
        <p>测试耗时：{{msg.consume_time || '暂无数据'}}s</p>
       </div>
     </div>
    <el-tabs style="width: 90%;margin: 26px 36px;" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="测试结果" name="first">
         <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="test_item_id"
        label="测试项目"
        >
      </el-table-column>
      <el-table-column
        prop="test_status"
        label="状态"
        >
        <template slot-scope="scope">
             <div style="align-items: center;display: flex;overflow:hidden;">
               <div :style="{height:'6px',width:' 6px',background: scope.row.test_status == '通过'? 'green' :'red',borderRadius:' 1000px',float:'left',}"></div>
               <p style="float:left;margin-left:12px;">{{scope.row.test_status}}</p>
             </div>
            </template>
      </el-table-column>
      <el-table-column
        prop="error_code"
        label="错误码">
      </el-table-column>
    </el-table>
      </el-tab-pane>
    </el-tabs>
   </div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      msg:{},
      activeName:'first',
      tableData: [],
      err:false,
    }
  },
  computed: {

  },
  mounted() {
    this.loadMsg()
  },
  methods: {
    handleClick(){

    },
    loadMsg(){
      if(this.$route.query.id == undefined || this.$route.query.id == "" ) return this.$message({
        message: 'ID缺失',
        type: 'error'
      })
      if(this.$route.query.tableId == undefined || this.$route.query.tableId == "" ) return this.$message({
        message: 'tableId缺失',
        type: 'error'
      })
      this.$axios.post(`${window.DPWebAPIUrl}/web/form/common/data/getRecord`,{
        tableId:this.$route.query.tableId,
        id:this.$route.query.id
      }).then( ss => {
        this.msg =  ss.data.data
        console.log(this.msg)
        this.tableData = ss.data.data.children.t_test_results_details
        this.err = ss.data.data.children.t_test_results_details.filter( s => s.test_status == "失败").length != 0 ? true : false
      })


    }
  }
}
</script>

<style lang="scss" scoped>
.mam-header{
  margin-top:68px;
  margin-left: 36px;
  position: relative;
  .mam-status{
    position:absolute;
    right: 15%;
    bottom: 0px;
  }
  .mam-title{
    font-weight:900;
    font-size: 16px;
  }
  .mam-msg{
    padding-top: 12px;
    overflow: hidden;
    p{
      float:left;
      font-size: 14px;
      margin-right: 12px;
    }
  }
}
</style>
