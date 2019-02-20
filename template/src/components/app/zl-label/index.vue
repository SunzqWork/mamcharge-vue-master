<template>
  <div class="zl-label clearfix">
    <div class="label fl">{{ label }}</div>
    <div class="text fl" :class="ellipsis ? 'ellipsis' : 'width'">
      <slot name="text">{{ text }}</slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'zl-label',
  props: {
    label: {
      type: String,
      default: ''
    },
    text: [String, Number, Object],
    ellipsis: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss">
.zl-label{
  .label{
    width: 145px;
    height: 40px;
    line-height: 40px;
    text-align: right;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
  .text{
    width: 120px;
    margin-left: 15px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    font-size: 14px;
    color: #666;
    font-weight: 400;
  }
  .width{
    width: 250px;
  }
}
</style>

