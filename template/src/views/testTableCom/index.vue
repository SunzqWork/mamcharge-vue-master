<template>
  <div class="main-page">
    <el-card class="box-card zl-box-card" style="position:relative;">
      <div :style="{'max-height':'100px'}" class="mam-search">
        <mam-com-search
          v-for="ins in condition"
          :key="ins._s.columnComment"
          :switch-ma="ins._s.dbType"
          :is-select="ins._s.selectIs"
          :data="ins"
          v-show="!ins._s.conditionDef"
          @changes="changeList"
          class="mam-condtion"
        />
        <div class="mam-poy">
          <div class="mam-boxs-button" @click="getTable(1)">
            <el-button type="primary">查询</el-button>
          </div>
          <div class="mam-boxs-button">
            <el-button @click="reset">重置</el-button>
          </div>
        </div>
      </div>
      <div v-if="defHeight > 100 " class="mam-down" @click="openCondition">
        <i v-if="flexHeight != 'auto'" class="el-icon-arrow-down"/>
        <i v-else class="el-icon-arrow-up"/>
      </div>
    </el-card>
    <el-card class="box-card zl-box-card">
      <div class="mam-table-content">
        <div class="mam-btn">
          <div v-if="operation.look" class="mam-boxs-button">

            <el-button :type="pir == 1 ? 'primary' : ''" @click="view">查看</el-button>
          </div>
          <div v-if="operation.new" class="mam-boxs-button">
            <el-button :type="pir == 2 ? 'primary' : ''" @click="add">新增</el-button>
          </div>
          <div v-if="operation.edit" class="mam-boxs-button">
            <el-button :type="pir == 3 ? 'primary' : ''" @click="edit">编辑</el-button>
          </div>
          <div v-if="operation.delete" class="mam-boxs-button">
            <el-button :type="pir == 4 ? 'primary' : ''" @click="del">删除</el-button>
          </div>
          <div v-if="operation.add" class="mam-boxs-button">
            <el-button :type="pir == 5 ? 'primary' : ''" >导入</el-button>
          </div>
          <div v-if="operation.export" class="mam-boxs-button">
            <!-- asc
            dsc -->
            <!-- <a
              target="_blank" > -->
            <el-button @click="after" :type="pir == 6 ? 'primary' : ''">导出</el-button>
             <!-- </a>  -->
          </div>
        </div>

        <el-table
          v-loading.body="listLoading"
          :data="data"
          :stripe="true"
          border
          class="mam-tables"
          @selection-change="selectionFunc"
          @current-change="handleCurrentChangeTable"
        >
          <el-table-column
            v-if="operation.checkbox"
            :header-align="centers"
            type="selection"
            width="35"
          />
          <el-table-column
            v-for="ins in checked"
            :width="ins._s.width"
            :align="ins._s.align"
            :header-align="centers"
            :props="ins._s.name"
            :key="ins._s.name"
            :label="ins._s.columnComment"
            show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="ins._s.selectIs">{{ins._s.proto[scope.row[ins._s.name]]}}</span>
              <div v-else>
                 <!-- moment -->
              <span
                v-if="ins._s.dbType == 'datetime'"
              >{{ [scope.row[ins._s.name],ins._s.format] | timeFi }}</span>
              <img style="display: block;width: 100%;height: 4rem;" v-if="/http:\/\/|https:\/\//.test(scope.row[ins._s.name])" :src="scope.row[ins._s.name]">
              <span
                v-else
                :style="{marginLeft: '10px',textAlign:ins._s.align}"
              >{{ scope.row[ins._s.name]||'--' }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          :total="total"
          style="margin-top:18px;margin-bottom:18px;text-align: center;"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import mamSearchOrg from '@/components/mamSearchOrg'
import mamComSearch from '@/components/mamComSearch'
import getMysqoDate from '@/utils/dateY'
import moment from 'moment'
export default {
  name: 'Etst',
  components: { mamSearchOrg, mamComSearch },
  filters: {
    timeFi(s) {
      return moment(s[0]).format(s[1])
    }
  },
  data() {
    return {
      orderFiled:"",
      comList:"",
      order:"",
      pir: '',
      where:0,
      flexHeight: 'auto',
      centers: 'center',
      callData: [],
      muitSelectAttr: [],
      defHeight: '0',
      tableData: [
        {
          date: '2016-05-02',
          name: '王红袜队小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小随便吧虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小时代的虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎阿斯顿',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      test: 'onlyTable',
      listLoading: true,
      data: [],
      resize: false,
      pageSize: 10,
      total: 0,
      condition: [],
      switchMa: 'varchar',
      checked: [],
      operation: {
        look:false,
        add: false,
        delete: false,
        export: false
      },
      options: [
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        }
      ]
    }
  },

  mounted() {
    if(window.location.href.indexOf('/#/card')>0){
      document.getElementsByClassName("sidebar-container")[0].style.display="none";
      document.getElementsByClassName("hamburger-container")[0].style.display="none";
      document.getElementsByClassName("main-container")[0].style.marginLeft="0px";
    }else{
      document.getElementsByClassName("sidebar-container")[0].style.display="";
      document.getElementsByClassName("main-container")[0].removeAttribute('style');
      document.getElementsByClassName("hamburger-container")[0].removeAttribute('style');
    }
    this.getInfo()
    // this.temporary()
    setTimeout(() => {
    }, 8000);
  },
  watch: {
    condition(){
    },
    callData(){
    },
    checked(){
    },
  },
  methods: {
    handleCurrentChangeTable(now){
        console.log(now)
    },
    // temporary(){
    //   this.$axios.post('http://test-integrate.mamcharge.com/api/web/dict/page?pageNum=1&pageSize=10').then( s=> {
    //     })
    // },
    after(s){
      this.comList = ""
      this.condition.forEach(element => {
          this.comList += `&${element._s.name}=${element.value}`
      });
      window.open(`${window.DPWebAPIUrl}/web/form/common/data/exportRecord?tableId=${this.$route.query.id}&productCode=${window.sessionStorage.getItem("productCode")}${this.comList}&orderFiled=${this.orderFiled}&order=${this.order}`)
    },
    changeSort(s){
      this.orderFiled = this.checked.filter( all => all._s.columnComment == s.column.label)[0]._s.name
      if(s.order == 'ascending'){
        // 上
        this.order = 'asc'
      }else{
        // 下
        this.order = 'dsc'
      }
    },
    view(){
      if (this.muitSelectAttr.length == 0) {
        this.$message({
          message: '请选择一条数据！',
          type: 'warning'
        })
        return false
      }
      if (this.muitSelectAttr.length >1) {
        this.$message({
          message: '只能选中一条数据！',
          type: 'warning'
        })
        return false
      }
      if(this.where == 1){
        //查看结果详情
        this.$router.push({ path: '/details', query: { tableId: this.$route.query.id,id:this.muitSelectAttr[0].id }})
      }
    },
    openCondition() {
      this.flexHeight != 'auto'
        ? (this.flexHeight = 'auto')
        : (this.flexHeight = '100px')
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.getTable()
    },
    handleCurrentChange(page) {
      this.getTable(page)
    },
    // currentPage4() {},
    getTable(page = 1) {
      this.listLoading = true
      var id = this.$route.query.id
      console.log(this.condition)
      this.$axios
        .post(
          `${window.DPWebAPIUrl}/web/form/common/data/datagrid?pageNum=${page}&pageSize=${
            this.pageSize
          }&${(ins => {
            let parms = ''
            ins = ins.map(s => {
              var change = ''
              s._s.dbType == 'datetime' && s.value != undefined
                ? (change = {
                  value: [getMysqoDate(s.value[0]), getMysqoDate(s.value[1])],
                  _s: {
                    ...s._s
                  }
                })
                : (change = {
                  ...s
                })

              return change
            })
            for (const i of ins) {
              i.value != '' && i.value != undefined
                ? i._s.queryModel == 'single'
                  ? (parms += `${i._s.name}=${i.value}&`)
                  : i.value[0] != '' &&
                    i.value[0] != 'NaN-NaN-NaN' &&
                    i.value[0] != undefined
                    ? (parms += `${i._s.name}_begin=${i.value[0]}&${
                      i._s.name
                    }_end=${i.value[1]}&`)
                    : ''
                : ''
            }
            return parms
          })(this.condition)}productCode=${window.sessionStorage.getItem("productCode")}`,
          {
            tableId: id
          }
        )
        .then(response => {
          this.listLoading = false
          this.data = response.data.data.list
          this.total = response.data.data.totalRecord
        })
        .catch(error => {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        })
    },
    formatter(row, column) {
      return row.address
    },
    reset() {
      for (const i in this.callData) {
        this.condition[i].value = this.callData[i].value
      }
    },
    getInfo() {
      this.checked = []
      var id = this.$route.query.id
      this.condition=[];
      this.$axios
        .post(`${window.DPWebAPIUrl}/design/list/get`, {
          tableId: id
        })
        .then(response => {
          this.where = response.data.data.customize
          if (response.data.data == null || response.data.data == '') return
          const call = JSON.parse(response.data.data.listStyleDetail)
          this.operation = call.operation
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
          var indexOFs = 0
          var label = {}
          for (const s in call.table) {
            if(!call.table[s].hidden){
              label[call.table[s].columnComment] = ++indexOFs
            }
            if(call.table[s].helpBoxConvertName && call.table[s].helpBoxJoinTable && call.table[s].helpBoxType == 6){
              // 需要翻译
              this.$axios.post(call.table[s].helpBoxJoinTable).then(callInfo => {
                let proto = {}
                callInfo.data.data.forEach( element => {
                  proto[element.id] = element[call.table[s].helpBoxConvertName]
                })
                 call.table[s].queried
              ? this.condition.splice(label[call.table[s].columnComment],0,{
                value: call.table[s].defaultContent,
                _s: {
                  proto,
                  ...call.table[s],
                  selectIs: call.table[s].helpBoxConvertName && call.table[s].helpBoxJoinTable && call.table[s].helpBoxType == 6 ? true : false
                }
              })
              : ''
            // 默认留存
            call.table[s].queried
              ? this.callData.splice(label[call.table[s].columnComment],0,{
                value: call.table[s].defaultContent,
                _s: {
                  proto,
                  ...call.table[s],
                  selectIs: call.table[s].helpBoxConvertName && call.table[s].helpBoxJoinTable && call.table[s].helpBoxType == 6 ? true : false

                }
              })
              : ''
            call.table[s].hidden == false
              ? this.checked.splice(label[call.table[s].columnComment],0,{
                value: '',
                _s: {
                  proto,
                  ...call.table[s],
                  selectIs: call.table[s].helpBoxConvertName && call.table[s].helpBoxJoinTable && call.table[s].helpBoxType == 6 ? true : false

                }
              })
              : ''
              })

            }else{
              // 无需翻译
               call.table[s].queried
              ? this.condition.push({
                value: call.table[s].defaultContent,
                _s: {
                  ...call.table[s],
                  selectIs: call.table[s].helpBoxConvertName && call.table[s].helpBoxJoinTable && call.table[s].helpBoxType == 6 ? true : false
                }
              })
              : ''
            // 默认留存
            call.table[s].queried
              ? this.callData.push({
                value: call.table[s].defaultContent,
                _s: {
                  ...call.table[s],
                  selectIs: call.table[s].helpBoxConvertName && call.table[s].helpBoxJoinTable && call.table[s].helpBoxType == 6 ? true : false

                }
              })
              : ''
            call.table[s].hidden == false
              ? this.checked.push({
                value: '',
                _s: {
                  ...call.table[s],
                  selectIs: call.table[s].helpBoxConvertName && call.table[s].helpBoxJoinTable && call.table[s].helpBoxType == 6 ? true : false

                }
              })
              : ''
            }

          }
          setTimeout(() => {
            this.defHeight = document
              .getElementsByClassName('app-main')[0]
              .getElementsByClassName('mam-search')[0].offsetHeight
            if (this.defHeight == 100 || this.defHeight > 100) {
              this.flexHeight = '100px'
            } else {
              this.flexHeight = 'auto'
            }
          }, 300)
        })
        .catch(error => {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        })
      this.$axios
        .post(
           `${window.DPWebAPIUrl}/web/form/common/data/datagrid?pageNum=1&pageSize=${
            this.pageSize
          }&productCode=${window.sessionStorage.getItem("productCode")}`,
          {
            tableId: id
          }
        )
        .then(response => {
          this.listLoading = false
          this.data = response.data.data.list
          this.total = response.data.data.totalRecord
        })
        .catch(error => {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        })
    },
    add() {
      var id = this.$route.query.id
      this.$router.push({ path: '/editcomponentInfo', query: { tableId: id,productCode:this.$route.query.productCode }})
    },
    edit() {
      var tableId = this.$route.query.id
      if (this.muitSelectAttr.length == 0) {
        this.$message({
          message: '请选择一条数据！',
          type: 'warning'
        })
        return false
      }
      if (this.muitSelectAttr.length >1) {
        this.$message({
          message: '只能选中一条数据！',
          type: 'warning'
        })
        return false
      }
      this.$router.push({ path: '/editcomponentInfo', query: { id: this.muitSelectAttr[0].id, tableId: tableId }})
    },
    del() {
      // debugger
      var _this = this
      var tableId = this.$route.query.id
      if (this.muitSelectAttr.length == 0) {
        this.$message({
          message: '请选择一条数据！',
          type: 'warning'
        })
        return false
      }
       this.$confirm('是否删除数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
        .post(
          `${window.DPWebAPIUrl}/web/form/common/data/deleteRecord`,
          {
            tableId: tableId,
            id: this.muitSelectAttr[0].id
          }
        )
        .then(response => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          _this.getInfo()
        })
        .catch(error => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
        }).catch(() => {

        });
    },
    selectionFunc(val) {
        this.muitSelectAttr = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box-card {
  box-shadow: 0px 1px 8px 0px rgba(160, 160, 160, 0.4);
  margin-top: 5px;
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
.mam-search {
  position: relative;
  overflow: hidden;

  .mam-condtion {
    float: left;
    // width: 24%;
    // width: 32%;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
.mam-table-content {
  overflow: hidden;
  width: 100%;
  margin: auto;
  .mam-btn {
    margin-bottom: 10px;
    overflow: hidden;
  }
}
.mam-poy {
  overflow: hidden;
  margin-bottom: 10px;
  float: left;
}
.mam-boxs-button {
  float: left;
  margin-right: 12px;
}
</style>
