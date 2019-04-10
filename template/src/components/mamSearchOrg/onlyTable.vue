<template>
  <div class="mam-search-table">
    <div @click="test">
      <el-input clearable placeholder="请输入内容" v-model="input" :disabled="true"></el-input>
    </div>
    <el-dialog title="查询" :visible.sync="dialogTableVisible">
      <!-- this is query condtion -->
      <div class="mam-condtion-header">
        <div class="mam-condtion">
          <el-select
            v-if="!(options.length === 0)"
            class="mam-select"
            v-model="select"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input clearable placeholder="查询内容" v-model="searchInput" class="input-with-select"></el-input>
        </div>
        <div class="mam-condtion mam-margin-left">
          <el-button type="primary" class="mam-reload" @click="reload">重置</el-button>
          <el-button type="primary" class="mam-search-btn">搜索</el-button>
        </div>
      </div>
      <tree-table style="height:350px;overflow:auto;" :data="data" :columns="columns" border/>
      <el-button type="primary" style="margin-top: 12px;" @click="submit">确认</el-button>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from "@/components/TreeTable";

export default {
  name: "mamSearchOrg",
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: []
    }
  },
  components: { treeTable },
  data() {
    return {
      input: "",
      select: "",
      searchInput: "",
      columns: [
        {
          text: "事件",
          value: "event",
          width: 200
        },
        {
          text: "ID",
          value: "id"
        },
        {
          text: "时间线",
          value: "timeLine"
        },
        {
          text: "备注",
          value: "comment"
        }
      ],
      data: [
        {
          id: 0,
          event: "事件1",
          timeLine: 50,
          comment: "无"
        },
        {
          id: 1,
          event: "事件1",
          timeLine: 100,
          comment: "无",
          children: [
            {
              id: 2,
              event: "事件2",
              timeLine: 10,
              comment: "无"
            },
            {
              id: 3,
              event: "事件3",
              timeLine: 90,
              comment: "无",
              children: [
                {
                  id: 4,
                  event: "事件4",
                  timeLine: 5,
                  comment: "无"
                },
                {
                  id: 5,
                  event: "事件5",
                  timeLine: 10,
                  comment: "无"
                },
                {
                  id: 6,
                  event: "事件6",
                  timeLine: 75,
                  comment: "无",
                  children: [
                    {
                      id: 7,
                      event: "事件7",
                      timeLine: 50,
                      comment: "无",
                      children: [
                        {
                          id: 71,
                          event: "事件71",
                          timeLine: 25,
                          comment: "xx"
                        },
                        {
                          id: 72,
                          event: "事件72",
                          timeLine: 5,
                          comment: "xx"
                        },
                        {
                          id: 73,
                          event: "事件73",
                          timeLine: 20,
                          comment: "xx"
                        }
                      ]
                    },
                    {
                      id: 8,
                      event: "事件8",
                      timeLine: 25,
                      comment: "无"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    submit() {
      this.input = "select";
      this.dialogTableVisible = true;
    },
    reload() {
      this.input = "";
      this.select = "";
    },
    test() {
      this.dialogTableVisible = true;
    },
    click() {
      if (!screenfull.enabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
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
