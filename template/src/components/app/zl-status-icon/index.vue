<template>
  <span class="zl-status-icon" :style="styleObj"></span>
</template>
<script>
export default {
  name: 'zl-status-icon',
  props: {
    width: {
      type: String,
      default: '6px'
    },
    height: {
      type: String,
      default: '6px'
    },
    background: {
      type: String,
      default: 'red'
    }
  },
  watch: {
    background(data) {
      this.styleObj.background = data
    }
  },
  data() {
    return {
      styleObj: {
        width: this.width,
        height: this.height,
        background: this.background
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.zl-status-icon{
  border-radius: 50%;
  display: inline-block;
}
</style>

