<template>
  <el-container style="min-height: calc(100vh - 84px);">
    <!-- 组件区域 -->
    <el-aside style="wdith: 250px;">
      <div class="components-list">
        <div class="widget-cate">基础字段</div>
        <draggable element="ul" :list="basicComponents"
          :options="{group:{ name:'people', pull:'clone',put:false },sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >
          <li class="form-edit-widget-label" v-for="(item, index) in basicComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.label}}</span>
            </a>
          </li>
        </draggable>

        <div class="widget-cate">高级字段</div>
        <draggable element="ul" :list="advanceComponents"
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >

          <li class="form-edit-widget-label" v-for="(item, index) in advanceComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.label}}</span>
            </a>
          </li>
        </draggable>

        <div class="widget-cate">布局字段</div>
        <draggable element="ul" :list="layoutComponents"
          :options="{group:{ name:'people', pull:'clone',put:false},sort:false, ghostClass: 'ghost'}"
          @end="handleMoveEnd"
          @start="handleMoveStart"
          :move="handleMove"
        >

          <li class="form-edit-widget-label data-grid" v-for="(item, index) in layoutComponents" :key="index">
            <a>
              <icon class="icon" :name="item.icon"></icon>
              <span>{{item.label}}</span>
            </a>
          </li>
        </draggable>
      </div>
    </el-aside>

    <!-- 拖拽表单区域 -->
    <el-container class="center-container" direction="vertical">
      <el-header class="btn-bar" style="height: 45px;">
        <el-button type="text" size="medium" icon="el-icon-circle-check-outline" @click="handleSave">保存</el-button>
        <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview">预览</el-button>
        <!-- <el-button type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson('Import')">导入JSON</el-button> -->
        <el-button type="text" size="medium" icon="el-icon-tickets" @click="handleGenerateJson">生成JSON</el-button>
        <el-button type="text" size="medium" icon="el-icon-loading" @click="reset">重置</el-button>
        <!-- <el-button v-show="'flase'" type="text" size="medium" icon="el-icon-document" @click="handleGenerateCode">生成代码</el-button> -->
      </el-header>
      <el-main :class="{'widget-empty': widgetForm.list.length == 0}">
        <widget-form ref="widgetForm" :data="widgetForm" :select.sync="widgetFormSelect"></widget-form>
      </el-main>
    </el-container>

    <!-- 右侧属性设置 -->
    <el-aside class="widget-config-container">
      <el-container>
        <el-header height="45px">
          <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">字段属性</div>
          <div class="config-tab" :class="{active: configTab=='form'}" @click="handleConfigSelect('form')">表单属性</div>
        </el-header>
        <el-main class="config-content" style="height: calc(100vh - 129px);">
          <widget-config v-show="configTab=='widget'" :data="widgetFormSelect" :widgetForm="widgetForm"></widget-config>
          <form-config v-show="configTab=='form'" :data="widgetForm.config" :widgetForm="widgetForm"></form-config>
        </el-main>
      </el-container>
    </el-aside>

    <cus-dialog
      :visible="previewVisible"
      @on-close="previewVisible = false"
      ref="widgetPreview"
      @on-submit="handleTest"
      width="1000px"
      form
    >
      <generate-form v-if="previewVisible" :data="widgetForm" :remote="remoteFuncs" :value="widgetModels" ref="generateForm">

        <template slot="blank" slot-scope="scope">
          宽度：<el-input v-model="scope.model.blank.width" style="width: 100px"></el-input>
          高度：<el-input v-model="scope.model.blank.height" style="width: 100px"></el-input>
        </template>
      </generate-form>
    </cus-dialog>

    <cus-dialog
      :visible="jsonVisible"
      @on-close="jsonVisible = false"
      ref="jsonPreview"
      width="800px"
      form
    >
      <div id="jsoneditor" style="height: 400px;width: 100%;">{{jsonTemplate}}</div>

      <template slot="action">
        <el-input
          placeholder="请输入表单名称(必填)"
          v-model="name"
          style="width: 300px;margin-right: 20px;"></el-input>
          <el-input
          placeholder="请输入表名称(必填)"
          v-model="tableName"
          :disabled="name === ''"
          style="width: 300px;margin-right: 20px;"></el-input>
        <!-- <el-button id="copybtn" data-clipboard-target=".ace_text-input">双击复制</el-button> -->
        <el-button @click="handleSaveForm" :disabled="name === ''">保存表单</el-button>
      </template>
    </cus-dialog>

    <cus-dialog
      :visible="codeVisible"
      @on-close="codeVisible = false"
      ref="codePreview"
      width="800px"
      form
      :action="false"
    >
      <div id="codeeditor" style="height: 500px; width: 100%;">{{htmlTemplate}}</div>
    </cus-dialog>
  </el-container>
