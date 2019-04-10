<template>
  <div id="job-data">
    <el-tabs v-model="activeName" @tab-click="tabClick" type="border-card" class="zl-height-450" style="overflow:hidden">
      <el-tab-pane  v-for="(item, index) in dimensionList" :key="index" :name="item.code" :label="item.name" v-if="item.status === 1">
        <div style="overflow:hidden;margin-bottom:10px;">
          <el-row class="mb10 clearfix " style="float:left;margin-bottom: 0px!important;" v-show="item.tree">
          <el-button class="btn-theme" @click="expandAll = true">全部展开</el-button>
          <el-button class="btn-default" @click="expandAll = false">全部折叠</el-button>
          
          <!-- <div class="fr">
            <el-input class="zl-form-control zl-input-240px" placeholder="请输入关键字"></el-input>
            <el-button class="btn-theme" >查询</el-button>
          </div> -->
        </el-row>
        <div class="fr">
            <el-input class="zl-form-control zl-input-240px" :placeholder="`搜索${item.name}`" @change="reapl" v-model="sysParams.name" @keyup.enter.native="queryData"></el-input>
            <el-button class="btn-theme" @click="tabClick(labelIns,'tax')" >查询</el-button>
          </div>
        </div>
        <el-scrollbar wrapClass="scrollbar-wrapper" class="zl-height-450">
          <p v-if="tableTree == 'no'" style="text-align: center;line-height: 80px;color:#dcdcdc;">暂无数据</p>
          <div v-else>
              <check-table-tree
              :association="false"
              v-if="item.tree"
              :data="tableTree" 
              :columns="columns" 
              :isCheckList="item.zlvalue"
              :expandAll="expandAll"
              @get-node="getNode"
              >
            </check-table-tree>
            <el-table :data="tableData" v-else border stripe @selection-change="selectionChange" :ref="'table' + item.code" class="zl-table">
              <el-table-column type="selection" header-align="center" align="center"></el-table-column>
              <el-table-column v-for="(val, index) in JSON.parse(item.extra)" :key="index" :label="val.label" :prop="val.prop"></el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
/**
 * @emit-parent 通知父组件
 */
import CheckTableTree from '@/components/app/CheckTableTree/index'
import { addJobApi, getJobPermisson, changeApi, getJobPermissonBase } from '@/api/job'
import { getDimensionList } from '@/api/dimension'

