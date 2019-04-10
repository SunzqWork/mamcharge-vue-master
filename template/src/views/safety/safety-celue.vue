<template>
  <div id="safetyCelue">
    <zl-card>
      <el-input class="zl-form-control zl-input-240px" placeholder="关键字查询"></el-input>
      <el-button class="btn-theme" >查询</el-button>
    </zl-card>

    <zl-card>
      <el-row class="mb10">
        <el-button class="btn-theme"  @click="addVisible = true">新增</el-button>
        <el-button class="btn-default"  @click="delBtn">删除</el-button>
      </el-row>

      <el-table class="zl-table" :data="tableData" @selection-change="getDelList" stripe>
        <el-table-column type="selection" align="center" header-align="center"></el-table-column>
        <el-table-column label="IP网段" align="left" header-align="left" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <p>{{scope.row.startIp + '-' + scope.row.endIp}}</p>
          </template>
        </el-table-column>
        <el-table-column label="网段说明" prop="remark" align="left" header-align="left" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="创建人" prop="createBy" align="left" header-align="left" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" align="left" header-align="left" :show-overflow-tooltip="true"></el-table-column>
      </el-table>

      <el-pagination
        background
        class="zl-pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="params.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </zl-card>

    <el-dialog
      title="新增网段策略"
      :visible.sync="addVisible"
      width="600px"
      @closed="handleClose"
      >
      <el-form style="width: 500px;margin: 0 auto" ref="addForm" :model="addForm" label-width="110px">
        <el-form-item label="起始IP地址">
          <el-input class="zl-form-control width-70px" v-model="startIp1" :maxlength="3"></el-input>·
          <el-input class="zl-form-control width-70px" v-model="startIp2" :maxlength="3"></el-input>·
          <el-input class="zl-form-control width-70px" v-model="startIp3" :maxlength="3"></el-input>·
          <el-input class="zl-form-control width-70px" v-model="startIp4" :maxlength="3"></el-input>
        </el-form-item>
        <el-form-item label="截止IP地址" prop="username">
          <el-input class="zl-form-control width-70px" v-model="endIp1" :maxlength="3"></el-input>·
          <el-input class="zl-form-control width-70px" v-model="endIp2" :maxlength="3"></el-input>·
          <el-input class="zl-form-control width-70px" v-model="endIp3" :maxlength="3"></el-input>·
          <el-input class="zl-form-control width-70px" v-model="endIp4" :maxlength="3"></el-input>
        </el-form-item>
        <el-form-item label="网段说明" prop="remark">
          <el-input style="width: 300px" class="zl-form-control" placeholder="请输入网段说明" v-model="addForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center;">
        <el-button class="btn-theme" @click="save">确 定</el-button>
        <el-button class="btn-default" @click="addVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="删除"
      :visible.sync="delVisible"
      width="550px"
      center>
      <p>是否删除这些数据？</p>
      <div slot="footer" style="text-align: center;">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="del">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getIPList, saveIP, delIP } from '@/api/safety'
export default {
  name: 'safetyCelue',
  data() {
    return {
      tableData: [],
      params: {
        size: 10,
        page: 1
      },
      addVisible: false,
      addForm: {
        startIp: '',
        endIp: '',
        remark: ''
      },
      startIp1: '',
      startIp2: '',
      startIp3: '',
      startIp4: '',
      endIp1: '',
      endIp2: '',
      endIp3: '',
      endIp4: '',
      total: 0,
      delVisible: false,
      delList: []
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.params.page = page
      this.getData()
    },
    handleSizeChange(size) {
      this.params.size = size
      this.getData()
    },
    handleClose() {
      this.startIp1 = ''
      this.startIp2 = ''
      this.startIp3 = ''
      this.startIp4 = ''
      this.endIp1 = ''
      this.endIp2 = ''
      this.endIp3 = ''
      this.endIp4 = ''
    },
    getDelList(val) {
      this.delList = []
      val.forEach(item => {
        this.delList.push(item.id)
      })
    },
    delBtn() {
      if (this.delList.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择要删除的数据'
        })
        return false
      }

      const strHtml = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除数据, 是否继续</span>
        </p>
      `
      this.$confirm(strHtml, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.del()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });        
      })
    },
    del() {
      delIP(this.delList).then(res => {
        if(res.errcode === 0) {
          this.$message.success('删除成功')
          this.delVisible = false
          this.getData()
        } else {
          this.$message.error(res.errmsg)
        }
      })
    },
    getData() {
      getIPList().then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    save() {
      if(this.startIp1.length === 0 || this.startIp2.length === 0 || this.startIp3.length === 0 || this.startIp4.length === 0) {
        this.$message.error('请输入起始IP')
      } else if(this.endIp1.length === 0 || this.endIp2.length === 0 || this.endIp3.length === 0 || this.endIp4.length === 0) {
        this.$message.error('请输入截止IP')
      } else {
        this.addForm.startIp = this.startIp1 + '.' + this.startIp2 + '.' + this.startIp3 + '.' + this.startIp4
        this.addForm.endIp = this.endIp1 + '.' + this.endIp2 + '.' + this.endIp3 + '.' + this.endIp4
        saveIP(this.addForm).then(res => {
          if(res.errcode === 0) {
            this.$message.success('确定成功')
            this.addVisible = false
            this.getData()
          } else {
            this.$message.error(res.errmsg)
          }
        })
      }
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
<style lang="scss">
  .width-70px{
    width: 70px;
  }
</style>
