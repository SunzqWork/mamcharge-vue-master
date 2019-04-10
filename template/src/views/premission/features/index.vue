<template>
  <div id="features">
    <zl-card>
      <el-select placeholder="系统应用" v-model="params.sysId" class="zl-form-control zl-input-240px" clearable>
        <el-option v-for="(val, index) in subAppList" :key="index" :label="val.name" :value="val.id"></el-option>
      </el-select>
      <el-input placeholder="模块，菜单，按钮" @change="reapl" v-model.trim="params.name" class="zl-form-control zl-input-240px"></el-input>
      <el-button class="btn-theme"  @click="queryData">查询</el-button>
    </zl-card>

    <zl-card>
      <el-row class="mb10">
        <el-button class="btn-theme" @click="isShowDir = true" v-if="btnPermission('addBtnFeatures')">新增</el-button>
        <el-button  class="btn-default" @click="editApp(false, '编辑')" v-if="btnPermission('updateFeatures')">编辑</el-button>
        <!-- <el-button  class="btn-default" @click="editApp(true, '查看')" v-if="btnPermission('lookFeatures')">查看</el-button> -->
        <el-button  class="btn-default" @click="deleteApp" v-if="btnPermission('deleteFeatures')">删除</el-button>
      </el-row>
      <el-scrollbar wrapClass="scrollbar-wrapper">
        <CheckTableTree 
          :columns="columns" 
          :data="sysList"
          @current-row="handleCurrentChange"
          class="card-table">
          <el-table-column header-align="center" align="center" label="是否显示">
            <template slot-scope="scope">
              <div>
                {{ !scope.row.hidden ? '显示' : '隐藏'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="类型">
            <template slot-scope="scope">
              <div>
                {{ scope.row.type | typeFilter }}
              </div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" label="显示顺序" align="right" prop="seq"></el-table-column>
          <el-table-column header-align="center" label="创建人" prop="createUser"></el-table-column>
          <el-table-column header-align="center" align="center" label="创建时间" prop="createTime" width="180"></el-table-column>
          <!-- <el-table-column header-align="center" label="修改人" prop="updateUser"></el-table-column> -->
          <el-table-column header-align="center" align="center" label="修改时间" prop="updateTime" width="180"></el-table-column>
        </CheckTableTree>
      </el-scrollbar>
    </zl-card>

    <!-- 新增 -->
    <featuresDialog 
      :isShow.sync="isShowDir" 
      title="新增" 
      :isType="0" 
      @is-submit="addSystem" 
      v-if="isShowDir"/>

    <!-- 编辑 -->
    <featuresDialog 
      :isShow.sync="isShowDirEdit" 
      :data="info" 
      :title="title" 
      :isType="0" 
      :isDisabled="isDisabled"
      @is-submit="editSystem" 
      v-if="isShowDirEdit"/>

  </div>
</template>

<script>
import CheckTableTree from '@/components/app/CheckTableTree/index'
import featuresDialog from './features-dialog'
import { GroupBySys, addSystem, systemId, editSystem, delSystem, functionList } from '@/api/premission'

export default {
  name: 'features',
  components: { CheckTableTree, featuresDialog },
  data() {
    return {
      params: {
        sysId: null,
        name: null
      },
      columns: [
        {
          text: '名称',
          value: 'name',
          width: 250
        }
      ],
      sysList: [],
      isShowDir: false,
      isShowMenu: false,
      ids:[],
      isShowPage: false,
      isShowBtn: false,
      locks:false,
      isShowDirEdit: false,
      isShowMenuEdit: false,
      isShowPageEdit: false,
      isShowBtnEdit: false,
      info: {},
      subAppList: [],
      isDisabled: false,
      title: '编辑'
    }
  },
  filters: {
    typeFilter(type) {
      let str
      if (type === 0) {
        str = '模块'
      } else if (type === 1) {
        str = '菜单'
      } else if (type === 2) {
        str = '按钮'
      } else if (type === 3) {
        str = '按钮'
      } else {
        str = '应用'
      }

      return str
    }
  },
  methods: {
    reapl(){
      this.params.name = this.params.name.replace(/\s+/g,"")
    },
    handleCurrentChange(row) {
      this.ids = [row]
      if(row == undefined) {

      }else{
        if(row.children == undefined || row.children == [] ){
          this.locks = false;
        }else{
          this.locks = true;
        }
      }
      this.edit(row)
    },
    editApp(flag, title) {
      if(this.ids.length == 0){
        return this.$message({
            type: 'warning',
            message: '请选择要编辑的数据'
          })
      }
      if (this.info.id) {
        this.title = title
        this.isShowDirEdit = true
        this.isDisabled = flag
      } else {
        if (flag) {
          this.$message({
            type: 'warning',
            message: '请选择要查看的数据'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请选择要编辑的数据'
          })
        }
      }
    },
    deleteApp() {
      if(this.ids.length == 0){
        this.$message({
            type: 'error',
            message: '请选择要删除的数据'
          })
      }
      if(this.locks) return this.$message({
          type: 'warning',
          message: '该功能已被子功能引用无法删除'
        })
      if (this.info) {
        this.delSystem(this.ids[0].id)
      } else {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据'
        })
      }
    },
    getSubAppList() {
      GroupBySys().then(res => {
        if (res.success) {
          this.subAppList = res.data
        } else {
          this.$message.error('获取子系统数据失败，请联系管理员。')
        }
      }).catch(err => {
      })
    },
    queryData() {
      this.GroupBySys()
    },
    GroupBySys() {
      if (this.params.sysId === '') {
        this.params.sysId = null
      }

      if (this.params.name === '') {
        this.params.name = null
      }

      GroupBySys(this.params).then(res => {
        if (res.success) {
          this.sysList = res.data.map(item => {
            item.children = item.menus
            return item
          })

          this.$nextTick(() => {
          })
        } else {
          this.$message.error('获取子系统数据失败，请联系管理员。')
        }
      }).catch(err => {
      })
    },
    edit(row) {
      if (!row) {
        return false
      }

      if (type === null) {
        // this.$message({
        //   type: 'warning',
        //   message: '应用不支持编辑查看，请到应用管理进行操作。'
        // })
        return false
      }
      const id = row.id
      const type = row.type
      systemId(id).then(res => {
        if (res.success) {
          res.data.pids = res.data.pids.split(',')
          this.info = res.data
        } else {
          if (res.errcode === 4040) {
            // this.$message({
            //   type: 'warning',
            //   message: '应用不支持编辑查看，请到应用管理进行操作。'
            // })
          } else {
            this.$message.error('获取详情信息失败，请联系管理员。')
          }
        }
      }).catch(err => {
      })
    },

    // 修改
    editSystem(formModel, isCopy) {
      const data = JSON.parse(JSON.stringify(formModel))
      if (isCopy) {
        const s = {
          seq: null,
          pids: [],
          perm: '',
          name: '',
          icon: '',
          url: '',
          extra: '',
          tips: '',
          type: null,
          hidden: false,
          status: 1
        }
        Object.keys(s).forEach(key => {
          s[key] = data[key]
        })
        this.addSystem(s)
      } else {
        data.sysId = data.pids[0]
        data.pid = data.pids[data.pids.length - 1]
        data.pids = null
        const type = data.type
        editSystem(data.id, data).then(res => {
          if (res.success) {
            let tips
            if (data.type === 0) {
              tips = '模块'
            } else if (data.type === 1) {
              tips = '菜单'
            } else {
              tips = '按钮'
            }
            this.$message.success(`${tips}修改成功`)
            this.isShowDirEdit = false
            this.GroupBySys()
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(err => {
      })
      }
      
    },
    // 新增
    addSystem(dataCopy) {
      const data = JSON.parse(JSON.stringify(dataCopy))
      data.sysId = data.pids[0]
      data.pid = data.pids[data.pids.length - 1]
      data.pids = null
      addSystem(data).then(res => {
        if (res.success) {
          let tips
          if (data.type === 0) {
            tips = '模块'
          } else if (data.type === 1) {
            tips = '菜单'
          } else {
            tips = '按钮'
          }
          this.isShowDir = false
          this.isShowDirEdit = false
          this.$message.success(`${tips}新增成功`)
          this.getSubAppList()
          this.GroupBySys()
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      })
    },

    // 删除
    delSystem(id) {
      const str = `
        <p style="text-align:center;">
          <i class="el-icon-warning" style="color:#299ee4;font-size:22px;vertical-align:middle;"></i>
          <span style="padding-left:10px;font-size:16px;vertical-align:middle;">此操作将永久删除, 是否继续?</span>
        </p>
      `
      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        delSystem(id).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            this.GroupBySys()
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(err => {
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })    
      })
    }
  },
  mounted() {
    this.GroupBySys()
    this.getSubAppList()
  }
}
</script>

<style lang="scss">
#features{}
</style>


