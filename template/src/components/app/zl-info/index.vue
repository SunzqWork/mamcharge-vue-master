<template>
  <div class="zl-info">
    <p class="label">{{ label }}</p>
    <p class="info">{{ info }}</p>
  </div>
</template>
<script>
export default {
  name: 'zl-info',
  props: ['label', 'info']
}
</script>
<style lang="scss">
.zl-info{
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #dcdcdc;
  &:first-child{ border-top: 1px solid #dcdcdc; }
  .label{
    width: 180px;
    text-align: left;
    background: #f5f7fa;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    padding-left: 10px;
    border-left: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
  }
  .info{
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #4e4e4e;
    background: #fff;
    padding-left: 12px;
    border-right: 1px solid #dcdcdc;
    
  }
}
</style>

