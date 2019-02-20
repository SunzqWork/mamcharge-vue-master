<template>
  <div class="zl-app-menus">
    <ul class="clearfix">
      <li 
        class="fl" 
        v-for="(item, index) in menus"
        @click="changeApp(index)"
        :class="clickIndex === index ? 'click-menu' : ''"
        :key="index">
          {{ item.label }}
          <span class="num">({{ item.nums }})</span>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'zl-app-menus',
  data() {
    return {
      menus: [
        { label: '运营支撑平台', id: '1', nums: 10},
        { label: '钉钉端流程中心', id: '2', nums: 10},
        { label: '北京交警电动车登记管理系统', id: '3', nums: 10},
        { label: 'pvrAdmin', id: '4', nums: 10},
        { label: '订单管理系统', id: '5', nums: 10},
        { label: '运营看板', id: '6', nums: 10},
        { label: '四轮车2代-公有云后台', id: '7', nums: 10},
        { label: '工作流', id: '8', nums: 10},
        { label: '运维管理系统', id: '9', nums: 10},
        { label: '猛犸充电', id: '10', nums: 10},
        { label: '运营支撑平台', id: '1', nums: 10},
        { label: '钉钉端流程中心', id: '2', nums: 10},
        { label: '北京交警电动车登记管理系统', id: '3', nums: 10},
        { label: 'pvrAdmin', id: '4', nums: 10},
        { label: '订单管理系统', id: '5', nums: 10},
        { label: '运营看板', id: '6', nums: 10},
        { label: '四轮车2代-公有云后台', id: '7', nums: 10},
        { label: '工作流', id: '8', nums: 10},
        { label: '运维管理系统', id: '9', nums: 10},
        { label: '猛犸充电', id: '10', nums: 10}
      ],
      clickIndex: 0
    }
  },
  methods: {
    changeApp(index) {
      this.clickIndex = index
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/theme.scss';

.zl-app-menus{
  width: 800px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  ul{
    list-style: none;
    li{
      padding: 0 10px;
      height: 36px;
      line-height: 36px;
      border: 1px solid #ececec;
      margin: 8px;
      border-radius: 4px;
      cursor: pointer;
      color: #666;
      font-size: 14px;
      .num{
        color: $themeColor;
        font-weight: 600;
      }
    }
    .click-menu{
      background: $themeColor;
      color: #fff;
      border: 1px solid #fff;
      .num{
        color: #E0EEE0;
      }
    }
  }
}
</style>

