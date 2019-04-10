<template>
  <div class="mam-over">
    <el-select v-model="data.value" filterable :placeholder="`请选择${data._s.columnComment}`">
     <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.label"
      :value="item.id">
    </el-option>
  </el-select>

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
  },
  data() {
    return {
      options:[]
    }
  },
  mounted () {
    console.log(this.data._s.helpBoxJoinTable,'DADADADA')
    if(this.data._s.helpBoxJoinTable != "" && this.data._s.helpBoxJoinTable != undefined && this.data._s.helpBoxConvertName != "" && this.data._s.helpBoxConvertName != undefined){
      this.$axios.post(this.data._s.helpBoxJoinTable).then(s => {
        console.log(s.data.data)
        this.options = s.data.data.map( res => {
          return {
            ...res,
            label:res[this.data._s.helpBoxConvertName]
          }
        })
      })
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
