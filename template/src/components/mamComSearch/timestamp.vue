<template>
  <div class="mam-over">
    <!-- <p class="mam-label">{{data._s.label || data._s.columnComment}}：</p> -->
    <!-- <el-date-picker
      v-model="data.value"
      :clearable="true"
      class="mam-ctrlW"
      type="datetimerange"
      prefix-icon="el-icon-date"
      start-placeholder="开始日期"
      range-separator="至"
      end-placeholder="结束日期"
      value-format="timestamp"
    />-->
    <el-date-picker
      style="width: 480px;height: 40px;"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      v-model="data.value"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: "Timestamp",
  props: {
    data: {
      type: Object,
      default: {}
    }
  }
};
</script>
<style scoped>
.mam-over {
  overflow: hidden;
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
  width: 100%;
  /* width: 77%; */
  margin: 0px;
  padding: 0px;
}
</style>

