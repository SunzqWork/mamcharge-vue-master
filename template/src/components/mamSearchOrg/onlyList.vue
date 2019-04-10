<template>
  <div class="mam-search-table">
    <div @click="open">
      <el-input clearable placeholder="请输入内容" v-model="input" :disabled="true"></el-input>
    </div>
    <el-dialog title="查询" :visible.sync="dialogTableVisible">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" sortable width="180"></el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "onlyList",
  props: {
    options: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      dialogTableVisible:false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    open(){
      this.dialogTableVisible = true
    },
    formatter(row, column) {
      return row.address;
    }
  }
};
</script>

<style scoped lang="scss">
.mam-search-table {
  .mam-condtion-header {
    overflow: hidden;
    margin-bottom: 12px;
    .mam-condtion {
      width: 50%;
      float: left;
      overflow: hidden;
      .input-with-select {
        float: left;
        width: 65%;
      }
      .mam-select {
        float: left;
        margin-right: 5%;
        width: 30%;
      }
    }
    .mam-margin-left {
      float: right;
      overflow: hidden;
      width: 50%;
      .mam-reload {
        float: right;
      }
      .mam-search-btn {
        margin-right: 12px;
        float: right;
      }
    }
  }
}
</style>
