<template>
  <div
    class="zl-card"
    :style="{marginBottom: isCondition ? '34px' : '20px'}"
  >
    <el-card class="box-card">
      <div class="card-title" v-if="isHeader">
        <svg-icon v-if="icon !== ''" :icon-class="icon" class="icon"/>
        <span>{{ title }}</span>
      </div>
      <div
        :class="[isHeader ? 'slot-html' : 'slot-html-no',isCondition ? ` zl-full${random} slot-tran` : 'slot-tran']"
        :style="{height: isCondition ? '100px': 'auto',overflow: 'hidden'}"
      >
        <div style="height: 100%;" :class="isCondition ? `zl-transHeight${random}` : ''">
          <slot></slot>
        </div>
      </div>
    </el-card>
    <div class="mam-full" v-if="isCondition" @click="open">
      <svg-icon :class="where ? 'mam-full-icon' : 'mam-full-icon-rotate'" icon-class="down"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "zl-card",
  props: {
    isCondition: {
      type: Boolean,
      default: false
    },
    isHeader: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      random: parseInt(Math.random() * 100),
      where:true
    };
  },
  methods: {
    open() {
      let now = document.getElementsByClassName(`zl-full${this.random}`)[0] 
      now.offsetHeight == 100 ? now.style.height = `${document.getElementsByClassName(`zl-transHeight${this.random}`)[0].offsetHeight}px` : now.style.height = "100px"
      this.where = !this.where 
    }
  }
};
</script>
<style scoped lang="scss">
</style>

