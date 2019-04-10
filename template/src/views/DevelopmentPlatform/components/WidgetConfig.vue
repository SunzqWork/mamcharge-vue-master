<template>
  <div v-if="show">
    <el-form label-position="top">
      <el-form-item label="标题" v-if="data.type!='grid'||data.block">
        <el-input v-model="data.label"></el-input>
      </el-form-item>
      <el-form-item label="字段描述" v-if="data.type!='grid'">
         <el-input v-model="data.columnComment"></el-input>
      </el-form-item>
      <el-form-item label="宽度" v-if="Object.keys(data.options).indexOf('width')>=0">
        <el-input v-model="data.options.width"></el-input>
      </el-form-item>

      <el-form-item label="大小" v-if="Object.keys(data.options).indexOf('size')>=0">
        宽度：<el-input style="width: 80px;" type="number" v-model.number="data.options.size.width"></el-input>
        高度：<el-input style="width: 80px;" type="number" v-model.number="data.options.size.height"></el-input>
      </el-form-item>

      <el-form-item label="占位内容" v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='time' || data.type!='date')">
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="布局方式" v-if="Object.keys(data.options).indexOf('inline')>=0">
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">块级</el-radio-button>
          <el-radio-button :label="true">行内</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示输入框" v-if="Object.keys(data.options).indexOf('showInput')>=0">
        <el-switch v-model="data.options.showInput" ></el-switch>
      </el-form-item>
      <el-form-item label="最小值" v-if="Object.keys(data.options).indexOf('min')>=0">
        <el-input-number v-model="data.options.min" :min="-999999999999" :max="999999999999" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="最大值" v-if="Object.keys(data.options).indexOf('max')>=0">
        <el-input-number v-model="data.options.max" :min="-999999999999" :max="999999999999" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="精度" v-if="Object.keys(data.options).indexOf('precision')>=0">
        <el-input-number v-model="data.options.precision" :min="0" :max="6" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="限制长度" v-if="Object.keys(data.options).indexOf('maxlength')>=0">
        <el-input-number v-model="data.options.maxlength" :min="0"  :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="步长" v-if="Object.keys(data.options).indexOf('step')>=0">
        <el-input-number v-model="data.options.step" :min="0" :max="999999999999" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="是否多选" v-if="data.type=='select'">
        <el-switch v-model="data.options.multiple" @change="handleSelectMuliple"></el-switch>
      </el-form-item>
      <el-form-item label="允许半选" v-if="Object.keys(data.options).indexOf('allowHalf')>=0">
        <el-switch
            v-model="data.options.allowHalf"
          >
          </el-switch>
      </el-form-item>
      <el-form-item label="支持透明度选择" v-if="Object.keys(data.options).indexOf('showAlpha')>=0">
        <el-switch
            v-model="data.options.showAlpha"
          >
          </el-switch>
      </el-form-item>
      <el-form-item label="是否显示标签" v-if="Object.keys(data.options).indexOf('showLabel')>=0">
        <el-switch
            v-model="data.options.showLabel"
          >
        </el-switch>
      </el-form-item>
      <el-form-item label="选项" v-if="Object.keys(data.options).indexOf('options')>=0 && data.type!=='table'">
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom:10px;">
          <el-radio-button :label="false">静态数据</el-radio-button>
          <el-radio-button :label="true">远端数据</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-radio-group v-model="data.options.remoteType">
              <el-radio :label="'APIInterface'">API接口</el-radio>
              <el-radio :label="'InlineTable'">内联表</el-radio>
              <el-radio :label="'func'">内部方法</el-radio>
            </el-radio-group>
            <el-input size="mini" style="" v-model="data.options.remoteFunc" v-if="data.options.remoteType!='InlineTable'">
              <template slot="prepend">远端方法</template>
            </el-input>
             <el-select v-model="data.options.remoteFunc" style="width:100%;" placeholder="请选择" filterable v-if="data.options.remoteType==='InlineTable'">

              <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.label"
                :value="item.id">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
            <el-input size="mini" style="" v-model="data.options.remotePara" v-if="data.options.remoteType!=='func'">
              <template slot="prepend">参数JSON</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.value">
              <template slot="prepend">值</template>
            </el-input>
            <el-input size="mini" style="" v-model="data.options.props.label">
              <template slot="prepend">标签</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template v-if="data.type=='radio' || (data.type=='select'&&!data.options.multiple)">
            <el-radio-group v-model="data.options.defaultValue">
              <draggable element="ul" :list="data.options.options"
                :options="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-radio
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:100px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" ></icon></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>

            </el-radio-group>
          </template>

          <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">

              <draggable element="ul" :list="data.options.options"
                :options="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-checkbox
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:100px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" ></icon></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <template v-if="data.type=='table'">
              <draggable element="ul" :list="data.options.options"
                :options="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-input style="width:180px;" v-model="item.label"></el-input>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" ></icon></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>
          </template>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddOption">添加选项</el-button>
          </div>
        </template>

      </el-form-item>

      <el-form-item label="选项" v-if="Object.keys(data.options).indexOf('options')>=0 && data.type==='table'">
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom:10px;">
          <el-radio-button :label="false">静态数据</el-radio-button>
          <el-radio-button :label="true">远端数据</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-radio-group v-model="data.options.remoteType">
              <el-radio :label="'APIInterface'">API接口</el-radio>
              <el-radio :label="'InlineTable'">内联表</el-radio>
              <el-radio :label="'func'">内部方法</el-radio>
            </el-radio-group>
            <el-input size="mini" style="" v-model="data.options.remoteFunc" v-if="data.options.remoteType!='InlineTable'">
              <template slot="prepend">远端方法</template>
            </el-input>
             <el-select v-model="data.options.remoteFunc" style="width:100%;" placeholder="请选择" filterable v-if="data.options.remoteType==='InlineTable'">

              <el-option
                v-for="item in selectList"
                :key="item.value"
                :label="item.label"
                :value="item.id">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
            <el-input size="mini" style="" v-for="(item, index) of data.options.options" v-model="item.propAttr">
              <template slot="prepend">{{item.label}}</template>
            </el-input>
          </div>
        </template>
        <template v-else>
          <template v-if="data.type=='radio' || (data.type=='select'&&!data.options.multiple)">
            <el-radio-group v-model="data.options.defaultValue">
              <draggable element="ul" :list="data.options.options"
                :options="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-radio
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:100px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" ></icon></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>

            </el-radio-group>
          </template>

          <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">

              <draggable element="ul" :list="data.options.options"
                :options="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-checkbox
                    :label="item.value"
                    style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:100px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" ></icon></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <template v-if="data.type=='table'">
              <draggable element="ul" :list="data.options.options"
                :options="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
              >
                <li v-for="(item, index) in data.options.options" :key="index" >
                  <el-input style="width:180px;" v-model="item.label"></el-input>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" ></icon></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>
          </template>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddOption">添加选项</el-button>
          </div>
        </template>

      </el-form-item>

      <el-form-item label="默认值" v-if="Object.keys(data.options).indexOf('defaultValue')>=0 && (data.type == 'textarea' || data.type == 'input' || data.type=='rate' || data.type=='color' || data.type=='switch')">
        <el-input v-if="data.type=='textarea'" type="textarea" :rows="5" v-model="data.options.defaultValue"></el-input>
        <el-input v-if="data.type=='input'" v-model="data.options.defaultValue"></el-input>
        <el-rate v-if="data.type == 'rate'" style="display:inline-block;vertical-align: middle;" :max="data.options.max" :allow-half="data.options.allowHalf" v-model="data.options.defaultValue"></el-rate>
        <el-button type="text" v-if="data.type == 'rate'" style="display:inline-block;vertical-align: middle;margin-left: 10px;" @click="data.options.defaultValue=0">清空</el-button>
        <el-color-picker
          v-if="data.type == 'color'"
          v-model="data.options.defaultValue"
          :show-alpha="data.options.showAlpha"
        ></el-color-picker>
        <el-switch v-if="data.type=='switch'" v-model="data.options.defaultValue"></el-switch>
      </el-form-item>

      <template v-if="data.type == 'time' || data.type == 'date'">
        <el-form-item label="显示类型" v-if="data.type == 'date'">
          <el-select v-model="data.options.type">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <el-option value="datetimerange"></el-option>
            <el-option value="daterange"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为范围选择" v-if="data.type == 'time'">
          <el-switch
            v-model="data.options.isRange"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="是否获取时间戳" v-if="data.type == 'date'">
          <el-switch
            v-model="data.options.timestamp"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="占位内容" v-if="(!data.options.isRange && data.type == 'time') || (data.type != 'time' && data.options.type != 'datetimerange' && data.options.type != 'daterange')">
          <el-input v-model="data.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item label="开始时间占位内容" v-if="(data.options.isRange) || data.options.type=='datetimerange' || data.options.type=='daterange'">
          <el-input v-model="data.options.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="结束时间占位内容" v-if="data.options.isRange || data.options.type=='datetimerange' || data.options.type=='daterange'">
          <el-input v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="格式">
          <el-input v-model="data.options.format"></el-input>
        </el-form-item>
        <el-form-item label="默认值" v-if="data.type=='time' && Object.keys(data.options).indexOf('isRange')>=0">
          <el-time-picker
            key="1"
            style="width: 100%;"
            v-if="!data.options.isRange"
            v-model="data.options.defaultValue"
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          >
          </el-time-picker>
          <el-time-picker
            key="2"
            v-if="data.options.isRange"
            style="width: 100%;"
            v-model="data.options.defaultValue"
            is-range
            :arrowControl="data.options.arrowControl"
            :value-format="data.options.format"
          >
          </el-time-picker>
        </el-form-item>
      </template>

      <template v-if="data.type=='imgupload'">
        <!-- 演示版本只支持单文件上传 -->
        <!-- <el-form-item label="最大上传数">
          <el-input type="number" v-model.number="data.options.length"></el-input>
        </el-form-item> -->
        <el-form-item label="上传地址" :required="true">
          <el-input v-model="data.options.domain" placeholder="http(s)://www.xxx.com/upload"></el-input>
        </el-form-item>
        <!-- <el-form-item label="获取七牛Token方法" :required="true">
          <el-input v-model="data.options.tokenFunc"></el-input>
        </el-form-item> -->
        <el-form-item label="上传类型（可多选）">
          <el-select
            v-model="data.options.multipleType"
            placeholder="不选择会接受任何文件上传"
            clearable
            multiple
            style="width: 260px">
            <el-option v-for="(val, index) in file" :key="index" :label="val.label" :value="val.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传文件大小（M）最大值10M" placeholder="不填写不加限制">
          <el-input-number v-model="data.options.size" :precision="2" :step="0.1" :min="0" :max="10"></el-input-number>
        </el-form-item>
      </template>

      <!-- 动态设计往后台传递的参数 -->
      <el-form-item label="参数设置">
        <el-input
          v-for="(param, index) in data.options.params"
          :key="'' + (Math.random() * Math.random() * (index + 1) * 9000.6767 / 75687678.45545)"
          placeholder="请输入key"
          v-model="param.value">
          <template slot="prepend">{{ param.label }}</template>
        </el-input>
      </el-form-item>

      <template v-if="data.type=='blank'">
        <el-form-item label="绑定数据类型">
          <el-select v-model="data.options.defaultType">
            <el-option value="String" label="字符"></el-option>
            <el-option value="Object" label="对象"></el-option>
            <el-option value="Array" label="数组"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'grid'">
        <el-form-item label="栅格间隔">
          <el-input type="number" v-model.number="data.options.gutter"></el-input>
        </el-form-item>
        <el-form-item label="列配置项">
          <draggable element="ul" :list="data.columns"
            :options="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
          >
            <li v-for="(item, index) in data.columns" :key="index" >
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><icon name="bars" ></icon></i>
              <el-input placeholder="栅格值" size="mini" style="width: 100px;" type="number" v-model.number="item.span"></el-input>

              <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddColumn">添加列</el-button>
          </div>
        </el-form-item>
        <el-form-item label="追加按钮名称" v-if="data.detail">
          <el-input v-model.trim="data.btnName"></el-input>
        </el-form-item>
        <el-form-item label="水平排列方式">
          <el-select v-model="data.options.justify">
            <el-option value="start" label="左对齐"></el-option>
            <el-option value="end" label="右对齐"></el-option>
            <el-option value="center" label="居中"></el-option>
            <el-option value="space-around" label="两侧间隔相等"></el-option>
            <el-option value="space-between" label="两端对齐"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="垂直排列方式">
          <el-select v-model="data.options.align">
            <el-option value="top" label="顶部对齐"></el-option>
            <el-option value="middle" label="居中"></el-option>
            <el-option value="bottom" label="底部对齐"></el-option>
          </el-select>
        </el-form-item>
      </template>


      <template v-if="data.type != 'grid'">

        <el-form-item label="数据绑定Key">
          <el-input v-model="data.model"></el-input>
        </el-form-item>
        <el-form-item label="操作属性">
          <el-checkbox v-model="data.options.readonly" v-if="Object.keys(data.options).indexOf('readonly')>=0">完全只读</el-checkbox>
          <el-checkbox v-model="data.options.disabled" v-if="Object.keys(data.options).indexOf('disabled')>=0">禁用	</el-checkbox>
          <el-checkbox v-model="data.options.editable" v-if="Object.keys(data.options).indexOf('editable')>=0">文本框可输入</el-checkbox>
          <el-checkbox v-model="data.options.clearable" v-if="Object.keys(data.options).indexOf('clearable')>=0">显示清除按钮</el-checkbox>
          <el-checkbox v-model="data.options.hidden" v-if="Object.keys(data.options).indexOf('hidden')>=0">隐藏域</el-checkbox>
          <el-checkbox v-model="data.options.isupload" v-if="Object.keys(data.options).indexOf('isupload')>=0">是否图片上传</el-checkbox>
          <el-checkbox v-model="data.options.arrowControl" v-if="Object.keys(data.options).indexOf('arrowControl')>=0">使用箭头进行时间选择</el-checkbox>
        </el-form-item>
        <el-form-item label="问号帮助" v-if="Object.keys(data.options).indexOf('ToolTipsdisabled')>=0">
          <el-form-item label="问号帮助是否显示" style="border: 0px;">
          <el-switch
            v-model="data.options.ToolTipsdisabled"
          >
          </el-switch>
          </el-form-item>
          <el-form-item label="帮助内容" v-if="data.options.ToolTipsdisabled"  style="border: 0px;">
           <el-input
           type="textarea"
           :rows="2"
           placeholder="请输入内容"  v-model="data.options.ToolTipscontent"></el-input>
          </el-form-item>
          <el-form-item label="显示位置" v-if="data.options.ToolTipsdisabled"  style="border: 0px;">
            <el-select v-model="data.options.ToolTipsShowLocation">
              <el-option value="TitleRight"></el-option>
              <el-option value="TitleLeft"></el-option>
              <el-option value="ElementRight"></el-option>
              <el-option value="ElementLeft"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提示位置" v-if="data.options.ToolTipsdisabled"  style="border: 0px;">
            <el-select v-model="data.options.ToolTipsplacement">
              <el-option value="top"></el-option>
              <el-option value="top-start"></el-option>
              <el-option value="top-end"></el-option>
              <el-option value="bottom"></el-option>
              <el-option value="bottom-start"></el-option>
              <el-option value="bottom-end"></el-option>
              <el-option value="left"></el-option>
              <el-option value="left-start"></el-option>
              <el-option value="left-end"></el-option>
              <el-option value="right"></el-option>
              <el-option value="right-start"></el-option>
              <el-option value="right-end"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="鼠标是否可进入到tooltip中"  v-if="data.options.ToolTipsdisabled"  style="border: 0px;">
          <el-switch
            v-model="data.options.ToolTipsenterable"
          >
          </el-switch>
          </el-form-item>
          <el-form-item label="延迟出现（毫秒）"  v-if="data.options.ToolTipsdisabled"  style="border: 0px;">
          <el-input type="number" v-model.number="data.options.ToolTipsopendelay"></el-input>
        </el-form-item>
         <el-form-item label="延迟关闭（毫秒）"  v-if="data.options.ToolTipsdisabled" style="border: 0px;">
          <el-input type="number" v-model.number="data.options.ToolTipshideafter"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item label="校验">
          <div>
            <el-checkbox v-model="data.options.required">必填</el-checkbox>
          </div>
          <el-select v-if="Object.keys(data.options).indexOf('dataType')>=0" v-model="data.options.dataType" size="mini" >
            <el-option value="phone" label="手机号"></el-option>
            <el-option value="email" label="邮箱地址"></el-option>
            <el-option value="int" label="正整数"></el-option>
            <el-option value="zeroAndInt" label="0以及正整数"></el-option>
            <el-option value="url" label="URL地址"></el-option>
            <el-option value="stringAndNumber" label="字符串或数字"></el-option>
          </el-select>

          <div v-if="Object.keys(data.options).indexOf('pattern')>=0">
            <el-input size="mini" v-model.lazy="data.options.pattern"  style=" width: 240px;" placeholder="填写正则表达式"></el-input>
          </div>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import file from './config/file.js'
