<template>
  <div class="dashboard-container">
    <component :is="switchMa" :options="options"/>
  </div>
</template>

<script>
import onlyTable from './onlyTable.vue'
import onlyList from './onlyList.vue'

export default {
  name: 'mamCom',
  components: { onlyTable, onlyList},
   props: {
    options: {
      type: Array,
      default: []
    },
    switchMa:{
      type: String,
      default: 'onlyTable'
    }
  }
}
</script>