</template>

<script>
import Draggable from 'vuedraggable'
import WidgetConfig from './components/WidgetConfig'
import FormConfig from './components/FormConfig'
import WidgetForm from './components/WidgetForm'
import CusDialog from './components/CusDialog'
import GenerateForm from './components/GenerateForm'
import {loadJs, loadCss} from './components/DeveLopmetPlatform.js'
// import JSONEditor from 'jsoneditor'
// import 'jsoneditor/dist/jsoneditor.min.css'
import Clipboard from 'clipboard'
import {basicComponents, layoutComponents, advanceComponents} from './components/componentsConfig.js'
// import request from '../util/request.js'
import generateCode from './components/generateCode.js'
// import { saveForm } from '../api'
import uuid from 'uuid'
import {dataModelFun} from './components/JsonData.js';
import {DevelopmentPlatform} from '@/api/DevelopmentPlatform'

export default {
  name: 'DevelopmentPlatform_edit',
  components: {
    Draggable,
    WidgetConfig,
    FormConfig,
    WidgetForm,
    CusDialog,
    GenerateForm
  },
  data () {
    return {
      basicComponents,
      layoutComponents,
      advanceComponents,
      widgetForm: {
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: 'top'
        },
      },
      configTab: 'widget',
      widgetFormSelect: null,
      previewVisible: false,
      jsonVisible: false,
      codeVisible: false,
      remoteFuncs: {
        func_test (resolve) {
            resolve(options)
        },
        funcGetToken (resolve) {

        }
      },
      widgetModels: {},
      blank: '',
      htmlTemplate: '',
      jsonTemplate: '',
      jsonTemplateOne:false,
      name: '',
      tableName:'',
      widgetFormUpdate:false,
      editor:null
    }
  },
  computed: {
    copyIndex() {
      return this.$store.state.copyIndex
    }
  },
  mounted () {
    if(window.location.href.indexOf('/#/card')>0){
      document.getElementsByClassName("sidebar-container")[0].style.display="none";
      document.getElementsByClassName("hamburger-container")[0].style.display="none";
      document.getElementsByClassName("main-container")[0].style.marginLeft="0px";
    }else{
      document.getElementsByClassName("sidebar-container")[0].style.display="";
      document.getElementsByClassName("main-container")[0].removeAttribute('style');
      document.getElementsByClassName("hamburger-container")[0].removeAttribute('style');
    }
    loadJs('lib/ace/src/ace.js');
    this.handleSaveGet();
  },
  methods: {
    handleConfigSelect (value) {
      this.configTab = value
    },
    handleMoveEnd (evt) {
      console.log('end', evt)
    },
    handleMoveStart ({oldIndex}) {
      console.log('start', oldIndex, this.basicComponents)
    },
    handleMove () {
      return true
    },
    // 重置
    reset() {
      window.location.reload()
    },
    // 保存
    handleSave() {
      this.jsonVisible = true;
      this.jsonTemplate = this.widgetForm;
      this.$nextTick(() => {

        this.editor = ace.edit('jsoneditor')
        this.editor.session.setMode("ace/mode/json")
        this.editor.on('change',(obj)=>{
           try{
             this.widgetForm=JSON.parse(this.editor.getValue());
          }catch(err){
              this.$message({
                message: '请确定JSON格式',
                type: 'warning'
              });
          }
        })
        // const btnCopy = new Clipboard('#copybtn')
      })
    },
    // 保存表单操作
    handleSaveForm() {
      if (this.name === '') {

        this.$message({
          type: 'warning',
          message: '请输入表单名称'
        })
        return false
      }
      if (this.tablename === '') {
        this.$message({
          type: 'warning',
          message: '请输入表名称'
        })
        return false
      }
      this.widgetForm.list = this.widgetForm.list.map(item => {
        item.options.isHidden = true
        item.options.disabled = false
        return item
      })
      dataModelFun.dataModelJsonTable('1',this.widgetForm,this.tableName);
      window.JsonData.tableName=this.tableName;
      window.JsonData.remark=this.name;
      window.JsonData.appId=window.sysAlias;
      window.JsonData.designDetails.formStyleDetail=JSON.stringify(this.jsonTemplate).replace(/,"syncStatus":"1"/g, '').replace(/,"syncStatus":"3"/g, '').replace(/"isEdit":true/g, '"isEdit":false');

      const data = {
        name: this.name,
        content: JSON.stringify(this.widgetForm.list)
      }
      if(!this.widgetFormUpdate){
        DevelopmentPlatform(`${window.DPWebAPIUrl}/design/form/createTable`,window.JsonData).then(res=>{
         if (res.errcode===0) {
            this.$message.success('保存成功')
            this.name = ''
            this.jsonVisible = false
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
        var id=this.$route.query.id;
        window.JsonData["id"]=id;
        DevelopmentPlatform(`${window.DPWebAPIUrl}/design/form/editTable`,window.JsonData).then(res=>{
         if (res.errcode===0) {
           this.$message.success('修改成功')
            this.name = ''
            this.jsonVisible = false
          } else {
            this.$message.error(res.errmsg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
      // 保存表单操作
    handleSaveGet() {
      var id=this.$route.query.id;
      if(id){
        var that=this;
        // debugger;
        DevelopmentPlatform(`${window.DPWebAPIUrl}/design/form/style`,{id:id}).then(res=>{
        //request.post('http://test-integrate.mamcharge.com/api/web/form/design/getStyleByTableId',{id:id}).then(res => {
          this.widgetFormUpdate=true
          that.widgetFormSet(res);
          console.log(res);
        });
      }
    },
    handlePreview () {
      this.previewVisible = true
    },
    widgetFormSet(res){
      // //this.widgetForm=JSON.parse(res.data.designDetails.formStyleDetail);
      // this.$set(this.widgetForm,"config",JSON.parse(res.data.designDetails.formStyleDetail).config);
      // this.$set(this.widgetForm,"list",JSON.parse(res.data.designDetails.formStyleDetail).list);
      this.tableName=res.data.tableName;
      this.name=res.data.remark;
      window.JsonDataEdit=res.data;
      this.jsonTemplate = JSON.parse(res.data.designDetails.formStyleDetail);
      this.jsonTemplate.list.length > 0 && (this.widgetFormSelect = this.jsonTemplate.list[0])
      this.$set(this.widgetForm,"config",this.jsonTemplate.config);
      this.$set(this.widgetForm,"list",this.jsonTemplate.list);
    },
    handleTest () {
      this.$refs.generateForm.getData().then(data => {
        this.$alert(data, '').catch(e=>{})
        this.$refs.widgetPreview.end()
      }).catch(e => {
        this.$refs.widgetPreview.end()
      })
    },
    handleGenerateJson (Import) {
      this.jsonVisible = true;
      this.jsonTemplate = this.widgetForm
      this.$nextTick(() => {

        this.editor = ace.edit('jsoneditor')
        this.editor.session.setMode("ace/mode/json")
        this.editor.on('change',(obj)=>{
          try{
             this.widgetForm=JSON.parse(this.editor.getValue());
          }catch(err){
              this.$message({
                message: '请确定JSON格式',
                type: 'warning'
              });
          }

        })
        const btnCopy = new Clipboard('#copybtn')
      })
    },
    handleGenerateCode () {
      this.codeVisible = true
      this.htmlTemplate = generateCode(JSON.stringify(this.widgetForm))
      this.$nextTick(() => {
        this.editor = ace.edit('codeeditor')
        this.editor.session.setMode("ace/mode/html")
        this.editor.on('change',(obj)=>{
           try{
             this.widgetForm=JSON.parse(this.editor.getValue());
          }catch(err){
              this.$message({
                message: '请确定JSON格式',
                type: 'warning'
              });
          }
        })
      })
    }
  },
  watch: {
    widgetForm: {
      deep: true,
      handler: function (val) {
        this.jsonTemplate=val;
      }
    },
    copyIndex(index) {
      const obj = JSON.parse(JSON.stringify(this.widgetForm.list[index]))
      this.widgetForm.list[index].addBtnShow = false
      obj.key = uuid.v1().replace(/-/g, '_')
      obj.columns.forEach(item => {
        item.list.forEach(val => {
          val.key = uuid.v1().replace(/-/g, '_')
          val.model = val.key
        })
      })
      this.widgetForm.list.push(obj)
    },
    jsonTemplate(val){

    }
  }
}
</script>

<style lang="scss">
@import '@/styles/DevelopmentPlatform/cover.scss';
@import '@/styles/DevelopmentPlatform/index.scss';
.widget-empty{
  background-position: 50%;
}

</style>
