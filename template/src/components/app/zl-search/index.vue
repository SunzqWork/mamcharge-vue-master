<template>
  <div class="zl-search">
    <div class="search">
      <input 
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        :placeholder="placeholder" 
        class="input" 
        type="text">
      <el-button 
        class="btn-theme search-btn" 
        @click="stationSearch" 
        size="mini">搜索</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'zl-search',
  props: ['placeholder', 'value'],
  methods: {
    // 根据站点名称搜索
    stationSearch() {
      this.$emit('search-btn', this.value)
    }
  }
}
</script>
<style lang="scss">
.zl-search{
  background: #fff;
  .search{
    position: relative;
    input{
      width: 200px;
      height: 34px;
      border-radius: 4px;
      border: 1px solid #c9c9c9;
      outline: none;
      text-indent: 10px;
      color: #333;
    }
    .search-btn{
      height: 32px;
      line-height: 0px;
    }
  }
}
</style>


