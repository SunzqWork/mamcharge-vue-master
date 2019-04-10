<template>
  <div>
    <el-form ref="elForms" :model="models" :rules="rules" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
      <template v-for="(item, index) in data.list">
        <!-- 栅格系统 -->
        <template v-if="item.type == 'grid' && !item.detail &&!item.block">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
          >
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              <template v-for="citem in col.list" >
                <el-form-item v-if="citem.type=='blank'" :label="citem.label" :prop="citem.model" :key="citem.key">
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <genetate-form-two v-else :key="citem.key" :models.sync="models" :remote="remote" :rules="rules" :widget="citem" :data="data"></genetate-form-two>
              </template>
            </el-col>
          </el-row>
        </template>

        <!-- 明细 -->
        <template v-else-if="item.type === 'grid' && item.detail  && !item.block">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
            class="form-detail"
          >
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              <template v-for="citem in col.list" >
                <el-form-item v-if="citem.type=='blank'" :label="citem.label" :prop="citem.model" :key="citem.key">
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <genetate-form-two v-else :key="citem.key" :models.sync="models" :remote="remote" :rules="rules" :widget="citem" :data="data"></genetate-form-two>
              </template>
            </el-col>
            <el-button
              class="preview-add"
              title="追加"
              v-if="item.addBtnShow"
              size="mini"
              icon="el-icon-plus"
              type="primary" @click.stop="copyElement(index)" plain>
              {{ item.btnName }}
            </el-button>
          </el-row>
        </template>
        <!--区块 -->
        <template v-else-if="item.type === 'grid' && item.detail &&item.block">
          <el-row
            :key="item.key"
            type="flex"
            :gutter="item.options.gutter ? item.options.gutter : 0"
            :justify="item.options.justify"
            :align="item.options.align"
            class="form-detail"
             style="
                background: rgb(255, 255, 255);
                border: 1px solid rgb(238, 238, 238);
                padding-top: 45px;
                margin-top: 10px !important;
                padding-left: 10px;
                padding-right: 10px;
                margin-bottom: 10px;
                border-radius: 5px;
                -webkit-box-shadow: 2px 0px 8px 0px #c1c1c1;
                box-shadow: 2px 0px 8px 0px #c1c1c1;"

          >
          <div style="
                  position: absolute;
                  top: 10px;
                  padding: 1px 7px;
                  background: #FFFFFF;
                  border-left-color: #376bff;
                  border-left-width: 3px;
                  border-left-style:solid;
              ">
                   {{item.label}}
                </div>
            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
              <template v-for="citem in col.list" >
                <el-form-item v-if="citem.type=='blank'" :label="citem.label" :prop="citem.model" :key="citem.key">
                  <slot :name="citem.model" :model="models"></slot>
                </el-form-item>
                <genetate-form-two v-else :key="citem.key" :models.sync="models" :remote="remote" :rules="rules" :widget="citem" :data="data"></genetate-form-two>
              </template>
            </el-col>
            <el-button
              class="preview-add"
              title="追加"
              v-if="item.addBtnShow"
              size="mini"
              icon="el-icon-plus"
              type="primary" @click.stop="copyElement(index)" plain>
              {{ item.btnName }}
            </el-button>
          </el-row>
        </template>
        <!-- 自定义区域 -->
        <template v-else-if="item.type == 'blank'">
          <el-form-item :label="item.label" :prop="item.model" :key="item.key">
            <slot :name="item.model" :model="models"></slot>
          </el-form-item>
        </template>
        <!-- table -->
        <template v-else-if="item.type=='table'">
            <el-form-item :label="item.label" :prop="item.model" :key="item.key"  :labelWidth="(item.label?data.config.labelWidth:0) + 'px'">
                <span slot="label" v-if="item.label">
                  {{item.label}}
                </span>
                  <template>
                  <el-table
                      :data="item.options.data"

                    >
                      <el-table-column v-for="(items, index) in item.options.options"
                        :type="items.type"
                        :label="items.label"
                        :header-align="items.headeralign" v-if="!item.options.remote">
                        <template slot-scope="scope">
                           <genetate-form-item  v-for="(el, i) in items.columns[0].list" :key="el.key" :models.sync="models" :rules="rules" :widget="el" :remote="remote" :data="data"></genetate-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column v-for="(items, index) in item.options.options"
                        :type="items.type"
                        :prop="items.propAttr"
                        :label="items.label"
                        :header-align="items.headeralign"  v-if="item.options.remote">
                      </el-table-column>
                    </el-table>
                  </template>

            </el-form-item>
          </template>
        <template v-else>
          <genetate-form-two :key="item.key" :models.sync="models" :rules="rules" :widget="item" :remote="remote" :data="data"></genetate-form-two>
        </template>
      </template>
    </el-form>
  </div>
</template>

<script>
import GenetateFormItem from './GenerateFormItem'
import GenetateFormTwo from './GenerateFormTwo'
export default {
  name: 'generate-form',
  components: {
    GenetateFormItem,
    GenetateFormTwo
  },
  props: ['data', 'remote', 'value'],
  data () {
    return {
      models: {},
      rules: {}
    }
  },
  created () {
    var _this=this;
    var intervals=window.setInterval(()=>{
      if(_this.data&&_this.data.list){
        // debugger;
        _this.generateModle(_this.data.list);
        window.clearInterval(intervals);
      }
    },100);
  //  if(this.item.type==="table")
  //   {
  //     if(this.item.remote){
  //      if(this.item.options.remoteType==="InlineTable"){
  //        debugger;
  //             DevelopmentPlatform(`${window.DPWebAPIUrl}/web/form/common/data/findAll`,{tableId:this.item.options.remoteFunc})
  //                 .then(response => {
  //                   this.item.options.data = response.data;
  //                 })
  //                 .catch(error => {
  //                   this.$message({
  //                     message: "查询失败",
  //                     type: "error"
  //                   });
  //                 });
  //           }else if(this.item.options.remoteType==="APIInterface"){
  //             DevelopmentPlatform(this.item.options.remoteFunc,'')
  //                 .then(response => {
  //                   this.item.options.data = response.data;
  //                 })
  //                 .catch(error => {
  //                   this.$message({
  //                     message: "查询失败",
  //                     type: "error"
  //                   });
  //                 });
  //           }
  //     }
  //   }
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
    },
    getData () {
      return new Promise((resolve, reject) => {
        this.$refs.elForms.validate(valid => {
          if (valid) {
            resolve(this.models)
          } else {
            reject(new Error('表单数据校验失败').message)
          }
        })
      })
    },
    refresh () {

    },
    copyElement(index) {
      this.$store.commit('SET_COPYINDEX', index)
    }
  },
  watch: {
    // data: {
    //   deep: true,
    //   handler (val) {
    //     this.generateModle(val.list)
    //   }
    // },
    value: {
      deep: true,
      handler (val) {
        console.log(JSON.stringify(val))
        this.models = {...this.models, ...val}
      }
    }
  }
}
</script>
