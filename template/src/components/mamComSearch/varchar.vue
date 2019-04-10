<template>
  <div class="mam-over">
    <!-- <p class="mam-label">{{data._s.label ||data._s.columnComment}}：</p> -->
    <el-input
      v-model="data.value"
      :placeholder="data._s.placeholder || `请输入${data._s.columnComment}`"
      clearable
      class="mam-ctrlW"
    />
  </div>
</template>

<script>
export default {
  name: "Varchar",
  props: {
    data: {
      type: Object,
      default: {}
    }
  }
};
</script>
<style lang="scss" scoped>
.mam-over {
  overflow: hidden;
  .mam-ctrlW {
  }
}
.mam-label {
  float: left;
  width: 22%;
  margin: 0px;
  padding: 0px;
  line-height: 37px;
  text-align: right;
  font-size: 14px;
}
.mam-ctrlW {
  float: left;
  width: 240px;
  height: 32px;
  /* width: 77%; */
  margin: 0px;
  padding: 0px;
}
</style>
