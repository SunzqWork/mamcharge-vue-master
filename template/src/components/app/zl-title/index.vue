<template>
  <div id="zl-title">
    <div class="title">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'zl-title',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss">
@import '@/styles/theme.scss';
#zl-title{
  .title{
    font-size: 14px;
    color: #666666;
    font-weight: 500;
    padding: 12px 15px;
    // border-bottom: 1px solid #e5e5e5;
    // margin: 15px 0 25px 20px;
    position: relative;
    width: 100%;
    font-weight: bold;
    &::before{
      content: "";
      position: absolute;
      width: 4px;
      height: 16px;
      background: $themeColor;
      left: 0px;
      top: 12px;
    }
  }
}
</style>