export default {
  name: 'job-data',
  components: { CheckTableTree },
  props: {
    mark: { // 标识 false：记住设置 true：“去设置”， “设置” 高级设置
      type: Boolean,
      default: false
    },
    menuId: {
      type: String,
      default: ''
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      sysParams: { name: '' },
      tableTree: {},
      tableData: [],
      columns: [],
      labelIns:{
        label:""
      },
      activeName: '',
      expandAll: true,
      isCheckList: [],
      dimensionList: []
    }
  },
  computed: {
    jobId(){
      return this.$store.state.job.jobid
    },
    jobStatus() {
      return this.$store.state.job.jobStatus
    }
  },
  watch: {
    jobStatus() {
      if (this.jobStatus === '2') {
        this.$store.dispatch('action_set_job_status', '')
        this.saveOrgData()
      }
    }
  },
  methods: {
    reapl(){
      this.sysParams.name = this.sysParams.name.replace(/\s+/g,"")
    },
    // 获取维度数据
    getDimensionList() {
      return new Promise((resolve, reject) => {
        getDimensionList().then(res => {
          if (res.success) {
            this.$nextTick(() => {
              this.dimensionList = res.data.map(item => {
                item.zlvalue = []
                return item
              })
              this.activeName = res.data[0].code
              this.tabClick({ label: res.data[0].name })
              resolve(true)
            })
          } else {
            this.$message.error(res.errmsg)
            resolve(false)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },

    tabClick(row,tax) {
        this.labelIns.label = row.label;
      if(tax === 'tax'){
        var label = this.labelIns.label;
      }else{
        var label = row.label;
        this.sysParams.name = "";
      }
      const obj = this.dimensionList.filter(val => {
        return label === val.name
      })[0]
      const api = obj.api

      const columns = JSON.parse(obj.extra).map((val, index) => {
        return {
          value: val.prop,
          text: val.label,
          check: index === 0 ? obj.tree : false
        }
      })

      this.columns = columns
      changeApi(api,{
        keyWord:this.sysParams.name
      }).then(res => {
        if (res.success) {
          if (obj.tree) {
            res.data.parent = null
            this.tableTree = res.data
          } else {
            const list = JSON.parse(JSON.stringify(this.dimensionList))
            this.tableData = res.data
            this.$nextTick(() => {
              list.forEach(val => {
                if (Number(this.activeName) === Number(val.code)) {
                  const value = val.zlvalue
                  res.data.forEach((s, index) => {
                    if (value.includes(s.id)) {
                      this.$refs[`table${val.code}`][0].toggleRowSelection(s)
                    }
                  })
                }
              })  
            })
            
          }
          
        } else {
          if(res.errcode == 4040){
              res.data = 'no'
            this.tableTree = res.data
            }else{
            this.$message.error(res.errmsg)
            }
        }
      }).catch(err => {
        this.tableTree = {}
        this.tableData = []
      })
    },
    
    cancel() {
      this.$emit('emit-parent', false)
    },

    cancelOrg() {
      this.$emit('emit-parent', false)
    },

    getNode(data) {
      let ids = []
      data.forEach(item => {
        if (item.check || item.indeterminate) {
          ids.push(item.id)
        }
      })
      
      this.dimensionList.forEach(val => {
        if (Number(val.code) === Number(this.activeName)) {
          val.zlvalue = ids
        }
      })
    },

    selectionChange(rows) {
      this.dimensionList.forEach(val => {
        if (Number(this.activeName) === Number(val.code)) {
          val.zlvalue = rows.map(item => item.id)
        }
      })
    },

    // 确定数据权限
    saveOrgData() {
      // 基础设置
        let sysPostFields = []
        this.dimensionList.forEach(val => {
          sysPostFields.push({
            menuId: this.menuId || '', // 功能id 高级数据权限
            fieldType: Number(val.code),
            fieldValue: val.zlvalue.join(','),
            allMenu: this.mark ? false : null
          })
        })

        const params = {
          senior: this.mark, // 是否高级
          postId: this.jobId, // 岗位id
          sysPostFields: sysPostFields,
        }
        if (this.mark) {
          this.$emit('is-mark-submit', params, this.menuId)
        } else {
          addJobApi(params).then(res => {
            if (res.success) {
              this.$message.success('岗位数据权限设置成功')
              this.$emit('emit-parent', false)
            } else {
              this.$message.error(res.errmsg)
            }
          }).catch(err => {
          })
        }
        
    },

    // 查看岗位数据权限---基础设置
    getJobPermisson() {
      if (this.mark) {
        return false
      } 
      getJobPermissonBase(this.jobId).then(res => {
        if (res.success) {
          this.dimensionList.forEach(val => {
            res.data.forEach(item => {
              if (Number(val.code) === Number(item.fieldType) && !item.senior) {
                val.zlvalue = item.fieldValue.split(',')
              }
            })
          })
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      })
    },

    // 查看菜单的数据权限 --- 高级设置
    getMenuDataPermission() {
      if (this.mark) {
        getJobPermisson(this.jobId, this.menuId).then(res => {
          if (res.success) {
            this.dimensionList.forEach(val => {
              res.data.forEach(item => {
                if (Number(val.code) === Number(item.fieldType) && item.senior) {
                  val.zlvalue = item.fieldValue.split(',')
                }
              })
            })
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(err => {
        })
      }
    }
  },
  mounted() {
    this.getDimensionList().then(res => {
      if (res) {
        this.getJobPermisson()
        this.getMenuDataPermission()
      }
    }).catch(err => {
    })
  }
}
</script>
<style lang="scss">
#job-data{

}
</style>

