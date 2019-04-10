<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item label="标签对齐方式">
        <el-radio-group v-model="data.labelPosition">
          <el-radio-button label="left">左对齐</el-radio-button>
          <el-radio-button label="right">右对齐</el-radio-button>
          <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="表单字段宽度">
        <el-input-number v-model="data.labelWidth" :min="0" :max="200" :step="10"></el-input-number>
      </el-form-item>
      <el-form-item label="表单数据库字段">
          <el-button type="text" @click="dialogFormVisible = true">设置数据库字段</el-button>
          <el-dialog title="表单数据库字段" :visible.sync="dialogFormVisible">
            <el-collapse v-model="activeNames" accordion>
              <el-collapse-item title="设置表字段" name="1">                
               <template slot="title">
                  设置表字段 
              </template>
               <el-row><el-button style="float:right;" type="primary" icon="el-icon-plus" @click="AddTableColumn">追加</el-button></el-row>
                <el-table :data="widgetForm.list.filter(data =>search.indexOf(data.type) < 0)" fit>
                <el-table-column label="字段名称" width="250" header-align="center" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.model" placeholder="请输入字段名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column  label="字段描述（表头）" width="250" header-align="center" align="center">
                  <template slot-scope="scope">
                     <el-input v-model="scope.row.columnComment" placeholder="请输入字段描述（表头）"></el-input>
                  </template>
                </el-table-column>
                  <el-table-column label="字段类型" width="150" header-align="center" align="center">
                  <template slot-scope="scope">
                     <el-select v-model="scope.row.dbType" placeholder="请选择">
                      <el-option
                        v-for="item in selectoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column  label="长度" width="250" header-align="center" align="center">
                  <template slot-scope="scope">
                     <el-input v-model="scope.row.columnLength" placeholder="请输入长度"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="是不是主键" width="100" header-align="center" align="center">
                  <template slot-scope="scope">
                    <el-checkbox  style="margin-right:0px" v-model="scope.row.columnPrimary"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="隐藏字段" width="100" header-align="center" align="center">
                  <template slot-scope="scope">
                     <el-checkbox  style="margin-right:0px"  v-model="scope.row.hidden"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="是否必填" width="100" header-align="center" align="center">
                  <template slot-scope="scope">
                    <el-checkbox  style="margin-right:0px"  v-model="scope.row.mandatory"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column label="查询条件" width="100" header-align="center" align="center">
                  <template slot-scope="scope">
                     <el-checkbox  style="margin-right:0px"  v-model="scope.row.queried"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100"
                  header-align="center"
                  align="center"
                  >
                  <template slot-scope="scope">
                    <el-button
                      @click.prevent="removeTableColumn(scope.row)"
                      type="text"
                      size="small">
                      移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              </el-collapse-item>
            </el-collapse>            
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>

</style>

<script>
export default {
   data() {
    return {
      activeNames:['1'],
     // .filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))
      search:"grid,blank,table",
      selectoptions:[
        {
          value: 'BIT',
          label: 'BIT'
        },{
          value: 'BOOL',
          label: 'BOOL'
        },{
          value: 'TINY INT',
          label: 'TINY INT'
        },{
          value: 'SMALL INT',
          label: 'SMALL INT'
        },{
          value: 'MEDIUM INT',
          label: 'MEDIUM INT'
        },{
          value: 'INT',
          label: 'INT'
        },{
          value: 'BIG INT',
          label: 'BIG INT'
        },{
          value: 'FLOAT',
          label: 'FLOAT'
        },{
          value: 'DOUBLE',
          label: 'DOUBLE'
        },{
          value: 'DECIMAL',
          label: 'DECIMAL'
        },{
          value: 'CHAR',
          label: 'CHAR'
        },{
          value: 'VARCHAR',
          label: 'VARCHAR'
        },{
          value: 'TINY TEXT',
          label: 'TINY TEXT'
        },{
          value: 'TEXT',
          label: 'TEXT'
        },{
          value: 'MEDIUM TEXT',
          label: 'MEDIUM TEXT'
        },{
          value: 'LONGTEXT',
          label: 'LONGTEXT'
        },{
          value: 'TINY BLOB',
          label: 'TINY BLOB'
        },{
          value: 'BLOB',
          label: 'BLOB'
        },{
          value: 'LONG BLOB',
          label: 'LONG BLOB'
        },{
          value: 'Date',
          label: 'Date'
        },{
          value: 'DateTime',
          label: 'DateTime'
        },{
          value: 'TimeStamp',
          label: 'TimeStamp'
        }
      ],
      dialogFormVisible: false,
    };
  },
  props: ['data','widgetForm'],
  methods:{
    AddTableColumn(){
      var jsonColumn={
        "columnComment": "",
        "columnLength": "255",
        "columnPrimary": false,
        "dbType": "VARCHAR",
        "hidden": false,
        "mandatory": false,
        "name": "",
        "queried": false,
        "tableName": "",
        "model":""
      }
      this.widgetForm.list.push(jsonColumn);
   },
   removeTableColumn(data){
      var list=this.widgetForm.list;
      window._.remove(list,data);
      this.widgetForm.list=[];
      this.widgetForm.list=list;

   }
  }
}
</script>
