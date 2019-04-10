<template>
  <div id="role-list">
    <zl-card>
      <el-button class="btn-theme" @click="dialogVisible = true" type="primary" >新增</el-button>
      <el-button  @click="deleteMultiple">删除</el-button>
    </zl-card>
    <zl-card>
    
      <el-table :height="tableHeight" border class="zl-table" :data="tableData" @selection-change="handleSelectionChange">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column type="selection" :selectable="checkSelection" header-align="center" align="center" width="55"></el-table-column>
        <el-table-column header-align="center" label="数据库字段名称" prop="colName" align="left">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
               class="zl-input-240px"
               size="mini"
                v-model="scope.row.switch.colName"
                
                style="width:100%;"
                placeholder="请输入数据库字段名称"
                @change="testLine(scope.row)"
              ></el-input>
            </div>
            <div v-else style="line-height: 36px;">{{scope.row.colName}}</div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="字段显示名" align="left">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
               class="zl-input-240px"
               size="mini"
                v-model="scope.row.switch.displayName"
                
                style="width:100%;"
                placeholder="请输入字段显示名"
              ></el-input>
            </div>
            <div v-else style="line-height: 36px;">{{scope.row.displayName}}</div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="字段类型" align="left">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-select class="te-select" v-model="scope.row.switch.colType" filterable placeholder="请选择">
                <el-option v-for="item in sqlType" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <div v-else style="line-height: 36px;">{{scope.row.colType}}</div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="字段长度" align="right">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input
               class="zl-input-240px"
               size="mini"
                v-model="scope.row.switch.colLen"
                
              ></el-input>
            </div>
            <div v-else style="line-height: 36px;">{{scope.row.colLen}}</div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="是否有效" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-switch
                v-model="scope.row.switch.active"
                active-color="#299ee4"
                
              ></el-switch>
            </div>
            <div v-else>{{scope.row.active ? '是': '否'}}</div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="是否必填" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-switch
                v-model="scope.row.switch.required"
                active-color="#299ee4"
                
              ></el-switch>
            </div>
            <div v-else>{{scope.row.required ? '是': '否'}}</div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="显示顺序" align="right">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-input 
              class="zl-input-240px"
               size="mini"
                v-model="scope.row.switch.seq"
              ></el-input>
            </div>
            <div v-else>{{scope.row.seq}}</div>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="操作" width="250">
          <template slot-scope="scope">
            <div v-if="scope.row.IsEdit != 'none'">
            <div v-if="scope.row.edit">
              <span class="icon-theme" @click="save(scope.row)">确定</span>
              <span class="icon-theme" @click="deleteSingle(scope.row)">删除</span>
              <span class="icon-theme" @click="scope.row.edit = !scope.row.edit">取消</span>
            </div>
            <div v-else>
              <span class="icon-theme" @click="edits(scope.row)">编辑</span>
            </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </zl-card>
    <!-- 新增 -->
    <el-dialog title="新增字段" :visible.sync="dialogVisible" width="850px">
      <el-form style="overflow:hidden;" :rules="rules" label-width="135px" ref="form" :model="form">
        <el-form-item style="float:left;width: 50%;height: 36px;" label="数据库字段名称" prop="colName">
          <el-input class="zl-input-240px" v-model="form.colName"></el-input>
        </el-form-item>
        <el-form-item style="float:left;width: 50%;height: 36px;" label="页面展示名" prop="displayName">
          <el-input class="zl-input-240px" v-model="form.displayName"></el-input>
        </el-form-item>
        <el-form-item style="float:left;width: 50%;height: 36px;" label="显示顺序">
          <el-input
          class="zl-input-240px"
            v-model="form.seq"
            size="small"
            :min="1"
            :max="21844"
          ></el-input>
        </el-form-item>
        <el-form-item style="float:left;width: 50%;height: 36px;" label="字段类型" prop="colType">
          <el-select style="width: 240px;" v-model="form.colType" filterable placeholder="请选择">
            <el-option v-for="item in sqlType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item style="float:left;width: 50%;height: 36px;" label="字段长度">
          <el-input
          class="zl-input-240px"
            v-model="form.colLen"
            size="small"
            :min="1"
            :max="21844"
          ></el-input>
        </el-form-item>
          <el-form-item style="float:left;width: 25%;height: 36px;" label="是否有效">
          <el-switch v-model="form.active" active-color="#299ee4" ></el-switch>
        </el-form-item>
        <el-form-item style="float:left;width: 25%;height: 36px;" label="是否必填">
          <el-switch v-model="form.required" active-color="#299ee4" ></el-switch>
        </el-form-item>
       
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-theme" type="primary" @click="add">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { extConfs } from "@/api/help"
import { getCustomUser, getCustomPut, deleteCustomPut } from "@/api/custom";
// 字段类型需要写死
const sqlType = [
  "tinyint",
  "smallint",
  "mediumint",
  "int",
  "integer",
  "bigint",
  "float",
  "double",
  "char",
  "varchar",
  "tinyblob",
  "tinytext",
  "blob",
  "text",
  "mediumblob",
  "mediumtext",
  "longblob",
  "longtext",
  "date",
  "time",
  "year",
  "datetime",
  "timestamp"
];
export default {
  name: "role-list",

  data() {
    return {
      check: [],
      tableData: [],
      sqlType: sqlType,
      dialogVisible: false,
      form: {
        seq: "", //显示顺序
        displayName: "", //页面展示名
        colName: "", //数据库字段名称
        colType: "", //字段类型
        colLen: "", // 字段长度
        active: true, //是否有效
        required: true //是否必填
      },
      rules: {
        colName: [
          { required: true, message: "请输入数据库字段名称", trigger: "blur" }
        ],
        displayName: [
          { required: true, message: "请输入页面展示名", trigger: "blur" }
        ],
        colType: [{ required: true, message: "请选择字段类型", trigger: "" }]
      }
    };
  },
  watch: {},
  computed:{
    tableHeight() {
      return this.$store.state.app.$th
    }
  },
  methods: {
    checkSelection(rows){
      if(rows.IsEdit == "none") return false
       return true
    },
    testLine(font) {
      if (/[\u4E00-\u9FA5]+/.test(font.switch.colName)) {
        font.switch.colName = "";
        return this.$message.error("字段名不能输入中文字");
      }
    },
    // 新增
    add() {
      if (this.form.seq == "") {
        return this.$message.error("请先设置显示顺序");
      }
      if (this.form.displayName == "") {
        return this.$message.error("请先设置页面展示名");
      }
      if (this.form.colName == "") {
        return this.$message.error("请先设置数据库字段名称");
      }
      if (this.form.colType == "") {
        return this.$message.error("请先设置字段类型");
      }
      if (this.form.colLen == "") {
        return this.$message.error("请先设置字段长度");
      }
      if (this.form.active == "") {
        return this.$message.error("请先设置是否有效");
      }
      if (this.form.require == "") {
        return this.$message.error("请先设置是否必填");
      }
      this.dialogVisible = false;
      getCustomPut([this.form])
        .then(
          s => {
            s.success
              ? this.$message({
                  message: "新增成功",
                  type: "success"
                })
              : this.$message.error(s.errmsg);
            this.loadMsg();
          },
          err => {
            this.$message.error("新增失败");
            this.loadMsg();
          }
        )
        .catch(s => {
          this.$message.error("新增失败");
          this.loadMsg();
        });
    },
    // 确定
    save(rows) {
      if (rows.switch.colName == "") {
        return this.$message.error("请填写字段名称");
      }
      delete rows.switch.switch;
      getCustomPut([rows.switch])
        .then(
          s => {
            s.success
              ? this.$message({
                  message: "修改成功",
                  type: "success"
                })
              : this.$message.error(s.errmsg);
            this.loadMsg();
          },
          err => {
            this.$message.error("修改失败");
            this.loadMsg();
          }
        )
        .catch(s => {
          this.$message.error("修改失败");
          this.loadMsg();
        });
      rows.edit = false;
    },
    // 打开编辑
    edits(rows) {
      rows.switch = {
        ...rows
      };
      rows.edit = !rows.edit;
    },
    // 加载内容
    loadMsg() {
      this.form = {
        seq: "", //显示顺序
        displayName: "", //页面展示名
        colName: "", //数据库字段名称
        colType: "", //字段类型
        colLen: "", // 字段长度
        active: true, //是否有效
        required: true //是否必填
      };
     
        extConfs().then( res => {
          this.tableData = res.data.map( rest => {
            return {
                ...rest,
                switch: {
                active: "",
                required: ""
              },
                IsEdit:'none'
            }
          })
           getCustomUser().then(s => {
          this.tableData = [...this.tableData,...s.data.map(s => {
            return {
              ...s,
              switch: {
                active: "",
                required: ""
              },
              edit: false
            };
          })]
        });
        })
      
    },
    // 删除前编辑
    afterDelete(con) {
      con = con.map(m => {
        return {
          ...m,
          switch: "",
          baseCol: false
        };
      });
      return getCustomPut(con).then(s => {
      });
    },
    // 单个删除
    async deleteSingle(row) {
      await this.afterDelete([row]);
      deleteCustomPut([row.id])
        .then(
          req => {
            req.success
              ? this.$message({
                  message: "删除成功",
                  type: "success"
                })
              : this.$message.error(req.errmsg);
            this.loadMsg();
          },
          err => {
            this.$message.error("删除失败");
          }
        )
        .catch(error => {
          this.$message.error("删除失败");
        });
    },
    // 多个删除
    async deleteMultiple() {
      await this.afterDelete(this.check);
      deleteCustomPut(
        this.check.map(s => {
          return s.id;
        })
      )
        .then(
          req => {
            req.success
              ? this.$message({
                  message: "删除成功",
                  type: "success"
                })
              : this.$message.error(req.errmsg);
            this.loadMsg();
          },
          err => {
            this.$message.error("删除失败");
          }
        )
        .catch(error => {
          this.$message.error("删除失败");
        });
    },
    // 选中
    handleSelectionChange(Select) {
      this.check = Select;
    },
    // render-header
    renderHeader(h, { column, $index }) {
      return (
        <div>
          <el-checkbox v-model="checked" />
        </div>
      );
    }
  },
  mounted() {
    this.loadMsg();
  }
};
</script>
<style lang="scss">
.test input {
  text-align: center;
  // height: 28px!important;
}
.test{
  // height: 28px!important;
}
.te-select{
  height: 28px!important;
  input{
    height: 28px!important;
  }
}
</style>


