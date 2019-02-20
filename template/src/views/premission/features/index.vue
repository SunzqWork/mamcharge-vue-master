<template>
  <div id="features">
    <zl-card>
      <el-select class="zl-form-control zl-input-220px" placeholder="系统应用" v-model="sysId" clearable>
        <el-option 
          v-for="item in funcData"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          ></el-option>
      </el-select>
      <el-input class="zl-form-control zl-input-220px" placeholder="搜索名称" suffix-icon="el-icon-search" v-model="searchName"></el-input>
      <el-button class="btn-theme" @click="search" icon="el-icon-search">查询</el-button>
    </zl-card>
    <zl-card>
      <el-row class="mb10">
        <el-button class="btn-theme" icon="el-icon-plus" @click="$router.push({ name: 'addSystem-module', query: {type: 0, id: ''} })">新增模块</el-button>
        <el-button class="btn-theme" icon="el-icon-plus" @click="$router.push({ name: 'addSystem-menu', query: {type: 1, id: ''} })">新增菜单</el-button>
        <el-button class="btn-theme" icon="el-icon-plus" @click="$router.push({ name: 'addSystem-page', query: {type: 2, id: ''} })">新增页面</el-button>
        <el-button class="btn-theme" icon="el-icon-plus" @click="$router.push({ name: 'addSystem-button', query: {type: 3, id: ''} })">新增按钮</el-button>
      </el-row>
      <table-tree :columns="columns" stripe :data="data"  :expandAll='isOpen' :clickRow="hiddenRow" class="zl-table">
        <el-table-column
            align="left"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <span class="icon-theme" @click="edit(scope.row.type, scope.row.id, scope.row.subsysId)">编辑</span>
              <i class="zl-icon-line"></i>
              <span class="icon-theme" @click="delBtn(scope.$index,scope.row.id,scope.row)">删除</span>
            </template>
          </el-table-column>
      </table-tree>
    </zl-card>
  </div>
</template>
<script>
import { systemList, delSystem, searchSystem } from '@/api/premission'
import { getTimeS } from "@/utils/date"
import { chooseFun } from "./chooseFun"
import TableTree from '@/components/app/TableTree/index'
export default {
  name: 'features',
  components: {
    TableTree
  },
  data() {
    return {
      searchName: '',
      isOpen: false,
      delDialog: false,
      sysId: '',
      id: '',
      delRow: {},
      funcData: [],
      columns: [
        {
          text: '名称',
          value: 'name',
          width: '200px'
        },
        {
          text: '是否显示',
          value: 'hidden'
        },
        {
          text: '类型',
          value: 'type'
        },
        {
          text: '排序',
          value: 'seq'
        },
        {
          text: '创建人',
          value: 'createUser'
        },
        {
          text: '创建时间',
          value: 'createTime',
          width: '180px'
        },
        {
          text: '修改人',
          value: 'updateUser'
        },
        {
          text: '修改时间',
          value: 'updateTime'
        }
      ],
      data: []
    }
  },
  methods: {
    edit(type, id, subsysId) {
      let routerName = ''
      if (type == '模块') {
        routerName = 'editSystem-module'
      } else if (type == '菜单') {
        routerName = 'editSystem-menu'
      } else if (type == '页面') {
        routerName = 'editSystem-page'
      } else if (type == '按钮') {
        routerName = 'editSystem-btn'
      }
      this.$router.push(
        {
          name: routerName,
          query: {id: id, type: type, sysId: subsysId}
        }
      )
    },
    search() {
      searchSystem(this.sysId, this.searchName).then(res => {
        this.dealData(res.data);
        this.isOpen = true;
        this.data = res.data;
      })
    },
    hiddenRow(row, event, column) {
      this.delRow = event.currentTarget
    },
    delBtn(index,id,row) {
      this.id = id;
      this.del()
    },
    del() {
      const str = `
        <p class="zl-confirm-html">
          <i class="el-icon-warning"></i>
          <span>此操作将永久删除, 是否继续?</span>
        </p>
      `
      this.$confirm(str, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
      }).then(() => {
        delSystem(this.id).then(res => {
        if (res.errmsg == 'success') {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.delDialog = false;
          this.getData();
        } else {
          this.$message.error(res.errmsg)
        }
      })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });        
      })
    },
    getFunction() {
      chooseFun(res => {
        this.funcData = res
      });
    },
    bianli(obj) { //深度遍历
      for(let c of obj) {
        if (c.type == '0') {
          c.type = '模块'
        } else if(c.type == '1') {
          c.type = '菜单'
        } else if(c.type == '2') {
          c.type = '页面'
        } else if(c.type == '3') {
          c.type = '按钮'
        } else {
          c.type ='应用'
        }
        if (c.hidden) {
          c.hidden = '隐藏'
        } else {
          c.hidden = '显示'
        }
        if (c.createTime) {
          const createTime = new Date(c.createTime) + "";
          c.createTime = getTimeS(createTime);
        }
        if (c.updateTime) {
          const updateTime = new Date(c.updateTime) + "";
          c.updateTime = getTimeS(updateTime);
        }
        if (c.children) {
          this.bianli(c.children)
        } else {
          continue
        }
      }
    },
    // 处理数据
    dealData(data) {
      data.forEach((val, index, arr) => {
          val['type'] = '应用';
          val['seq'] = index + 1;
          if (val.hasOwnProperty('menus')) {
            val['children'] = val.menus;
            delete val.menus;
          }
          if (val.hidden) {
            val.hidden = '隐藏'
          } else {
            val.hidden = '显示'
          }
          if (val.createTime) {
            const createTime = new Date(val.createTime) + "";
            val.createTime = getTimeS(createTime);
          }
          if (val.updateTime) {
            const updateTime = new Date(val.updateTime) + "";
            val.updateTime = getTimeS(updateTime);
          }
          if(val.children) {
            this.bianli(val.children);
          }
        })
    },
    getData() {
      const data = [];
      systemList().then(res => {
        this.dealData(res.data);
        this.isOpen = false;
        this.data = res.data;
      })
    }
  },
  mounted() {
    this.getData();
    chooseFun(res => {
      this.funcData = res
    });
  }
}
</script>