import {DevelopmentPlatform} from '@/api/DevelopmentPlatform'

export default {
  components: {
    Draggable
  },
  props: ['data',"widgetForm"],
  data () {
    return {
      dataModel:"",
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      },
      file: file,
      selectList:Array
    }
  },
  computed: {
    show () {
      if (this.data && Object.keys(this.data).length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    handleOptionsRemove (index) {
      if (this.data.type === 'grid') {
        this.data.columns.splice(index, 1)
      } else {
        this.data.options.options.splice(index, 1)
      }

    },
    handleAddOption () {
      if (this.data.options.showLabel) {
        this.data.options.options.push({
          value: '新选项',
          label: '新选项'
        })
      } else {
        if(this.data.type==="table"){
          var datalength=this.data.options.options.length;
          this.$set(this.data.options.data[0],'标题'+(datalength+1), '');
          this.data.options.options.push({
           type:'',
          index:'',
          columnkey:'',
          label:'标题'+(datalength+1),
          prop:'',
          width:'',
          minwidth:'',
          fixed:'',
          renderheader:'',
          sortable:'',
          sortmethod:'',
          sortby:'',
          sortorders:'',
          resizable:'',
          formatter:'',
          showoverflowtooltip:'',
          align:'',
          headeralign:'center',
          classname:'',
          labelclassname:'',
          selectable:'',
          reserveselection:'',
          filters:'',
          filterplacement:'',
          filtermultiple:'',
          filtermethod:'',
          filteredvalue:'',
          propAttr:'',
          columns: [
            {
              list: []
            }
          ]
          });
        }else{
          this.data.options.options.push({
            value: '新选项'
          })
      }
      }

    },
    handleAddColumn () {
      this.data.columns.push({
        span: '',
        list: []
      })
    },
    generateRule () {
      this.data.rules = []
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) {
          this.data.rules.push(this.validator[key])
        }
      })
    },
    handleSelectMuliple (value) {
      if (value) {
        if (this.data.options.defaultValue) {
          this.data.options.defaultValue = [this.data.options.defaultValue]
        } else {
          this.data.options.defaultValue = []
        }

      } else {
        if (this.data.options.defaultValue.length>0){
          this.data.options.defaultValue = this.data.options.defaultValue[0]
        } else {
          this.data.options.defaultValue = ''
        }

      }
    }
  },
  watch: {
    'data.options.isRange': function(val) {
      if (typeof val !== 'undefined') {
        if (val) {
          this.data.options.defaultValue = null
        } else {
          if (Object.keys(this.data.options).indexOf('defaultValue')>=0)
            this.data.options.defaultValue = ''
        }
      }
    },
    'data.options.required': function(val) {
      if (val) {
        this.validator.required = {required: true, message: `${this.data.label}必须填写`}
      } else {
        this.validator.required = null
      }

      this.$nextTick(() => {
        this.generateRule()
      })
    },
    'data.options.dataType': function (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.type = {type: val, message: this.data.label + '格式不正确'}
      } else {
        this.validator.type = null
      }

      this.generateRule()
    },
    'data.options.pattern': function (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.pattern = {pattern: eval(val), message: this.data.label + '格式不匹配'}
      } else {
        this.validator.pattern = null
      }

      this.generateRule()
    },
    'data.model': {
        handler(val,oldVal) {
          if(!window.isSelectWidget && window.isSelectWidget!=undefined){
            const id=this.$route.query.id;
            const tableedit={};
            if(id){
              if(oldVal!=val){
              if(this.data["syncStatus"]){
                if(this.data["syncStatus"]!="1"){
                  this.data["syncStatus"]="2";
                  if(!this.data["isEdit"]){
                    this.data["oldName"]=oldVal;
                    this.data["isEdit"]=true;
                  }
                }
              }else{
                this.data["syncStatus"]="5";
              }
            }
          }
         }else{
            window.isSelectWidget=false;
         }
        },
        deep: true,
        immediate: true
    },
    'data.label':function(val) {

    },
    'data.columnComment': {
        handler(val,oldVal) {
         if(!window.isSelectWidget && window.isSelectWidget!=undefined){
            const id=this.$route.query.id;
            const tableedit={};
            if(id){
              if(oldVal!=val){
              if(this.data["syncStatus"]){
                if(this.data["syncStatus"]!="1"){
                  this.data["syncStatus"]="2";
                  if(!this.data["oldName"]){
                     this.data["oldName"]=this.data["model"];
                  }
                }
              }else{
                this.data["syncStatus"]="5";
              }
            }
          }
         }else{
            window.isSelectWidget=false;
         }
        },
        deep: true,
        immediate: true
    },
    'data.options.remoteType':function(val){
      if(this.data.options.remote){
        if(val==='InlineTable'){
          var appid=window.sysAlias;
          if(!appid){
            appid="default";
          }
          DevelopmentPlatform(`${window.DPWebAPIUrl}/design/allTable/${appid}`,"")
                    .then(response => {
                      this.selectList = response.data.map(item => {
                        return {
                          id: item['id'],
                          value: item['tableName'],
                          label: item['remark']
                        }

                })
                this.data.options.remoteFunc=response.data[0]['tableName'];
                    })
                    .catch(error => {
                      this.$message({
                        message: "查询失败",
                        type: "error"
                      });
                    });
        } else if(val==='APIInterface'){
          const key = Date.parse(window.moment()) + '_' + Math.ceil(Math.random() * 99999);
            this.data.options.remoteFunc="https://";
        } else if(val==='func'){
            const key = Date.parse(window.moment()) + '_' + Math.ceil(Math.random() * 99999);
            this.data.options.remoteFunc="func_"+key;
        }
      }
    }
  }
}
</script>
