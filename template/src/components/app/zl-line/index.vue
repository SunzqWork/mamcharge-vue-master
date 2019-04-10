<template>
  <div style="overflow: hidden;">
    <div
      v-for="(ins,index) in dataLine"
      :key="ins.name"
      style="overflow: hidden;float: left;"
      @click="clicks(index)"
    >
      <p style="float:left;font-size: 14px;" class="zl-line-cur">{{ins.name}}</p>
      <b
        v-if="index != lastIns - 1"
        style="float:left;color:#c6c6c6;"
      >&nbsp;&nbsp;{{split}}&nbsp;&nbsp;</b>
    </div>
  </div>
</template>
<script>
export default {
  name: "zl-line",
  props: {
    index: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: ["aa", "bb"]
    },
    split: {
      type: String,
      default: "/"
    },
    insNow:{
      type: Number,
      default: ""
    }
  },
  watch: {
    index() {
      this.dataLine = this.data.slice(0, this.index);
      this.lastIns = this.dataLine.length;
    }
  },
  data() {
    return {
      checkList: [],
      lastIns: "",
      dataLine: []
    };
  },
  mounted() {
    this.dataLine = this.data.slice(0, this.index);
    this.lastIns = this.dataLine.length;
  },
  methods: {
    clicks(s) {
      this.dataLine = this.data.slice(0, ++s);
      this.lastIns = this.dataLine.length;
      this.$emit("line-click", s,this.insNow);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/theme.scss";
.zl-line-cur {
  cursor: pointer;
}
</style>


