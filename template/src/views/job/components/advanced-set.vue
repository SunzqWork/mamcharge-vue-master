<template>
  <div id="advanced-set">
    <el-row class="mb10 clearfix">
      <el-button class="btn-theme" @click="expandAll = true">全部展开</el-button>
      <el-button class="btn-default" @click="expandAll = false">全部折叠</el-button>
      <div class="fr">
        <el-input class="zl-form-control zl-input-240px" placeholder="模块，菜单" @change="reapl" v-model="sysParams.name" @keyup.enter.native="queryData"></el-input>
        <el-button class="btn-theme"  @click="queryData">查询</el-button>
      </div>
    </el-row>
    <!-- 高级设置 -->
    <el-scrollbar wrapClass="scrollbar-wrapper" class="zl-height-450" >
      <check-table-tree 
        :data="tableTree" 
        :columns="columns" 
        border
        :expandAll="expandAll"
        @get-node="getNode">
        <el-table-column :header-align="'center'" label="数据范围" width="180"> 
          <template slot-scope="scope">
            <span v-show="scope.row.hasDataField" class="icon-theme" @click="setPermission(scope.row, true)">查看数据范围</span>
            <div v-show="!scope.row.hasDataField">
              <span>无数据范围</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column :header-align="'center'" label="是否关联下级" width="140">
          <template slot-scope="scope">
            <el-radio-group 
              v-model="scope.row.allMenu" 
              @change="changeRadio(scope.row.id)"
              v-show="scope.row.sysId && scope.row.children && scope.row.children.length > 0">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column :header-align="'center'" label="操作">
          <template slot-scope="scope">
            <div style="width: 70px;float: none;margin: auto;">
              <span class="icon-theme" @click="setPermission(scope.row)">设置</span>
              <i class="zl-icon-line"></i>
              <span class="icon-theme" @click="clearData(scope.row)">清空</span>
            </div>
          </template>
        </el-table-column>
      </check-table-tree>
    </el-scrollbar>
    <el-dialog
      title="高级数据权限设置"
      :visible.sync="dialogVisible"
      width="850px"
      v-if="dialogVisible"
      >
      <jobData 
        @emit-parent="dialogVisible = false" 
        :mark="mark" 
        :menuId="menuId"
        @is-mark-submit="isMarkSubmit" />

      <div slot="footer" style="text-align: center;">
        <el-button class="btn-theme" @click="$store.dispatch('action_set_job_status', '2')" :disabled="isDisabled">确定</el-button>
        <el-button class="btn-default" @click="dialogVisible = false" :disabled="isDisabled">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CheckTableTree from '@/components/app/CheckTableTree/index'
import jobData from './job-data'
import { GroupBySys } from '@/api/premission'
import { addJobApi } from '@/api/job'

export default {
  name: 'advanced-set',
  components: { CheckTableTree, jobData },
  data() {
    return {
      columns: [
        {
          value: 'name',
          text: '功能项名称',
          width: 350
        }
      ],
      tableTree: {},
      expandAll: true,
      radio: 1,
      dialogVisible: false,
      menuId: '',
      mark: true,
      sysParams: { name: '' }
    }
  },
  computed: {
    jobId(){
      return this.$store.state.job.jobid
    }
  },
  methods: {
    reapl(){
this.sysParams.name = this.sysParams.name.replace(/\s+/g,"")
    },
    // 清空
    clearData(row) {
      const str = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>是否要进行清空操作？</span>
        </p>
      `
      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
      }).then(() => {
        let fileds = []
        
        if (row.allMenu) {
          const loop = (tree) => {
            if (tree.children && tree.children.length > 0) {
              tree.children.forEach(val => {
                fileds.push({ menuId: val.id })
                loop(val)
              })
            }
          }
          fileds.push({ menuId: row.id })
          loop(row)
        } else {
          fileds.push({ menuId: row.id })
        }

        const params = {
          postId: this.jobId,
          senior: true,
          delete: true,
          sysPostFields: fileds
        }

        addJobApi(params).then(res => {
          if (res.success) {
            this.$message.success('清除成功')
            this.dialogVisible = false
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
        });        
      })
    },

    changeRadio(id) {
      let s = {}
      let allMenu = false
      const loop = (tree) => {
        if (tree.children && tree.children.length > 0) {
          tree.children.forEach(val => {
            if (val.id === id) {
              s = val
              allMenu = val.allMenu
            }
            loop(val)
          })
        }
      }

      this.tableTree.forEach(val => {
        loop(val)
      })

      const loop2 = (tree) => {
        if (tree.children && tree.children.length > 0) {
          tree.children.forEach(val => {
            val.allMenu = allMenu
            loop2(val)
          })
        }
      }
      
      if (allMenu) {
        loop2(s)
      }
    },
    // 维度那边过来的数据
    isMarkSubmit(data, menuId) {
      let allMenu
      let child = []
      const loop = (tree) => {
        if (tree.children && tree.children.length > 0) {
          for (let i = 0; i < tree.children.length; i++) {
            if (menuId === tree.children[i].id) {
              allMenu = tree.children[i].allMenu
              child = tree.children[i].children
              return false
            }

            loop(tree.children[i])
          }
        }
      }

      this.tableTree.forEach(val => {
        if (menuId === val.id) {
          allMenu = val.allMenu
          child = val.children
        }
        loop(val)
      })


      if (allMenu) {

        let ids = []
        // 关联所有子孙
        const getChild = (tree) => {
          if (tree.children && tree.children.length > 0) {
            tree.children.forEach(val => {
              ids.push(val.id)
              getChild(val)
            })
          }
        }

        if (child instanceof Array) {
          child.forEach(val => {
            ids.push(val.id)
            getChild(val) 
          }) 
        }    

        let s = []
        data.sysPostFields.forEach(val => {
          val.allMenu = true
          ids.forEach(item => {
            s.push({
              menuId: item,
              fieldType: val.fieldType,
              fieldValue: val.fieldValue,
              allMenu: true
            })
          })
        })
        data.sysPostFields = data.sysPostFields.concat(s)
      }

      addJobApi(data).then(res => {
        if (res.success) {
          this.$message.success('高级数据权限设置成功')
          this.dialogVisible = false
          this.GroupBySys()
          // this.$emit('emit-parent')
        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      })
    },
    setPermission(row, flag) {
      this.isDisabled = flag
      this.menuId = row.id
      this.dialogVisible = true
    },
    getNode(data) {
    },
    queryData() {
      this.GroupBySys()
    },
    GroupBySys() {
      this.sysParams.postId = this.jobId
      GroupBySys(this.sysParams).then(res => {
        if (res.success) {
          const arr = res.data.map(item => {
            item.children = item.menus
            return item
          })
          const loop = (tree) => {
            if (tree.children && tree.children.length > 0) {
              tree.children.forEach(val => {
                if (val.type === 1) {
                  val.children = null
                }

                loop(val)
              })
            }
          }

          res.data.forEach(val => {
            loop(val)
          })

          this.tableTree = arr

        } else {
          this.$message.error(res.errmsg)
        }
      }).catch(err => {
      })
    }
  },
  mounted() {
    this.GroupBySys()
  }
}
</script>
<style lang="scss">
#advanced-set{}
</style>


