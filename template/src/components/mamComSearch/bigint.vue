<template>
  <div class="mam-over">
    <!-- <p class="mam-label">{{data._s.label || data._s.columnComment}}：</p> -->
    <div class="mam-warp">
      <input v-model="fi" type="text" class="mam-ctrlB">
      <b>-</b>
      <input v-model="tw" type="text" class="mam-ctrlC">
    </div>
  </div>
  <!-- /^\d*\.{0,1}\d{0,10}$/ -->
</template>

<script>
export default {
  name: 'Bigint',
  props: {
    data: {
      type: Object,
      default: {}
    },
    fi: {
      type: Number
    },
    tw: {
      type: Number
    }
  },
  watch: {
    fi(n, o) {
      if (/^\d*\.{0,1}\d{0,10}$/.test(n)) {
        this.data.value = [this.fi, this.tw]
      } else {
        this.fi = o
      }
    },
    tw(n, o) {
      console.log(n, o, /^\d*\.{0,1}\d{0,10}$/.test(n))
      if (/^\d*\.{0,1}\d{0,10}$/.test(n)) {
        this.data.value = [this.fi, this.tw]
      } else {
        this.tw = o
      }
    }
  },
  methods: {}
}
</script>
<style scoped>
input {
  text-align: center;
}
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
.mam-ctrlC {
  float: right;
  width: 45%;
  height: 33px;
  border-radius: 3px;
  box-shadow: none;
  border: 0px;
  font-size: 13px;
  padding: 0px 3px;
}
.mam-ctrlB {
  float: left;
  width: 100%;
  /* width: 45%; */
  display: block;
  height: 33px;
  border-radius: 3px;
  box-shadow: none;
  border: 0px;
  font-size: 13px;
  padding: 0px 3px;
}
.mam-warp {
  border: 1px solid #dcdfe6;
  overflow: hidden;
  border-radius: 4px;
  transition: all 0.3s;
  /* width: 77%; */
  width: 490px;
}
.mam-warp:hover {
  border-color: #c0c4cc;
}

b {
  float: left;
  line-height: 33px;
  width: 10%;
  text-align: center;
}
</style>
