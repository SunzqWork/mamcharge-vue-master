<template>
  <el-form-item v-show="!widget.options.hidden" :label="widget.label" :prop="widget.model" :labelWidth="(widget.label?(data.config?data.config.labelWidth:labelWidth):0) + 'px'">
    <!-- <span slot="label" v-if="widget.label && !widget.options.hidden" >
          <el-tooltip v-if="widget.options.ToolTipsdisabled&&widget.options.ToolTipsShowLocation==='TitleRight'" class="item"
           :content="widget.options.ToolTipscontent"
           :placement="widget.options.ToolTipsplacement"
           :enterable="widget.options.ToolTipsenterable"
           :open-delay="widget.options.ToolTipsopendelay"
           :hide-after="widget.options.ToolTipshideafter"
           >
            <icon class="icon" :name="iconVal"></icon>
          </el-tooltip>
          {{widget.label}}
           <el-tooltip v-if="widget.options.ToolTipsdisabled&&widget.options.ToolTipsShowLocation==='TitleLeft'" class="item"
           :content="widget.options.ToolTipscontent"
           :placement="widget.options.ToolTipsplacement"
           :enterable="widget.options.ToolTipsenterable"
           :open-delay="widget.options.ToolTipsopendelay"
           :hide-after="widget.options.ToolTipshideafter"
           >
            <icon class="icon" :name="iconVal"></icon>
          </el-tooltip>
        </span> -->
    <template v-if="widget.type == 'input' && !widget.options.hidden && !widget.options.isupload" >
      <template v-if="widget.options.ToolTipsdisabled">
          <el-tooltip class="item" v-if="widget.options.ToolTipsdisabled&&widget.options.ToolTipsShowLocation==='ElementRight'"
           :content="widget.options.ToolTipscontent"
           :placement="widget.options.ToolTipsplacement"
           :enterable="widget.options.ToolTipsenterable"
           :open-delay="widget.options.ToolTipsopendelay"
           :hide-after="widget.options.ToolTipshideafter"
           >
            <icon class="icon" :name="iconVal"></icon>
          </el-tooltip>
      </template>
      <el-input
        v-if="widget.options.dataType == 'number' || widget.options.dataType == 'integer'"
        :type="widget.options.dataType"
        v-model.number="dataModel"
        :placeholder="widget.options.placeholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :clearable="widget.options.clearable"
        :style="{width: widget.options.width}"
        :maxlength="widget.options.maxlength"
      ></el-input>
      <el-input
        v-else
        :type="widget.options.dataType"
        v-model="dataModel"
        :placeholder="widget.options.placeholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :clearable="widget.options.clearable"
        :style="{width: widget.options.width}"
        :maxlength="widget.options.maxlength"
      ></el-input>
    </template>
    <template v-if="widget.type == 'textarea'">
      <el-input type="textarea" :rows="5"
        v-model="dataModel"
        :placeholder="widget.options.placeholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :maxlength="widget.options.maxlength"

        :clearable="widget.options.clearable"
        :style="{width: widget.options.width}"
      ></el-input>
    </template>

    <template v-if="widget.type == 'number'">
      <el-input-number
        v-model="dataModel"
        :style="{width: widget.options.width}"
        :step="widget.options.step"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :precision="widget.options.precision"
        :clearable="widget.options.clearable"
        :min="widget.options.min"
        :max="widget.options.max"
        controls-position="right"
      ></el-input-number>
    </template>

    <template v-if="widget.type == 'radio'">
      <el-radio-group v-model="dataModel"
        :style="{width: widget.options.width}"
      >
        <el-radio
          :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
          :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="widget.type == 'checkbox'">
      <el-checkbox-group v-model="dataModel"
        :style="{width: widget.options.width}"
      >
        <el-checkbox

        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :style="{display: widget.options.inline ? 'inline-block' : 'block'}"
        :label="item.value" v-for="(item, index) in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="index"
        >
          <template v-if="widget.options.remote">{{item.label}}</template>
          <template v-else>{{widget.options.showLabel ? item.label : item.value}}</template>
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="widget.type == 'time'">
      <el-time-picker
        v-model="dataModel"
        :is-range="widget.options.isRange"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :arrowControl="widget.options.arrowControl"
        :value-format="widget.options.format"
        :style="{width: widget.options.width}"
      >
      </el-time-picker>
    </template>

    <template v-if="widget.type=='date'">
      <el-date-picker
        v-model="dataModel"
        :type="widget.options.type"
        :placeholder="widget.options.placeholder"
        :start-placeholder="widget.options.startPlaceholder"
        :end-placeholder="widget.options.endPlaceholder"
        :readonly="widget.options.readonly"
        :disabled="widget.options.disabled"
        :editable="widget.options.editable"
        :clearable="widget.options.clearable"
        :value-format="widget.options.timestamp ? 'timestamp' : widget.options.format"
        :format="widget.options.format"
        :style="{width: widget.options.width}"
      >
      </el-date-picker>
    </template>

    <template v-if="widget.type =='rate'">
      <el-rate v-model="dataModel"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :allow-half="widget.options.allowHalf"
      ></el-rate>
    </template>

    <template v-if="widget.type == 'color'">
      <el-color-picker
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :show-alpha="widget.options.showAlpha"
      ></el-color-picker>
    </template>

    <template v-if="widget.type == 'select'">
      <el-select
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :multiple="widget.options.multiple"
        :clearable="widget.options.clearable"
        :placeholder="widget.options.placeholder"
        :style="{width: widget.options.width}"
      >
        <el-option v-for="item in (widget.options.remote ? widget.options.remoteOptions : widget.options.options)" :key="item.value" :value="item.value" :label="widget.options.showLabel || widget.options.remote?item.label:item.value"></el-option>
      </el-select>
    </template>

    <template v-if="widget.type=='switch'">
      <el-switch
        v-model="dataModel"
        :disabled="widget.options.disabled"
      >
      </el-switch>
    </template>

    <template v-if="widget.type=='slider'">
      <el-slider
        v-model="dataModel"
        :min="widget.options.min"
        :max="widget.options.max"
        :disabled="widget.options.disabled"
        :step="widget.options.step"
        :show-input="widget.options.showInput"
        :range="widget.options.range"
        :style="{width: widget.options.width}"
      ></el-slider>
    </template>

    <template v-if="widget.type=='imgupload'">
      <!-- <fm-upload
        v-model="dataModel"
        :disabled="widget.options.disabled"
        :style="{'width': widget.options.width}"
        :width="widget.options.size.width"
        :height="widget.options.size.height"
        :token="widget.options.token"
        :domain="widget.options.domain"
      >
      </fm-upload> -->
      <UploadTest
        :disabled="widget.options.disabled"
        :action="widget.options.domain"
        :type="widget.options.multipleType"
        file="codePlatformImg"
        :label="widget.label"
        :size="widget.options.size"
        :params.sync="params"
        @on-success="handlerSuccess"
        :fileListprops.sync="dataModel"
      ></UploadTest>
    </template>
    <template v-if="widget.options.ToolTipsdisabled">
          <el-tooltip class="item"  v-if="widget.options.ToolTipsdisabled&&widget.options.ToolTipsShowLocation==='ElementLeft'"
           :content="widget.options.ToolTipscontent"
           :placement="widget.options.ToolTipsplacement"
           :enterable="widget.options.ToolTipsenterable"
           :open-delay="widget.options.ToolTipsopendelay"
           :hide-after="widget.options.ToolTipshideafter"
           >
            <icon class="icon" :name="iconVal"></icon>
          </el-tooltip>
        </template>
  </el-form-item>
