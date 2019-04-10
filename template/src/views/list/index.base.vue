<template>
  <div class="mam-list">
    <div class="mam-center" @click="offSelect">
      <div class="mam-poy">
        <div class="mam-boxs-button">
          <el-button type="primary">查询</el-button>
        </div>
        <div @click="reset" class="mam-boxs-button">
          <el-button>重置</el-button>
        </div>
        <div v-if="operation.export" class="mam-boxs-button">
          <el-button>导出</el-button>
        </div>
        <div v-if="operation.delete" class="mam-boxs-button">
          <el-button>删除</el-button>
        </div>
        <div v-if="operation.add" class="mam-boxs-button">
          <el-button>导入</el-button>
        </div>
        <div v-if="operation.new" class="mam-boxs-button">
          <el-button>新增</el-button>
        </div>
        <div v-if="operation.edit" class="mam-boxs-button">
          <el-button>编辑</el-button>
        </div>
      </div>
      <div class="mam-search" :style="{'max-height':flexHeight}">
        <div
          class="mam-down"
          v-if="condition.filter( s => s.value).length > 3"
          @click="openCondition"
        >
          <i v-if="flexHeight != 'auto'" class="el-icon-arrow-down"></i>
          <i v-else class="el-icon-arrow-up"></i>
        </div>
        <div class="mam-boxs" v-for="ins in input" :key="ins.name">
          <p class="mam-label">{{ins.description}}</p>
          <el-input clearable class="mam-ctrlW" :placeholder="`请输入${ins.description}`"></el-input>
        </div>
        <div class="mam-boxs" v-for="ins in number" :key="ins.name">
          <p class="mam-label">{{ins.description}}</p>
          <el-input-number class="mam-ctrlB" size="mini" style="margin-right: 5%;"></el-input-number>
          <el-input-number class="mam-ctrlB" size="mini"></el-input-number>
        </div>
        <div class="mam-boxs" v-for="ins in time" :key="ins.name">
          <p class="mam-label">{{ins.description}}</p>
          <el-date-picker
            class="mam-ctrlW"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </div>
      </div>
      <el-table
        border
        show-summary
        align="center"
        :data="tableData"
        style="width: 100%;margin-top:16px;"
      >
        <el-table-column type="selection" width="35" v-if="operation.checkbox"></el-table-column>

        <!-- <transition name="el-zoom-in-center"> -->
        <!--  -->
        <el-table-column v-if="operation.index" label="#序号">
          <template>
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :width="tab.width"
          v-for="tab in activeTable"
          :key="tab.date"
          :label="tab.description"
        >
          <template>
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ '-' }}</span>
          </template>
        </el-table-column>
        <!-- </transition> -->
      </el-table>
    </div>
    <div class="mam-body" v-if="over">
      <div
        class="mam-setting"
        @click="stopPro($event)"
        v-show="display"
        :style="{top:`${settingTop + 20}px`}"
      >
        <el-checkbox
          class="mam-select"
          v-model="settings.isContition"
        >是否设为查询字段</el-checkbox>
        <div v-show="settings.isContition">
          <p class="mam-title">搜索字段默认值</p>
          <el-input clearable v-if="defaultType == 'text'" v-model="settings.default"></el-input>
          <el-input-number
            v-model="settings.default"
            v-if="defaultType == 'bigint'"
            controls-position="right"
            :min="1"
            :max="10"
            style="width: 100%;"
          ></el-input-number>
          <el-date-picker
            prefix-icon="el-icon-date"
            clearable
            v-if="defaultType == 'time'"
            class="mam-ctrlW"
            v-model="settings.default"
            style="width: 100%;"
            type="datetimerange"
            start-placeholder="开始"
            range-separator="至"
            end-placeholder="结束"
            value-format="timestamp"
          ></el-date-picker>
        </div>
        <div v-show="settings.isContition && defaultType == 'text'">
          <p class="mam-title">设置占位内容</p>
          <el-input
            v-if="defaultType == 'text'"
            placeholder="设置占位内容"
            v-model="settings.placeholder"
          ></el-input>
        </div>
        <div v-show="settings.isContition">
          <p class="mam-title">设置标注</p>
          <el-input clearable placeholder="设置标注" v-model="settings.label"></el-input>
        </div>
        <div v-show="settings.isContition && defaultType == 'time'">
          <p class="mam-title">内容格式</p>
          <el-select v-model="settings.format" filterable placeholder="请选择">
            <el-option value="YYYY-MM-DD" label="YYYY-MM-DD"></el-option>
            <el-option value="HH-MM-SS" label="HH-MM-SS"></el-option>
            <el-option value="YYYY-MM-DD:HH-MM-SS" label="YYYY-MM-DD:HH-MM-SS"></el-option>
            <el-option value="YYYY" label="YYYY"></el-option>
            <el-option value="YYYY-MM" label="YYYY-MM"></el-option>
            <el-option value="WEEK" label="WEEK"></el-option>
          </el-select>
        </div>
        <p class="mam-title">标题显示</p>
        <el-input clearable v-model="settings.title " placeholder="标题显示替换"></el-input>
        <!-- <p class="mam-title">表头对齐方式</p>
        <el-select v-model="settings.alignHeader" placeholder="请选择" style="width: 100%;">
          <el-option value="left" label="文字居左"></el-option>
          <el-option value="center" label="文字居中"></el-option>
          <el-option value="right" label="文字居右"></el-option>
        </el-select>-->
        <p class="mam-title">对齐方式</p>
        <el-select v-model="settings.align" placeholder="请选择" style="width: 100%;">
          <el-option value="left" label="文字居左"></el-option>
          <el-option value="center" label="文字居中"></el-option>
          <el-option value="right" label="文字居右"></el-option>
        </el-select>
        <p class="mam-title">列宽设置</p>
        <el-input clearable v-model="settings.width " placeholder="列宽"></el-input>
        <div>
          <el-checkbox
            class="mam-select"
            v-model="settings.conditionDef"
          >是否设为隐藏条件</el-checkbox>
          <el-checkbox
            class="mam-select"
            v-model="settings.conditionSort"
          >设置排序</el-checkbox>
        </div>
        <el-button class="mam-submit" type="primary" @click="saveConfig">确认</el-button>
      </div>
      <p class="mam-line">列表显示字段</p>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.index" class="mam-float">序号</el-checkbox>
        <i class="el-icon-setting" @click="setting($event)"></i>
      </div>
      <div class="mam-checkout-box" v-for="(ins,index) in field" :key="ins.name">
        <el-checkbox
          v-if="over"
          class="mam-float"
          v-model="checked[index].value"
        >{{ins.description || ins.name}}</el-checkbox>
        <i class="el-icon-setting" @click="setting($event,index)"></i>
      </div>

      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.add" class="mam-float">导入</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.export" class="mam-float">导出</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.delete" class="mam-float">删除</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.new" class="mam-float">新增</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.edit" class="mam-float">编辑</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.checkbox" class="mam-float">表格多选</el-checkbox>
      </div>
      <!-- <p class="mam-line">添加查询字段</p>
      <div class="mam-checkout-box" v-for="(ins,index) in field" :key="ins.name">
        <el-checkbox
          v-if="over"
          class="mam-float"
          v-model="condition[index].value"
        >{{ins.description || ins.name}}</el-checkbox>
      </div>-->
      <!-- <p class="mam-line">选择内容操作</p> -->
    </div>
    <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>

