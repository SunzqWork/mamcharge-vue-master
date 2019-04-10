<template>
  <div class="mam-list main-page">
    <div class="mam-center" @click="offSelect">
      <el-card class="box-card zl-box-card">
        <div :style="{'max-height':'100px'}" class="mam-search">
          <!-- 搜索条件 -->
          <Condition :data="field"/>
          <div class="mam-poy">
            <div class="mam-boxs-button">
              <el-button type="primary">查询</el-button>
            </div>
            <div class="mam-boxs-button" @click="reset">
              <el-button>重置</el-button>
            </div>
          </div>
        </div>
        <div v-if="defHeight > 100 " class="mam-down" @click="openCondition">
          <i v-if="flexHeight != 'auto'" class="el-icon-arrow-down"/>
          <i v-else class="el-icon-arrow-up"/>
        </div>
      </el-card>
      <el-card class="box-card mam-tables">
        <div class="mam-btn">
          <div v-if="operation.look" class="mam-boxs-button">
            <el-button :type="pir == 1 ? 'primary' : ''" icon="el-icon-view">查看</el-button>
          </div>
          <div v-if="operation.new" class="mam-boxs-button">
            <el-button :type="pir == 2 ? 'primary' : ''" icon="el-icon-plus">新增</el-button>
          </div>
          <div v-if="operation.edit" class="mam-boxs-button">
            <el-button :type="pir == 3 ? 'primary' : ''" icon="el-icon-edit">编辑</el-button>
          </div>
          <div v-if="operation.delete" class="mam-boxs-button">
            <el-button :type="pir == 4 ? 'primary' : ''" icon="el-icon-close">删除</el-button>
          </div>
          <div v-if="operation.add" class="mam-boxs-button">
            <el-button :type="pir == 5 ? 'primary' : ''" icon="el-icon-upload2">导入</el-button>
          </div>
          <div v-if="operation.export" class="mam-boxs-button">
            <el-button :type="pir == 6 ? 'primary' : ''" icon="el-icon-download">导出</el-button>
          </div>
        </div>
        <el-table
          v-if="reload"
          :data="tableData"
          border
          show-summary
          align="center"
          style="width: 100%;margin-top:16px;"
        >
          <el-table-column v-if="operation.checkbox" type="selection" width="35"/>
          <el-table-column v-if="operation.index" label="#序号">
            <template>
              <i class="el-icon-time"/>
              <span style="margin-left: 10px">{{ '-' }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-for="tab in activeTable"
            :width="tab.width"
            :key="tab.date"
            :label="tab.columnComment"
          >
            <template>
              <i class="el-icon-time"/>
              <span style="margin-left: 10px">{{ '-' }}</span>
            </template>
          </el-table-column>
          <!-- </transition> -->
        </el-table>
      </el-card>
      <div class="page-block" style="    margin-top: 20px;">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="back">返回</el-button>
      </div>

    </div>
    <div v-if="over" class="mam-body">
      <!-- 设置弹框 -->
      <div
        v-show="display"
        :style="{top:`${settingTop + 20}px`}"
        class="mam-setting"
        @click="stopPro($event)"
      >
        <el-checkbox v-model="settings.queried" class="mam-select">是否设为查询字段</el-checkbox>
        <div v-show="settings.queried">
          <p class="mam-title">搜索字段默认值</p>
          <el-input v-if="defaultType == 'text'" v-model="settings.default" clearable/>
          <el-input-number
            v-if="defaultType == 'bigint'"
            v-model="settings.default"
            :min="1"
            :max="10"
            controls-position="right"
            style="width: 100%;"
          />
          <el-date-picker
            v-if="defaultType == 'time'"
            v-model="settings.default"
            prefix-icon="el-icon-date"
            clearable
            class="mam-ctrlW"
            style="width: 100%;overflow: hidden;"
            type="datetimerange"
            start-placeholder="开始"
            range-separator="至"
            end-placeholder="结束"
            value-format="timestamp"
          />
        </div>
        <div v-show="settings.queried && defaultType == 'text'">
          <p class="mam-title">设置占位内容</p>
          <el-input
            v-if="defaultType == 'text'"
            v-model="settings.placeholder"
            placeholder="设置占位内容"
          />
        </div>
        <div v-show="settings.queried">
          <p class="mam-title">设置标注</p>
          <el-input v-model="settings.label" clearable placeholder="设置标注"/>
        </div>
        <div v-show=" defaultType == 'time'">
          <p class="mam-title">内容格式</p>
          <el-select v-model="settings.format" filterable placeholder="请选择">
            <el-option value="YYYY-MM-DD" label="YYYY-MM-DD"/>
            <el-option value="HH-MM-SS" label="HH-MM-SS"/>
            <el-option value="YYYY-MM-DD:HH-MM-SS" label="YYYY-MM-DD:HH-MM-SS"/>
            <el-option value="YYYY" label="YYYY"/>
            <el-option value="YYYY-MM" label="YYYY-MM"/>
            <el-option value="WEEK" label="WEEK"/>
          </el-select>
        </div>
        <div v-if="settings.queried" style="border: 1px solid #dcdcdc;width: 100%;margin-top: 24px;"/>
        <p class="mam-title">标题显示</p>
        <el-input v-model="settings.title " clearable placeholder="标题显示替换"/>
        <p class="mam-title" v-if="settings.conditionSort">排序位置</p>
        <el-input v-model="settings.sortInfo" v-if="settings.conditionSort" clearable placeholder="排序位置"/>
        <p class="mam-title">对齐方式</p>
        <el-select v-model="settings.align" placeholder="请选择" style="width: 100%;">
          <el-option value="left" label="文字居左"/>
          <el-option value="center" label="文字居中"/>
          <el-option value="right" label="文字居右"/>
        </el-select>
        <p class="mam-title">列宽设置</p>
        <el-input v-model="settings.width " clearable placeholder="列宽"/>
        <div>
          <el-checkbox v-model="settings.conditionDef" class="mam-select">是否设为隐藏条件</el-checkbox>
          <el-checkbox v-model="settings.conditionSort" class="mam-select">设置设置排序</el-checkbox>
        </div>
        <el-button class="mam-submit" type="primary" @click="saveConfig">确认</el-button>
      </div>
      <p class="mam-line">列表显示字段</p>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.index" class="mam-float">序号</el-checkbox>
        <i class="el-icon-setting" @click="setting($event)"/>
      </div>
      <div v-for="(ins,index) in field" :key="ins.name" class="mam-checkout-box">
        <el-checkbox
          v-if="over"
          v-model="checked[index].value"
          class="mam-float"
        >{{ ins.columnComment || ins.name }}</el-checkbox>
        <i class="el-icon-setting" @click="setting($event,index)"/>
      </div>
      <p class="mam-line">操作按钮选择</p>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.look" class="mam-float" @change="lev">查看</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.new" class="mam-float" @change="lev">新增</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.edit" class="mam-float" @change="lev">编辑</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.delete" class="mam-float" @change="lev">删除</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.add" class="mam-float" @change="lev">导入</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.export" class="mam-float" @change="lev">导出</el-checkbox>
      </div>
      <div class="mam-checkout-box">
        <el-checkbox v-model="operation.checkbox" class="mam-float">表格多选</el-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import Condition from './condition'
export default {
  name: 'List',
  components: {
    Condition
  },
  props: {
    msg: String
  },
  data() {
    return {
      defHeight: '',
      pir: '',
      reload: true,
      isDown: true,
      flexHeight: 'auto',
      Height: '',
      defaultType: '',
      letNow: -1,
      settings: {
        default: '',
        align: 'center',
        placeholder: ''
      },
      checkedSet: false,
      over: true,
      clickIndex: -1,
      operation: {
        look:false,
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
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶',
          disabled: true
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value2: ''
    }
  },
  computed: {
    activeTable: function() {
      return this.field.filter(req => {
        return (
          this.checked.filter(s => s._s.name == req.name) != undefined
          // && this.checked.filter(s => s._s.name == req.name)[0].value != false
        )
      })
    }
  },
  watch: {},
  mounted() {
    this.getInfo()
    this.Height =
      document.body.offsetHeight -
      (document.getElementsByClassName('mam-header')[0].offsetHeight +
        document.getElementsByClassName('tags-view-container')[0].offsetHeight +
        24)
    document.getElementsByClassName('mam-list')[0].style.height =
      this.Height + 'px'
  },
  methods: {
    lev() {
      if(this.operation.look){
        this.pir = 1
      }else{
        if (this.operation.new) {
        this.pir = 2
      } else {
        if (this.operation.edit) {
          this.pir = 3
        } else {
          if (this.operation.delete) {
            this.pir = 4
          } else {
            if (this.operation.add) {
              this.pir = 5
            } else {
              if (this.operation.export) {
                this.pir = 6
              }
            }
          }
        }
      }
      }
    },
    stopPro($e) {
      $e.stopPropagation()
    },
    openCondition() {
      this.flexHeight != 'auto'
        ? (this.flexHeight = 'auto')
        : (this.flexHeight = '100px')
    },
    reset() {},
    stop($e) {},
    offSelect() {
      this.display = false
    },
    searchMT() {
      this.flexHeight = 'auto'
      setTimeout(() => {
        this.defHeight = document
          .getElementsByClassName('app-main')[0]
          .getElementsByClassName('mam-search')[0].offsetHeight
        this.flexHeight = '100px'
      }, 100)
    },
    getInfo() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var name = this.$route.query.name
      var id = this.$route.query.id
      this.$axios.post(`${window.DPWebAPIUrl}/design/list/getColumn`, {
        tableId: id
      })
        .then(response => {
          this.field = response.data.data
          this.field.map(s => {
            this.checked.push({
              value: false,
              _s: {
                ...s
              }
            })
            this.condition.push({
              value: false,
              _s: {
                ...s
              }
            })
          })
          document
            .getElementsByTagName('body')[0]
            .addEventListener('click', () => {
              this.display = false
            })
          this.$axios
            .post(`${window.DPWebAPIUrl}/design/list/get`, {
              tableId: id
            })
            .then(response => {
              loading.close()
              this.searchMT()
              if (response.data.data == null || response.data.data == '') {
                return
              }
              const call = JSON.parse(response.data.data.listStyleDetail)
              this.operation = call.operation
              this.field = call.table
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
              for (const s in call.table) {
                call.table[s].queried
                  ? (this.condition[s].value = true)
                  : (this.condition[s].value = false)
                call.table[s].hidden
                  ? (this.checked[s].value = false)
                  : (this.checked[s].value = true)
              }
              this.lev()
            })
            .catch(error => {
              loading.close()
            })

        })
        .catch(error => {
          loading.close()
          alert(error)
        })

      //
    },
    setting($e, index) {
      this.display = true;
      /varchar|char/.test(this.field[index].dbType)
        ? (this.defaultType = 'text')
        : ''
      this.field[index].dbType == 'datetime'
        ? (this.defaultType = 'time')
        : ''
      this.field[index].dbType == 'bigint' ? (this.defaultType = 'bigint') : ''
      $e.stopPropagation()
      this.letNow = index
      this.clickIndex = index
      this.settingTop = '0px'
      this.settings = JSON.parse(
        JSON.stringify({
          queried: '',
          default: '',
          placeholder: '',
          label: '',
          title: '',
          align: '',
          width: '',
          index: '',
          ...this.field[index]
        })
      )
      this.reload = false
      this.reload = true
      setTimeout(() => {
        document.getElementsByClassName('mam-setting')[0].style.maxHeight =
          this.Height - 20 + 'px'
      }, 500)
    },
    saveConfig() {
      if (this.settings.queried) {
        this.condition[this.letNow].value = true
      } else {
        this.condition[this.letNow].value = false
      }
      this.field[this.letNow] = {
        ...this.field[this.letNow],
        ...this.settings
      }
      this.field[this.letNow].defaultContent = this.settings.default
      this.display = false
      // this.field = JSON.parse(JSON.stringify(this.field));
      this.settings = {}
      this.searchMT()
    },
    back() {
      this.$router.go(-1)
    },
    save() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

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
      //   .post("http://192.168.1.137:8080/analysis/list/design/addOrEdit", {
      //     id: 8,
      //     listStyleDetails: JSON.stringify(JsonParm)
      //   })
      //   .then(response => {
      //   })
      //   .catch(error => {
      //     alert(error);
      //   });

      const JsonParm = {
        operation: this.operation,
        table: []
      }

      for (const ins in this.checked) {
        this.checked[ins].value
          ? JsonParm.table.push({
            ...this.field[ins],
            hidden: false
          })
          : JsonParm.table.push({
            ...this.field[ins],
            hidden: true
          });
        // 验证范围查询
        /smallint|decimal|datetime|bigint|int|float|double/.test(JsonParm.table[ins].dbType)
          ? (JsonParm.table[ins]['queryModel'] = 'group')
          : (JsonParm.table[ins]['queryModel'] = 'single')
      }
      for (const ins in this.condition) {
        this.condition[ins].value
          ? (JsonParm.table[ins]['queried'] = true)
          : (JsonParm.table[ins]['queried'] = false)
      }
      // return
      var id = this.$route.query.id
      let nows = [];
      let noHavs = JsonParm.table.filter( s => s.sortInfo == "" || s.sortInfo == undefined)
      let haveInfo = JsonParm.table.filter( s => s.sortInfo != "" && s.sortInfo != undefined)
      function sequence(a,b){
        if (a.sortInfo>b.sortInfo) {
            return 1;
        }else if(a.sortInfo<b.sortInfo){
            return -1
        }else{
            return 0;
        }
    }
    JsonParm.table = [...haveInfo.sort(sequence),...noHavs]
      this.$axios
        .post(`${window.DPWebAPIUrl}/design/list/addOrEdit`, {
          tableId: id,
          listStyleDetail: JSON.stringify(JsonParm),
          isHidden: JsonParm.table.filter(fi => fi.hidden).map(call => {
            return call.name
          })
        })
        .then(response => {
          loading.close()
          response.data.errcode == 0
            ? this.$message({
              message: response.data.errmsg,
              type: 'success'
            })
            : this.$message({
                message: response.data.errmsg,
                type: "error"
              });
        })
        .catch(error => {
          loading.close()
          this.$message({
            message: '保存失败',
            type: 'error'
          })
          alert(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box-card {
  position: relative;
  overflow: inherit;
  .mam-down {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: -12px;
    margin: auto;
    width: 60px;
    text-align: center;
    height: 15px;
    z-index: 999;
    background: white;
    box-shadow: 0px 3px 5px 0px rgba(160, 160, 160, 0.4);
    border-radius: 4px;
    cursor: pointer;
    i {
      width: 100%;
    }
  }
}
.mam-tables {
  margin-top: 20px;
  .mam-btn {
    overflow: hidden;
    .mam-boxs-button {
      float: left;
      margin-right: 10px;
    }
  }
}
.mam-list {
  overflow: hidden;
  margin: 20px;
  margin-left: 17px;
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

      .mam-boxs {
        height: 40px;
        margin-bottom: 10px;
        float: left;
        margin-right: 10px;
        overflow: hidden;
        .mam-label {
          margin: 0px;
          padding: 0px;
          font-size: 14px;
          float: left;
          line-height: 40px;
          color: #dcdcdc;
          text-align: left;
        }
        .mam-ctrlB {
          float: left;
          margin-top: 7px;
        }
        .mam-ctrlW {
          float: left;
        }
      }
    }
  }
}
.mam-poy {
  overflow: hidden;
  float: left;
  .mam-boxs-button {
    height: 40px;
    float: left;
    margin-right: 12px;
  }
}
</style>
