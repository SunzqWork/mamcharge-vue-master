<template>
<div>
          <!-- 栅格系统 -->
        <template v-if="widget.type == 'grid' && !widget.detail">
          <el-row
            :key="widget.key"
            type="flex"
            :gutter="widget.options.gutter ? widget.options.gutter : 0"
            :justify="widget.options.justify"
            :align="widget.options.align"
          >
            <el-col v-for="(col, colIndex) in widget.columns" :key="colIndex" :span="col.span">
              <template v-for="citem in col.list" >
                <el-form-item v-if="citem.type=='blank'" :label="citem.label" :prop="citem.model" :key="citem.key">
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <genetate-form-item v-else :key="citem.key" :models.sync="models" :remote="remote" :rules="rules" :widget="citem" :data="data"></genetate-form-item>
              </template>
            </el-col>
          </el-row>
        </template>
         <template v-else-if="widget.type=='table'">
            <el-form-item :label="widget.label" :prop="widget.model" :key="widget.key"  :labelWidth="(widget.label?data.config.labelWidth:0) + 'px'">
                <span slot="label" v-if="widget.label">
                  {{widget.label}}
                </span>
                  <template>
                  <el-table
                      :data="TableData"
                    >
                      <el-table-column v-for="(items, index) in widget.options.options"
                        :type="items.type"
                        :label="items.label"
                        :header-align="items.headeralign" v-if="!widget.remote">
                        <template slot-scope="scope">
                           <genetate-form-item  v-for="(el, i) in items.columns[0].list" :key="el.key" :models.sync="models" :rules="rules" :widget="el" :remote="remote" :data="data"></genetate-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column v-for="(items, index) in widget.options.options"
                        :type="items.type"
                        :prop="items.propAttr"
                        :label="items.label"
                        :header-align="items.headeralign"  v-if="widget.remote">
                      </el-table-column>
                    </el-table>
                  </template>
            </el-form-item>
          </template>
        <template v-else>
          <genetate-form-item :key="widget.key" :models.sync="models" :rules="rules" :widget="widget" :remote="remote" :data="data"></genetate-form-item>
        </template>
</div>
</template>

<script>
import GenetateFormItem from './GenerateFormItem'
import {DevelopmentPlatform} from '@/api/DevelopmentPlatform'

export default {
  props: ['widget', 'models', 'rules', 'remote', 'data','labelWidth'],
  components: {
    GenetateFormItem
  },
  data () {
    return {
      iconVal:"question-circle",
      TableData:[]
    }
  },
  created () {
    // debugger;
    if(this.widget.type==="table")
    {
      if(this.widget.options.remote){
       if(this.widget.options.remoteType==="InlineTable"){
              DevelopmentPlatform(`${window.DPWebAPIUrl}/web/form/common/data/findAll`,{tableId:this.widget.options.remoteFunc})
                  .then(response => {
                    this.TableData = response.data;
                  })
                  .catch(error => {
                    this.$message({
                      message: "查询失败",
                      type: "error"
                    });
                  });
            }else if(this.widget.options.remoteType==="APIInterface"){
              DevelopmentPlatform(this.widget.options.remoteFunc,'')
                  .then(response => {
                    this.TableData = response.data;
                  })
                  .catch(error => {
                    this.$message({
                      message: "查询失败",
                      type: "error"
                    });
                  });
            }
      }
    }
    this.generateModle(this.widget);
  },
   methods: {
    generateModle (genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === 'grid') {
          genList[i].columns.forEach(item => {
            this.generateModle(item.list)
          })
        } else {
          if (Object.keys(this.value).indexOf(genList[i].model) >= 0) {
            this.models[genList[i].model] = this.value[genList[i].model]
          } else {
            if (genList[i].type === 'blank') {
              this.models[genList[i].model] = genList[i].options.defaultType === 'String' ? '' : (genList[i].options.defaultType === 'Object' ? {} : [])
            } else {
              this.models[genList[i].model] = genList[i].options.defaultValue
            }

          }
          console.log(genList[i].type+" "+JSON.stringify(genList[i].rules))
          if(genList[i].rules && genList[i].rules.length>0){
            if (this.rules[genList[i].model]) {
              this.rules[genList[i].model] = [...this.rules[genList[i].model], ...genList[i].rules]
            } else {
              this.rules[genList[i].model] = [...genList[i].rules]
            }
          }
        }
      }
    }
   },
   watch: {
     'models': {
        deep: true,
        handler (val) {
          this.$emit('update:models', val)
        }
     }
  }
}
</script>