<script>
import { Loading } from "element-ui";
export default {
  name: "list",
  props: {
    msg: String
  },
  mounted() {
    this.getInfo();
    this.Height =
      document.body.offsetHeight -
      (document.getElementsByClassName("navbar")[0].offsetHeight +
        document.getElementsByClassName("tags-view-container")[0].offsetHeight +
        24);
    document.getElementsByClassName("mam-list")[0].style.height =
      this.Height + "px";
  },

  computed: {
    activeTable: function() {
      return this.field.filter(req => {
        return (
          this.checked.filter(s => s._s.name == req.name) != undefined &&
          this.checked.filter(s => s._s.name == req.name)[0].value != false
        );
      });
    },
    input: function() {
      return this.field.filter(req => {
        return (
          /varchar|char/.test(req.dataType) &&
          this.condition.filter(s => s._s.name == req.name)[0].value
        );
      });
    },
    number: function() {
      return this.field.filter(
        req =>
          /smallint|decimal/.test(req.dataType) &&
          this.condition.filter(s => s._s.name == req.name)[0].value
      );
    },
    time: function() {
      return this.field.filter(
        req =>
          req.dataType == "timestamp" &&
          this.condition.filter(s => s._s.name == req.name)[0].value
      );
    }
  },

  methods: {
    stopPro($e) {
      $e.stopPropagation();
    },
    openCondition() {
      this.flexHeight != "auto"
        ? (this.flexHeight = "auto")
        : (this.flexHeight = "64px");
    },
    reset() {},
    stop($e) {},
    offSelect() {
      this.display = false;
    },
    getInfo() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.$axios
        .post("ProxyApi/dbms/meterInfo/getColumn", {
          name: "t_code_app"
        })
        .then(response => {
          this.field = response.data.data;
          this.field.map(s => {
            this.checked.push({
              value: false,
              _s: {
                ...s
              }
            });
            this.condition.push({
              value: false,
              _s: {
                ...s
              }
            });
          });
          this.field.map(s => {
            // this.condition[s.name] = false;
          });
          this.$axios
            .post("ProxyApi/analysis/list/design/get", {
              id: 8
            })
            .then(response => {
              document
                .getElementsByTagName("body")[0]
                .addEventListener("click", () => {
                  this.display = false;
                });
              if (response.data.data == null || response.data.data == "")
                return;
              let call = JSON.parse(response.data.data.listStyleDetails);
              this.operation = call.operation;
              this.field = call.table;
              // call.search.map(s => {
              //   for (let i = 0; i < this.condition.length; i++) {
              //     if (this.condition[i]._s.name == s.name) {
              //       this.condition[i].value = true;
              //     }
              //   }
              // });
              // call.table.map(s => {
              //   for (let i = 0; i < this.checked.length; i++) {
              //     if (this.checked[i]._s.name == s.name) {
              //       this.checked[i].value = true;
              //     }
              //   }
              // });
              for (let s in call.table) {
                call.table[s].isQuery == "Y"
                  ? (this.condition[s].value = true)
                  : (this.condition[s].value = false);
                call.table[s].isHidden == "Y"
                  ? (this.checked[s].value = true)
                  : (this.checked[s].value = false);
              }
              loading.close();
            })
            .catch(error => {
              loading.close();
              alert(error);
            });
        })
        .catch(error => {
          loading.close();
          alert(error);
        });

      //
    },
    setting($e, index) {
      this.display = true;
      /varchar|char/.test(this.field[index].dataType)
        ? (this.defaultType = "text")
        : "";
      this.field[index].dataType == "timestamp"
        ? (this.defaultType = "time")
        : "";
      this.field[index].dataType == "bigint"
        ? (this.defaultType = "bigint")
        : "";
      $e.stopPropagation();
      this.letNow = index;
      this.clickIndex = index;
      this.field[index].config != "" &&
      this.field[index].config != undefined &&
      this.field[index].config != null &&
      this.field[index].config != {}
        ? (this.settings = this.field[index].config)
        : (this.settings = {});
      this.settingTop = "0px";
      this.settings = this.field[index];
      setTimeout(() => {
        document.getElementsByClassName("mam-setting")[0].style.maxHeight =
          this.Height - 20 + "px";
      }, 500);
      // this.settingTop = $e.target.offsetTop;
    },
    saveConfig() {
      if (this.settings.isContition) {
        this.condition[this.letNow].value = true;
      } else {
        this.condition[this.letNow].value = false;
      }
      this.field[this.letNow] = {
        ...this.field[this.letNow],
        ...this.settings
      };
      this.field[this.letNow].defaultContent = this.settings.default;
      this.display = false;
      this.settings = {};
    },
    save() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      // return; old function
      // let JsonParm = {
      //   operation: this.operation,
      //   table: [],
      //   search: []
      // };
      // for (let ins of this.checked) {
      //   ins.value
      //     ? JsonParm.table.push({
      //         ...ins._s
      //       })
      //     : "";
      // }
      // for (let ins of this.condition) {
      //   ins.value
      //     ? JsonParm.search.push({
      //         ...ins._s
      //       })
      //     : "";
      // }
      // this.$axios
      //   .post("ProxyApi/analysis/list/design/addOrEdit", {
      //     id: 8,
      //     listStyleDetails: JSON.stringify(JsonParm)
      //   })
      //   .then(response => {
      //   })
      //   .catch(error => {
      //     alert(error);
      //   });

      let JsonParm = {
        operation: this.operation,
        table: []
      };
      for (let ins in this.checked) {
        this.checked[ins].value
          ? JsonParm.table.push({
              ...this.field[ins],
              isHidden: "Y"
            })
          : JsonParm.table.push({
              ...this.field[ins],
              isHidden: "N"
            });
        // 验证范围查询
        /smallint|decimal|timestamp|bigint/.test(JsonParm.table[ins].dataType)
          ? (JsonParm.table[ins]["qureyModel"] = "group")
          : (JsonParm.table[ins]["qureyModel"] = "single");
      }
      for (let ins in this.condition) {
        this.condition[ins].value
          ? (JsonParm.table[ins]["isQuery"] = "Y")
          : (JsonParm.table[ins]["isQuery"] = "N");
      }
      this.$axios
        .post("ProxyApi/analysis/list/design/addOrEdit", {
          id: 8,
          listStyleDetails: JSON.stringify(JsonParm)
        })
        .then(response => {
          loading.close();
          response.data.errcode == 0
            ? this.$message({
                message: response.data.errmsg,
                type: "success"
              })
            : this.$message({
                message: response.data.errmsg,
                type: "error"
              });
        })
        .catch(error => {
          loading.close();
          this.$message({
            message: "保存失败",
            type: "error"
          });
          alert(error);
        });
    }
  },
  data() {
    return {
      isDown: true,
      flexHeight: "64px",
      Height: "",
      defaultType: "",
      letNow: -1,
      settings: {
        default: "",
        align: "center",
        placeholder: ""
      },
      checkedSet: false,
      over: true,
      clickIndex: -1,
      operation: {
        export: false,
        delete: false,
        add: false,
        index: false,
        new: false,
        edit: false
      },
      condition: [],
      checked: [],
      field: [],
      tableData: [],
      display: false,
      settingTop: 0,
      // test
      options2: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶",
          disabled: true
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value2: ""
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mam-list {
  overflow: hidden;
  margin: 24px;
  margin-bottom: 0px;
  .mam-body {
    float: left;
    width: 20%;
    position: relative;
    .mam-setting {
      overflow: auto;
      position: absolute;
      width: 100%;
      // left: 10%;
      padding: 0;
      border: 0;
      z-index: 1;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.175);
      border-radius: 3px;
      background: white;
      z-index: 99;
      padding: 0px 10px;
      .mam-select {
        margin: 0px;
        margin-top: 10px;
      }
      .mam-submit {
        margin-top: 12px;
        margin-bottom: 12px;
      }
      .mam-title {
        text-align: left;
        line-height: 45px;
        font-size: 13px;
        margin: 0px;
        padding: 0px;
      }
    }
    .mam-line {
      text-align: left;
      line-height: 30px;
      font-weight: 900;
      font-size: 13px;
    }
    .mam-checkout-box {
      overflow: hidden;
      padding-left: 12px;
      i {
        float: right;
        margin-right: 24px;
        font-weight: 900;
        line-height: 24px;
        cursor: pointer;
      }
      .mam-float {
        float: left;
        margin-top: 4px;
        font-weight: 900;
      }
    }
    .mam-checkout-box:hover {
      background: rgba(30, 101, 255, 0.2);
      transition: 0.3s all;
    }
    .mam-checkout-box:hover .mam-float {
      transition: 0.3s all;
    }
    .mam-checkout-box:hover i {
      transition: 0.3s all;
    }
  }
  .mam-center {
    width: 75%;
    float: left;
    margin-right: 5%;
    // border-right: 1px solid #dcdcdc;
    .mam-search {
      width: 100%;
      overflow: hidden;
      position: relative;
      padding-top: 12px;
      .mam-down {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: -4px;
        margin: auto;
        width: 40px;
        text-align: center;
        height: 15px;
        z-index: 999;
        cursor: pointer;
        i {
          width: 100%;
        }
      }
      .mam-boxs {
        height: 40px;
        margin-bottom: 12px;
        float: left;
        width: 30%;
        margin-right: 1.5%;
        margin-left: 1.5%;
        overflow: hidden;
        .mam-label {
          margin: 0px;
          padding: 0px;
          font-size: 14px;
          float: left;
          line-height: 40px;
          width: 28.333%;
          color: #dcdcdc;
          text-align: left;
        }
        .mam-ctrlB {
          float: left;
          width: 33%;
          margin-top: 7px;
        }
        .mam-ctrlW {
          float: left;
          width: 71%;
        }
      }
    }
  }
}
.mam-poy {
  overflow: hidden;
  .mam-boxs-button {
    height: 40px;
    float: left;
  }
}
</style>
