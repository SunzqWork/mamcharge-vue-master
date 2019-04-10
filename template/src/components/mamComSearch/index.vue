<template>
  <div v-if="switchMa !== ''" class="dashboard-container">
    <component :is="isWhere" :data="data"/>
  </div>
</template>

<script>

import TIMESTAMP from "./timestamp.vue";
import DATETIME from "./timestamp.vue";
import VARCHAR from "./varchar.vue";
import BIGINT from "./bigint.vue";
import SELECT from "./select.vue";

export default {
  name: "mamCom",
  components: { TIMESTAMP, DATETIME, VARCHAR, BIGINT,SELECT },
  data() {
    return {
      isWhere:""
    }
  },
  mounted() {
      if(this.isSelect){
        // 需要下拉
        this.isWhere = "SELECT"
      }else{
        // 不需要
        this.isWhere = this.switchMa
      }
  },
  props: {
    isSelect: {
      type: Boolean,
      default: false
    },
    switchMa: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: {}
    }
  }
};
</script>
