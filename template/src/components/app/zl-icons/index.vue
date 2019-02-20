<template>
  <div id='icon'>
    <el-input ref="inp" @focus="getReadOnly" v-model="icon" clearable @clear="flag = 1"></el-input>
    <el-dialog
      title='选择图标'
      :visible.sync='dialogIcon'
      width='960px'
      @open='bindChoose'>
        <ul class="icon_lists clear">   
          <li>
          <i class="icon iconfont-menu icon-anquanjiankongdaping1"></i>
              <div class="name">安全监控大屏</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-shebeiguanlipingtaisvg1"></i>
              <div class="name">设备管理平台svg</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-gongyouyunhoutaisvg1"></i>
              <div class="name">公有云后台svg</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-xitongyunweijiankongpingtai1"></i>
              <div class="name">系统运维监控平台</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-gongyouyun1"></i>
              <div class="name">公有云</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-shuzihuadaping1"></i>
              <div class="name">数字化大屏</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-shujuzhongxin1"></i>
              <div class="name">数据中心</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-dingdanfahuoxitong1"></i>
              <div class="name">订单发货系统</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-jiankonggaojingpingtai1"></i>
              <div class="name">监控告警平台</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-CRM1"></i>
              <div class="name">CRM </div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-Shape1"></i>
              <div class="name">Shape</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-worktile1"></i>
              <div class="name">worktile</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-gongxiangchongdianlogo"></i>
              <div class="name">共享充电logo</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-shishigaojingshuliangshishigaojingshuliang1"></i>
              <div class="name">实时告警数量实时告警数量</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-shishigongshuai"></i>
              <div class="name">实时功率</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-zhengzaichongdianzhongdeyonghushu"></i>
              <div class="name">正在充电中的用户数</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-gaogongshuai"></i>
              <div class="name">高功率</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-gongshuaiquxianyichang"></i>
              <div class="name">功率曲线异常</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-baoxiansirongduan"></i>
              <div class="name">保险丝熔断</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-quyudaping1"></i>
              <div class="name">区域大屏</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-zhifubaodaping1"></i>
              <div class="name">支付宝大屏</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-xiaoshoudaping1"></i>
              <div class="name">销售大屏</div>
          </li>
         
          <li>
          <i class="icon iconfont-menu icon-yunyingzhichengpingtai1"></i>
              <div class="name">运营支撑平台</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-CRM"></i>
              <div class="name">CRM </div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-gongyouyun"></i>
              <div class="name">公有云</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-anquanjiankongdaping"></i>
              <div class="name">安全监控大屏</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-Shape"></i>
              <div class="name">Shape</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-dingdanfahuoxitong"></i>
              <div class="name">订单发货系统</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-qiehuan"></i>
              <div class="name">切换</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-gongyouyunhoutaisvg"></i>
              <div class="name">公有云后台svg</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-jiankonggaojingpingtai"></i>
              <div class="name">监控告警平台</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-quyudaping"></i>
              <div class="name">区域大屏</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-shebeiguanlipingtaisvg"></i>
              <div class="name">设备管理平台svg</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-shujuzhongxin"></i>
              <div class="name">数据中心</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-shuzihuadaping"></i>
              <div class="name">数字化大屏</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-xiaoshoudaping"></i>
              <div class="name">销售大屏</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-xitongyunweijiankongpingtai"></i>
              <div class="name">系统运维监控平台</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-yunyingzhichengpingtai"></i>
              <div class="name">运营支撑平台</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-zhifubaodaping"></i>
              <div class="name">支付宝大屏</div>
          </li>
          <li>
          <i class="icon iconfont-menu icon-mengmachongdianLOGO"></i>
              <div class="name">猛犸充电LOGO</div>
          </li>
        </ul>
      </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'icon',
  data() {
    return {
      dialogIcon: false,
      icon: '',
      flag: 0
    }
  },
  methods: {
    getReadOnly() {
      if (this.flag == 0) {
        this.dialogIcon = true;
      }
      this.flag = 0
      this.$refs.inp.blur();
    },
    bindChoose() {
      this.$nextTick(() => {
        const eles = document.getElementsByClassName('iconfont-menu')
        for (let i of eles) {
          const li = i.parentNode;
          li.onclick = $event => {
            this.icon = $event.currentTarget.firstChild.className.substr(19);
            this.dialogIcon = false
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
ul, ol { list-style: none; }
.clear:after {
  content: '\20';
  display: block;
  height: 0;
  clear: both;
}
.icon_lists{
  height: 500px;
  overflow: auto;
  width: 100% !important;
}
.icon_lists li{
  float:left;
  width: 100px;
  height:180px;
  text-align: center;
  list-style: none !important;
}
.icon_lists .icon{
  font-size: 42px;
  line-height: 100px;
  margin: 10px 0;
  color:#333;
}
</style>