</template>

<script>
import FmUpload from './Upload'
import UploadTest from './UploadTest'
import {DevelopmentPlatform} from '@/api/DevelopmentPlatform'
import { getUrlParams } from '@/utils/utils'
export default {
  props: ['widget', 'models', 'rules', 'remote', 'data','labelWidth'],
  components: {
    FmUpload, UploadTest
  },
  data () {
    return {
      dataModel: this.models[this.widget.model],
      iconVal:"question-circle",
      params: []
    }
  },

  methods: {
    handlerSuccess(data) {
      Object.keys(data).forEach(key => {
        this.$set(this.models, key, data[key])
      })
    }
  },

  created () {

      let hiddenIds = []
      let hiddenParams = {}

      this.data.list.forEach(val => {
        if (val.options.hidden) {
          hiddenIds.push(val.model)
        }
      })

      hiddenIds.forEach(key => {
        if (window.sessionStorage.getItem(key)) {
          hiddenParams[key] = window.sessionStorage.getItem(key)
        }
      })

      Object.keys(hiddenParams).forEach(key => {
        this.$set(this.models, key, hiddenParams[key])
      })

      // if (this.widget.options.remote && this.remote[this.widget.options.remoteFunc]) {
      if (this.widget.options.remote) {
        if(this.widget.options.remoteType==="func"){
            this.remote[this.widget.options.remoteFunc]((data) => {
              this.widget.options.remoteOptions = data.map(item => {
                return {
                  value: item[this.widget.options.props.value],
                  label: item[this.widget.options.props.label]
                }
              })
            })
        }else{

           if(this.widget.options.remoteType==="InlineTable"){

              DevelopmentPlatform(`${window.DPWebAPIUrl}/web/form/common/data/findAll`,{tableId:this.widget.options.remoteFunc,...JSON.parse('"'+this.widget.options.remotePara+'"')})
                  .then(response => {
                    this.widget.options.remoteOptions = response.data.map(item => {
                      return {
                        value: item[this.widget.options.props.value],
                        label: item[this.widget.options.props.label]
                      }
              })
                  })
                  .catch(error => {
                    this.$message({
                      message: "查询失败",
                      type: "error"
                    });
                  });
            }else if(this.widget.options.remoteType==="APIInterface"){
              debugger;
              var compiled = window._.template(this.widget.options.remotePara);
              var Code= window.sessionStorage.getItem("productCode");
               Code=Code?Code:"";
               var id=window.sessionStorage.getItem("productId");
               id=id?id:"";
               var productCode= JSON.parse(compiled({ 'productCode': Code,'productId': id  }));
              DevelopmentPlatform(this.widget.options.remoteFunc,productCode)
                  .then(response => {
                    this.widget.options.remoteOptions = response.data.map(item => {
                      return {
                        value: item[this.widget.options.props.value],
                        label: item[this.widget.options.props.label]
                      }
              })
                  })
                  .catch(error => {
                    // this.$message({
                    //   message: "查询失败",
                    //   type: "error"
                    // });
                  });
            }
        }
      }


    if (this.widget.type === 'imgupload') {

      // this.remote[this.widget.options.tokenFunc]((data) => {
      //   this.widget.options.token = data
      // })

      if (this.widget.options.params instanceof Array) {
        let params = {}
        this.widget.options.params.forEach((val, index) => {
          this.$set(this.params, index, val)
        })
      }
    }


  },
  watch: {
    dataModel: {
      deep: true,
      handler (val) {
        var returnVal="";
        if(typeof(val)=="object"){
            returnVal=JSON.stringify(val);
        }else{
          returnVal=val;
        }
        this.models[this.widget.model] = returnVal
        this.$emit('update:models', {
          ...this.models,
          [this.widget.model]: returnVal
        })
      }
    },
    models: {
      deep: true,
      handler (val) {
        this.dataModel = val[this.widget.model]
      }
    }
  }
}
</script>
